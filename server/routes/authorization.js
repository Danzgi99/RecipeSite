const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

//Datenbankverbung -- einbindung der datei
const db = require('../database/db.js');

//Middleware-Datei einbinden um den User zu checken (z.B. ob password eingeben wurde)
const userMiddleware = require('../middleware/users.js');

const nodemailer = require('nodemailer');

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
              'INSERT INTO users (username, email, password, registered, loggedIn) VALUES ('+db.escape(
                req.body.username)+','+db.escape(req.body.email)+','+ db.escape(hash)+', NOW(), NOW())',
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
router.post('/login', (req, res, next) => {
  db.query(
    'SELECT * FROM users WHERE username = '+db.escape(req.body.username)+';',
    (err, result) => {
      //user does not exist
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: 'Username or password is incorrect!'
        });
      }
      //check des verschlüsselten password
      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          //password false
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: 'Username or password is incorrect!'
            });
          }
          if (bResult) {
            //speichern der Werte in Token
            const token = jwt.sign({
                username: result[0].username,
                userId: result[0].idUser
              },
              'SECRETKEY', {
                //gültigkeit des keys mit dem token generiert wird
                expiresIn: '1d'
              }
            );
            db.query(
              'UPDATE users SET loggedIn = NOW() WHERE idUser = '+result[0].idUser+';'
            );
            return res.status(200).send({
              msg: 'Logged in!',
              token,
              user: result[0]
            });
          }
          return res.status(401).send({
            msg: 'Username or password is incorrect!'
          });
        }
      );
    }
  );
});

module.exports = router;