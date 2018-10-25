import React from 'react';
import moment from 'moment';
import Helmet from 'react-helmet';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import 'moment/locale/vi';

export default class FromToDatePicker extends React.Component {
    componentWillUnmount = () => {
        clearTimeout(this.timeout);
    }
    focusTo = () => {
        this.timeout = setTimeout(() => this.to.getInput().focus(), 0);
    }
    showFromMonth = () => {
        const { from, to } = this.state;
        if (!from) {
            return;
        }
        if (moment(to).diff(moment(from), 'months') < 2) {
            this.to.getDayPicker().showMonth(from);
        }
    }
    handleFromChange = (from) => {
        this.setState({ from });
    }
    handleToChange = (to) => {
        this.setState({ to }, this.showFromMonth);
    }

    render() {
        const { from, to } = this.props;
        const modifiers = { start: from, end: to };
        return (
            <div className="InputFromTo">
                <DayPickerInput
                    value={from}
                    placeholder="From"
                    format="ll"
                    formatDate={formatDate}
                    parseDate={parseDate}
                    dayPickerProps={{
                        locale: 'vi',
                        localeUtils: MomentLocaleUtils,
                        selectedDays: [from, { from, to }],
                        disabledDays: { after: to },
                        toMonth: to,
                        modifiers,
                        numberOfMonths: 2,
                        onDayClick: () => this.to.getInput().focus(),
                    }}
                    onDayChange={this.props.handleFromChange}
                />{' '}
                —{' '}
                <span className="InputFromTo-to">
                    <DayPickerInput
                        ref={el => (this.to = el)}
                        value={to}
                        placeholder="To"
                        format="ll"
                        formatDate={formatDate}
                        parseDate={parseDate}
                        dayPickerProps={{
                            locale: 'vi',
                            localeUtils: MomentLocaleUtils,
                            selectedDays: [from, { from, to }],
                            disabledDays: { before: from },
                            modifiers,
                            month: from,
                            fromMonth: from,
                            numberOfMonths: 2,
                        }}
                        onDayChange={this.props.handleToChange}
                    />
                </span>
                <Helmet>
                    <style>{`
                        .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                            background-color: #f0f8ff !important;
                            color: #4a90e2;
                        }
                        .InputFromTo .DayPicker-Day {
                            border-radius: 0 !important;
                        }
                        .InputFromTo .DayPicker-Day--start {
                            border-top-left-radius: 50% !important;
                            border-bottom-left-radius: 50% !important;
                        }
                        .InputFromTo .DayPicker-Day--end {
                            border-top-right-radius: 50% !important;
                            border-bottom-right-radius: 50% !important;
                        }
                        .InputFromTo .DayPickerInput-Overlay {
                            width: 410px;
                        }
                        .InputFromTo-to .DayPickerInput-Overlay {
                            margin-left: -215px;
                        }
                        `}
                    </style>
                </Helmet>
            </div>
        );
    }
}
