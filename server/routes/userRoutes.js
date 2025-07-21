import express from 'express';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get user profile endpoint - coming soon',
    data: null
  });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Update user profile endpoint - coming soon',
    data: null
  });
});

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

export default router;