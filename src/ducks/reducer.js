const initialState = {
    recipe: [],
    recipes: [],
    userInfo: {}
}

const UPDATE_RECIPE = 'UPDATE_RECIPE'

function reducer(state = initialState, action){
    switch( action.type ){
        case UPDATE_RECIPE:
            return {...state, ...action.payload}
     
        default: return state
    }
}

export function updateRecipe( recipe ){
    return {
        type: UPDATE_RECIPE,
        payload: recipe
    }
}

export default reducer