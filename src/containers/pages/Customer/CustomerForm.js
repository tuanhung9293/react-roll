import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Modal,
} from 'react-bootstrap';
import {
    Field,
    reduxForm,
} from 'redux-form';
import { translate } from "react-i18next";
import { customerFormValidate } from './customerFormValidate';
import renderInputField from './../../../components/reduxForm/renderInputField';
import renderMultiselect from './../../../components/reduxForm/renderMultiSelect';
import './CustomerForm.css';
import _ from 'lodash';

class CustomerForm extends Component {
    render() {
        const { 
            t,
            handleSubmit,
            isSubmitting,
            pristine,
            handleSubmitForm,
            groups,
            isShow,
            handleCloseCustomerForm,
            initialValues,
            title,
        } = this.props;

        return(
            <div className="modal-container customer-form">
                <Modal
                    show={isShow}
                    onHide={handleCloseCustomerForm}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            {title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="js-validation-material form-horizontal row" onSubmit={handleSubmit(handleSubmitForm)}>
                            <div className="col-sm-12">
                                <Field
                                    label={t('name')}
                                    type="text"
                                    name="name"
                                    component={renderInputField}
                                />
                            </div>                            
                            <div className="col-sm-12">
                                <Field
                                    name="phone"
                                    component={renderInputField}
                                    type="number"
                                    placeholder={t('phone')}
                                    className="form-control" 
                                    label={t('phone')}
                                />
                            </div>
                            <div className="col-sm-12">
                                <Field
                                    name="email"
                                    component={renderInputField}
                                    type="email"
                                    placeholder={t('email')}
                                    className="form-control"
                                    label={t('email')}
                                />
                            </div>
                            <div className="col-sm-12">
                                <Field
                                    name="address"
                                    component={renderInputField}
                                    type="text"
                                    placeholder={t('address')}
                                    className="form-control"
                                    label={t('address')}
                                />
                            </div>
                            <div className="col-sm-12">
                                <label>{t('group')}</label>
                                <Field
                                    name="groups"
                                    component={renderMultiselect}
                                    data={_.isUndefined(groups) || _.isEmpty(groups) ? [] : groups}
                                    className="form-control" 
                                    style={{padding:'0px'}}
                                    valueField="id"
                                    textField="title"
                                    value={initialValues.groups || []}
                                />
                            </div>
                            <div className="col-sm-12">
                                <Button 
                                    onClick={handleCloseCustomerForm}
                                    className="right-part"
                                >
                                    {t('close')}
                                </Button>
                                <Button 
                                    type="submit"
                                    className="btn-primary right-part submit-button"
                                    disabled={pristine || isSubmitting}
                                >
                                    {title}
                                </Button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

CustomerForm.propTypes = {
    groups: PropTypes.array.isRequired,
    handleSubmitForm: PropTypes.func.isRequired,
    t: PropTypes.func,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    isAdd: PropTypes.bool,
}

CustomerForm.defaultProps = {
    groups: {},
    isSubmitting: false,
    pristine: true,
    isAdd: true,
}

export default translate("customer")(reduxForm({
    form: 'Customer Form',
    enableReinitialize: true,
    validate: customerFormValidate,
})(CustomerForm))