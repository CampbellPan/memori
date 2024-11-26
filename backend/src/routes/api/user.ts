import express, { Request, Response } from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { getUserById } from '../../DAO/UserDao';

const router = express.Router();

// 获取用户信息的路由
router.get('/:userId', authMiddleware, async (req: Request, res: Response) => {
    const { userId } = req.params;
  
    try {
      const user = await getUserById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error(`Error in /user/${userId}:`, error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  export default router;