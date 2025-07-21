import express from 'express';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// @desc    Get emergency contacts
// @route   GET /api/emergency/contacts
// @access  Private
const getEmergencyContacts = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get emergency contacts endpoint - coming soon',
    data: []
  });
});

// @desc    Trigger panic mode
// @route   POST /api/emergency/panic
// @access  Private
const triggerPanic = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Panic mode triggered endpoint - coming soon',
    data: null
  });
});

router.get('/contacts', getEmergencyContacts);
router.post('/panic', triggerPanic);

export default router;