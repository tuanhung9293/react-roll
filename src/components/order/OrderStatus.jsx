import React, { Component } from 'react';

import 'react-select/dist/react-select.css';
import VirtualizedSelect from 'react-virtualized-select';
import 'react-virtualized-select/styles.css';

const OptionRenderer = ({ option, options, selectValue, key }) => {
    return (
        <div
            className={option.className}
            key={key}
            style={{ lineHeight: "34px", cursor: "pointer", paddingLeft: "10px" }}
            onClick={() => selectValue(option)}
        >
            {option.label}
        </div>
    )
}

class OrderStatus extends Component {
    options = [
        { value: 'new', label: 'Mới', clearableValue: false, className: 'btn-default' },
        { value: 'ready', label: 'Sẵn sàng', clearableValue: false, className: 'btn-primary' },
        { value: 'inprogress', label: 'Trong tiến trình', clearableValue: false, className: 'btn-success' },
        { value: 'delivered', label: 'Đã giao hàng', clearableValue: false, className: 'btn-danger' }
    ];

    changeStatus = (status) => {
        this.props.changeStatus(status)
    }

    render() {
        const { status } = this.props;
        return (
            <div>
                <VirtualizedSelect
                    onChange={(status) => this.changeStatus(status)}
                    optionRenderer={OptionRenderer}
                    options={this.options}
                    simpleValue
                    value={status}
                    clearable={false}
                    labelKey='label'
                    valueKey='value'
                />
            </div>
        );
    }
}

export default OrderStatus