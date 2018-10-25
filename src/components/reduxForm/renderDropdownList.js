import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import DropdownList from 'react-widgets/lib/DropdownList';

class renderDropdownList extends Component {
    render() {
        const {
            input, 
            data, 
            valueField, 
            textField
        } = this.props;
        return(
            <Fragment>
                <DropdownList {...input}
                    data={data}
                    valueField={valueField}
                    textField={textField}
                    onChange={input.onChange}
                    defaultValue={input.value}
                />
            </Fragment>
        )
    }
}

renderDropdownList.propTypes = {
    data: PropTypes.array.isRequired,
    input: PropTypes.object,
    valueField: PropTypes.string,
    textField: PropTypes.string,
}

renderDropdownList.defaultProps = {
    data: [],
}

export default renderDropdownList;