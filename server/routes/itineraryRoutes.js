import express from 'express';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// @desc    Generate itinerary with AI
// @route   POST /api/itinerary/generate
// @access  Public
const generateItinerary = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'AI itinerary generation endpoint - coming soon',
    data: null
  });
});

// @desc    Get user itineraries
// @route   GET /api/itinerary
// @access  Private
const getItineraries = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get itineraries endpoint - coming soon',
    data: []
  });
});

router.post('/generate', generateItinerary);
router.get('/', getItineraries);

export default router;