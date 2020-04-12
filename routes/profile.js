const express = require("express");
const router = express.Router();

// auth check middleware
const isAuth = (req, res, next) => {
  if (!req.user) {
    res.status(200).json({
        msg:'Logged out'
    })
  } else {
    next();
  }
};

// profile page
router.get("/", isAuth, (req, res) => {
  res.status(200).json({
    msg: "logged in as " + req.user.username,
    profile: req.user.profilePic
  });
});

module.exports = router;
