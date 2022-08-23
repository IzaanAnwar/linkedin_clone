import { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcrypt';
import { JwtPayload, sign } from 'jsonwebtoken';
import { serialize } from 'cookie';

import userModel, { IUser } from '../../../models/user';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== 'GET') {
        res.status(404).json({ message: 'Invalid Request' });
        return;
    }
    const { name, email, password }: IUser = req.body;
    if (!email || !password || !name) return;

    const user: IUser = await userModel.findOne({
        email: email,
    });

    if (!user || user?.name !== name) {
        res.status(400).json({
            message: 'Check Your Credentials',
        });
        return;
    }
    compare(password, user.password, (err: Error, result: boolean) => {
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

            res.status(200).json({
                message: 'Welcome to the app!',
                isAuthenticated: true,
            });
            return;
        }
        res.status(400).json({
            message: 'Check your credentials',
            isAuthenticated: false,
        });
        return;
    });
}
