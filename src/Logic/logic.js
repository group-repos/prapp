const axios = require('axios');

const logic = {
    getRecipe (r_id){
       return axios.post('/api/recipe', {r_id:r_id})
    },
    getsFour (a, b){
        return a+b
    }
}

module.exports = logic