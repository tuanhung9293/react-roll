import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from "react-i18next";
import _ from 'lodash';
import DeleteModal from './../../../components/deleteModal/DeleteModal';
import CustomerForm from './CustomerForm';

class CustomerList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isShowDeleteForm: false,
            isShowEditForm: false,
            deletedCustomer: {},
            editedCustomer: {},
        };
        this.handleHide = this.handleHide.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleConfirmClick = this.handleConfirmClick.bind(this);
        this.handleEditCustomer = this.handleEditCustomer.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.handleCloseCustomerForm = this.handleCloseCustomerForm.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isDeleting !== this.props.isDeleting && this.props.isDeleting) {
            this.setState({ 
                isShowDeleteForm: false 
            });
        }
        if(nextProps.isSubmitting !== this.props.isSubmitting && this.props.isSubmitting) {
            this.setState({ 
                isShowEditForm: false,
                editedCustomer: {}
            });
        }
    }

    handleHide() {
        this.setState({ 
            isShowDeleteForm: false,
            deletedIndex: {},
        });
    }

    handleDeleteClick(customer) {
        this.setState({
            isShowDeleteForm: true,
            deletedCustomer: customer
        })
    }
    
    handleConfirmClick(customer) {
        this.props.handleDeleteCustomer(customer);
    }

    handleEditCustomer(customer) {
        this.setState({
            isShowEditForm: true,
            editedCustomer: customer
        })
    }

    handleSubmitForm(values) {
        let parameters = {
            isAdd: false,
            values
        }
        this.props.handleSubmitForm(parameters);
    }

    handleCloseCustomerForm() {
        this.setState({
            isShowEditForm: false,
            editedCustomer: {}
        })
    }

    render() {
        const { 
            t, 
            customers,
            isSubmitting,
            groups,
        } = this.props;
        const {
            editedCustomer,
            isShowDeleteForm,
            isShowEditForm,
            deletedCustomer
        } = this.state;
        return(
            <div className="content">
                <div className="block">
                    <div className="block-content">
                        <table className="table table-bordered table-striped js-dataTable-full">
                            <thead>
                                <tr>
                                    <th className="text-center">#</th>
                                    <th>{t('name')}</th>
                                    <th className="hidden-xs">{t('group')}</th>
                                    <th className="hidden-xs">{t('email')}</th>
                                    <th className="hidden-xs">{t('phone')}</th>
                                    <th className="hidden-xs">{t('address')}</th>
                                    <th className="text-center" style={{width: "10%"}}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    _.map(customers, (customer, index) => (
                                        <tr key={customer.id}>
                                            <td className="text-center">
                                                {index}
                                            </td>
                                            <td className="font-w600">
                                                {customer.name}
                                            </td>
                                            <td className="hidden-xs">
                                                {
                                                    _.map(customer.groups, (group, groupIndex) => {
                                                        if(groupIndex === 0) {
                                                            return group.title
                                                        } else {
                                                            return `, ${group.title}`;
                                                        }
                                                    })
                                                }
                                            </td>
                                            <td className="hidden-xs">
                                                {customer.email}
                                            </td>
                                            <td className="hidden-xs">
                                                {customer.phone}
                                            </td>
                                            <td className="hidden-xs">
                                                {customer.address}
                                            </td>
                                            <td className="text-center">
                                                <div className="btn-group">
                                                    <button 
                                                        className="btn btn-xs btn-default" 
                                                        type="button" data-toggle="tooltip" 
                                                        title={t('editCustomer')}
                                                        onClick={() => this.handleEditCustomer(customer)}
                                                    >
                                                        <i className="fa fa-pencil"></i>
                                                    </button>
                                                    <button 
                                                        className="btn btn-xs btn-default" 
                                                        type="button" 
                                                        data-toggle="tooltip" 
                                                        title={t('deleteCustomer')}
                                                        onClick={() => this.handleDeleteClick(customer)}
                                                    >
                                                        <i className="fa fa-times"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <CustomerForm
                    isShow={isShowEditForm}
                    handleSubmitForm={this.handleSubmitForm}
                    handleCloseCustomerForm={this.handleCloseCustomerForm}
                    isSubmitting={isSubmitting}
                    groups={groups}
                    initialValues={editedCustomer}
                    isAdd={false}
                    title={t('edit')}
                />
                <DeleteModal 
                    isShow={isShowDeleteForm} 
                    title={t('deleteCustomer')} 
                    content={t('deleteContent', {customerName: deletedCustomer.name})} 
                    handleHide={this.handleHide} 
                    t={t}
                    data={deletedCustomer}
                    confirmClick={this.handleConfirmClick}
                    isDeleting={this.props.isDeleting}
                />
            </div>
        )
    }
}

CustomerList.propTypes = {
    groups: PropTypes.array.isRequired,
    handleSubmitForm: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    customers: PropTypes.array,
    handleDeleteCustomer: PropTypes.func,
    isDeleting: PropTypes.bool,
}

CustomerList.defaultProps = {
    groups: {},
    isSubmitting: false,
    customers: [],
    isDeleting: false,
}

export default translate("customer")(CustomerList);