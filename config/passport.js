const fs = require("fs");
const passport = require("passport");
const path = require("path");
const User = require("../models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const pathToKey = path.join(__dirname, "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

// TODO
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

const verify = (payload, cb) => {
  User.findById(payload.sub)
    .then((user) => {
      return user ? cb(null, user) : cb(null, false);
    })
    .catch((err) => {
      cb(err, null);
    });
};

const jwtStrategy = new JwtStrategy(options, verify);

passport.use(jwtStrategy);
