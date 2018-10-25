import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { OrderForm } from '../../containers/pages';
import * as moment from 'moment';
import localization from 'moment/locale/vi'

class EditOrderModal extends Component {
    render() {
        const { data } = this.props;
        return (
            <Modal
                {...this.props}
                bsSize="large"
                aria-labelledby="contained-modal-order"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-order">Chỉnh sửa đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <OrderForm onRef={ref => (this.child = ref)}
                            orderElm={{ contents: data.contents && JSON.parse(data.contents) }}
                            orderId={data.id}
                            dueDate={moment(data.due_date).locale('vi', localization).format('l')}
                            customerId={data.customer && data.customer.id}
                            payMount={{payMount: data.paid_amount}}
                            edittingMode={true}/> 
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="danger" onClick={this.props.onHide}>Hủy bỏ</Button>
                    <Button bsStyle="primary" onClick={() => this.child.orderFormSubmit()}>Cập nhật</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default EditOrderModal
