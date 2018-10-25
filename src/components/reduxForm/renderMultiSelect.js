import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css';

class renderMultiSelect extends Component {
    render() {
        const {
            input, 
            data, 
            valueField, 
            textField
        } = this.props;
        return(
            <Fragment>
                <Multiselect {...input}
                    onBlur={() => input.onBlur()}
                    value={input.value || []} // requires value to be an array
                    data={data}
                    valueField={valueField}
                    textField={textField}
                />
            </Fragment>        
        )
    }
}

renderMultiSelect.propTypes = {
    data: PropTypes.array.isRequired,
    label: PropTypes.string,
    input: PropTypes.object,
    valueField: PropTypes.string,
    textField: PropTypes.string,
}

renderMultiSelect.defaultProps = {
    data: [],
}

export default renderMultiSelect;