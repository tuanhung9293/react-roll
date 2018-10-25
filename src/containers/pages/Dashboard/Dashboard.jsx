import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../../store/actions/';
import { MasterLayout } from '../../../components/layouts';

class Dashboard extends Component {
    render() {
        return (
            <MasterLayout activeLink='dashboard'>
                <div>
                    <h1 className="text-center">Trang chủ</h1>
                </div>
            </MasterLayout>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
