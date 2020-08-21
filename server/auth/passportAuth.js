const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const bcrypt = require('bcrypt');

const UserModel = require('../models/user');

passport.use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
}, async (email, password, done) => {
 
  try {
    const userDocument = await UserModel.findOne({email : email});
    
    if (!userDocument) {
        return done('Incorrect Email / Password');
    }

    const ispPasswordMatch = await bcrypt.compare(password, userDocument.passwordHash);

    if (ispPasswordMatch) {
      return done(null, userDocument);
    } else {
      return done('Incorrect Email / Password');
    }
  } catch (error) {
    done(error);
  }
}));

passport.use(new JWTStrategy({
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderWithScheme('jwt-token'),
    secretOrKey: process.env.JWT_SECRET,
  },
  (jwtPayload, done) => {
    if (Date.now() > jwtPayload.expires) {
      return done('jwt expired');
    }

    return done(null, jwtPayload);
  }
));