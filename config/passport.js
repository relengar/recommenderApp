const localStrategy = require('passport-local');
const userController = require('../db/controllers').user;
const bcrypt = require('bcryptjs');

// verify if password has required length and includes numbers, just to annoy users
let validPassword = (passw) => {
  let hasNum = false;
  for (let i = 0; i < passw.length; i++) {
    if (!isNaN(parseInt(passw[i]))) {
      hasNum = true;
    }
  }
  let valid = passw.length > 5 && hasNum;
  return valid;
};

passport.use('login', new localStrategy(
  {
    passReqToCallback: true,
    usernameField: 'name'
  },
  (req, username, password, done) => {
    userController.getByName(req)
    .then((user) => {
      if (!user) {
        done(null, false, {message: "User not found"});
      }
      else if (validPassword(password) && bcrypt.compareSync(password, user.password)) {
        done(null, user);
      }
      else {
        done(null, false, {message: "Invalid password"});
      }
    })
    .catch((err) => {done(err);});
  }
));

passport.use('register', new localStrategy(
  {
    passReqToCallback: true,
    usernameField: 'name'
  },
  (req, username, password, done) => {
    userController.getByName(req)
    .then((user) => {
      if (user) {
        done(null, false, {message: 'user name is already taken'});
      }
      else {
        if (validPassword(password)) {
          let hash = bcrypt.hashSync(req.body.password, 8);
          req.body.password = hash;
          console.log("so")
          userController.create(req)
          .then((user) => {done(null, user)})
          .catch((err) => {done(err);});
        }
        else {
          done(null, false, {message: "Invalid password"});
        }
      }
    })
    .catch((err) => {done(err);});
  }
));



passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser((id, done) => {
  User.findById(id)
  .then((user) => {
    done(null, user);
  })
  .catch((err) => {done(err)});
});
