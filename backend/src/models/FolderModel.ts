import mongoose from "mongoose";
import { IFolder } from "../schemas/FolderSchema";
import FolderSchema from "../schemas/FolderSchema";

const FolderModel = mongoose.model<IFolder>("Folder", FolderSchema);
export default FolderModel;