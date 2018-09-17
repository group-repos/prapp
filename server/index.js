const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const AWS = require('aws-sdk');
require('dotenv').config();

//Controllers
const sessionCtrl = require('./controllers/session_controller');

const app = express();

//Destructuring from .env
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_BUCKET} = process.env;

/////////////  AWS Setup  /////////////
AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION
})

const S3 = new AWS.S3();

//Middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));



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

/////////////  Amazon S3  /////////////
app.post('/api/s3', (req, res) => {
    const photo = req.body;

    const buf = new Buffer(photo.file.replace(/^data:image\/\w+;base64,/, ''), 'base64');

    const params = {
        Bucket: AWS_BUCKET,
        Body: buf,
        Key: photo.filename,
        ContentType: photo.filetype,
        ACL: 'public-read'
    };

    S3.upload(params, (err, data) => {
        let response, code;
        if (err) {
            response = err;
            code = 500;
        } else {
            response = data;
            code = 200;
        }

        res.status(code).send(response);
    });
});

/////////////  user  /////////////

//Sends the user from the session to the front
app.get('/api/user', (req, res) => {
    res.status(200).send(req.session.user)
})

app.post('/api/user', async (req, res) => {
    const dbInstance = req.app.get('db');
    const { user } = req.body;
    // console.log(user);
    let foundUser = await dbInstance.find_user([user.auth_id])
    if (foundUser[0]) {
        req.session.user = foundUser[0];
        res.status(200).send(req.session.user);
    } else {
        let createdUser = await dbInstance.create_user([user.first_name, user.last_name, user.profile_pic, user.email, user.auth_id])
        req.session.user = createdUser[0];
    }
});

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
    let recipes = await dbInstance.get_all_recipes();
    res.status(200).send(recipes);
    // console.log(recipes);
    // let ingredients = await dbInstance.get_recipes_w_ingredients();
    // console.log(ingredients);
    // let newRecipes = await recipes.map(e => e.r_id);
    // console.log('newRecipes: ', newRecipes);

    // recipes.map((recipe, i) => {
    //     let index = ingredients.findIndex()
    //     if (recipe.r_id === ingredients[i].r_id) {
    //         recipe.ingredients = ingredients.ingredients;
    //         return recipe;
    //     }
    // })
    // let steps = await dbInstance.get_recipes_w_steps();
    // steps.forEach(e => {
    //     e.steps.reverse();
    // })
    // let allRecipes = ingredients.map((e, i) => {
    //     if (e.r_id === steps[i].r_id) {
    //         e.steps = steps[i].steps
    //         return e;
    //     }
    // })
})

//Gets ingredients from one recipe
app.post('/api/ingredients', (req, res) => {
    const dbInstance = req.app.get('db');
    dbInstance.get_ingredients_for_one_recipe([req.body.r_id])
        .then(ingredients => {
            res.status(200).send(ingredients);
        })
        .catch(err => {
            console.log(err)
            res.status(500).send("It didn't work.");
        })
})

//Gets steps from one recipe
app.post('/api/steps/', (req, res) => {
    const dbInstance = req.app.get('db');
    dbInstance.get_steps_for_one_recipe([req.body.r_id])
        .then(steps => {
            res.status(200).send(steps);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("It didn't work.")
        })
})

//Adds a Recipe to the Recipes table
app.post('/api/recipes', (req, res) => {
    const dbInstance = req.app.get('db');
    const {u_id, servings, r_name, r_pics, r_description} = req.body;
    dbInstance.add_recipe([u_id, servings, r_name, r_pics, r_description])
        .then(recipe => {
            res.status(200).send(recipe);
        })
        .catch(err => {
            console.log(err);
            res.status(200).send('Unable to add recipe');
        })
});

//Adds an ingredient to the ingredients table.
app.post('/api/ingredient', (req, res) => {
    const dbInstance = req.app.get('db');
    const { r_id, ingredient, quantity, unit } = req.body;
    dbInstance.add_ingredient([r_id, ingredient, quantity, unit])
        .then(res.sendStatus(200))
        .catch(err => {
            console.log(err);
            res.status(500).send('Unable to add ingredient');
        });
})

//Adds a step to the steps table.
app.post('/api/step', (req, res) => {
    const dbInstance = req.app.get('db');
    const { r_id, step, description } = req.body;
    dbInstance.add_step([r_id, step, description])
        .then(res.sendStatus(200))
        .catch(err => {
            console.log(err);
            res.status(500).send('Unable to add step');
        })
})

//Adds weekly recipe string to DB
app.post('/api/weeklyrecipe', async (req, res) => {
    const dbInstance = req.app.get('db');
    if (req.session.user.u_id) {
        let singleStringify = await JSON.stringify(req.body.weekly_string);
        let doubleStringify = await JSON.stringify(singleStringify);
        let weeklyPlan = await dbInstance.get_weekly_recipes([req.session.user.u_id]);
        if (weeklyPlan[0]) {
            let updatedPlan = await dbInstance.update_weekly_plan([req.session.user.u_id, doubleStringify])
            let singleParse = await JSON.parse(updatedPlan[0].recipes)
            res.status(200).send(singleParse);
        } else {
            let returnString = await dbInstance.add_weekly_recipe([req.session.user.u_id, doubleStringify])
            let singleParse = await JSON.parse(returnString[0].recipes);
            // console.log(singleParse);   
            res.status(200).send(singleParse);
        }
        
    } else {
        res.status(403).send('Please sign in to add a weekly plan.')
    }
    
})

//Gets a weekly recipe and then parses it into an array
app.post('/api/weeklyplan', async (req, res) => {
    const dbInstance = req.app.get('db');
    let recipeString = await dbInstance.get_weekly_recipes([req.body.u_id]);
    if (recipeString[0]) {
        let parsedString = await JSON.parse(recipeString[0].recipes);
        res.status(200).send(parsedString);
    } else {
        let weeklyDefault = [
            {day:'Monday',recipes:[]},
            {day:'Tuesday',recipes:[]},
            {day:'Wednesday',recipes:[]},
            {day:'Thursday',recipes:[]},
            {day:'Friday',recipes:[]},
            {day:'Saturday',recipes:[]},
            {day:'Sunday',recipes:[]}
        ]
        res.status(200).send(weeklyDefault);
    }
})




