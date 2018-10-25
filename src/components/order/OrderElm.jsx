import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, formValueSelector, reduxForm } from 'redux-form';

const selector = formValueSelector("createOrder");

let Order = ({ order, index, fields, totalPrice }) =>
    <tr key={index}>
        <td className="text-center">{index + 1}</td>
        <td>
            <Field name={`${order}.content`}
                component="textarea"
                rows="1"
                className="form-control" />
        </td>
        <td>
            <Field name={`${order}.unit`}
                component="input" type="text"
                className="form-control" />
        </td>
        <td>
            <Field name={`${order}.quantity`}
                component="input" type="number"
                parse={value => Number(value)}
                className="form-control text-right" />
        </td>
        <td>
            <Field name={`${order}.price`}
                component="input" type="number"
                parse={value => Number(value)}
                className="form-control text-right" />
        </td>
        <td className="text-right">
            {totalPrice} đ
        </td>
        <td className="text-center">
            <button className="btn btn-xs btn-danger" type="button"
                onClick={() => fields.remove(index)}>
                <i className="fa fa-trash-o fa-2x"></i>
            </button>
        </td>
    </tr>

Order = connect(
    (state, props) => ({
        totalPrice: selector(state, `${props.order}.quantity`) * selector(state, `${props.order}.price`),
    }),
)(Order)

let renderOrders = ({ fields, orderPrice }) => (
    <tbody>
        {fields.map((order, index) => (
            <Order order={order} fields={fields} index={index} key={index} />
        ))}
        <tr>
            <td colSpan="5" className="text-right">Tổng tiền:</td>
            <td className="text-right">{orderPrice || 0} đ</td>
            <td>
                <button type="button" className="btn btn-primary"
                onClick={() => fields.push({ quantity: null, price: null })}>Thêm</button>
            </td>
        </tr>
    </tbody>
)

const calculatePrice = (arrayData) => {
    if (arrayData === undefined) return 0;
    let mapValue = arrayData.map(el => el.quantity * el.price);
    if (mapValue.length < 1) return 0;
    let reduceValue = mapValue.reduce((a, b) => a + b);
    return reduceValue;
}

renderOrders = connect(
    (state, props) => (
        {
            orderPrice: calculatePrice(selector(state, `${props.fields.name}`))
        }
    )
)(renderOrders)

class OrderElm extends Component {
    render() {
        return (
            <FieldArray name="contents" component={renderOrders} />
        );
    }
}

OrderElm = reduxForm({
    form: 'createOrder',
})(OrderElm)

const mapStateToProps = (state, ownProps) => ({
    initialValues: ownProps.initialData,
});

export default connect(
    mapStateToProps,
    null
)(OrderElm);