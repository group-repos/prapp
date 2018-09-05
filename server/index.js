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


app.listen(SERVER_PORT, () => console.log(`Server running on port: ${SERVER_PORT}.`))