import mongoose, { ObjectId } from 'mongoose';

//定义图片接口
export interface IPhoto extends mongoose.Document {
    photoId: ObjectId;
    userId: ObjectId;
    folderId: ObjectId;
    photoUrl: string;
    metaData:{
        size: number;
        format: string;
        resolution: string;
    },
    tags: string[];
    uploaded_at: Date;
}

//定义图片模式
const PhotoSchema = new mongoose.Schema({
    photoId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    folderId: { type: mongoose.Schema.Types.ObjectId, required: true },
    photoUrl: { type: String, required: true },
    metaData:{
        size: { type: Number, required: true },
        format: { type: String, required: true },
        resolution: { type: String, required: true },
    },
    tags: { type: [String], required: true },
    uploaded_at: { type: Date, required: true, default: Date.now },
})

export default PhotoSchema;