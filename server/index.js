const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const firebase = require('firebase');
require('dotenv').config();

//Controllers
const sessionCtrl = require('./controllers/session_controller');

const app = express();

//Middleware
app.use(bodyParser.json());

//Destructuring from .env
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, FBASE_WEB_API_KEY, FBASE_AUTH_DOMAIN } = process.env;

//Firebase Configuration
var config = {
    apiKey: FBASE_WEB_API_KEY,
    authDomain: FBASE_AUTH_DOMAIN
}

// firebase.initializeApp(config);
// firebase.auth().useDeviceLanguage();

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
    app.listen(SERVER_PORT, () => console.log(`Server running on port: ${SERVER_PORT}.`))
});

// var googleProvider = new firebase.auth.GoogleAuthProvider();

// module.exports = {
//     auth: firebase.auth(),
//     googleProvider: new firebase.auth.GoogleAuthProvider(),
// }

//Endpoints

//Google Auth Sign In
app.get('/api/googleauth', (req, res) => {
    firebase.auth().signInWithPopup(googleProvider)
        .then(result => {
            // This gives you a Google Access Token. You can use it to access the Google API
            let token = result.credential.accessToken;
            console.log(token);
            // The signed-in user info.
            var user = result.user;
            console.log('user', user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(err);
        })
});

//user
app.get('/api/user', (req, res) => {
    res.status(200).send(req.session.user)
})

//recipes
app.get('/api/recipes', async (req, res) => {
    const dbInstance = req.app.get('db');
    let finalRecipe = [];
    let recipe = await dbInstance.get_recipe_test()
    let ingredients = await dbInstance.get_ingredient_test();
    let steps = await dbInstance.get_steps_test();
    finalRecipe = [...recipe, ingredients, steps]
    res.status(200).send(finalRecipe);
})

