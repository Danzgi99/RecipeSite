var validator = require('email-validator');

module.exports = {
    //Register-Checks von User
    validateRegister: (req, res, next) => {
      // username min length 5
      if (!req.body.username || req.body.username.length < 5) {
        return res.status(400).send({
          msg: 'Please enter a username with min. 3 chars'
        });
      }

       // validate email
      if (!req.body.email || !validator.validate(req.body.email)) {
        return res.status(400).send({
          msg: "Please enter a valid email address",
        });
      }
  
      // password min 8 chars
      if (!req.body.password || req.body.password.length < 8) {
        return res.status(400).send({
          msg: 'Please enter a password with min. 8 chars'
        });
      }
  
      // password-check passt nicht
      if (
        !req.body.password_repeat ||
        req.body.password != req.body.password_repeat
      ) {
        return res.status(400).send({
          msg: 'Not the same password'
        });
      }
  
      next();
    }
  };