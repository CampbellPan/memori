import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import UserModel from '../models/UserModel';


//用来重置数据库的脚本，使用npx ts-node src/scripts/createUser.ts来运行

const SALT_ROUNDS = 10; // 加盐轮数

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

const resetDatabase = async () => {
    try {
        // 清空数据库的所有集合（仅开发环境使用）
        await mongoose.connection.dropDatabase();
        console.log('数据库已重置');
    } catch (error) {
        console.error('重置数据库失败:', error);
    }
};

const createUser = async () => {
    try {
        //预设密码
        const password = '12345678';
        // 创建密码哈希
        const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

        // 创建用户数据
        const newUser = new UserModel({
            userId: new mongoose.Types.ObjectId(),
            username: 'john_doe',
            password_hash: password_hash,
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
    await resetDatabase(); // 重置数据库
    await createUser(); // 创建用户
    mongoose.disconnect(); // 断开数据库连接
})();
