module.exports = {
    //Register-Checks von User
    validateRecipe: (req, res, next) => {
      //userId vorhadnen
      if (!req.body.userID) {
        return res.status(400).send({
          msg: 'Please check if you are logged in!'
      });
      }
        // title min length 5
      if (!req.body.title || req.body.title.length < 5) {
        return res.status(400).send({
          msg: 'Please enter a title with min. 5 chars'
        });
      }
  
      // incredients nicht empty
      if (!req.body.incredients) {
        return res.status(400).send({
          msg: 'Please enter some incredients'
        });
      }

      // howtocook nicht empty
      if (!req.body.howtocook) {
        return res.status(400).send({
          msg: 'Please enter howtocook this recipe'
        });
      }
  
      next();
    },

  };