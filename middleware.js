const ExpressError = require('./utils/ExpressError');
const {campgroundSchema, reviewSchema } = require('./schema.js'); 
const Campground = require('./models/campground');
const Review = require('./models/review');




module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        // store the url they are trying to request
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first');
        return res.redirect('/login');
    }
    next();
}

module.exports.ValidateCampground = (req,res,next) =>{
   
    const { error } = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    
    } else{
        next();
    }
}

module.exports.isAuthor = async(req,res,next)=>{
    try{
        const {id} = req.params; 
        const campground =  await Campground.findById(id);
        if(!campground.author.equals(req.user._id)){
            req.flash('error', 'You do not have permission to do that!');
            return res.redirect(`/campgrounds/${id}`);
        }
        next();
    }catch(e){
        console.log('Something went wrong', e)
    }
    
}

module.exports.isReviewAuthor = async(req,res,next)=>{
    const {id, reviewId } = req.params; 
    const review =  await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.validateReview = (req,res,next)=>{
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    
    } else{
        next();
    }
}