import express from 'express';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import { Request, Response } from 'express';
import { createUser, isEmailUnique, isUsernameUnique } from '../../DAO/UserDao';
import jwt from 'jsonwebtoken';
import UserModel from '../../models/UserModel';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  // 验证输入是否完整
  if (!usernameOrEmail || !password) {
    return res.status(400).json({ message: '用户名/邮箱和密码不能为空' });
  }

  try {
    // 查找用户
    const user = await UserModel.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
    if (!user) {
      return res.status(401).json({ message: '用户名或密码错误' });
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: '用户名或密码错误' });
    }

    // 生成 JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' } // 设置过期时间为1小时
    );

    // 返回 Token
    res.status(200).json({ token });
  } catch (error) {
    console.error('登录失败:', error);
    res.status(500).json({ message: '服务器出错，请稍后再试' });
  }
});

// 注册接口
router.post(
  '/register',
  [
    // 验证请求体字段
    body('username')
      .isLength({ min: 2 })
      .withMessage('用户名长度至少为2位')
      .custom(async (username) => {
        const isUnique = await isUsernameUnique(username);
        if (!isUnique) {
          throw new Error('用户名已被使用');
        }
        return true;
      }),
    body('email')
      .isEmail()
      .withMessage('请输入有效的邮箱地址')
      .custom(async (email) => {
        const isUnique = await isEmailUnique(email);
        if (!isUnique) {
          throw new Error('邮箱已被使用');
        }
        return true;
      }),
    body('password')
      .isLength({ min: 8 })
      .withMessage('密码长度至少为8位'),
    body('avatar')
      .notEmpty()
      .withMessage('头像链接不能为空'),
  ],
  async (req: Request, res: Response) => {
    console.log("进入register路由接口");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, avatar } = req.body;

    try {
      const user = await createUser(username, email, password, avatar);
      res.status(201).json({ message: '注册成功', user });
    } catch (error) {
      console.error('注册失败:', error);
      res.status(500).json({ message: '服务器内部错误' });
    }
  }
);

// Logout 路由
router.post('/logout', (req, res) => {
  // 如果是通过 Cookie 存储 JWT：
  res.clearCookie('token'); // 清除 Cookie 中的 token
  res.status(200).json({ message: '已成功退出登录' });
});

export default router;