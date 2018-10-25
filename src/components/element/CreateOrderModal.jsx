import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { OrderForm } from '../../containers/pages';

class OrderFormModal extends Component {
    render() {
        return (
            <Modal
                {...this.props}
                dialogClassName="create-order-modal"
                aria-labelledby="contained-modal-order"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-order">Tạo mới đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <OrderForm onRef={ref => (this.child = ref)}
                            orderElm={{ contents: [{ quantity: null, price: null }] }} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="danger" onClick={this.props.onHide} disabled={this.props.disabled}>Hủy bỏ</Button>
                    <Button bsStyle="primary" onClick={() => this.child.createOrderSubmit()} disabled={this.props.disabled}>Tạo mới</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default OrderFormModal
