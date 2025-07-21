import express from 'express';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  res.status(201).json({
    success: true,
    message: 'User registration endpoint - coming soon',
    data: null
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'User login endpoint - coming soon',
    data: null
  });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'User logout endpoint - coming soon',
    data: null
  });
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get current user endpoint - coming soon',
    data: null
  });
});

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', getMe);

export default router;