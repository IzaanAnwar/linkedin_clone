import { NextApiRequest, NextApiResponse } from 'next';
import { IPost, postModel } from '../../../models/post';
import { isAuthenticatedFn } from '../../../services/autheticate';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (!isAuthenticatedFn(req)) {
        return res
            .status(500)
            .json({ message: 'Sorry you are not Authenticated' });
    }
    if (req.method === 'GET') {
        const allPosts: Array<IPost> = await postModel.find({});
        if (allPosts.length === 0) {
            return res.status(200).json({ message: 'Not Found' });
        }

        res.status(200).json({ message: 'Found', posts: allPosts });
    } else if (req.method === 'POST') {
        const { name, message, imageURL = '', likes }: IPost = req.body;

        const newPost = new postModel<IPost>({
            name,
            message,
            imageURL: imageURL ? imageURL : '',
            likes,
        });
        newPost.save((error) => {
            if (error) res.status(500).json({ message: error.message });
            return res.status(201).json({
                message: 'New Post Created',
                data: newPost,
            });
        });
    } else {
        return res.status(404).json({ message: 'Invalid Request!' });
    }
}

// res.setHeader(
//     'Set-Cookie',
//     serialize('auth_token', '', {
//         maxAge: -1,
//         path: '/',
//     }),
// );
