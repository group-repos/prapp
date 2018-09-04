const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
require('dotenv').config();

//Controllers
const sessionCtrl = require('./controllers/session_controller');

const app = express();

//Middleware
app.use(bodyParser.json());

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

//Session Setup
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(sessionCtrl.create)



//Massive
massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance);
});

//Endpoints

//user
app.get('/api/user', (req, res) => {
    console.log(req.session.user);
})


app.listen(SERVER_PORT, () => console.log(`Server running on port: ${SERVER_PORT}.`))