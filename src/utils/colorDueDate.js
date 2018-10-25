import * as moment from 'moment';

const colorDueDate = (date) => {
    let dueDay = moment(date)
    if(moment().isSame(dueDay, 'day')) return 'order-same-date'
    if(moment().isAfter(dueDay, 'day')) return 'order-after-date'
    return '';
}

export default colorDueDate;