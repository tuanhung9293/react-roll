import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from "react-i18next";
import _ from 'lodash';

const specialPaginationItems = {
    NEXT: 'next',
    PREV: 'prev'
}

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.handleClickPaginationItem = this.handleClickPaginationItem.bind(this);
    }

    handleClickPaginationItem(e, item) {
        e.preventDefault();
        let itemIndex = this.props.page;
        if(_.isNumber(item)){
            this.props.handlePaginationClick(item);
        } else if(item === specialPaginationItems.PREV && itemIndex !== 1) {
            itemIndex --;
            this.props.handlePaginationClick(itemIndex);
        } else if(item === specialPaginationItems.NEXT && itemIndex !== _.ceil(this.props.total/this.props.perPage)) {
            itemIndex ++;
            this.props.handlePaginationClick(itemIndex);
        }
    }

    render() {
        const {
            t,
            total,
            perPage,
            page
        } = this.props;
        let paginationItems = [];
        for(var i = 1; i<= _.ceil(total/perPage); i++) {
            paginationItems.push(i);
        }
        return(
            <div className="block-content tab-content bg-white">
                <div className="text-center">
                    <ul className="pagination">
                        <li className={page === 1 ? 'disabled': ''}>
                            <a onClick={(e) => this.handleClickPaginationItem(e, specialPaginationItems.PREV)}>
                                {t('prev')}
                            </a>
                        </li>
                        { 
                            _.map(paginationItems, (item, index) => {
                                return (
                                    <li key={index} className={page === item ? 'active': ''}>
                                        <a onClick={(e) => this.handleClickPaginationItem(e, item)}>
                                            {item}
                                        </a>
                                    </li>
                                )
                            })
                        }
                        <li className={page === _.ceil(total/perPage) ? 'disabled': ''}>
                            <a onClick={(e) => this.handleClickPaginationItem(e, specialPaginationItems.NEXT)}>
                                {t('next')}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

Pagination.propTypes = {
    total: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    handlePaginationClick: PropTypes.func.isRequired,
}

Pagination.defaultProps = {
    total: 10,
    perPage: 10,
    page: 1,
}

export default translate("common")(Pagination);;