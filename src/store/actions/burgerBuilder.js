import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) =>{
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name

    };
};

export const removeIngredient = (name) =>{
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name

    };
};
// Fill the initial array from server
export const setIngredients = (ingredientsfromServer) =>{
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredientsfromServer

    };
};
export const fetchIngFailed = () =>{
    return{
       type: actionTypes.FETCH_INGFAILED

    };
};
// Async call to fetch ingredients
export const initIngrediants = () => {
    return dispatch =>{
        axios.get('https://react-burger-app-vindi.firebaseio.com/ingredients.json')
            .then(response => {
                
                console.log("FETCHED", response.data);
               dispatch(setIngredients(response.data));               
            }).catch(error =>{
                console.log("ERRORRRR", error);
                dispatch(fetchIngFailed());
            });
    };
};