const express = require('express');
const { getAllTours } = require('../controllers/userController');
const { getAdventureTours,getRomanticTours,getReligiousTours,getHistoricalTours } = require('../controllers/tourController');
const router = express.Router();

router.get('/destinations',getAllTours);
router.get('/adventure',getAdventureTours);
router.get('/romantic',getRomanticTours);
router.get('/religious',getReligiousTours);
router.get('/historical',getHistoricalTours);

module.exports = router;