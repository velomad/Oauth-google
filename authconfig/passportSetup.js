const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/User");

// sending cookie to the client
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// recieve cookie from the client
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});


passport.use(
  new GoogleStrategy(
    {
      // options to be used in this strategy
      callbackURL: "/auth/google/redirect",
      clientID:
        "1011918131336-30t09m3ne9ick0apr9s2c39aamjv9oj8.apps.googleusercontent.com",
      clientSecret: "ywaIWuQozuHLPKBhLRl5J5JN",
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      console.log(profile)

      User.findOne({ googleId: profile.id })
        .then((currentUser) => {
          if (currentUser) {
            console.log(
              "current user is present and he is : " + currentUser.googleId
            );
            done(null, currentUser);
          } else {
            new User({
              username: profile.displayName,
              googleId: profile.id,
              profilePic:profile._json.picture
            })
              .save()
              .then((newUser) => console.log("new user created: " + newUser));
            done(null, newUser);
          }
        })
        .catch((err) => console.log(err));
    }
  )
);
