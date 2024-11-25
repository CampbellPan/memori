import bcrypt from 'bcrypt';
import UserModel from '../models/UserModel';

const SALT_ROUNDS = 10;

//检查用户名是否存在
export const isUsernameUnique = async (username: string): Promise<boolean> => {
    const user = await UserModel.findOne({ username });
    return !user;
}

//检查邮箱是否存在
export const isEmailUnique = async (email: string): Promise<boolean> => {
    const user = await UserModel.findOne({ email });
    return !user;
}

//注册用户函数

export const createUser = async (
    username: string,
    email: string,
    password: string,
    avatar?: string
  ) => {
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
  
    // 如果没有提供头像，则使用默认头像
    const userAvatar = avatar || 'avatar.jpg';
  
    const user = new UserModel({
      userId: new UserModel()._id,
      username,
      email,
      password_hash: password_hash,
      avatar: userAvatar,
    });
  
    return user.save();
  };