const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy; // Corrected module name

passport.serializeUser((user , done) => {
  done(null , user);
})
passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true,
  }, 
  function(request, accessToken, refreshToken, profile, done) {
    console.log('req:',request);
    console.log('access:',accessToken);
    console.log('referesh:',refreshToken);
    console.log('profile:',profile);
    return done(null, profile);
  })
);

