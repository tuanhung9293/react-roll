import React, { Component } from 'react';
import { connect } from 'react-redux';
import './../../../assets/css/oneui.css';
import CustomerList from './CustomerList';
import CustomerSearch from './CustomerSearch';
import CustomerAdd from './CustomerAdd';
import Pagination from './../../../components/pagination/Pagination';
import * as types from './../../../store/actions/ActionTypes';
import _ from 'lodash';
import { MasterLayout } from './../../../components/layouts';

class CustomerIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchData: {
                page: 1,
                perPage: 10,
                showUnactive: "false",
                sortedBy: "name_asc",
                groupIds: [],
                searchQuery: '',
                
            },
            isSubmitting: false,
            isDeleting: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.handleDeleteCustomer = this.handleDeleteCustomer.bind(this);
        this.handleNotification = this.handleNotification.bind(this);
        this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);
        this.prepareParameters = this.prepareParameters.bind(this);
        this.handlePaginationClick = this.handlePaginationClick.bind(this);
    }

    componentDidMount() {
        this.props.loadCustomerList(this.prepareParameters());
        this.props.loadGroupList();
    }

    prepareParameters() {
        let groupIds = [];
        _.map(this.state.searchData.groupIds, group => {
            groupIds.push(group.id);
        })
        return {
            page: this.state.searchData.page,
            per_page: this.state.searchData.perPage,
            show_unactive: this.state.searchData.showUnactive,
            sorted_by: this.state.searchData.sortedBy,
            with_any_group_ids: groupIds,
            search_query: this.state.searchData.searchQuery,
        }
    }

    handleSubmit = (parameters) => {
        this.setState({
            isSubmitting: true,
        }, () => {
            let group_ids = [];
            _.map(parameters.values.groups, group => {
                group_ids.push(group.id)
            })

            if(parameters.isAdd) {
                this.props.addCustomer({
                    customer: parameters.values,
                    group_ids
                }, () => {
                    this.refreshList();
                });
            } else {
                this.props.editCustomer({
                    customer: parameters.values,
                    group_ids
                }, () => {
                    this.refreshList();
                })
            }
        })
    }

    refreshList() {
        this.setState({
            isSubmitting: false,
            isDeleting: false,
        }, () => {
            this.props.loadCustomerList(this.prepareParameters());
        })
    }

    handleDeleteCustomer(customer) {
        this.setState({
            isDeleting: true,
        }, () => {
            this.props.deleteCustomer(customer, () => {
                this.refreshList()
            })
        });
    }

    handleNotification() {

    }

    handleSearchFormSubmit(values) {
        let searchData = this.state.searchData;
        searchData.perPage = values.perPage;
        searchData.groupIds = values.groupIds;
        searchData.searchQuery = values.searchQuery;
        searchData.page = 1;

        this.setState({
            searchData
        }, () => {
            this.props.loadCustomerList(this.prepareParameters());
        })
    }

    handlePaginationClick(item) {
        let searchData = this.state.searchData;
        searchData.page = item;
        this.setState({
            searchData
        }, () => {
            this.props.loadCustomerList(this.prepareParameters());
        })
    }

    render() {
        const { 
            customerList
        } = this.props;
        const {
            isSubmitting,
            isDeleting,
            searchData
        } = this.state;
        return(
            <MasterLayout activeLink='customer'>
                <CustomerAdd 
                    handleSubmitForm={this.handleSubmit} 
                    isSubmitting={isSubmitting}
                    groups={customerList.groups}
                />
                <CustomerSearch 
                    groups={customerList.groups}
                    handleSearchFormSubmit={this.handleSearchFormSubmit}
                    initialValues={searchData}
                />
                <CustomerList 
                    customers={customerList.customers}
                    groups={customerList.groups}
                    handleDeleteCustomer={this.handleDeleteCustomer}
                    isDeleting={isDeleting}
                    handleSubmitForm={this.handleSubmit} 
                    isSubmitting={isSubmitting}
                />
                <Pagination 
                    total={customerList.total}
                    perPage={searchData.perPage}
                    page={searchData.page}
                    handlePaginationClick={this.handlePaginationClick}
                />
            </MasterLayout>
        )
    }
}

function mapStateToProps(state) {
    return {
        customerList: state.customerData,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadCustomerList: (options) => dispatch({ type: types.LOAD_CUSTOMER_LIST, options }),
        loadGroupList: () => dispatch({ type: types.LOAD_CUSTOMER_GROUP }),
        addCustomer: (options, callback) => dispatch({ type: types.ADD_CUSTOMER, options, callback }),
        deleteCustomer: (options, callback) => dispatch({ type: types.DELETE_CUSTOMER, options, callback}),
        editCustomer: (options, callback) => dispatch({ type: types.EDIT_CUSTOMER, options, callback}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerIndex);