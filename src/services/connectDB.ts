import mongoose from 'mongoose';

export default async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_URL);
        console.log('[CONNECTED_TO_DB]');
    } catch (error) {
        console.log(error.message);
        return;
    }
}
