const {getRecipe, getsFour} = require('../Logic/logic');

const recipe = {
    r_id: 2
}

// describe('Can get recipe from server', () => {
//     test('gets status 200', () => {
//         return getRecipe(recipe.r_id).then(res => {
//             expect(res.status).toBe(200)
//         })
//     })
// })

describe('2+2 equals 4', () => {
    test('gets answer 4', () => {
        expect(getsFour(2,2)).toBe(4)
    })
})