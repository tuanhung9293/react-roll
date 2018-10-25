import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RenderRoutes } from '../routes';
import * as Actions from '../store/actions/';
import LoadingBar from 'react-redux-loading-bar';
import './App.css';
import $ from 'jquery';
window.jQuery = window.$ = $;

class App extends Component {
    render() {
        return (
            <div>
                <LoadingBar style={{ zIndex: '9999', position: 'fixed' }}/>
                <RenderRoutes routes={this.props.route.routes} />
            </div>
           
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
