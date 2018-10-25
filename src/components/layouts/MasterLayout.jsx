import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../store/actions';

import withRouter from 'react-router/withRouter';
import Header from './Header';
import Footer from './Footer';
import Navigator from './Navigator';

class MasterLayout extends Component {
    state = {
        navigatorStatus: 'sidebar-mini',
    }

    setNavigator = (value) => {
        this.setState({navigatorStatus: value})
    }

    render() {
        const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, {}));
        return (
            <div id="page-container" className={`sidebar-l sidebar-o side-scroll header-navbar-fixed ${this.state.navigatorStatus}`}>
                <Header setNavigator={this.setNavigator}
                    navigatorStatus={this.state.navigatorStatus}/>
                <Navigator setNavigator={this.setNavigator} activeLink={this.props.activeLink}/>
                <main id="main-container" style={{minHeight: "95vh"}}>
                    {childrenWithProps}
                </main>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(MasterLayout));
