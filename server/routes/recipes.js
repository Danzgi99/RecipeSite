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
router.get('/recipes', (req, res) => {
  db.query(
    //DESC damit es von neu zu alt ordered
    'SELECT * FROM recipes ORDER BY created DESC LIMIT 10;', (err, results) => {
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
router.get('/recipes', (req, res) => {
  db.query(
    // "%....%" == contains
    'SELECT * FROM recipes WHERE title LIKE "%'+req.body.search+'%" ORDER BY created DESC LIMIT 10;', (err, results) => {
        if (err) {
          throw err;
        } 
        return res.status(200).send({
          results
        });
      }
   );
});
  
module.exports = router;