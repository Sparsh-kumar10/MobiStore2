module.exports=(req,res,next)=>{
    if(!req.session.isLoggedIn){
        return res.redirect('/admin/user/login')
    }
    next();
}