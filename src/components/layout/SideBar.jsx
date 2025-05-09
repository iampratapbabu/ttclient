import React from 'react';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DContext from '../../context/DContext';



const SideBar = () => {
    const location = useLocation();

    const { authState, authDispatch, logout } = useContext(DContext);
    const { user } = authState;


    const getClassName = (activeMenu) => {
        let activeLink = location.pathname;
        //console.log(activeLink,activeMenu);
        if (activeLink === activeMenu) {
            return "nav-link"
        } else {
            return "nav-link collapsed"
        }

    }

    return (
        <>
            <aside id="sidebar" className="sidebar">
                <ul className="sidebar-nav" id="sidebar-nav">
                    <li className="nav-item">
                        <Link to="/" className={getClassName("/")}>
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link to="/clients" className={getClassName("/clients")}>
                            <i className="bi bi-people"></i>
                            <span>Clients</span>
                        </Link>
                    </li> */}

                    {/* <li className="nav-item">
                        <Link to="/sites" className={getClassName("/sites")}>
                            <i className="bi bi-kanban"></i>
                            <span>Sites</span>
                        </Link>
                    </li> */}

                    {/* <li className="nav-item">
                        <Link to="/projects" className={getClassName("/projects")}>
                            <i className="bi bi-house-gear"></i> 
                            <span>Projects</span>
                        </Link>
                    </li> */}
                    {/* use bi bi-house-gear-fill to fill the icon */}



                    {/* <li className="nav-item">
                        <Link to="/revenue" className={getClassName("/revenue")}>
                            <i className="bi bi-currency-rupee"></i>
                            <span>Revenue</span>
                        </Link>
                    </li> */}
                    {
                        user?.client_type === "admin" &&
                        <>
                            <li className="nav-item">
                                <Link className="nav-link collapsed" data-bs-target="#client-nav" data-bs-toggle="collapse" to="#">
                                    <i className="bi bi-people"></i><span>Client Management</span><i className="bi bi-chevron-down ms-auto"></i>
                                </Link>
                                <ul id="client-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                                    <li>
                                        <Link to="/clients">
                                            <i className="bi bi-person-vcard"></i><span>Clients</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/clients/1234">
                                            <i className="bi bi-gear-wide"></i><span>Settings</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </>
                    }


                    {
                        user?.features.map((service,i) => {
                            if (service?.value == "auth_service") {
                                return (
                                    <li className="nav-item" key={i}>
                                        <Link className="nav-link collapsed" data-bs-target="#auth-nav" data-bs-toggle="collapse" to="#">
                                            <i className="bi bi-person-lock"></i><span>Auth Management</span><i className="bi bi-chevron-down ms-auto"></i>
                                        </Link>
                                        <ul id="auth-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                                            <li>
                                                <Link to="/users">
                                                    <i className="bi bi-people"></i><span>Users</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/leads/apidocs">
                                                    <i className="bi bi-code-slash"></i><span>API Docs</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                )
                            }
                            if (service?.value == "lead_service") {
                                return (
                                    <li className="nav-item" key={i}>
                                        <Link className="nav-link collapsed" data-bs-target="#lead-nav" data-bs-toggle="collapse" to="#">
                                            <i className="bi bi-person-badge"></i><span>Lead Management</span><i className="bi bi-chevron-down ms-auto"></i>
                                        </Link>
                                        <ul id="lead-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                                            <li>
                                                <Link to="/leads">
                                                    <i className="bi bi-person-badge"></i><span>Leads</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/leads/settings">
                                                    <i className="bi bi-gear-wide"></i><span>Settings</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/leads/apidocs">
                                                    <i className="bi bi-code-slash"></i><span>API Docs</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                )
                            }

                            if (service?.value == "notification_service") {
                                return (
                                    <li className="nav-item"  key={i}>
                                        <Link className="nav-link collapsed" data-bs-target="#notification-nav" data-bs-toggle="collapse" to="#">
                                            <i className="bi bi-bell"></i><span>Notification Management</span><i className="bi bi-chevron-down ms-auto"></i>
                                        </Link>
                                        <ul id="notification-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                                            <li>
                                                <Link to="/notifications">
                                                    <i className="bi bi-person-badge"></i><span>Notifications</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/notifications/settings">
                                                    <i className="bi bi-gear-wide"></i><span>Settings</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/notifications/apidocs">
                                                    <i className="bi bi-code-slash"></i><span>API Docs</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                )
                            }
                        })
                    }


                    <li className="nav-heading">Pages</li>

                    <li className="nav-item">
                        <Link to="/profile" className={getClassName("/profile")}>
                            <i className="bi bi-person"></i>
                            <span>Profile</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/faq" className={getClassName("/faq")}>
                            <i className="bi bi-question-circle"></i>
                            <span>F.A.Q</span>
                        </Link>
                    </li>
                </ul>

            </aside>
        </>
    )
}

export default SideBar