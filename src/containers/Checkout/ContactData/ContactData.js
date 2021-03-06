import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorhandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as Orderactions from '../../../store/actions/index';
import { checkValidity } from '../../../store/utility';

import { connect } from 'react-redux';

class ContactData extends Component {
    state = {
        orderForm: {

            name: this.createBody('input', { type: 'text', placeholder: 'Your Name' }, '', { required: true }, false),
            street: this.createBody('input', { type: 'text', placeholder: 'Street' }, '', { required: true }, false),
            zip: this.createBody('input', { type: 'text', placeholder: 'Postal code' }, '', { required: true, minLen: 5, maxLen: 5, isNumeric: true }, false),
            country: this.createBody('input', { type: 'text', placeholder: 'Country' }, '', { required: true }, false),
            email: this.createBody('input', { type: 'email', placeholder: 'e-mail' }, '', { required: true, isEmail: true }, false),
            deliveryMethod: this.createBody('select', {
                options:
                    [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'economy', displayValue: 'Economy' }
                    ]
            }, 'fastest', {}, true)
        },
        isFormvalid: false
    }
    //helper method to create js body for the above form elements
    createBody(elType, config, defValue, rules, isValid) {

        return {
            elementType: elType,
            elementConfig: config,
            value: defValue,
            validationRules: rules,
            valid: isValid,
            touched: false
        };
    }

    orderHandler = (event) => {
        //to prevent page reload so we can see console log
        event.preventDefault();
        const formData = {};
        for (let formElemIndent in this.state.orderForm) {
            formData[formElemIndent] = this.state.orderForm[formElemIndent].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.totPrice,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token);
    }

    inputChangedHandler = (event, inputIdentifiyer) => {
        const updatedForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedForm[inputIdentifiyer]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validationRules);
        updatedFormElement.touched = true;
        updatedForm[inputIdentifiyer] = updatedFormElement;

        let formIsValid = true;
        for (let formElemIdnt in updatedForm) {
            formIsValid = updatedForm[formElemIdnt].valid && formIsValid;
        }

        this.setState({ orderForm: updatedForm, isFormvalid: formIsValid });
    }

    render() {
        const formElementArray = []
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                body: this.state.orderForm[key]
            });

        }

        let form = (
            <form onSubmit={this.orderHandler}>

                {formElementArray.map(formEl => (
                    <Input key={formEl.id}
                        elementType={formEl.body.elementType}
                        elementConfig={formEl.body.elementConfig}
                        value={formEl.body.value}
                        invalid={!formEl.body.valid}
                        touched={formEl.body.touched}
                        changed={(event) => this.inputChangedHandler(event, formEl.id)}
                    />
                ))}
                {/* go to the Button and set proprerty cos this is a custom button */}
                <Button btnType="Success" disabled={!this.state.isFormvalid} > ORDER</Button>

            </form>);
        if (this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data </h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderdata, token) => dispatch(Orderactions.purchaseBurger(orderdata, token))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorhandler(ContactData, axios));