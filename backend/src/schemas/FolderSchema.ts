import mongoose, { ObjectId } from 'mongoose';
import path from 'path';

//定义文件夹接口
export interface IFolder extends mongoose.Document {
    folderId: ObjectId;
    folderName: string;
    userId: ObjectId;
    parentFolderId: ObjectId;
    path: string;
    created_at: Date;
    updated_at: Date;
}

//定义文件夹模式
const FolderSchema = new mongoose.Schema({
    folderId: { type:mongoose.Schema.Types.ObjectId, required: true, unique: true },
    folderName: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    parentFolderId: { type: mongoose.Schema.Types.ObjectId, required: true },
    path: { type: String, required: true },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
})

export default FolderSchema;