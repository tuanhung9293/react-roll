import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../../store/actions/';
import * as types from './../../../store/actions/ActionTypes';

import { MasterLayout } from '../../../components/layouts';
import { OrderStatus, OrderStatusSearch, FromToDatePicker } from '../../../components/order';
import { DeliveryModal, CreateOrderModal, EditOrderModal, DeleteOrderModal } from '../../../components/element';
import { formatDate, convertOrderContents, colorDueDate } from '../../../utils';

class OrderList extends Component {
    state = {
        sortedBy: 'created_at_desc',
        sortingClass: [],
        pagination: [],
        rangeDate: {
            due_date_gte: undefined,
            due_date_lte: undefined,
        },
        search_query: {
            search_query: undefined
        },
        statusSearch: undefined,
        currentPage: 1,
        modalController: {
            deliveryData: {},
            deliveryModal: false,
            createOrderModal: false,
            editOrderModal: false,
            editOrderData: {},
            deleteOrderModal: false,
            deleteOrderModalId: undefined,
        }
    }


    handleFromChange = async (from) => {
        await this.setState({ ...this.state, rangeDate: { ...this.state.rangeDate, due_date_gte: from } });
        await this.asyncFilter();
    }

    handleToChange = async (to) => {
        await this.setState({ ...this.state, rangeDate: { ...this.state.rangeDate, due_date_lte: to } });
        await this.asyncFilter();
    }

    componentDidMount = () => {
        this.props.loadOrdersList(
            {
                pagination: { page: "1", per_page: "10" },
                show_all: "false",
                sorted_by: this.state.sortedBy
            })
    }

    componentWillReceiveProps = async (nextProps) => {
        await this.detectPagination(nextProps.total);
        await this.detectSortStatus(nextProps.ordersSortBy);
    }

    detectPagination = async (number) => {
        let data = Math.ceil(number / 10);
        let arrayOfNumber = Array.from({ length: data }, (v, k) => k + 1); // [1,2,3,4,...,data]
        this.setState({ ...this.state, pagination: arrayOfNumber });
    }

    detectSortStatus = async (keyData) => {
        let defaultValue = ['sorting', 'sorting', 'sorting']
        switch (keyData) {
            case 'customer_desc':
                defaultValue[0] = 'sorting_desc';
                break;
            case 'customer_asc':
                defaultValue[0] = 'sorting_asc';
                break;
            case 'created_at_desc':
                defaultValue[1] = 'sorting_desc';
                break;
            case 'created_at_asc':
                defaultValue[1] = 'sorting_asc';
                break;
            case 'due_date_desc':
                defaultValue[2] = 'sorting_desc';
                break;
            case 'due_date_asc':
                defaultValue[2] = 'sorting_asc';
                break;
            default: break;
        }
        this.setState({ ...this.state, sortingClass: defaultValue });
    }

    asyncSort = (id) => {
        const fields = ['customer', 'created_at', 'due_date'];
        let sortedBy = `${fields[id]}_${this.state.sortingClass[id] === 'sorting_asc' ? 'desc' : 'asc'}`
        this.setState({ ...this.state, sortedBy: sortedBy });
        this.props.loadOrdersList(
            {
                pagination: { page: "1", per_page: "10" },
                show_all: "false",
                sorted_by: sortedBy
            })
    }

    asyncFilter = () => {
        this.props.loadOrdersList(
            {
                pagination: { page: "1", per_page: "10" },
                show_all: "false",
                sorted_by: this.state.sortedBy,
                ...this.state.rangeDate,
                ...this.state.search_query,
                status: this.state.statusSearch ? `('${this.state.statusSearch.replace(",", "','")}')` : null,
            })
    }

    switchPage = (pageIndex) => {
        this.props.loadOrdersList(
            {
                pagination: { page: pageIndex, per_page: "10" },
                show_all: "false",
                sorted_by: this.state.sortedBy
            })
        this.setState({ ...this.state, currentPage: pageIndex });
    }

