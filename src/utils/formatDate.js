import * as moment from 'moment';
import localization from 'moment/locale/vi'

const formatDate = (date) => {
    let formatedDate = moment(date).locale('vi', localization).format('ll');
    return formatedDate;
}

export default formatDate;