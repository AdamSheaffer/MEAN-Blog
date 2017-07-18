const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');
const path = require('path')

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

app.use(express.static(`${__dirname}/client/dist`));

app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/dist/index.html`));
});

app.listen(8080, () => {
    console.log('⚡⚡⚡ listening on port 8080');
});