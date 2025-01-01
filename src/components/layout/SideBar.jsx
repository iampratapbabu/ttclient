import React from 'react';
import { Link, useLocation } from 'react-router-dom';



const SideBar = () => {
    const location = useLocation();


    const getClassName = (activeMenu) =>{
        let activeLink = location.pathname;
        //console.log(activeLink,activeMenu);
        if(activeLink === activeMenu){
            return "nav-link"
        }else{
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

                    <li className="nav-item">
                        <Link to="/projects" className={getClassName("/projects")}>
                            <i className="bi bi-house-gear"></i> 
                            {/* use bi bi-house-gear-fill to fill the icon */}
                            <span>Projects</span>
                        </Link>
                    </li>


                    {/* <li className="nav-item">
                        <Link to="/revenue" className={getClassName("/revenue")}>
                            <i className="bi bi-currency-rupee"></i>
                            <span>Revenue</span>
                        </Link>
                    </li> */}

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#auth-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-lock"></i><span>Auth Management</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="auth-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link to="#">
                                    <i className="bi bi-circle"></i><span>Employees</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="#">
                                    <i className="bi bi-circle"></i><span>Attendance</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="#">
                                    <i className="bi bi-circle"></i><span>Salary</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    
                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#lead-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-lock"></i><span>Lead Management</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="lead-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link to="#">
                                    <i className="bi bi-circle"></i><span>Employees</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="#">
                                    <i className="bi bi-circle"></i><span>Attendance</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="#">
                                    <i className="bi bi-circle"></i><span>Salary</span>
                                </Link>
                            </li>
                        </ul>
                    </li>


   

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