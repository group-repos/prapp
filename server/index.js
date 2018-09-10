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

//Destructuring from .env
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

//Session Setup
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(sessionCtrl.create)



/////////////  Massive  /////////////
massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance);
    app.listen(SERVER_PORT, () => console.log(`Server running on port: ${SERVER_PORT}.`))
});

/***********************  ENDPOINTS  ***********************/

/////////////  user  /////////////

//Sends the user from the session to the front
app.get('/api/user', (req, res) => {
    res.status(200).send(req.session.user)
})

/////////////  recipes  /////////////

//Test endpoint that gets one recipe
app.get('/api/recipe', async (req, res) => {
    const dbInstance = req.app.get('db');
    let finalRecipe = [];
    let recipe = await dbInstance.get_recipe_test()
    let ingredients = await dbInstance.get_ingredient_test();
    let steps = await dbInstance.get_steps_test();
    finalRecipe = [...recipe, ingredients, steps]
    res.status(200).send(finalRecipe);
});

//Gets all recipes
app.get('/api/getrecipes', async (req, res) => {
    const dbInstance = req.app.get('db');
    let ingredients = await dbInstance.get_recipes_w_ingredients();
    let steps = await dbInstance.get_recipes_w_steps();
    let recipes = ingredients.map((e, i) => {
        if (e.r_id === steps[i].r_id) {
           e.steps = steps[i].steps
            return e;
        }
      })
    res.status(200).send(recipes);
})



