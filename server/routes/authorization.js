const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

//Datenbankverbung -- einbindung der datei
const db = require('../database/db.js');

//Middleware-Datei einbinden um den User zu checken (z.B. ob password eingeben wurde)
const userMiddleware = require('../middleware/users.js');


//Register-Route
//ausführen der middleware mittels usermiddleware.validateRegister
router.post('/register', userMiddleware.validateRegister, (req, res, next) => {
  db.query(
    //LOWER schreibt den username in Kleinbuchstaben 
    //db.escape zum Vermeiden von SQL Injection
    'SELECT * FROM users WHERE LOWER(username) = LOWER('+db.escape(req.body.username)+
    ') OR LOWER(email) = LOWER('+db.escape(req.body.email)+');',
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: 'Username or Email is already in use!'
        });
      } else {
        // username und email möglich -> pw hashen mit bcryptjs
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err
            });
          } else {
            // wenn pw gehashed insert in DB
            db.query(
              //uuid == Universally Unique Identifier
              'INSERT INTO users (id, username, email, password, registered) VALUES ('+uuid.v4()+','+db.escape(
                req.body.username)+','+db.escape(req.body.email)+','+ db.escape(hash)+','+ now()+')',
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err
                  });
                }
                return res.status(201).send({
                  //Statuscode 201 == created
                  msg: 'Registered!'
                });
              }
            );
          }
        });
      }
    }
  );
});

//Login-Route
router.post('/login', (req, res, next) => {});

router.get('/writeRecipe-route', (req, res, next) => {
  res.send('Only logged in users can write');
});


module.exports = router;