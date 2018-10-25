import React, { Component } from 'react';
import PropTypes from 'prop-types';
import renderMultiselect from './../../../components/reduxForm/renderMultiSelect';
import renderDropdownList from './../../../components/reduxForm/renderDropdownList';
import './CustomerSearch.css';
import {
    Field,
    reduxForm
} from 'redux-form';
import { translate } from "react-i18next";
import _ from 'lodash';

class CustomerSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
        }
        this.onKeyUpSearchText = this.onKeyUpSearchText.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }

    onKeyUpSearchText(e) {
        this.setState({
            searchQuery: e.target.value
        })
    }

    handleSearchSubmit(values) {
        let parameters = values;
        values.searchQuery = this.state.searchQuery;
        this.props.handleSearchFormSubmit(parameters);
    }

    render() {
        const { 
            t,
            groups,
            handleSubmit,
        } = this.props;
        const pages = [10, 25, 50, 100];
        return(
            <div className="dataTables_wrapper form-inline dt-bootstrap no-footer row">
                <form>
                    <div className="col-sm-12 col-md-3">
                        <div className="per-page"> 
                            <Field
                                name="perPage"
                                component={renderDropdownList}
                                data={pages}
                            /> 
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-5">
                        <Field
                            name="groupIds"
                            component={renderMultiselect}
                            data={_.isUndefined(groups) || _.isEmpty(groups) ? [] : groups}
                            valueField="id"
                            textField="title"
                        />
                    </div>
                    <div 
                        className="col-sm-12 col-md-4 right-part"
                    >
                        <div className="form-material form-material-primary input-group remove-margin-t remove-margin-b">
                            <input 
                                className="form-control" 
                                type="text" id="base-material-text" 
                                name="base-material-text" 
                                placeholder={t('searchByName')}
                                onKeyUp={this.onKeyUpSearchText}
                            />
                            <span className="input-group-addon">
                                <button onClick={handleSubmit(this.handleSearchSubmit)}>
                                    <i className="si si-magnifier"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

CustomerSearch.propTypes = {
    groups: PropTypes.array.isRequired,
    handleSearchFormSubmit: PropTypes.func.isRequired,
}

CustomerSearch.defaultProps = {
    groups: []
}

export default translate("customer")(reduxForm({
    form: 'Customer Search Form',
    onChange: (values, dispatch, props) => {
        props.handleSearchFormSubmit(values);
    },
})(CustomerSearch)) 