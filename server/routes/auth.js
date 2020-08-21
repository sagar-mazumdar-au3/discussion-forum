const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

router.post('/register', async (req, res, next) => {
  const {
    name,
    email,
    password
  } = req.body;



  if (!name || !password ||!email) {
    res.status(400).send({
      error: 'Username, Email & Password Required',
    })
  } else {
    try {

      const emailExist = await UserModel.findOne({
        email
      })
      if (emailExist) return res.status(400).send({ error : 'email already exists'});

      const passwordHash = await bcrypt.hash(password, 10);

      const doc = new UserModel({
        name,
        email,
        passwordHash
      });
      await doc.save();

      res.status(200).send({
        name,
        email
      });

    } catch (error) {
      res.status(400).send({
        error: 'Username, Email & Password Required',
      });
    }
  }
});

router.post('/login', (req, res, next) => {
  
  passport.authenticate(
    'local', {
      session: false
    },
    (error, user) => {
      if (error) {
        res.status(400).json({
          error
        });
      } else if(!error && !user){
        res.status(400).json({
          error : "Email & Password Required"
        });
      } else {
        
      const payload = {
        name: user.name,
        email: user.email,
        expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS),
      };

      //  assigns payload to req.user 
      req.login(payload, {
        session: false
      }, (error) => {
        if (error) {
          res.status(400).send({
            error
          });
        }

        const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);

        res.status(200).send({
          name: user.name,
          email: user.email,
          token 
        });
      });
    }
    }
  )(req, res);
});

module.exports = router;