import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const form = props => {
    return (
        <Field name="price" component="input" type="number" parse={value => Number(value)}/>
    );
};

const PriceForm = reduxForm({
    form: 'deliveryModal',
})(form);

class DeliveryModal extends Component {
    static defaultProps = {
        data: {}
     };
    render() {
        const { 
            data,
            newindex
        } = this.props;
        return (
            <Modal
                {...this.props}
                bsSize="large"
                aria-labelledby="contained-modal-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">Thanh toán đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-xs-3">
                            Id
                        </div>
                        <div className="col-xs-9">
                            {data.id}
                        </div>
                        <div className="col-xs-3">
                            Khách hàng
                        </div>
                        <div className="col-xs-9">
                            {data.customer && data.customer.name}
                        </div>
                        <div className="col-xs-3">
                            Ngày tạo
                        </div>
                        <div className="col-xs-9">
                            {data.created_at}
                        </div>
                        <div className="col-xs-3">
                            Thời hạn
                        </div>
                        <div className="col-xs-9">
                            {data.due_date}
                        </div>
                        <div className="col-xs-3">
                            Số tiền
                        </div>
                        <div className="col-xs-9">
                            {data.price} đ
                        </div>
                        <div className="col-xs-3">
                            Số tiền thanh toán
                        </div>
                        <div className="col-xs-9">
                            {data.price} đ
                        </div>
                    </div>
                    <hr />
                    <h3>
                        Nhập số tiền muốn thanh toán: <PriceForm />
                    </h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="danger" onClick={this.props.onHide} disabled={this.props.disabled}>Hủy bỏ</Button>
                    <Button bsStyle="primary" onClick={() => this.props.onSubmit(data.id, newindex)} disabled={this.props.disabled}>Thanh toán</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
DeliveryModal.propTypes = {
    //using on kanban
    newindex: PropTypes.number,
}

DeliveryModal.defaultProps = {
    newindex: 0,
}

export default DeliveryModal
