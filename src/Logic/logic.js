// const axios = require('axios');

const logic = {
    // getRecipe(r_id){
    //    return axios.post('/api/recipe', {r_id:r_id})
    // },
    //Spencer's Logic
    getUserId(id){
        return id ? true : false
    },
    getUserEmail(email){
        return email ? true : false
    },
    getUserFirstName(firstName){
        return firstName ? true : false
    },
    getUserLastName(lastName){
        return lastName ? true : false
    },
    getUserPic(pic){
        return pic ? true : false
    },
    //Dylan's Logic
    getRecipe(recipe) {
        return recipe ? true: false;
    },
    getRecipeId(r_id) {
        return r_id ? true: false;
    },
    getRecipeName(r_name) {
        return r_name ? true: false;
    },
    getRecipeDescription(r_description){
        return r_description ? true: false;
    },
    getRecipeServings(servings){
        return servings ? true: false
    },
    //Tim's Logic
    getNewRecipe(newRecipe){
        return newRecipe ? true: false
    },
    getNewRecipeId(r_id){
        return r_id ? true: false;
    },
    getNewRecipeName(r_name) {
        return r_name ? true: false;
    },
    getNewRecipeDescription(r_description){
        return r_description ? true: false;
    },
    getNewRecipeServings(servings){
        return servings ? true: false
    }
 }
 
 module.exports = logic