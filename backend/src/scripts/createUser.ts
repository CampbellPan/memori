import mongoose from 'mongoose';
import UserModel from '../models/UserModel';

//用来重置数据库，并且创建一个新用户

const connectDB = async () => {
    try {
        const dbUrl = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/memori_dev';
        await mongoose.connect(dbUrl);
        console.log('成功连接到数据库');
    } catch (error) {
        console.error('数据库连接失败:', error);
        process.exit(1);
    }
};

const createUser = async () => {
    try {
        // 创建用户数据
        const newUser = new UserModel({
            userId: new mongoose.Types.ObjectId(),
            username: 'john_doe',
            password_hash: '12345678', // 假设你已经对密码进行了哈希处理
            email: 'john.doe@example.com',
            avatar: '/frontend/public/avatar.jpg',
        });

        // 保存用户到数据库
        const savedUser = await newUser.save();
        console.log('新用户已创建:', savedUser);
    } catch (error) {
        console.error('创建用户失败:', error);
    }
};

(async () => {
    await connectDB(); // 连接数据库
    await createUser(); // 创建用户
    mongoose.disconnect(); // 断开数据库连接
})();
