const express = require('express')
const Theatre = require('../models/theatre.model.js');
const isAuth = require('../middleware/authmiddleware.js');
const { requirePartnerOrAdmin } = require('../middleware/rolemiddleware.js');

const theatreRouter = express.Router();

theatreRouter.post('/add-theatre', isAuth, requirePartnerOrAdmin, async (req, res) => {
    try{
        console.log("Received theatre data:", req.body);
        // Security: Partners can only add theatres with themselves as owner
        if (req.user.role === 'partner') {
            req.body.owner = req.userId;
        }
        const newTheatre = new Theatre(req.body);
        const savedTheatre = await newTheatre.save();
        console.log("Saved theatre:", savedTheatre);
        res.send({
            success: true,
            message: "New theatre has been added!",
            data: savedTheatre
        })
    }catch(err){
        console.error("Error adding theatre:", err);
        res.send({
            success: false,
            message: err.message
        })
    }
});

// Get all theatres for Admin route
theatreRouter.get('/get-all-theatres',isAuth, requirePartnerOrAdmin, async (req, res) => {
    try {
        const allTheatres = await Theatre.find();
        res.send({
            success: true,
            message: "All theatres fetched!",
            data: allTheatres
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        });
    }
});

// Get the theatres of a specific owner
theatreRouter.post('/get-all-theatres-by-owner',isAuth, async (req, res) => {
    try {
        console.log("Getting theatres for owner:", req.body.owner);
        const allTheatres = await Theatre.find({ owner: req.body.owner });
        console.log("Found theatres:", allTheatres.length);
        res.send({
            success: true,
            message: "All theatres fetched successfully!",
            data: allTheatres
        })
    } catch (err) {
        console.error("Error fetching theatres by owner:", err);
        res.send({
            success: false,
            message: err.message
        })
    }
});


// Update theatre
theatreRouter.put('/update-theatre', isAuth, requirePartnerOrAdmin, async (req, res) => {
    try{
        const theatre = await Theatre.findById(req.body.theatreId);
        if (!theatre) {
            return res.send({
                success: false,
                message: "Theatre not found"
            });
        }
        
        // Security: Partners can only update their own theatres
        if (req.user.role === 'partner' && theatre.owner.toString() !== req.userId) {
            return res.send({
                success: false,
                message: "Access denied. You can only update your own theatres."
            });
        }
        
        await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
        // console.log(req.body.theatreId)
        res.send({
            success: true,
            message: "Theatre has been updated!"
        })
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
})

// Delete theatre
theatreRouter.put('/delete-theatre', isAuth, requirePartnerOrAdmin, async (req, res) => {
    try{
        const theatre = await Theatre.findById(req.body.theatreId);
        if (!theatre) {
            return res.send({
                success: false,
                message: "Theatre not found"
            });
        }
        
        // Security: Partners can only delete their own theatres
        if (req.user.role === 'partner' && theatre.owner.toString() !== req.userId) {
            return res.send({
                success: false,
                message: "Access denied. You can only delete your own theatres."
            });
        }
        
        await Theatre.findByIdAndDelete(req.body.theatreId);
        res.send({
            success: true,
            message: "The theatre has been deleted!"
        })
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
});



module.exports = theatreRouter;