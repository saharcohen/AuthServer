//loading things
var LocalStrategy = require('passport-local').Strategy;

//load up user model
var User = require ('../app/models/user');

//expose this function to our apps using module.exports
module.exports = function(passport){
    //passport session setup
    // required for persistent login sesssions
    // passport needs ability to serialize and unserialize users out of session

    passport.serializeUser(function(user,done){
        done(null,user.id);
    });
    passport.deserializeUser(function(id,done){
        User.findById(id, function(err,user){
            done(err,user);
        });
    });
    //Local Signup
    // we are using named strategies since we have one for login and one for signup
    // by default, if there is no name, it would just be called local

    passport.use('local-signup', new LocalStrategy({
        //by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to a callback
    },
        function(req,email,password,done){
             // asynchronous
            //User.findOne wont fire unless data is sent back
            process.nextTick(function(){
                // find a user whose email is the same as the forms email
                //we are checking to see if the suer trying to login already exists.
                User.findOne({'local.email' : email}, function(err,user){
                    if (err)
                        return done(err);
                    if(user){
                        // check if theres already a user with that email
                        return done(null,false,req.flash('signupMessage','that email is already taken'));
                    }
                    else{
                        // no user with that email
                        //create the user
                        var newUser = new User();
                        //set user credentials
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);

                        newUser.save(function(err){
                            if(err){
                                throw err;
                            }
                            return done(null,newUser);
                        });
                    }
                });
            });


    }));

    //Local Login
    passport.use('local-login', new LocalStrategy({

    }))
};