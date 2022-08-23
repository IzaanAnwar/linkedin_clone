import { NextApiRequest, NextApiResponse } from 'next';
import { postModel } from '../../../models/post';
import { isAuthenticatedFn } from '../../../services/autheticate';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (!isAuthenticatedFn(req)) {
        res.status(500).json({ message: 'Sorry you are not Authenticated' });
    }
    if (req.method === 'DELETE') {
        const { id: postID } = req.query;

        const deletePost = await postModel.findByIdAndDelete({
            _id: postID,
        });
        if (!deletePost) {
            res.status(404).json({ message: 'Invalid ID' });
            return;
        }
        res.status(200).json({
            message: 'Successfully deleted post',
            data: deletePost.name,
        });
    } else {
        res.status(404).json({ message: 'Invalid Request' });
    }
}
