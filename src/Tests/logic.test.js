const {getRecipe} = require('../Logic/logic');

const recipe = {
    r_id: 2
}

describe('Can get recipe from server', () => {
    test('gets status 200', () => {
        return getRecipe(recipe.r_id).then(res => {
            expect(res.status).toBe(200)
        })
    })
})