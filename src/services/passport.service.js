const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models")
const bcrypt = require("bcryptjs");

passport.serializeUser(function (user, done) {
    // console.log("Serializer: ", user.id)
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    // console.log("Deserializer: ", id)
    done(null, id);
});

// Google strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/google/callback",
    passReqToCallback: true
},
    function (req, accessToken, refreshToken, profile, done) {
        console.log("PassportService-Google(profile)", profile)
        console.log("PassportService-Google(profile._json)", profile._json)

        User.findOne({ where: { email: profile._json.email } }).then(async user => {
            // console.log(user);

            if (user === null) {
                let body = {
                    firstName: profile._json.given_name,
                    lastName: profile._json.family_name,
                    email: profile._json.email,
                    isVerified: true,
                    googleId: profile._json.id
                }
                await User.create(body).then((newUser) => {
                    console.log(newUser);
                    return done(null, newUser)
                })
            } else {
                user.googleId = profile._json.id;
                user.isVerified = true
                await user.save()
                return done(null, user)
            }
        }).catch((err) => {
            // console.log(err);
            return done(err)
        })
    }
))

// Facebook strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/facebook/callback",
    profileFields: ['id', 'email', 'first_name', 'last_name'],
    passReqToCallback: true
}, function (req, accessToken, refreshToken, profile, done) {
    console.log("PassportService-facebook(profile)", profile)
    console.log("PassportService-facebook(profile._json)", profile._json)

    User.findOne({ where: { email: profile._json.email } }).then(async user => {
        console.log(user);

        if (user === null) {
            let body = {
                firstName: profile._json.first_name,
                lastName: profile._json.last_name,
                email: profile._json.email,
                isVerified: true,
                facebookId: profile._json.id
            }
            await User.create(body).then((newUser) => {
                console.log(newUser);
                return done(null, newUser)
            })
        } else {
            user.facebookId = profile._json.id;
            user.isVerified = true
            await user.save()
            return done(null, user)
        }
    }).catch((err) => {
        // console.log(err);
        return done(err)
    })
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
                    console.log("PassportService-local(user)", data)
                    return done(null, data)
                }
            }
        }).catch((err) => {
            return done(err)
        })
    }
));