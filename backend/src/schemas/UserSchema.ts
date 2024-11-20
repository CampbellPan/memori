import mongoose, { ObjectId } from 'mongoose';

//定义用户接口
export interface IUser extends mongoose.Document {
    userId: ObjectId;
    username: string;
    password_hash: string;
    email: string;
    created_at: Date;
    avatar: string;
}

const UserSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    created_at: { type: Date, required: true, default: Date.now },
    avatar: { type: String, required: true },
});

export default UserSchema;
