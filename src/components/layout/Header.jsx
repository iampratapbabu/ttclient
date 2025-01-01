import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DContext from '../../context/DContext';

import companyLogo from '../../assets/logo/logocropped.png';

const Header = () => {
  const navigate = useNavigate();

  const { authState, authDispatch, logout } = useContext(DContext);
  const { user } = authState;


  const handlelogout = () => {
    logout();
    //debugger
    authDispatch({ type: "LOGOUT", payload: "logging out" })
    navigate('/login');
  }

  return (
    <>
      <header id="header" className="header fixed-top d-flex align-items-center">

        <div className="d-flex align-items-center justify-content-between">
          <div className="logo d-flex align-items-center justify-content-center">
            <Link to="/" className="width-min-content">
              {
                user?.logourl != "" ?
                  <img src={user?.logourl} alt="" />
                  :
                  <img src={companyLogo} alt="" />
                // <span className="d-none d-lg-block">{user?.client_name}</span>
              }
            </Link>
          </div>
          <span id="toggle-sidebar-btn" className="hamburger-icon toggle-sidebar-btn">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>

        <div className="search-bar">
          <form className="search-form d-flex align-items-center" method="POST" action="#">
            <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
            <button type="submit" title="Search"><i className="bi bi-search"></i></button>
          </form>
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">

            <li className="nav-item d-block d-lg-none">
              <a className="nav-link nav-icon search-bar-toggle " href="#">
                <i className="bi bi-search"></i>
              </a>
            </li>

            <li className="nav-item dropdown">

              <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-bell"></i>
                <span className="badge bg-primary badge-number">4</span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                  You have 4 new notifications
                  <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                  <div className="noti-msg">
                    <i className="bi bi-check-circle-fill text-success"></i>
                    <p>
                      <b>Congratulation </b>
                    </p>
                  </div>
                  <p className="time">Just Now</p>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="notification-item">
                  <div className="noti-msg">
                    <i className="bi bi-person-circle text-primary"></i>
                    <p>
                      <b>John Micle </b>
                      is now following you.
                    </p>
                  </div>
                  <p className="time">30 min</p>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                  <div className="noti-msg">
                    <i className="bi bi-chat-text-fill text-danger"></i>
                    <p>
                      <b>Sneha Jogi </b>
                      sent you a message.
                    </p>
                  </div>
                  <p className="time">7 min</p>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>



                <li className="dropdown-footer">
                  <a href="#">Show all notifications</a>
                </li>

              </ul>

            </li>

            <li className="nav-item dropdown">

              <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-chat-left-text"></i>
                <span className="badge bg-success badge-number">3</span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li className="dropdown-header">
                  You have 3 new messages
                  <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="#">
                    <img src="./assets/images/messages-1.jpg" alt="" className="rounded-circle" />
                    <div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p> <b>Maria Hudson</b></p>
                        <p>4 hrs</p>
                      </div>
                      <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="#">
                    <img src="./assets/images/messages-2.jpg" alt="" className="rounded-circle" />
                    <div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p> <b>Anna Nelson</b></p>
                        <p>6 hrs</p>
                      </div>
                      <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="dropdown-footer">
                  <a href="#">Show all messages</a>
                </li>

              </ul>

            </li>

            <li className="nav-item dropdown pe-3">

              <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                <img src={`https://ui-avatars.com/api/?name=${user?.client_name}&size=75`} alt="Profile" className="rounded-circle" />
                <span className="d-none d-md-block dropdown-toggle ps-2">{ }</span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>{user?.client_name}</h6>
                  <span>{user?.client_code}</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link to="/profile" className="dropdown-item d-flex align-items-center">
                    <i className="bi bi-person"></i>
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link to="/profile" className="dropdown-item d-flex align-items-center">
                    <i className="bi bi-gear"></i>
                    <span>Account Settings</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link to="/faq" className="dropdown-item d-flex align-items-center">
                    <i className="bi bi-question-circle"></i>
                    <span>Need Help?</span>
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link className="dropdown-item d-flex align-items-center">
                    <i className="bi bi-box-arrow-right"></i>
                    <Link onClick={handlelogout}><span>Sign Out</span></Link>
                  </Link>
                </li>

              </ul>
            </li>

          </ul>
        </nav>

      </header>

    </>
  )
}

export default Header