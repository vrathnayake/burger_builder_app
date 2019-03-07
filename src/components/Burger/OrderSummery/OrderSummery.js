import React, { Component } from 'react';
import AUX from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummery extends Component {
    //this could be a functional component, but left for debugging purposes
    componentWillUpdate(){
        console.log("summery updating");
    }

    render() {
        const ingredientSummery = Object.keys(this.props.ingredients)
            .map((ingkey) => {
                return <li key={ingkey}><span style={{ textTransform: 'capitalize' }}>{ingkey}</span> : {this.props.ingredients[ingkey]}</li>
            });

        return (
            <AUX>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummery}
                </ul>
                <p><strong>Total price: {this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to checkout</p>
                <Button clicked={this.props.purchCancel} btnType="Danger">CANCEL</Button>
                <Button clicked={this.props.purchCont} btnType="Success">CONTINUE</Button>
            </AUX>
        );
    }

}
export default OrderSummery;