    changeStatus = (index, id, status) => {
        if (status === 'delivered') {
            this.openDeliveryModal(this.props.ordersData[index]);
        } else {
            let submitData = {
                id: id,
                status: status
            }
            this.props.changeOrderStatus(submitData)
        }
    }

    submitDeliveryModal = (id) => {
        this.props.actions.payOrderTuan(id, this.props.form.deliveryModal.values.price);
        let submitData = {
            id: id,
            status: 'delivered'
        }
        this.props.changeOrderStatus(submitData)
        this.closeDeliveryModal();
    }

    closeDeliveryModal = () => this.setState(
        {
            ...this.state,
            modalController: { ...this.state.modalController, deliveryModal: false, deliveryData: {} }
        }
    );

    openDeliveryModal = (data) => this.setState(
        {
            ...this.state,
            modalController: { ...this.state.modalController, deliveryModal: true, deliveryData: data }
        }
    );

    closeCreateOrderModal = () => this.setState(
        {
            ...this.state,
            modalController: { ...this.state.modalController, createOrderModal: false }
        }
    );

    openCreateOrderModal = () => this.setState(
        {
            ...this.state,
            modalController: { ...this.state.modalController, createOrderModal: true }
        }
    );

    handleChangeSearch = async (event) => {
        await this.setState({ search_query: { search_query: event.target.value } });
        await this.asyncFilter();
    }

    statusSearchHandle = async (value) => {
        await this.setState({ statusSearch: value });
        await this.asyncFilter();
    }


    closeEditOrderModal = () => this.setState(
        {
            ...this.state,
            modalController: { ...this.state.modalController, editOrderData: {}, editOrderModal: false }
        }
    );

    openEditOrderModal = (data) => this.setState(
        {
            ...this.state,
            modalController: { ...this.state.modalController, editOrderData: data, editOrderModal: true }
        }
    );
    
    submitDeleteOrderModal = () => {
        this.props.actions.deleteOrder(this.state.modalController.deleteOrderModalId)
        this.closeDeleteOrderModal();
    }

    closeDeleteOrderModal = () => this.setState(
        {
            ...this.state,
            modalController: { ...this.state.modalController, deleteOrderModal: false, deleteOrderModalId: undefined }
        }
    );

    openDeleteOrderModal = (id) => this.setState(
        {
            ...this.state,
            modalController: { ...this.state.modalController, deleteOrderModal: true, deleteOrderModalId: id}
        }
    );

