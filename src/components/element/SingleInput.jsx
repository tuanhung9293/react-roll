import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class SingleInput extends Component {
    render() {
        return (
            <Field name="payMount" component="input" type="number" parse={value => Number(value)}/>
        );
    }
}

SingleInput = reduxForm({
    form: 'createOrder',
})(SingleInput)

const mapStateToProps = (state, ownProps) => ({
    initialValues: ownProps.initialData,
});

export default connect(
    mapStateToProps,
    null
)(SingleInput);