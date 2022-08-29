import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcrypt';
import { sign, JwtPayload } from 'jsonwebtoken';
import { serialize } from 'cookie';

import userModel, { IUser } from '../../../models/user';
import connectToDB from '../../../services/connectDB';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== 'POST') {
        return res.status(404).json({ message: 'Invalid Request' });
    }
    await connectToDB();

    const { name, email, password }: IUser = req.body;
    if (!name || !email || !password)
        return res.status(404).json({ message: 'Req Body is Empty' });

    const userData: IUser = await userModel.findOne({ email: email });

    if (userData && userData.email === email) {
        return res.status(200).json({
            message: 'User Already Exist with This Email',
        });
    } else {
        hash(password, 10, (err: Error, hash: string) => {
            if (err) {
                return res
                    .status(200)
                    .json({ message: 'Something went wrong' });
            }

            const user = new userModel({ name, email, password: hash });

            user.save((error: Error) => {
                if (error) {
                    return res.status(408).json({ message: error.message });
                }
                const payload: JwtPayload = {
                    name: user.name,
                    id: user._id,
                    email: user.email,
                };
                const jwtToken = sign(payload, process.env.JWT_SECRET_TOKEN, {
                    expiresIn: '1h',
                });
                res.setHeader(
                    'Set-Cookie',
                    serialize('auth_token', jwtToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'strict',
                        maxAge: 3600,
                        path: '/',
                    }),
                );

                return res.status(201).json({
                    message: 'User Registered!',
                    isAuthenticated: true,
                });
            });
        });
    }
}
