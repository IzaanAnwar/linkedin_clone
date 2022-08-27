import { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcrypt';
import { JwtPayload, sign } from 'jsonwebtoken';
import { serialize } from 'cookie';

import userModel, { IUser } from '../../../models/user';
import connectToDB from '../../../services/connectDB';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== 'GET') {
        res.status(404).json({ message: 'Invalid Request' });
        return;
    }
    await connectToDB();
    const { email, password }: IUser | undefined = req.query;
    console.log(email, password);

    if (!email || !password)
        return res.status(200).json({
            message: 'Some Field missing!',
            isAuthenticated: false,
        });

    const user: IUser = await userModel.findOne({
        email: email,
    });

    if (email !== user?.email)
        return res.status(200).json({
            message: 'Check your credentials',
            isAuthenticated: false,
        });

    compare(password, user?.password, (err: Error, result: boolean) => {
        if (!err && result) {
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

            return res.status(200).json({
                message: 'Welcome to the app!',
                isAuthenticated: true,
            });
        }
        return res.status(200).json({
            message: 'Check your credentials',
            isAuthenticated: false,
        });
    });
}
