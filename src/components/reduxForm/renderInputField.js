import React, { Component } from 'react';
import PropTypes from 'prop-types';

class renderInputField extends Component {
    render() {
        const {
            input,
            label,
            type,
            meta: { touched, error },
        } = this.props;
        return(
            <div className={touched && error ? 'has-error' : ''} >
                <label>{label}</label>
                <div>
                    <input 
                        {...input} 
                        placeholder={label} 
                        type={type}
                        className="form-control"
                    />
                    {
                        touched && (error && <div className="help-block animated fadeInDown has-error">{error}</div>)
                    }
                </div>
            </div>        
        )
    }
}

renderInputField.propTypes = {
    label: PropTypes.string,
    meta: PropTypes.object,
    input: PropTypes.object,
    type: PropTypes.string
}

export default renderInputField;