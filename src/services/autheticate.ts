import { verify } from 'jsonwebtoken';
import { NextApiRequest } from 'next';

export const isAuthenticatedFn = (req: NextApiRequest): boolean => {
    let result: boolean;

    verify(
        req.cookies.auth_token ? req.cookies.auth_token : 'authentication',
        process.env.JWT_SECRET_TOKEN,
        (err: Error, decode: DecodeSuccessCallback) => {
            if (!err && decode) {
                result = true;
            } else {
                result = false;
            }
        },
    );
    return result;
};
