import express from 'express';
import { registerUser, loginUser, verifyToken } from '../controllers/authController.js';
// import authenticateToken from '../middleware/authMiddleware.js'


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route
// router.get('/verify', authenticateToken, verifyToken); // Verify token and user details

export default router;

