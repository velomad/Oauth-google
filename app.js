const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const passportSetup = require("./authconfig/passportSetup");
const cookieSession = require("cookie-session");
const passport = require("passport");

// defining port
const PORT = process.env.PORT || 3000;

// setting mmiddlewares
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["sagarchavan"],
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// adding routes
const auth = require("./routes/auth");
const profile = require("./routes/profile");

app.use("/auth", auth);
app.use("/profile", profile);

// setting up mongo server
mongoose
  .connect("mongodb://localhost:27017/oauth-test-application", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(err));

// listning to port
app.listen(PORT, () => {
  console.log("connected to PORT : " + PORT);
});
