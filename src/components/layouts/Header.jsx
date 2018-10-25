import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions/';

import withRouter from 'react-router/withRouter';
import avatar from '../../assets/img/avatars/user.jpg'

class Header extends React.Component {
    state = {
        openGroupButton: false
    }

    toggleGroupButton = (value) => {
        this.setState({
            openGroupButton: !this.state.openGroupButton
        });
    }

    closeGroupButton = () => {
        this.setState({
            openGroupButton: false
        });
    }

    setNavigatorXsScreen = () => {
        this.props.setNavigator('sidebar-o-xs')
    }

    setNavigatorLgScreen = () => {
        if (this.props.navigatorStatus === '') {
            this.props.setNavigator('sidebar-mini')
        } else {
            this.props.setNavigator('')
        }
    }

    render() {
        return (
            <header id="header-navbar" className="content-mini content-mini-full">
                <ul className="nav-header pull-right">
                    <li>
                        <div className={`btn-group ${this.state.openGroupButton ? 'open' : ''}`}>
                            <button className="btn btn-default btn-image dropdown-toggle" data-toggle="dropdown" type="button"
                                onClick={this.toggleGroupButton}
                                onBlur={this.closeGroupButton}>
                                <img src={avatar} alt="Avatar" />
                                <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <li className="dropdown-header">Profile</li>
                                <li>
                                    <a tabIndex="-1">
                                        <i className="si si-settings pull-right"></i>Settings
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li className="dropdown-header">Actions</li>
                                <li onMouseDown={() => this.props.history.push('/login')}>
                                    <a tabIndex="-1" href="base_pages_login.html">
                                        <i className="si si-logout pull-right"></i>Log out
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>

                <ul className="nav-header pull-left">
                    <li className="hidden-md hidden-lg">
                        <button className="btn btn-default" type="button" onClick={this.setNavigatorXsScreen}>
                            <i className="fa fa-navicon"></i>
                        </button>
                    </li>
                    <li className="hidden-xs hidden-sm">
                        <button className="btn btn-default" type="button" onClick={this.setNavigatorLgScreen}>
                            <i className="fa fa-ellipsis-v"></i>
                        </button>
                    </li>
                </ul>
            </header>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Header));

