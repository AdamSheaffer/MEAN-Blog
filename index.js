const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const env = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const authentication = require('./routes/authentication')(router);

env.config({
    path: 'variables.env'
});

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, (err) => {
    if (err) {
        console.log(`❌ ❌ ❌ Could NOT connect to database: ${err}`);
    } else {
        console.log('💻 💻 💻 Connected to database');
    }
});

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/client/dist`));
app.use('/authentication', authentication);

app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/dist/index.html`));
});

app.listen(8080, () => {
    console.log('👌 👌 👌 listening on port 8080');
});