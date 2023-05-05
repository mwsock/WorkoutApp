const middlewareObj = {};

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.cookies.sessionId != undefined || req.cookies.sessionId != null){
        return next();
    }else{
        console.log('NOT LOGGED IN')
        res.redirect('/login');
    }
};

module.exports = middlewareObj;