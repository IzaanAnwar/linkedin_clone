import mongoose from 'mongoose';

export interface IPost {
    _id?: string;
    name: string;
    message: string;
    imageURL: string;
    likes: number;
}

const postSchema = new mongoose.Schema<IPost>({
    name: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    },
});

export const postModel =
    (mongoose.models.Post as mongoose.Model<IPost>) ||
    mongoose.model<IPost>('Post', postSchema);
