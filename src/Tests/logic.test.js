const {getsFour, getUserId, getUserEmail, getUserFirstName, getUserLastName, getUserPic, getRecipe, getRecipeId, getRecipeName, getRecipeDescription, getRecipeServings, getNewRecipe, getNewRecipeId, getNewRecipeName, getNewRecipeDescription, getNewRecipeServings} = require('../Logic/logic');

const recipe = {
   r_id: 2,
   u_id: 4,
   r_name: 'poutine',
   servings: 2,
   rating: 3,
   r_pics: 'https://www.seasonsandsuppers.ca/wp-content/uploads/2014/01/new-poutine-1-500x500.jpg',
   r_description: 'Woke hoodie raclette literally selfies. Air plant man bun pok pok ramps la croix. Man bun hashtag next level kickstarter'
}

const newRecipe = {
    r_id: 18,
    u_id: 2,
    r_name: 'Beach, Beach, Beach',
    servings: 4,
    rating: null,
    r_pics: 'https://devmtn-meal-prep-app.s3.us-east-2.amazonaws.com/tropical-beach-01.jpg',
    r_description: 'a;slkdfj;laksdjf;lkajs;dfkj;alksdjf;lj'
}

const user = {
   u_id: 6,
   email: 'dylantkamauoha@gmail.com',
   first_name: 'Dylan',
   last_name: 'Kamauoha',
   profile_pic: 'https://lh4.googleusercontent.com/-fkEXHSrdizY/AAAAAAAAAAI/AAAAAAAAAGE/81sKn65HjLQ/photo.jpg'
}

// describe('Can get recipe from server', () => {
//     test('gets status 200', () => {
//         return getRecipe(recipe.r_id).then(res => {
//             expect(res.status).toBe(200)
//         })
//     })
// })

//Spencer's Tests
describe('UserId returns true', () => {
   test('returns true', () => {
       expect(getUserId(user.u_id)).toBe(true)
   })
})

describe('UserEmail returns true', () => {
   test('returns true', () => {
       expect(getUserEmail(user.email)).toBe(true)
   })
})

describe('UserFirstName returns true', () => {
   test('returns true', () => {
       expect(getUserFirstName(user.first_name)).toBe(true)
   })
})

describe('UserLastName returns true', () => {
   test('returns true', () => {
       expect(getUserLastName(user.first_name)).toBe(true)
   })
})

describe('UserPic returns true', () => {
   test('returns true', () => {
       expect(getUserPic(user.profile_pic)).toBe(true)
   })
}) 

//Dylan's Tests
describe('Recipe returns true', () => {
    test('returns true', () => {
        expect(getRecipe(recipe)).toBe(true);
    });
});

describe('RecipeId returns true', () => {
    test('returns true', () => {
        expect(getRecipeId(recipe.r_id)).toBe(true);
    });
});

describe('RecipeName returns true', () => {
    test('returns true', () => {
        expect(getRecipeName(recipe.r_name)).toBe(true);
    });
});

describe('RecipeDescription returns true', () => {
    test('returns true', () => {
        expect(getRecipeDescription(recipe.r_description)).toBe(true);
    });
});

describe('RecipeServings returns true', () => {
    test('returns true', () => {
        expect(getRecipeServings(recipe.servings)).toBe(true);
    });
});

//Tim's Tests
describe('NewRecipe returns true', () => {
    test('returns true', () => {
        expect(getNewRecipe(newRecipe)).toBe(true);
    });
});

describe('NewRecipeId returns true', () => {
    test('returns true', () => {
        expect(getNewRecipeId(newRecipe.r_id)).toBe(true);
    });
});

describe('NewRecipeName returns true', () => {
    test('returns true', () => {
        expect(getNewRecipeName(newRecipe.r_name)).toBe(true);
    });
});

describe('NewRecipeDescription returns true', () => {
    test('returns true', () => {
        expect(getNewRecipeDescription(newRecipe.r_description)).toBe(true);
    });
});

describe('NewRecipeServings returns true', () => {
    test('returns true', () => {
        expect(getNewRecipeServings(newRecipe.servings)).toBe(true);
    });
});