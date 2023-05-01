const middlewareObj = {};

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.cookies.user != undefined || req.cookies.user != null){
        return next();
    }
    console.log('NOT LOGGED IN')
    res.redirect('/login');
};

module.exports = middlewareObj;