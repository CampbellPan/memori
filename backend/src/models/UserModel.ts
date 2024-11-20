import mongoose from 'mongoose';
import { IUser } from '../schemas/UserSchema';
import UserSchema from '../schemas/UserSchema';


const UserModel = mongoose.model<IUser>('User', UserSchema);
export default UserModel;
