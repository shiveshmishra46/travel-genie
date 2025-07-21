import express from 'express';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// @desc    Search places
// @route   GET /api/places/search
// @access  Public
const searchPlaces = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Place search endpoint - coming soon',
    data: []
  });
});

// @desc    Get place recommendations
// @route   GET /api/places/recommendations
// @access  Public
const getRecommendations = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Place recommendations endpoint - coming soon',
    data: []
  });
});

// @desc    Get saved places
// @route   GET /api/places/saved
// @access  Private
const getSavedPlaces = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get saved places endpoint - coming soon',
    data: []
  });
});

// @desc    Save a place
// @route   POST /api/places/save
// @access  Private
const savePlace = asyncHandler(async (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Save place endpoint - coming soon',
    data: null
  });
});

router.get('/search', searchPlaces);
router.get('/recommendations', getRecommendations);
router.get('/saved', getSavedPlaces);
router.post('/save', savePlace);

export default router;