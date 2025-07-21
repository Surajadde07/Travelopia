const express = require('express');
const { createMoment, getAllMoments, likeMoment, unlikeMoment, commentOnMoment } = require('../controllers/momentController');
const multer = require('multer');
const { isAuthenticated, isUser } = require('../middleware/auth');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

const router = express.Router();

// Routes
router.post('/create', isAuthenticated, isUser, upload.single('image'), createMoment);
router.get('/all', getAllMoments);
router.put('/like/:id', isAuthenticated, likeMoment);
router.put('/unlike/:id', isAuthenticated, unlikeMoment);
router.post('/comment/:id', isAuthenticated, commentOnMoment);

module.exports = router;
