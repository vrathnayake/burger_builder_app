import React, { Component } from 'react';
import AUX from '../Auxiliary/Auxiliary';

import Modal from '../../components/UI/Modal/Modal';


const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        constructor(props) {
            super(props);

            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
        }
        // The componentDidMount will execute after the componentDidMount of the wrapping child object which is our burgerbuilder.
        // So we need to do the axis calls when this component is created and hence the code is moved to constructor. You can
        // use the componentWillMount() too but it is depricated.

        /* componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            }, error=>{
                this.setState({ error: error });
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
         }*/

        componentWillUnmount() {
            
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <AUX>
                    <Modal show={this.state.error}
                        modalClosed={this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </AUX>

            );
        }
    }
};
export default withErrorHandler;