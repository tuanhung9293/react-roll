// import { translate } from "react-i18next";
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../../store/actions/';
// import { Link } from 'react-router-dom';

import { Field, reduxForm } from 'redux-form';
import { renderField, userFormValidate as validate } from '../../../utils';

const form = props => {
    const { handleSubmit, submitting } = props;
    return (
        <form className="form-horizontal push-30-t" onSubmit={handleSubmit}>
            <Field name="email" type="text" component={renderField} label="Email" />
            <Field name="password" type="password" component={renderField} label="Passwword" />
            <div className="form-group push-30-t">
                <div className="col-xs-12 col-sm-6 offset-sm-3 col-md-4 offset-md-4">
                    <button className="btn btn-sm btn-block btn-primary" type="submit" disabled={submitting}>Log in</button>
                </div>
            </div>
        </form>
    );
};

const UserLoginForm = reduxForm({
    form: 'userLogin',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate,
})(form);

class UserLogin extends Component {
    componentWillMount = () => {
        if (this.props.auth.token) this.props.actions.userLogout();
    }

    handleSubmit = async (values) => {
        await this.props.actions.userLogin(values, this.props.history)
    }

    render() {
        return (
            <div className="user-login-page">
                <div className="content content-boxed overflow-hidden">
                    <div className="row">
                        <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4 custom-box">
                            <div className="push-30-t push-50 animated fadeIn">
                                <div className="text-center">
                                    Nhập thông tin tài khoản của bạn
                            </div>
                                <UserLoginForm onSubmit={this.handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth || {},
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})

UserLogin = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserLogin);

export default UserLogin
