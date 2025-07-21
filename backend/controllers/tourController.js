const Tour = require('../models/Tour');
const User = require('../models/User');

exports.createTour = async (req, res) => {
    const { title, description, category, location, pricePerPerson } = req.body;
    const image = req.file ? req.file.path : null;

    try {
        if (!image) {
            return res.status(400).json({ message: 'Image is required' });
        }

        const tourExist = await Tour.findOne({ title, location });
        if (tourExist) {
            return res.status(400).json({ message: 'Tour already exists' });
        }

        const tour = await Tour.create({
            title,
            description,
            category,
            location,
            pricePerPerson,
            image,
        });

        res.status(201).json({
            message: 'Tour created successfully',
            tour,
        });
    } catch (error) {
        console.error('Error creating tour:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.getAllTours = async (req, res) => {
    try {
        const category = req.query.category;

        let query = {};
        if (category) {
            query.category = category;
        }

        const tours = await Tour.find(query);

        // const toursWithFullImageUrl = tours.map(tour => ({
        //     ...tour._doc,
        //     image: tour.image ? `${process.env.REACT_APP_BACKEND_URL}/${tour.image}` : null
        // }));

        res.status(200).json({
            // count: toursWithFullImageUrl.length,
            // tours: toursWithFullImageUrl,
            tours
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//! Uncomment this after everything is working
// exports.getTourById = async (req, res) => {
//     try {
//         const tourWithReviews = await Tour.findById(req.params.id).populate('reviews');

//         if (!tourWithReviews) {
//             return res.status(404).json({ message: 'Tour not found' });
//         }

//         res.status(200).json(tourWithReviews);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

exports.updateTour = async (req, res) => {
    const { title, description, category, location, pricePerPerson } = req.body;
    const image = req.file ? req.file.path : null;

    try {
        const tour = await Tour.findById(req.params.id);

        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }

        tour.title = title || tour.title;
        tour.description = description || tour.description;
        tour.category = category || tour.category;
        tour.location = location || tour.location;
        tour.pricePerPerson = pricePerPerson || tour.pricePerPerson;
        if (image) {
            tour.image = image;
        }

        await tour.save();

        res.status(200).json({
            message: 'Tour updated successfully',
            tour,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTourById = async (req, res) => {
    try {
        const { id } = req.params;

        const tour = await Tour.findById(id).populate('reviews');

        if (!tour) {
            return res.status(404).json({ message: 'Tour not found.' });
        }

        res.status(200).json({ message: 'Tour retrieved successfully.', tour });
    } catch (error) {
        console.error('Error fetching tour:', error.message);
        res.status(500).json({ message: 'Error fetching the tour.', error: error.message });
    }
};

exports.deleteTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndDelete(req.params.id);

        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }


        res.status(200).json({
            message: 'Tour deleted successfully',
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.searchTours = async (req, res) => {
    const { query } = req.query;
    try {
        const tours = await Tour.find({
            $or: [
                { title: new RegExp(query, 'i') },
                { location: new RegExp(query, 'i') },
                { category: new RegExp(query, 'i') }
            ]
        });
        res.status(200).json(tours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAdventureTours = async (req, res) => {
    try {
        const tours = await Tour.find({ category: 'adventure' , status: { $ne: 'banned' } });
        res.status(200).json({ success: true, data: tours });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getReligiousTours = async (req, res) => {
    try {
        const tours = await Tour.find({ category: 'religious' , status: { $ne: 'banned' } });
        res.status(200).json({ success: true, data: tours });
    } catch (error) {
        res.status (500).json({ success: false, message: error.message });
    }
};

exports.getHistoricalTours = async (req, res) => {
    try {
        const tours = await Tour.find({ category: 'historical & cultural', status: { $ne: 'banned' } });
        res.status(200).json({ success: true, data: tours });
    } catch (error) {
        res.status (500).json({ success: false, message: error.message });
    }
};

exports.getRomanticTours = async (req, res) => {
    try {
        const tours = await Tour.find({ category: 'romantic' , status: { $ne: 'banned' } });
        res.status(200).json({ success: true, data: tours });
    } catch (error) {
        res.status (500).json({ success: false, message: error.message });
    }
};

// Ban a tour (set status to banned)
exports.banTour = async (req, res) => {
    try {
        const { id } = req.params;
        const tour = await Tour.findById(id);

        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }

        // Set the tour status to banned
        tour.status = 'banned';
        await tour.save();

        res.status(200).json({ message: 'Tour has been banned successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error banning the tour', error: error.message });
    }
};

// Unban a tour (set status to active)
exports.unbanTour = async (req, res) => {
    try {
        const { id } = req.params;
        const tour = await Tour.findById(id);

        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }

        // Set the tour status to active
        tour.status = 'active';
        await tour.save();

        res.status(200).json({ message: 'Tour has been unbanned and is now visible' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error unbanning the tour', error: error.message });
    }
};
