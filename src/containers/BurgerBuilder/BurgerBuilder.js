import React, { Component } from 'react';
import AUX from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

import { connect } from 'react-redux';


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        
    }

    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients();
        
    }

    purchaseHandler = () => {
        if(this.props.isAuth){
            this.setState({purchasing: true});
        } else {
            this.props.onSetRedirectPath("/checkout");
            this.props.history.push("/auth");
        }
        
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
            
    }

    // You could also do this via redux
    updatePurchasabale(ingredients) {
        const sum = Object.keys(ingredients)
            .map((ing) => {
                return ingredients[ing];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);       
            return sum > 0
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummery = null;
        let burger = (this.props.error) ? "Ingredients can not be loaded!" : <Spinner />

        if (this.props.ings) {
            burger = (
                <AUX>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        
                        addIngredient={this.props.onIngredientAdded}
                        removeIngredient={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchaseable={this.updatePurchasabale(this.props.ings)}
                        purchasing={this.purchaseHandler}
                        price={this.props.totPrice}
                        isAuthenticated={this.props.isAuth}
                    />
                </AUX>
            );
            orderSummery = <OrderSummery
                totalPrice={this.props.totPrice}
                ingredients={this.props.ings}
                purchCancel={this.purchaseCancelHandler}
                purchCont={this.purchaseContinueHandler} />
        }
        return (
            <AUX>
                <Modal show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler} >
                    {orderSummery}
                </Modal>
                {burger}
            </AUX>
        );
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngrediants()),
        onInitPurchase: ()=>dispatch(actions.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));