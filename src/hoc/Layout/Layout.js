import React, { Component } from 'react';
import AUX from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/ToolBar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    render() {
        return (
            <AUX>
                <div>
                    <Toolbar isAuth={this.props.isAuthenticated}
                        drawerToggleClicked={this.sideDrawerToggleHandler} />
                    <SideDrawer
                        isAuth={this.props.isAuthenticated}
                        open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} />
                </div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </AUX>
        );
    }

};

const mapStateToProps = state => {
    return {

        isAuthenticated: state.auth.token !== null

    };
};

export default connect(mapStateToProps)(Layout);