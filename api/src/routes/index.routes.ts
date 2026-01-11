import { Router } from 'express';
import userRoutes from './user.routes';

const router = Router();

// Call user routes
router.use('/users', userRoutes);

router.get('/', (_, res) => {
  res.status(200).json({ message: 'Welcome!' });
});

export default router;
