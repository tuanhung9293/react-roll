import React from 'react';

import { Link } from 'react-router-dom'
import logo from '../../assets/img/avatars/logo.png';

class Navigator extends React.Component {
    state = {
        openSubmenu: [false]
    }

    toggleSubmenu = (id) => {
        let currentSubmenu = this.state.openSubmenu;
        currentSubmenu[id] = !this.state.openSubmenu[id];
        this.setState({ openSubmenu: currentSubmenu })
    }

    render() {
        return (
            <nav id="sidebar">
                <div id="sidebar-scroll">
                    <div className="sidebar-content">
                        <div className="side-header side-content bg-white-op">
                            <button className="btn btn-link text-gray pull-right hidden-md hidden-lg" type="button" onClick={() => this.props.setNavigator('')}>
                                <i className="fa fa-times"></i>
                            </button>
                            <a className="h5 text-white" href="index.html">
                                <img src={logo} alt="" style={{ height: "16px" }} /> <span className="h4 font-w600 sidebar-mini-hide">Nam Hải</span>
                            </a>
                        </div>

                        <div className="side-content">
                            <ul className="nav-main">
                                <li>
                                    <Link to={'dashboard'} className={`${this.props.activeLink === 'dashboard' ? 'active' : ''}`}>
                                        <i className="si si-speedometer"></i><span className="sidebar-mini-hide">Trang chủ</span>
                                    </Link>
                                </li>
                                <li className="nav-main-heading"><span className="sidebar-mini-hide">User Interface</span></li>
                                <li>
                                    <Link to={'kanban'} className={`${this.props.activeLink === 'kanban' ? 'active' : ''}`}>
                                        <i className="fa fa-credit-card"></i><span className="sidebar-mini-hide">Kanban</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'order'} className={`${this.props.activeLink === 'order' ? 'active' : ''}`}>
                                        <i className="fa fa-tasks"></i><span className="sidebar-mini-hide">Danh sách đơn hàng</span>
                                    </Link>
                                </li>
                                <li className={`${this.state.openSubmenu[0] ? 'open' : ''}`} onClick={() => this.toggleSubmenu(0)}>
                                    <a className="nav-submenu" data-toggle="nav-submenu"><i className="fa fa-envelope"></i><span className="sidebar-mini-hide">Báo giá</span></a>
                                    <ul>
                                        <li>
                                            <a href="">Gửi báo giá</a>
                                            <a href="">Lịch sử báo giá</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link to={'customer'} className={`${this.props.activeLink === 'customer' ? 'active' : ''}`}>
                                        <i className="fa fa-user"></i><span className="sidebar-mini-hide">Khách hàng</span>
                                    </Link>
                                </li>
                                <li>
                                    <a href=""><i className="fa fa-user-plus"></i><span className="sidebar-mini-hide">Quản lý nhân viên</span></a>
                                </li>
                                <li>
                                    <a href=""><i className="fa fa-users"></i><span className="sidebar-mini-hide">Nhóm khách hàng</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navigator;
