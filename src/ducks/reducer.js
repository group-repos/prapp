const initialState = {
    recipe: [],
    recipes: [],
    user: {},
    modalOpen: false,
    componentName: '',
    newRecipe: {},
}

//Action Descriptors
const UPDATE_RECIPE = 'UPDATE_RECIPE';
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_MODAL_OPEN = 'UPDATE_MODAL_OPEN';
const UPDATE_MODAL_CLOSED = 'UPDATE_MODAL_CLOSED';
const UPDATE_NEWRECIPE = 'UPDATE_NEWRECIPE';

function reducer(state = initialState, action){
    switch( action.type ){
        case UPDATE_RECIPE:
            return {...state, recipe: action.payload};

        case UPDATE_USER:
            return {...state, user: action.payload};
        
        case UPDATE_MODAL_OPEN:
            return {...state, modalOpen: action.payload.open, componentName: action.payload.componentName};
     
        case UPDATE_MODAL_CLOSED:
            return {...state, modalOpen: action.payload};

        case UPDATE_NEWRECIPE:
            return {...state, newRecipe: action.payload};
     
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

export function updateModalOpen (componentName){
    return {
        type: UPDATE_MODAL_OPEN,
        payload: {
            open: true,
            componentName: componentName
        }
    }
}

export function updateModalClosed (){
    return {
        type: UPDATE_MODAL_CLOSED,
        payload: false
    }
}

export function updateNewRecipe (recipe) {
    return {
        type: UPDATE_NEWRECIPE,
        payload: recipe
    }
}

export default reducer