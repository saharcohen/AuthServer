module.exports = function(app,passport){
    // Home Page (With login links)
    app.get('/', function(req,res){
        res.render('index.ejs'); // load the index.ejs file
    });

    // Login Form
    app.get('/login', function(req,res){
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', {message: req.flash('loginMessage')})
    });

    // process the login form
    // app.post('/login',do all our passport stuff here);

    // Signup page
    // show the signup form

    app.get('/signup',function(req,res){
        //render the page and pass in any flash data if it exists
        res.render('signup.ejs', {message: req.flash('signupMessage')})
    });

    //process the signup page
    app.post('/signup',passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true
    }));
    //login form process
    app.post('/login',passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true
    }));
    // Profile Section
    // protected - have to login to see this
    // use remote middlewaree to verify

    app.get('/profile', isLoggedIn, function(req,res){
        res.render('profile.ejs',{
            user: req.user // get the user out of session and pass to template
        });
    });

    // Logout
    app.get('/logout', function(req,res){
        req.logout();
        res.redirect('/');
    });

};

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}