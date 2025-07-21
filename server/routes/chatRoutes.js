import express from 'express';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// @desc    Send message to Gemini AI
// @route   POST /api/chat/message
// @access  Public
const sendMessage = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'AI chat endpoint - coming soon',
    data: {
      response: "Hello! I'm Travel Genie, your AI travel assistant. How can I help you today?"
    }
  });
});

// @desc    Get chat history
// @route   GET /api/chat/history
// @access  Private
const getChatHistory = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get chat history endpoint - coming soon',
    data: []
  });
});

router.post('/message', sendMessage);
router.get('/history', getChatHistory);

export default router;