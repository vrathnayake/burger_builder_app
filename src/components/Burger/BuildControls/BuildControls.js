import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'}
];

const buildControls = (props) => (
    
    <div className={classes.BuildControls}>
    <p>Total price:<strong>{props.price.toFixed(2)}</strong> </p>
        {controls.map(ctrl =>(
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            added={()=>props.addIngredient(ctrl.type)}
            removed={()=>props.removeIngredient(ctrl.type)}
            disable={props.disabled[ctrl.type]}
            />
        ))}
    <button className={classes.OrderButton} 
    disabled={!props.purchaseable} 
    onClick={props.purchasing}>{props.isAuthenticated? 'ODER NOW' : 'Sign Up to ORDER'}</button>
    </div>
);


export default buildControls;