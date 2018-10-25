import React, { Component } from 'react';
import { Creatable } from 'react-select'

import 'react-select/dist/react-select.css';
import VirtualizedSelect from 'react-virtualized-select';
import 'react-virtualized-select/styles.css';

class OrderStatusSearch extends Component {
    options = [
        { value: 'new', label: 'Mới' },
        { value: 'ready', label: 'Sẵn sàng' },
        { value: 'inprogress', label: 'Trong tiến trình' },
        { value: 'delivered', label: 'Đã giao hàng' }
    ];

    changeStatus = (status) => {
        this.props.changeStatus(status)
    }

    render() {
        const { statusSearch, statusSearchHandle } = this.props;
        return (
            <div>
                <VirtualizedSelect
                    labelKey='label'
                    multi
                    onChange={statusSearchHandle}
                    optionHeight={40}
                    options={this.options}
                    selectComponent={Creatable}
                    simpleValue
                    value={statusSearch}
                    valueKey='value'
                />
            </div>
        );
    }
}

export default OrderStatusSearch