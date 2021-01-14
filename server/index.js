const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

// set up port
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

// add routes
const router = require('./routes/authorization.js');
app.use('/api', router);

// run server
app.listen(port, () => console.log('Server running on port http://localhost:'+port));