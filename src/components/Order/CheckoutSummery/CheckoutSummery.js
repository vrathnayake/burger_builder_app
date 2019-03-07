import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummery.css';


const checkoutSummery = (props) => {
    return(
        <div className={classes.CheckoutSummery}>
            <h1>Very nice selection!</h1>
            <div style={{width:'100%', margine:'auto'}}>
                <Burger ingredients={props.ingredients}/>

            </div>
            <Button btnType='Danger' clicked={props.checkoutCanceled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.checkoutContinued}>CONTINUE</Button>

            
        </div>


    );
};
export default checkoutSummery;