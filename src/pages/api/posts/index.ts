import { NextApiRequest, NextApiResponse } from 'next';
import { IPost, postModel } from '../../../models/post';
import { isAuthenticatedFn } from '../../../services/autheticate';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (!isAuthenticatedFn(req)) {
        res.status(500).json({ message: 'Sorry you are not Authenticated' });
    }
    if (req.method === 'GET') {
        const allPosts: Array<IPost> = await postModel.find({});
        if (allPosts.length === 0) {
            res.status(404).json({ message: 'No Posts' });
            return;
        }

        res.status(200).json({ data: allPosts });
    } else if (req.method === 'POST') {
        const { name, message, imageURL, likes }: IPost = req.body;
        const newPost = new postModel<IPost>({
            name,
            message,
            imageURL,
            likes,
        });
        newPost.save((error) => {
            if (error) res.status(404).json({ message: error.message });
            res.status(201).json({
                message: 'New Post Created',
                data: newPost,
            });
        });
    } else {
        res.status(404).json({ message: 'Invalid Request!' });
        return;
    }
}

// res.setHeader(
//     'Set-Cookie',
//     serialize('auth_token', '', {
//         maxAge: -1,
//         path: '/',
//     }),
// );
