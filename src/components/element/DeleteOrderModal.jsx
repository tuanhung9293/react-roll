import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class DeleteOrderModal extends Component {
    render() {
        return (
            <Modal
                {...this.props}
                bsSize="large"
                aria-labelledby="contained-modal-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">Xóa đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>
                        Bạn có muốn xóa đơn hàng này?
                    </h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="default" onClick={this.props.onHide}>Không</Button>
                    <Button bsStyle="danger" onClick={this.props.onSubmit}>Có</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default DeleteOrderModal
