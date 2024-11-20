import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// 中间件配置
app.use(cors());                // 处理跨域请求
app.use(helmet());             // 安全中间件
app.use(morgan('dev'));        // 日志中间件
app.use(express.json());       // 解析 JSON 请求体
app.use(express.urlencoded({ extended: true })); // 解析 URL 编码的请求体

// 基础路由
app.get('/', (req: Request, res: Response) => {
  res.json({ message: '服务器运行正常' });
});

// API 路由
// TODO: 在这里添加你的 API 路由
// app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);

// 404 错误处理
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: '未找到请求的资源' });
});

// 全局错误处理中间件
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: '服务器内部错误',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});

export default app;
