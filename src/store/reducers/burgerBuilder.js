import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}
const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.3,
    bacon: 0.3,
    cheese: 0.7
}

const burgerBuilderReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedstate = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building:true
            }
            return updateObject(state, updatedstate);

        case actionType.REMOVE_INGREDIENT:
            const updatedIngredientRe = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
            const updatedIngredientsRe = updateObject(state.ingredients, updatedIngredientRe);
            const updatedstateRe = {
                ingredients: updatedIngredientsRe,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building:true
            }
            return updateObject(state, updatedstateRe);
        case actionType.SET_INGREDIENTS:
            return {
                ...state,
                totalPrice: 4,
                building:false,
                ingredients: {
                    //if you want to change the orger of the ingredients
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                error: false
            };
        case actionType.FETCH_INGFAILED:
            return {
                ...state,
                error: true
            };
        default: {
            return state;
        }
    }
}

export default burgerBuilderReducer;