import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// 声明自定义请求对象类型，便于后续访问解码后的用户信息
interface AuthenticatedRequest extends Request {
    user?: any;
}


// 验证中间件
const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // 从请求头中获取 Authorization 字段中的 Bearer Token
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
  
    try {
      // 验证并解码 JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = decoded; // 将解码后的用户信息附加到请求对象上
      next(); // 验证通过，继续处理请求
    } catch (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
    }
  };
  
  export default authMiddleware;