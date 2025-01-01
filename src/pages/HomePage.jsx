import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Chart from "react-apexcharts";
import PageTitleAndSnackBar from '../components/common/PageTitleAndSnackBar';


const Homepage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let { q } = useParams();

  //we can access window object directly in react
  const url = window.location.href;
  const pathname = window.location.pathname;
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;

  const [searchParams, setSearchParams] = useSearchParams();

  let chartstate = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      }
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]
  };

  let piechart = {
    options: {},
    series: [44, 55, 41, 17, 15],
    labels: ['A', 'B', 'C', 'D', 'E']
  }

  useEffect(() => {
    // let url = "http://localhost:3000/?q=thisis";
    // console.log(searchParams.get('q')); //=>thisis
    // console.log(location);
    // console.log(pathname)
  }, [])

  return (

    <>


      <PageTitleAndSnackBar pageTitle="Dashboard" />


      <section className="section dashboard">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              {/* <div className="col-xxl-3 col-md-6">
                  <div className="card info-card welcome-card">
                    <div className="card-body">
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <h1>Hello, Prashant</h1>
                          <p>Welcome back! Let's start from where you left.</p><a className="btn" href="#">View Profile</a>
                        </div>
                        <div className="flex-shrink-0"> <img src="../assets/images/dashboard/welcome.png" alt="" /></div>
                      </div>
                    </div>
                  </div>
                </div> */}
              <div className="col-xxl-3 col-md-6">
                <Link to="/leads">
                  <div className="card info-card sales-card">
                    <div className="filter">
                      <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li><a className="dropdown-item" href="#">Today</a></li>
                        <li><a className="dropdown-item" href="#">This Month</a></li>
                        <li><a className="dropdown-item" href="#">This Year</a></li>
                      </ul>
                    </div>

                    <div className="card-body">
                      <h5 className="card-title">Leads <span>| Today</span></h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart"></i>
                        </div>
                        <div className="ps-3">
                          <h6>145</h6>
                          <span className="text-success small pt-1 fw-bold">12%</span> <span
                            className="text-muted small pt-2 ps-1">increase</span>

                        </div>
                      </div>
                    </div>

                  </div>
                </Link>
              </div>

              <div className="col-xxl-3 col-md-6">
                <Link to="/projects">
                  <div className="card info-card sales-card">

                    <div className="filter">
                      <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li><a className="dropdown-item" href="#">Today</a></li>
                        <li><a className="dropdown-item" href="#">This Month</a></li>
                        <li><a className="dropdown-item" href="#">This Year</a></li>
                      </ul>
                    </div>

                    <div className="card-body">
                      <h5 className="card-title">Projects <span>| Today</span></h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart"></i>
                        </div>
                        <div className="ps-3">
                          <h6>145</h6>
                          <span className="text-success small pt-1 fw-bold">12%</span> <span
                            className="text-muted small pt-2 ps-1">increase</span>

                        </div>
                      </div>
                    </div>

                  </div>
                </Link>
              </div>

              <div className="col-xxl-3 col-md-6">
                <Link to="/revenue">
                  <div className="card info-card revenue-card">

                    <div className="filter">
                      <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li><a className="dropdown-item" href="#">Today</a></li>
                        <li><a className="dropdown-item" href="#">This Month</a></li>
                        <li><a className="dropdown-item" href="#">This Year</a></li>
                      </ul>
                    </div>

                    <div className="card-body">
                      <h5 className="card-title">Revenue <span>| This Month</span></h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-currency-dollar"></i>
                        </div>
                        <div className="ps-3">
                          <h6>$3,264</h6>
                          <span className="text-success small pt-1 fw-bold">8%</span> <span
                            className="text-muted small pt-2 ps-1">increase</span>

                        </div>
                      </div>
                    </div>

                  </div>
                </Link>
              </div>

              <div className="col-xxl-3 col-xl-6">
                <Link to="/clients">
                  <div className="card info-card customers-card">

                    <div className="filter">
                      <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li><a className="dropdown-item" href="#">Today</a></li>
                        <li><a className="dropdown-item" href="#">This Month</a></li>
                        <li><a className="dropdown-item" href="#">This Year</a></li>
                      </ul>
                    </div>

                    <div className="card-body">
                      <h5 className="card-title">Clients <span>| This Year</span></h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-people"></i>
                        </div>
                        <div className="ps-3">
                          <h6>1244</h6>
                          <span className="text-danger small pt-1 fw-bold">12%</span> <span
                            className="text-muted small pt-2 ps-1">decrease</span>

                        </div>
                      </div>

                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-xxl-7 col-xl-12">
                <Chart
                  options={chartstate.options}
                  series={chartstate.series}
                  type="line"
                  width="500"
                />

              </div>

              <div className="col-xxl-5 col-xl-12">
                <Chart options={piechart.options}
                  series={piechart.series}
                  type="donut"
                  width="400"
                />
              </div>





            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Homepage;