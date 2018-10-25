import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
    Button,
    Modal
} from 'react-bootstrap';
import { translate } from "react-i18next";

class DeleteModal extends Component {
    render() {
        const {
            isShow,
            handleHide,
            content,
            title,
            t,
            isDeleting,
            data,
            confirmClick
        } = this.props;
        return(
            <div>
                <Modal
                    show={isShow}
                    onHide={handleHide}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            {title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {content}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            onClick={handleHide}
                            className="right-part"
                        >
                            {t('close')}
                        </Button>
                        <Button 
                            type="submit"
                            className="btn-primary right-part submit-button"
                            onClick={() => confirmClick(data)}
                            disabled={isDeleting}
                        >
                            {t('confirm')}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

DeleteModal.propTypes = {
    isShow: PropTypes.bool,
    isDeleting: PropTypes.bool,
    title: PropTypes.string,
    content: PropTypes.string,
    data: PropTypes.object,
    handleHide: PropTypes.func,
    confirmClick: PropTypes.func,
}

DeleteModal.defaultProps = {
    isShow: false,
    isDeleting: false,
    title: '',
    content: '',
    data: {}
}

export default translate("common")(DeleteModal);;