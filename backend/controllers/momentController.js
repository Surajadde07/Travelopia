const Moment = require('../models/Moment');

exports.createMoment = async (req, res) => {
    try {
        const { description } = req.body;
        const newMoment = new Moment({
            user: req.user._id,
            description,
            image: req.file ? req.file.path : null
        });
        await newMoment.save();
        res.status(201).json({ success: true, moment: newMoment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllMoments = async (req, res) => {
    try {
        const moments = await Moment.find().populate('user', 'username photo').populate('comments.user', 'username') .sort({ createdAt: -1 });
        res.status(200).json({ success: true, moments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.likeMoment = async (req, res) => {
    try {
        const moment = await Moment.findById(req.params.id);
        if (!moment.likes.includes(req.user._id)) {
            moment.likes.push(req.user._id);
            await moment.save();
        }
        res.status(200).json({ success: true, moment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.unlikeMoment = async (req, res) => {
    try {
        const moment = await Moment.findById(req.params.id);
        moment.likes = moment.likes.filter(id => id.toString() !== req.user._id.toString());
        await moment.save();
        res.status(200).json({ success: true, moment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.commentOnMoment = async (req, res) => {
    try {
        const { text } = req.body;
        const moment = await Moment.findById(req.params.id);
        moment.comments.push({
            user: req.user._id,
            text
        });
        await moment.save();
        res.status(200).json({ success: true, moment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
