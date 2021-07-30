const User = require('../models/user');

module.exports.renderRegister = (req,res)=>{
    res.render('users/register');
}

module.exports.register = async(req,res,next)=>{
    try{
        const {username,email,password} = req.body;
        const user = new User({email,username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err=>{
            if(err) return next(err);
            req.flash('success', 'Welcome to yelpcamp');
            res.redirect('/campgrounds');
        })
        
    } catch(e){
          req.flash('error', e.message);
          res.redirect('/register');
    }
     
}

module.exports.renderLogin = (req,res)=>{
    res.render('users/login');
}

module.exports.Login = (req,res)=>{
    req.flash('success', 'Welcome Back!');
    const redirectedUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectedUrl);
}

module.exports.logout = (req,res)=>{
    req.logout();
    req.flash('success', 'Successfully logged you out!');
    res.redirect('/campgrounds');
}