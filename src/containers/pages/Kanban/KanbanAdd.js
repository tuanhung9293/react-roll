import React, { Component } from 'react';
import {
    CreateOrderModal
} from './../../../components/element/index';
import {
    Button
} from 'react-bootstrap';

class KanbanAdd extends Component {
    render() {
        const { 
            isShowNewOrderModal,
            isSubmittingNewOrderModal,
            handleCloseNewOrderModal,
            handleSubmitNewOrderModal,
            handleOpenNewOrderModal,
            t
        } = this.props;
        return (
            <div>
                <Button className="btn btn-primary" onClick={handleOpenNewOrderModal}>
                    {t('add')}
                </Button>
                <CreateOrderModal
                    show={isShowNewOrderModal}
                    onHide={handleCloseNewOrderModal}
                    onSubmit={handleSubmitNewOrderModal}
                    disabled={isSubmittingNewOrderModal}
                />
            </div>
        )
    }
}

export default KanbanAdd;