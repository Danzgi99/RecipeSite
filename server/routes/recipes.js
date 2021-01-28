const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

//Datenbankverbung -- einbindung der datei
const db = require('../database/db.js');

//Middleware-Datei einbinden 
const recipeMiddleware = require('../middleware/recipe.js');

router.post('/writerecipe',recipeMiddleware.validateRecipe, (req, res, next) => {
  db.query(
    'INSERT INTO recipes(userID, title, incredients, howtocook, created) VALUES ('+db.escape(req.body.userID)+','
    +db.escape(req.body.title)+','+ db.escape(req.body.incredients)+','+ db.escape(req.body.howtocook)+', NOW())',
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
    // "%....%" == contains
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
  
module.exports = router;