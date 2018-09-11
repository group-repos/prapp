const initialState = {
    recipe: [],
    recipes: [],
    user: {}
}

//Action Descriptors
const UPDATE_RECIPE = 'UPDATE_RECIPE';
const UPDATE_USER = 'UPDATE_USER'

function reducer(state = initialState, action){
    switch( action.type ){
        case UPDATE_RECIPE:
            return {...state, ...action.payload};

        case UPDATE_USER:
            return {...state, user: action.payload}
     
        default: return state
    }
}

//Action Builders
export function updateRecipe( recipe ){
    return {
        type: UPDATE_RECIPE,
        payload: recipe
    };
};

export function updateUser (user) {
    return {
        type: UPDATE_USER,
        payload: user
    };
};

export default reducer