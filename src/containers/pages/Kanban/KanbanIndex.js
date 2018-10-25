import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as types from './../../../store/actions/ActionTypes';
import KanbanAdd from './KanbanAdd';
import KanbanList from './KanbanList';
import _ from 'lodash';
import { MasterLayout } from './../../../components/layouts';
import { 
    orderStatus ,
    CRUD,
    ORDERS_CHANNEL,
    masterLayout
} from './../../../constants/commonData';
import { translate } from 'react-i18next';
import actionCable from 'actioncable';
import { WS_URL } from './../../../constants/Api';

class KanbanIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDeliveryModal: false,
            isSubmittingDeliveryModal: false,
            isShowNewOrderModal: false,
            isSubmittingNewOrderModal: false,
        };
        this.socket = null;
    }

    componentWillMount() {
        const cable = actionCable.createConsumer(WS_URL)
        this.sub = cable.subscriptions.create(ORDERS_CHANNEL, {
            received: this.handleReceiveNews
        })
    }

    componentDidMount() {
        this.props.loadOrdersList({
            "show_all": false,
            "pagination": {
                "page": 1,
                "per_page": 1000,
            }
        });
        this.props.getAllCustomers();
    }

    handleReceiveNews = (values) => {
        switch(values.method) {
            case CRUD.CREATE: {
                let customer = _.find(this.props.customers, customer => {
                    return customer.id === values.data.customer_id;
                })
                let order = values.data;
                order['customer'] = customer;
                this.props.createOrder({order});
                break;
            }
            case CRUD.UPDATE: {
                this.props.updateOrder(values.data, 0);
                break;
            }
            case CRUD.DELELTE: {
                this.props.deleteOrder(values.data);
                break;
            }   
            default: {
                break;
            }
        }
    }

    arrangeOrder = (orders) => {
        let newList = [
            {
                id: orderStatus.NEW,
                list: _.filter(orders, order => {
                    return order.status === orderStatus.NEW
                })
            },
            {
                id: orderStatus.INPROGRESS,
                list: _.filter(orders, order => {
                    return order.status === orderStatus.INPROGRESS
                })
            },
            {
                id: orderStatus.READY,
                list: _.filter(orders, order => {
                    return order.status === orderStatus.READY
                })
            },
            {
                id: orderStatus.DELIVERED,
                list: _.filter(orders, order => {
                    return order.status === orderStatus.DELIVERED
                })
            }
        ];
        return newList;
    }

    handleEditOrder = (selectedOrder, newindex = 0) => {
        this.props.editOrder(selectedOrder, newindex);
    }

    handleOpentDeliveryModal = () => {
        this.setState({
            isShowDeliveryModal: true,
        })
    }

    handleCloseDeliveryModal = () => {
        this.setState({
            isShowDeliveryModal: false,
        })
    }

    handleSubmitDeliveryModal = (values, newindex) => {
        const parameters = {
            id: values,
            amount: this.props.form.deliveryModal.values.price,
            status: orderStatus.DELIVERED,
            newindex
        }
        this.setState({
            isSubmittingDeliveryModal: true,
        }, () => {
            this.props.payOrder(parameters, () => {
                this.setState({
                    isShowDeliveryModal: false,
                    isSubmittingDeliveryModal: false,
                })
            });
        })
    }

    handleOpenNewOrderModal = () => {
        this.setState({
            isShowNewOrderModal: true,
        })
    }

    handleCloseNewOrderModal = () => {
        this.setState({
            isShowNewOrderModal: false,
        })
    }

    handleSubmitNewOrderModal = () => {
        this.setState({
            isSubmittingNewOrderModal: true,
        }, () => {
            
        })
    }
 
    render() {
        const { 
            orders,
            t
        } = this.props;
        const {
            isShowDeliveryModal,
            isSubmittingDeliveryModal,
            isShowNewOrderModal,
            isSubmittingNewOrderModal,
        } = this.state;
        return (
            <MasterLayout activeLink={masterLayout.KANBAN}>
                <KanbanAdd 
                    isShowNewOrderModal={isShowNewOrderModal}
                    isSubmittingNewOrderModal={isSubmittingNewOrderModal}
                    handleOpenNewOrderModal={this.handleOpenNewOrderModal}
                    handleCloseNewOrderModal={this.handleCloseNewOrderModal}
                    handleSubmitNewOrderModal={this.handleSubmitNewOrderModal}
                    t={t}
                />
                <KanbanList
                    arrangedList={this.arrangeOrder(orders)}
                    handleEditOrder={this.handleEditOrder}
                    handleOpentDeliveryModal={this.handleOpentDeliveryModal}
                    isShowDeliveryModal={isShowDeliveryModal}
                    handleCloseDeliveryModal={this.handleCloseDeliveryModal}
                    handleSubmitDeliveryModal={this.handleSubmitDeliveryModal}
                    isSubmittingDeliveryModal={isSubmittingDeliveryModal}
                    t={t}
                />
            </MasterLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        orders: state.order.ordersFilteric,
        form: state.form,
        customers: state.customerData.customers,
    }
};

function mapDispatchToProps(dispatch) {
    return {
        loadOrdersList: (options) => dispatch({ type: types.GET_ORDERS_FILTERIC, options }),
        getAllCustomers: () => dispatch({ type: types.GET_ALL_CUSTOMERS }),
        editOrder: (options, newindex) => dispatch({ type: types.EDIT_ORDER, options, newindex }),
        payOrder: (options, callback) => dispatch({ type: types.ORDER_PAYMENT, options, callback }),
        updateOrder: (data, newindex) => dispatch({ type: types.UPDATE_ORDER_SUCCESS, data, newindex}),
        createOrder: (data) => dispatch({ type: types.CREATE_ORDER_SUCCESS, data }),
        deleteOrder: (data) => dispatch({ type: types.DELETE_ORDER_SUCCESS, data })
    }
}

export default translate('order')(connect(
    mapStateToProps,
    mapDispatchToProps
)(KanbanIndex));
