const router = require("express").Router();
const passport = require("passport");
const utils = require("../lib/utils");
const User = require("../models/user");

// TODO
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    return res.sendStatus(200);
  }
);

// TODO
router.post("/login", function (req, res, next) {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user)
        return res.status(404).json({ message: "username/password incorrect" });
      const validPassword = utils.validPassword(
        req.body.password,
        user.hash,
        user.salt
      );
      if (!validPassword)
        return res.status(404).json({ message: "username/password incorrect" });
      const jwt = utils.issueJWT(user);
      return res.json({ user, token: jwt.token });
    })
    .catch((err) => {
      return res.status(500).json({ message: err?.message });
    });
});

// TODO
router.post("/register", function (req, res, next) {
  const hashSalt = utils.genPassword(req.body.password);
  User.create({
    username: req.body.username,
    ...hashSalt,
  })
    .then((user) => {
      const jwt = utils.issueJWT(user);
      return res.status(201).json({ user, token: jwt.token });
    })
    .catch((err) => {
      return res.status(500).json({ message: err?.message });
    });
});

module.exports = router;
