const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models")
const bcrypt = require("bcryptjs");

passport.serializeUser(function (user, done) {
    // console.log("Serializer: ", user)
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    // console.log("Deserializer: ", user)
    done(null, user);
});

// Google strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/api/v1/google/callback",
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        return done(null, profile)
    }
))

// Facebook strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/api/v1/facebook/callback",
    profileFields: ['id', 'email', 'first_name', 'last_name']
}, function (accessToken, refreshToken, profile, done) {
    return done(null, profile._json)
}))

// Local strategy
passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" },
    function (email, password, done) {
        User.findOne({ where: { email } }).then(async (data) => {
            // console.log(data);
            if (!data) {
                return done(null, false);
            } else {
                let isPassMatched = await bcrypt.compareSync(password, data.password);

                if (!isPassMatched) {
                    return done(null, false)
                } else {
                    let user = {
                        id: data.id,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email
                    }
                    // console.log(user);
                    return done(null, user)
                }
            }
        }).catch((err) => {
            return done(err)
        })
    }
));