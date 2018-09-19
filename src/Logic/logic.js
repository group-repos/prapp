const axios = require('axios');

const logic = {
    getRecipe (r_id){
       return axios.post('/api/recipe', {r_id:r_id})
    }
}

module.exports = logic