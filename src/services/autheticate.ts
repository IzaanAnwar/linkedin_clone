import { verify } from "jsonwebtoken";
import { NextApiRequest } from "next";

export const isAuthenticatedFn = (req: NextApiRequest) => {
    return(
        verify(
            req.cookies.auth_token ? req.cookies.auth_token: "authentication",
            process.env.JWT_SECRET_TOKEN,
            (err: Error, decode: DecodeSuccessCallback) => {
                if (!err && decode) {
                    return true;
                } else {
                    return false;
                }
            },
        ),
    );
};