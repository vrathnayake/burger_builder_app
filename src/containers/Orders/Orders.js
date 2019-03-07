import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
      this.props.onFetchOrders(this.props.token);
      console.log("ORDERS", this.props.orders);
    }

    render() {
        let orders = <Spinner/>;
        if(!this.props.loading){
            orders = this.props.orders.map((or)=>(
                <Order key={or.id}
                ingredients={or.ingredients}
                price={or.price}/>
            ))
        }
        
        return (
            <div>   
               {orders}
            </div>
        );
    }

}

const mapStateToProps = state =>{
    return{
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));