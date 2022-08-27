import mongoose from 'mongoose';

export interface IUser {
    _id?: string;
    name?: string;
    email?: string;
    password?: string;
    timestamp?: string;
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    timestamp: Date,
});

const userModel =
    (mongoose.models.User as mongoose.Model<IUser>) ||
    mongoose.model<IUser>('User', userSchema);
export default userModel;
