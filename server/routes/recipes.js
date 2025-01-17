const express = require('express');
const router = express.Router();

//Datenbankverbung -- einbindung der datei
const db = require('../database/db.js');

//Middleware-Datei einbinden 
const recipeMiddleware = require('../middleware/recipe.js');

router.post('/writerecipe',recipeMiddleware.validateRecipe, (req, res, next) => {
  db.query(
    'INSERT INTO recipes(userID, title, incredients, howtocook, created, likes) VALUES ('+db.escape(req.body.userID)+','
    +db.escape(req.body.title)+','+ db.escape(req.body.incredients)+','+ db.escape(req.body.howtocook)+', NOW(), 0);',
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
        msg: err
        });
      }
      return res.status(201).send({
        //Statuscode 201 == created
        msg: 'CREATED!'
        });
    }
  );
});

//getrecipe
//alle Recipes uebergeben --- bei VIELEN Rezepten so machen das immer nur bestimmte Anzahl uebergeben wird
router.get('/recipes', (req, res) => {
  db.query(
    //DESC damit es von neu zu alt ordered
    'SELECT * FROM recipes ORDER BY created DESC;', (err, results) => {
        if (err) {
          throw err;
        } 
        //uebergabe der recipes
        return res.status(200).send({
          results
        });
      }
   );
});

//searchrecipe wo title beinhaltet......
//post weil GET request should not have a body
router.post('/searchrecipes', (req, res) => {
  db.query(
    // "%....%" == contains
    'SELECT * FROM recipes WHERE title LIKE "%'+req.body.search+'%" ORDER BY created DESC;', (err, results) => {
        if (err) {
          throw err;
        } 
        if (!results.length) {
          return res.status(401).send({
            msg: 'Nothing found'
         });
        }
        return res.status(200).send({
          results
        });
      }
   );
});

//recipes of currentuser
router.post('/userrecipes', (req, res) => {
  db.query(
    // "%....%" == contains
    'SELECT * FROM recipes WHERE userID LIKE '+req.body.userID+' ORDER BY created DESC;', (err, results) => {
        if (err) {
          throw err;
        } 
        if (!results.length) {
          return res.status(401).send({
            msg: 'Nothing found'
         });
        }
        return res.status(200).send({
          results
        });
      }
   );
});
//delete by recipeID
router.post('/deleterecipes', (req, res) => {
  db.query(
    'DELETE FROM recipes WHERE recipeID LIKE '+req.body.recipeID+';', (err) => {
        if (err) {
          throw err;
        } else {
          return res.send({
            msg: 'Deleted'
          });
        }  
      }
   );
});

//like
router.post('/addLike', (req, res, next) => {
  db.query(
    'INSERT INTO liketable(rID, uID) VALUES ('+db.escape(req.body.recipeID)+','+db.escape(req.body.userID)+');',
    (err) => {
      db.query(
        'UPDATE recipes SET likes = likes + 1 WHERE recipeID = '+db.escape(req.body.recipeID)+';',
        (err) => {
          if (err) {
            throw err;
          }
          return res.status(201).send({
            msg: 'LIKED'
            });
        }
      );
    }
  );
});

//unlike
router.post('/deleteLike', (req, res, next) => {
  db.query(
    'DELETE FROM liketable WHERE rID = "'+db.escape(req.body.recipeID)+'" AND uID = "'+db.escape(req.body.userID)+'";',
    (err) => {
      db.query(
        'UPDATE recipes SET likes = likes - 1 WHERE recipeID = '+db.escape(req.body.recipeID)+';',
        (err) => {
          if (err) {
            throw err;
          }
          return res.status(201).send({
            msg: 'UNLIKED'
            });
        }
      );
    }
  );
});

//vom User gelikede RecipeIDs uebergeben
router.post('/getlikedRecipe', (req, res) => {
  db.query(
    'SELECT rID FROM liketable WHERE uID LIKE '+req.body.userID+';', (err, results) => {
        if (err) {
          throw err;
        } 
        if (!results.length) {
          return res.status(401).send({
            msg: 'No likes'
         });
        }
        return res.status(200).send({
          results
        });
      }
   );
});

module.exports = router;