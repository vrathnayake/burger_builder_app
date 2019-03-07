import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from '../Burger/BurgerIngredients/BurgerIngredient';

const burger = (props) => {

    let arrayIngredients = Object.keys(props.ingredients).map(ingKey => {
        return [...Array(props.ingredients[ingKey])].map((_, i)=> {
            return <BurgerIngredient key={ingKey+i} type={ingKey} />;
        });
    }).reduce((arr, el)=>{
        return arr.concat(el)
    },[]);

    if(arrayIngredients.length === 0){
        arrayIngredients = <p>Please start adding ingredients!</p>
    }

    return(

        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {arrayIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );

};
export default burger;