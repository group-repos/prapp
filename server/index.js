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
    let ingredients = await dbInstance.get_recipes_w_ingredients();
    let steps = await dbInstance.get_recipes_w_steps();
    steps.forEach(e => {
        e.steps.reverse();
    })
    let recipes = ingredients.map((e, i) => {
        if (e.r_id === steps[i].r_id) {
           e.steps = steps[i].steps
            return e;
        }
    })
    res.status(200).send(recipes);
})



