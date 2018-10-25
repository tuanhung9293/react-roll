import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../../store/actions/';

import { SingleInput } from '../../../components/element';
import { OrderElm } from '../../../components/order';
import 'react-day-picker/lib/style.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import 'moment/locale/vi';

class OrderForm extends Component {
    static propTypes = {
        onRef: PropTypes.func.isRequired,
        orderElm: PropTypes.object.isRequired,
        orderId: PropTypes.string,
        dueDate: PropTypes.string,
        customerId: PropTypes.number,
        payMount: PropTypes.object,
        editingMode: PropTypes.bool,
    };

    state = {
        due_date: this.props.dueDate,
        customer_id: this.props.customerId,
    }

    componentDidMount() {
        this.props.onRef(this);
        this.props.actions.getAllCustomer();
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    optionsConverted = () => {
        let convertedData = this.props.allCustomer && this.props.allCustomer.map((item) => {
            return {
                ...item,
                value: item.id,
                label: item.name,
            }
        })
        return convertedData;
    }

    handleCustomerChange = (customer) => {
        this.setState({
            customer_id: customer,
        });
    }

    handleDayChange = (day) => {
        this.setState({ due_date: day });
    }

    orderFormSubmit = () => {
        let ordersCalculated = this.props.dataForm.contents.map((item) => {
            return {
                ...item,
                total: item.quantity * item.price,
            }
        })

        let orderPrice = ordersCalculated.reduce((a, b) => {
            return a.total + b.total
        })

        let dataSubmit = {
            ...this.state,
            contents: ordersCalculated,
            price: orderPrice
        }

        if (this.props.edittingMode) {
            this.props.actions.updateOrder(this.props.orderId, dataSubmit);
        } else {
            this.props.actions.createOrder(dataSubmit);
        }
    }

    render() {
        const today = new Date();
        return (
            <div className="block order-form">
                <div className="block-content">
                    <h3 className="block-title">Chi tiết *</h3>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="thead-table">
                                <tr>
                                    <th>stt</th>
                                    <th>Nội dung</th>
                                    <th>Đơn vị</th>
                                    <th>Số lượng</th>
                                    <th>Giá từng đơn vị (VND)</th>
                                    <th>Thành tiền</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <OrderElm initialData={this.props.orderElm} />
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-6">
                        <div className="block-content">
                            <h3 className="block-title">Khách hàng *</h3>
                            <Select
                                id="customer-select"
                                onBlurResetsInput={false}
                                onSelectResetsInput={false}
                                autoFocus
                                options={this.optionsConverted()}
                                simpleValue
                                clearable={true}
                                name="selected-customer"
                                value={this.state.customer_id}
                                onChange={this.handleCustomerChange}
                                searchable={true}
                            />
                        </div>
                    </div>
                    <div className="col-xs-6">
                        {
                            this.state.editingMode && 
                            <div className="block-content">
                                <h3 className="block-title">Số tiền đã thanh toán:</h3>
                                <SingleInput initialData={this.props.payMount} />
                            </div>
                        }
                        <div className="block-content">
                            <h3 className="block-title">Thời hạn *</h3>
                            <DayPickerInput onDayChange={this.handleDayChange}
                                format={'D/M/YYYY'}
                                placeholder="D/M/YYYY"
                                formatDate={formatDate}
                                parseDate={parseDate}
                                value={this.state.due_date}
                                dayPickerProps={{
                                    locale: 'vi',
                                    localeUtils: MomentLocaleUtils,
                                    disabledDays: { before: today }
                                }}
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    dataForm: state.form.createOrder && state.form.createOrder.values,
    allCustomer: state.order.allCustomer
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})

OrderForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderForm);

export default OrderForm