    render() {
        const { sortingClass, currentPage, modalController, statusSearch } = this.state;
        const { ordersData } = this.props;

        return (
            <MasterLayout activeLink='order'>
                <div className="content">
                    <div className="block">
                        <div className="block-header">
                            <h3 className="block-title">Danh sách đơn hàng <small>Full</small></h3>
                        </div>
                        <div className="block-content">
                            <button className="btn btn-primary" onClick={this.openCreateOrderModal}>Tạo mới đơn hàng</button>
                        </div>
                        <div className="block-content">
                            <div className="row">
                                <div className="col-xs-4">
                                    <div className="input-group">
                                        <input className="form-control" type="text" placeholder="Search key" onChange={this.handleChangeSearch} />
                                        <span className="input-group-addon"><i className="fa fa-search"></i></span>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <FromToDatePicker
                                        handleFromChange={this.handleFromChange}
                                        handleToChange={this.handleToChange}
                                        from={this.state.rangeDate.due_date_gte}
                                        to={this.state.rangeDate.due_date_lte} />
                                </div>
                                <div className="col-xs-4">
                                    <OrderStatusSearch
                                        statusSearchHandle={this.statusSearchHandle}
                                        statusSearch={statusSearch} />
                                </div>
                            </div>
                        </div>
                        <div className="block-content">
                            <table className="table table-bordered dataTable">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nội dung</th>
                                        <th className={sortingClass[0]} onClick={() => this.asyncSort(0)}>Khách hàng</th>
                                        <th>Giá trị đơn hàng</th>
                                        <th className={sortingClass[1]} onClick={() => this.asyncSort(1)}>Ngày thêm</th>
                                        <th className={sortingClass[2]} onClick={() => this.asyncSort(2)}>Thời hạn</th>
                                        <th>Trạng thái</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ordersData.map((order, index) =>
                                            <tr key={index} className={colorDueDate(order.due_date)}>
                                                <td>{order.id}</td>
                                                <td>{convertOrderContents(order.contents)}</td>
                                                <td>{order.customer.name}</td>
                                                <td style={{ textAlign: "right" }}>{order.price} đ</td>
                                                <td>{formatDate(order.created_at)}</td>
                                                <td>{formatDate(order.due_date)}</td>
                                                <td style={{ minWidth: "150px" }}>
                                                    <OrderStatus status={order.status} changeStatus={(status) => this.changeStatus(index, order.id, status)} />
                                                </td>
                                                <td className="text-center" style={{ minWidth: "95px" }}>
                                                    <div className="btn-group">
                                                        <button className="btn btn-xs btn-info" type="button"
                                                            title="Edit Client" style={{ margin: "2px" }}
                                                            onClick={() => this.openEditOrderModal(order)}>
                                                            <i className="fa fa-pencil fa-2x"></i>
                                                        </button>
                                                        <button className="btn btn-xs btn-danger" type="button"
                                                            title="Remove Client" style={{ margin: "2px" }}
                                                            onClick={() => this.openDeleteOrderModal(order.id)}>
                                                            <i className="fa fa-trash-o fa-2x"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className="row block-content">
                            <div className="col-sm-6">
                                <div className="dataTables_info" id="DataTables_Table_1_info" role="status" aria-live="polite">Showing
                                <strong> 1 </strong>-
                                <strong>10 </strong> of
                                <strong> {this.props.total}</strong>
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="dataTables_paginate paging_simple_numbers">
                                    <ul className="pagination">
                                        <li className="paginate_button previous" aria-controls="DataTables_Table_1" onClick={() => this.switchPage(currentPage - 1)}>
                                            <a>
                                                <i className="fa fa-angle-left"></i>
                                            </a>
                                        </li>
                                        {
                                            this.state.pagination.map((index, key) =>
                                                <li className={`paginate_button ${currentPage === index ? 'active' : ''}`} key={key} onClick={() => this.switchPage(index)}>
                                                    <a>{index}</a>
                                                </li>
                                            )
                                        }

                                        <li className="paginate_button next" aria-controls="DataTables_Table_1" onClick={() => this.switchPage(currentPage + 1)}>
                                            <a>
                                                <i className="fa fa-angle-right"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <DeliveryModal
                    show={modalController.deliveryModal}
                    onHide={this.closeDeliveryModal}
                    data={modalController.deliveryData}
                    onSubmit={this.submitDeliveryModal} />

                <DeleteOrderModal
                    show={modalController.deleteOrderModal}
                    onHide={this.closeDeleteOrderModal}
                    onSubmit={this.submitDeleteOrderModal} />

                <CreateOrderModal
                    show={modalController.createOrderModal}
                    onHide={this.closeCreateOrderModal}
                    onSubmit={this.submitCreateOrderModal} />

                <EditOrderModal
                    show={modalController.editOrderModal}
                    data={modalController.editOrderData}
                    onHide={this.closeEditOrderModal}
                    onSubmit={this.submitCreateOrderModal} />
            </MasterLayout>
        );
    }
}

const mapStateToProps = state => ({
    ordersData: state.order.ordersFilteric || [],
    ordersSortBy: state.order.ordersSortBy,
    total: state.order.total,
    form: state.form,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch),
    loadOrdersList: (options) => dispatch({ type: types.GET_ORDERS_FILTERIC, options }),
    changeOrderStatus: (options) => dispatch({ type: types.CHANGE_ORDER_STATUS, options }),
})

OrderList = connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderList);

export default OrderList
