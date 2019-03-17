import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as authActions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import {checkValidity} from '../../store/utility';


class Auth extends Component {

    state = {
        formcontrols: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'mail address'
                },

                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },

            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },

                value: '',
                validation: {
                    required: true,
                    minLen: 6
                },
                valid: false,
                touched: false
            }
        },
        inSignUp: true
    }
    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updateControls = {
            ...this.state.formcontrols,
            [controlName]: {
                ...this.state.formcontrols[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.formcontrols[controlName].validation),
                touched: true
            }
        };
        this.setState({
            formcontrols: updateControls
        });
    }
    submithandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.formcontrols.email.value, this.state.formcontrols.password.value, this.state.inSignUp);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { inSignUp: !prevState.inSignUp }
        });
    }

    render() {
        const formElementArray = []
        for (let key in this.state.formcontrols) {
            formElementArray.push({
                id: key,
                body: this.state.formcontrols[key]
            });
        }
        let form = formElementArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.body.elementType}
                elementConfig={formElement.body.elementConfig}
                value={formElement.body.value}
                invalid={!formElement.body.valid}
                touched={formElement.body.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />

        ));

        if (this.props.loading) {
            form = <Spinner />
        }
        let errorMsg = null;
        if (this.props.error) {
            errorMsg = (
                <p>{this.props.error.message}</p>
            );
        }
        let authRedirect = null;
        if (this.props.isAuth) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMsg}
                <form onSubmit={this.submithandler}>
                    <p>{this.state.inSignUp ? 'Sign Up New User' : 'Sign In'}</p>
                    {form}
                    <Button btnType="Success"> {this.state.inSignUp ? 'Register' : 'Sign In'}</Button>

                </form>
                <p>{this.state.inSignUp ? 'Already a user? switch to Sing in' : 'If you are not a user please Sign Up first'}</p>
                <Button clicked={this.switchAuthModeHandler} btnType="Danger"> SWITCH TO {this.state.inSignUp ? 'SIGN IN' : 'SIGN UP'} </Button>
            </div>
        );
    }

};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath : state.auth.authRedirect
    }
}

const mapDispatchToProps = dispath => {
    return {
        onAuth: (email, password, inSignUp) => dispath(authActions.auth(email, password, inSignUp)),
        onSetAuthRedirectPath: ()=> dispath(authActions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);