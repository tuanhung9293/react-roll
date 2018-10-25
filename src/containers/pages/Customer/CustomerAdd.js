import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from "react-i18next";
import './CustomerForm.css';
import CustomerForm from './CustomerForm';

class CustomerAdd extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isShow: false,
            customer: {}
        };
        this.handleCloseCustomerForm = this.handleCloseCustomerForm.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isSubmitting !== this.props.isSubmitting && this.props.isSubmitting) {
            this.setState({ 
                isShow: false,
                customer:{}
            });
        }
    }

    handleCloseCustomerForm() {
        this.setState({
            isShow: false,
            customer: {}
        })
    }

    handleAddClick() {
        this.setState({
            isShow: true,
        })
    }

    handleSubmitForm(values) {
        let parameters = {
            isAdd: true,
            values
        }
        this.props.handleSubmitForm(parameters);
    }

    render() {
        const { 
            t,
            groups,
            isSubmitting,
        } = this.props;
        const {
            isShow,
            customer
        } = this.state;
        return(
            <div className="modal-container customer-form">
                <button 
                    className="btn btn-primary push-5-r push-10" 
                    type="button"
                    onClick={this.handleAddClick}
                >
                    <i className="fa fa-plus"></i> {t('add')}
                </button>
                <CustomerForm
                    isShow={isShow}
                    handleSubmitForm={this.handleSubmitForm}
                    handleCloseCustomerForm={this.handleCloseCustomerForm}
                    isSubmitting={isSubmitting}
                    groups={groups}
                    initialValues={customer}
                    isAdd={true}
                    title={t('add')}
                />
            </div>
        )
    }
}

CustomerForm.propTypes = {
    groups: PropTypes.array.isRequired,
    handleSubmitForm: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
}

CustomerForm.defaultProps = {
    groups: {},
    isSubmitting: false,
}

export default translate("customer")(CustomerAdd);