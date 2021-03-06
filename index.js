const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const env = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandlers = require('./handlers/errorHandlers');
const routes = require('./routes/routes')(router);

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

app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/client/dist`));
app.use('/api', routes);

app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/dist/index.html`));
});

if (app.get('env') === 'development') {
    app.use(errorHandlers.developmentErrors);
} else {
    app.use(errorHandlers.productionErrors);
}

app.listen(8080, () => {
    console.log('👌 👌 👌 listening on port 8080');
});