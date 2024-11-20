import mongoose from "mongoose";
import { IPhoto } from "../schemas/PhotoSchema";
import PhotoSchema from "../schemas/PhotoSchema";

const PhotoModel = mongoose.model<IPhoto>("Photo", PhotoSchema);

export default PhotoModel;