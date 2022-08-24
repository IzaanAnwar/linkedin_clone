import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcrypt';
import { sign, JwtPayload } from 'jsonwebtoken';
import { serialize } from 'cookie';

import userModel, { IUser } from '../../../models/user';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== 'POST') {
        res.status(404).json({ message: 'Invalid Request' });
        return;
    }

    const { name, email, password }: IUser = req.body;
    if (!name || !email || !password) return;

    const userData: IUser = await userModel.findOne({ email: email });
    if (userData) {
        res.status(400).json({
            message: 'User Already Exist with This Email',
        });
        return;
    } else {
        hash(password, 10, (err: Error, hash: string) => {
            if (err) {
                res.status(408).json({ message: 'Something went wrong' });
                return;
            }
            const user = new userModel({ name, email, password: hash });

            user.save((error: Error) => {
                if (error) {
                    res.status(408).json(error.message);
                    return;
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

                res.status(201).json({
                    message: 'User Registered!',
                    isAuthenticated: true,
                });
                return;
            });
        });
    }
}
