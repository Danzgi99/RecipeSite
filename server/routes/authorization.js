const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

//Datenbankverbung -- einbindung der datei
const db = require('../database/db.js');

//Middleware-Datei einbinden um den User zu checken (z.B. ob password eingeben wurde)
const userMiddleware = require('../middleware/users.js');

//Erstellen der Register und login Route
router.post('/register', (req, res, next) => {});

router.post('/login', (req, res, next) => {});

router.get('/writeRecipe-route', (req, res, next) => {
  res.send('Only logged in users can write');
});


module.exports = router;