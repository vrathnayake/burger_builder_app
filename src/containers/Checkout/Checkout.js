import React, { Component } from 'react';
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import { Route, Redirect } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';


import { connect } from 'react-redux';

class Checkout extends Component {


    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        console.log('going to contact data', this.props.match.path);
        this.props.history.replace(this.props.match.path + '/contact-data/');
    }

    render() {
        let summery = <Redirect to="/" />
        if (this.props.ings) {
            const purRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summery = (
                <div>
                    {purRedirect}
                    <CheckoutSummery
                        ingredients={this.props.ings}
                        checkoutCanceled={this.checkoutCanceledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                </div>
            );
        }
        return summery;

    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
}


export default connect(mapStateToProps)(Checkout);