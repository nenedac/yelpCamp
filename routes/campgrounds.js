const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const campgrounds = require('../controllers/campgrounds');

const Campground = require('../models/campground');

//CAMPGROUNDS INDEX
router.get('/', catchAsync(campgrounds.index));

//NEW CAMPGROUND
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

//CAMPGROUND POST NEW SITE
router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

//SHOW CAMPGROUND AND POPULATE REVIEWS
router.get('/:id', catchAsync(campgrounds.showCampground));

//GET EDIT FORM
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

// EDIT AND UPDATE
router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground));

//DELETE CAMPGROUND
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;