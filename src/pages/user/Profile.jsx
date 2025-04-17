import React, { useContext } from 'react';
import PageTitleAndSnackBar from '../../components/common/PageTitleAndSnackBar'
import DContext from '../../context/DContext';

const Profile = () => {


  const { authState, authDispatch, logout } = useContext(DContext);
  const { user } = authState;

  return (
    <>

      <PageTitleAndSnackBar pageTitle="Profile" />

      {/* <!-- End Page Title --> */}

      <section className="section profile">
        <div className="row">
          <div className="col-xl-4">

            <div className="card">
              <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">

                <img src={`https://ui-avatars.com/api/?name=${user?.client_name}&size=200`} alt="Profile" className="rounded-circle" />
                <h2>{user?.client_name}</h2>
                <h3>{user?.client_code}</h3>
                {/* <div className="social-links mt-2">
                  <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                  <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                  <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                  <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                </div> */}
              </div>
            </div>

          </div>

          <div className="col-xl-8">

            <div className="card">
              <div className="card-body pt-3">
                {/* <!-- Bordered Tabs --> */}
                <ul className="nav nav-tabs nav-tabs-bordered">

                  <li className="nav-item">
                    <button className="nav-link active" data-bs-toggle="tab"
                      data-bs-target="#profile-overview">Overview</button>
                  </li>

                  <li className="nav-item">
                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit
                      Profile</button>
                  </li>

                  <li className="nav-item">
                    <button className="nav-link" data-bs-toggle="tab"
                      data-bs-target="#profile-settings">Settings</button>
                  </li>

                  <li className="nav-item">
                    <button className="nav-link" data-bs-toggle="tab"
                      data-bs-target="#profile-change-password">Change Password</button>
                  </li>

                </ul>
                <div className="tab-content pt-2">

                  <div className="tab-pane fade show active profile-overview" id="profile-overview">
                    {/* <h5 className="card-title">About</h5>
                    <p className="small fst-italic">Sunt est soluta temporibus accusantium neque nam maiores
                      cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt
                      iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea
                      saepe at unde.</p> */}

                    <h5 className="card-title">Profile Details</h5>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label ">Full Name</div>
                      <div className="col-lg-9 col-md-8">{user?.client_name}</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Email</div>
                      <div className="col-lg-9 col-md-8">{user?.client_email}</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Client Code</div>
                      <div className="col-lg-9 col-md-8">{user?.client_code}</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Client Secret</div>
                      <div className="col-lg-9 col-md-8">{user?.client_secret}</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Services Opted</div>
                      <div className="col-lg-9 col-md-8">
                        {
                          user?.features.map(service =>(
                            <h6>{service?.name}</h6>

                          ))
                        }
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Status</div>
                      <div className="col-lg-9 col-md-8">{user?.status}</div>
                    </div>

                  </div>

                  <div className="tab-pane fade profile-edit pt-3" id="profile-edit">

                    {/* <!-- Profile Edit Form --> */}
                    <form>
                      <div className="row mb-3">
                        <label for="profileImage" className="col-md-4 col-lg-3 col-form-label">Profile
                          Image</label>
                        <div className="col-md-8 col-lg-9">
                          <img src="./assets/images/profile-img.jpg" alt="Profile" />
                          <div className="pt-2">
                            <a href="#" className="btn btn-primary btn-sm"
                              title="Upload new profile image"><i
                                className="bi bi-upload"></i></a>
                            <a href="#" className="btn btn-danger btn-sm"
                              title="Remove my profile image"><i className="bi bi-trash"></i></a>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-3 align-items-center">
                        <label for="fullName" className="col-md-4 col-lg-3 col-form-label">Full
                          Name</label>
                        <div className="col-md-8 col-lg-9">
                          <div className="form-floating">
                            <input type="text" className="form-control" id="floatingPassword" placeholder="Full Name" />
                            <label for="floatingPassword">Full Name</label>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-3 ">
                        <label for="about" className="col-md-4 col-lg-3 col-form-label mt-2">About</label>
                        <div className="col-md-8 col-lg-9">
                          <div className="form-floating">
                            <textarea className="form-control" placeholder="About" id="floatingTextarea" style={{ height: "120px" }}></textarea>
                            <label for="floatingTextarea">About</label>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-3 align-items-center">
                        <label for="company"
                          className="col-md-4 col-lg-3 col-form-label">Company</label>
                        <div className="col-md-8 col-lg-9">
                          <div className="form-floating">
                            <input type="text" className="form-control" id="floatingCompany" placeholder="Company" />
                            <label for="floatingCompany">Company</label>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-3 align-items-center">
                        <label for="Job" className="col-md-4 col-lg-3 col-form-label">Job</label>
                        <div className="col-md-8 col-lg-9">
                          <div className="form-floating">
                            <input type="text" className="form-control" id="floatingJob" placeholder="Job" />
                            <label for="floatingJob">Job</label>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-3 align-items-center">
                        <label for="Country"
                          className="col-md-4 col-lg-3 col-form-label">Country</label>
                        <div className="col-md-8 col-lg-9">
                          <div className="form-floating">
                            <input type="text" className="form-control" id="floatingCountry" placeholder="Country" />
                            <label for="floatingCountry">Country</label>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-3 align-items-center">
                        <label for="Address"
                          className="col-md-4 col-lg-3 col-form-label">Address</label>
                        <div className="col-md-8 col-lg-9">
                          <div className="form-floating">
                            <input type="text" className="form-control" id="floatingAddress" placeholder="Address" />
                            <label for="floatingAddress">Address</label>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-3 align-items-center">
                        <label for="Phone" className="col-md-4 col-lg-3 col-form-label">Phone</label>
                        <div className="col-md-8 col-lg-9">
                          <div className="form-floating">
                            <input type="number" className="form-control" id="floatingPhone" placeholder="Phone" />
                            <label for="floatingPhone">Phone</label>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-3 align-items-center">
                        <label for="Email" className="col-md-4 col-lg-3 col-form-label">Email</label>
                        <div className="col-md-8 col-lg-9">
                          <div className="form-floating">
                            <input type="email" className="form-control" id="floatingEmail" placeholder="Email" />
                            <label for="floatingEmail">Email</label>
                          </div>
                        </div>
                      </div>

                      <div className="text-center mt-5">
                        <button type="submit" className="btn btn-primary rounded-pill">Save Changes</button>
                      </div>
                    </form>
                    {/* <!-- End Profile Edit Form --> */}

                  </div>

                  <div className="tab-pane fade pt-3" id="profile-settings">

                    {/* <!-- Settings Form --> */}
                    <form>

                      <div className="row mb-3">
                        <label for="fullName" className="col-md-4 col-lg-3 col-form-label">Email
                          Notifications</label>
                        <div className="col-md-8 col-lg-9">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="changesMade"
                              checked />
                            <label className="form-check-label" for="changesMade">
                              Changes made to your account
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="newProducts"
                              checked />
                            <label className="form-check-label" for="newProducts">
                              Information on new products and services
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="proOffers" />
                            <label className="form-check-label" for="proOffers">
                              Marketing and promo offers
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="securityNotify"
                              checked disabled />
                            <label className="form-check-label" for="securityNotify">
                              Security alerts
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                      </div>
                    </form>
                    {/* <!-- End settings Form --> */}

                  </div>

                  <div className="tab-pane fade pt-3" id="profile-change-password">
                    {/* <!-- Change Password Form --> */}
                    <form>

                      <div className="row mb-3 align-items-center">
                        <label for="currentPassword"
                          className="col-md-4 col-lg-3 col-form-label">Current Password</label>
                        <div className="col-md-8 col-lg-9">
                          <div className="form-floating">
                            <input type="password" className="form-control" id="floatingcurrentPassword" placeholder="currentPassword" />
                            <label for="floatingcurrentPassword">Current Password</label>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-3 align-items-center">
                        <label for="newPassword" className="col-md-4 col-lg-3 col-form-label">New
                          Password</label>
                        <div className="col-md-8 col-lg-9">
                          <div className="form-floating">
                            <input type="password" className="form-control" id="floatingnewPassword" placeholder="newPassword" />
                            <label for="floatingnewPassword">New Password</label>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label for="renewPassword" className="col-md-4 col-lg-3 col-form-label">Re-enter
                          New Password</label>
                        <div className="col-md-8 col-lg-9">
                          <div className="form-floating">
                            <input type="password" className="form-control" id="floatingrenewPassword" placeholder="renewPassword" />
                            <label for="floatingrenewPassword">Re New Password</label>
                          </div>
                        </div>
                      </div>

                      <div className="text-center mt-5">
                        <button type="submit" className="btn btn-primary rounded-pill">Change Password</button>
                      </div>


                    </form>
                    {/* <!-- End Change Password Form --> */}

                  </div>

                </div>
                {/* <!-- End Bordered Tabs --> */}

              </div>
            </div>

          </div>
        </div>
      </section>

    </>
  )
}

export default Profile;