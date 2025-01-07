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

      <section class="section profile">
        <div class="row">
          <div class="col-xl-4">

            <div class="card">
              <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">

                <img src={`https://ui-avatars.com/api/?name=${user?.client_name}&size=200`} alt="Profile" class="rounded-circle" />
                <h2>{user?.client_name}</h2>
                <h3>{user?.client_code}</h3>
                {/* <div class="social-links mt-2">
                  <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
                  <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
                  <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
                  <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
                </div> */}
              </div>
            </div>

          </div>

          <div class="col-xl-8">

            <div class="card">
              <div class="card-body pt-3">
                {/* <!-- Bordered Tabs --> */}
                <ul class="nav nav-tabs nav-tabs-bordered">

                  <li class="nav-item">
                    <button class="nav-link active" data-bs-toggle="tab"
                      data-bs-target="#profile-overview">Overview</button>
                  </li>

                  <li class="nav-item">
                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit
                      Profile</button>
                  </li>

                  <li class="nav-item">
                    <button class="nav-link" data-bs-toggle="tab"
                      data-bs-target="#profile-settings">Settings</button>
                  </li>

                  <li class="nav-item">
                    <button class="nav-link" data-bs-toggle="tab"
                      data-bs-target="#profile-change-password">Change Password</button>
                  </li>

                </ul>
                <div class="tab-content pt-2">

                  <div class="tab-pane fade show active profile-overview" id="profile-overview">
                    {/* <h5 class="card-title">About</h5>
                    <p class="small fst-italic">Sunt est soluta temporibus accusantium neque nam maiores
                      cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt
                      iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea
                      saepe at unde.</p> */}

                    <h5 class="card-title">Profile Details</h5>

                    <div class="row">
                      <div class="col-lg-3 col-md-4 label ">Full Name</div>
                      <div class="col-lg-9 col-md-8">{user?.client_name}</div>
                    </div>

                    <div class="row">
                      <div class="col-lg-3 col-md-4 label">Email</div>
                      <div class="col-lg-9 col-md-8">{user?.client_email}</div>
                    </div>

                    <div class="row">
                      <div class="col-lg-3 col-md-4 label">Client Code</div>
                      <div class="col-lg-9 col-md-8">{user?.client_code}</div>
                    </div>

                    <div class="row">
                      <div class="col-lg-3 col-md-4 label">Client Secret</div>
                      <div class="col-lg-9 col-md-8">{user?.client_secret}</div>
                    </div>

                    <div class="row">
                      <div class="col-lg-3 col-md-4 label">Services Opted</div>
                      <div class="col-lg-9 col-md-8">
                        {
                          user?.client_services.map(service =>(
                            <li>{service}</li>

                          ))
                        }
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-3 col-md-4 label">Status</div>
                      <div class="col-lg-9 col-md-8">{user?.status}</div>
                    </div>

                  </div>

                  <div class="tab-pane fade profile-edit pt-3" id="profile-edit">

                    {/* <!-- Profile Edit Form --> */}
                    <form>
                      <div class="row mb-3">
                        <label for="profileImage" class="col-md-4 col-lg-3 col-form-label">Profile
                          Image</label>
                        <div class="col-md-8 col-lg-9">
                          <img src="./assets/images/profile-img.jpg" alt="Profile" />
                          <div class="pt-2">
                            <a href="#" class="btn btn-primary btn-sm"
                              title="Upload new profile image"><i
                                class="bi bi-upload"></i></a>
                            <a href="#" class="btn btn-danger btn-sm"
                              title="Remove my profile image"><i class="bi bi-trash"></i></a>
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3 align-items-center">
                        <label for="fullName" class="col-md-4 col-lg-3 col-form-label">Full
                          Name</label>
                        <div class="col-md-8 col-lg-9">
                          <div class="form-floating">
                            <input type="text" class="form-control" id="floatingPassword" placeholder="Full Name" />
                            <label for="floatingPassword">Full Name</label>
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3 ">
                        <label for="about" class="col-md-4 col-lg-3 col-form-label mt-2">About</label>
                        <div class="col-md-8 col-lg-9">
                          <div class="form-floating">
                            <textarea class="form-control" placeholder="About" id="floatingTextarea" style={{ height: "120px" }}></textarea>
                            <label for="floatingTextarea">About</label>
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3 align-items-center">
                        <label for="company"
                          class="col-md-4 col-lg-3 col-form-label">Company</label>
                        <div class="col-md-8 col-lg-9">
                          <div class="form-floating">
                            <input type="text" class="form-control" id="floatingCompany" placeholder="Company" />
                            <label for="floatingCompany">Company</label>
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3 align-items-center">
                        <label for="Job" class="col-md-4 col-lg-3 col-form-label">Job</label>
                        <div class="col-md-8 col-lg-9">
                          <div class="form-floating">
                            <input type="text" class="form-control" id="floatingJob" placeholder="Job" />
                            <label for="floatingJob">Job</label>
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3 align-items-center">
                        <label for="Country"
                          class="col-md-4 col-lg-3 col-form-label">Country</label>
                        <div class="col-md-8 col-lg-9">
                          <div class="form-floating">
                            <input type="text" class="form-control" id="floatingCountry" placeholder="Country" />
                            <label for="floatingCountry">Country</label>
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3 align-items-center">
                        <label for="Address"
                          class="col-md-4 col-lg-3 col-form-label">Address</label>
                        <div class="col-md-8 col-lg-9">
                          <div class="form-floating">
                            <input type="text" class="form-control" id="floatingAddress" placeholder="Address" />
                            <label for="floatingAddress">Address</label>
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3 align-items-center">
                        <label for="Phone" class="col-md-4 col-lg-3 col-form-label">Phone</label>
                        <div class="col-md-8 col-lg-9">
                          <div class="form-floating">
                            <input type="number" class="form-control" id="floatingPhone" placeholder="Phone" />
                            <label for="floatingPhone">Phone</label>
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3 align-items-center">
                        <label for="Email" class="col-md-4 col-lg-3 col-form-label">Email</label>
                        <div class="col-md-8 col-lg-9">
                          <div class="form-floating">
                            <input type="email" class="form-control" id="floatingEmail" placeholder="Email" />
                            <label for="floatingEmail">Email</label>
                          </div>
                        </div>
                      </div>

                      <div class="text-center mt-5">
                        <button type="submit" class="btn btn-primary rounded-pill">Save Changes</button>
                      </div>
                    </form>
                    {/* <!-- End Profile Edit Form --> */}

                  </div>

                  <div class="tab-pane fade pt-3" id="profile-settings">

                    {/* <!-- Settings Form --> */}
                    <form>

                      <div class="row mb-3">
                        <label for="fullName" class="col-md-4 col-lg-3 col-form-label">Email
                          Notifications</label>
                        <div class="col-md-8 col-lg-9">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="changesMade"
                              checked />
                            <label class="form-check-label" for="changesMade">
                              Changes made to your account
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="newProducts"
                              checked />
                            <label class="form-check-label" for="newProducts">
                              Information on new products and services
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="proOffers" />
                            <label class="form-check-label" for="proOffers">
                              Marketing and promo offers
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="securityNotify"
                              checked disabled />
                            <label class="form-check-label" for="securityNotify">
                              Security alerts
                            </label>
                          </div>
                        </div>
                      </div>

                      <div class="text-center">
                        <button type="submit" class="btn btn-primary">Save Changes</button>
                      </div>
                    </form>
                    {/* <!-- End settings Form --> */}

                  </div>

                  <div class="tab-pane fade pt-3" id="profile-change-password">
                    {/* <!-- Change Password Form --> */}
                    <form>

                      <div class="row mb-3 align-items-center">
                        <label for="currentPassword"
                          class="col-md-4 col-lg-3 col-form-label">Current Password</label>
                        <div class="col-md-8 col-lg-9">
                          <div class="form-floating">
                            <input type="password" class="form-control" id="floatingcurrentPassword" placeholder="currentPassword" />
                            <label for="floatingcurrentPassword">Current Password</label>
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3 align-items-center">
                        <label for="newPassword" class="col-md-4 col-lg-3 col-form-label">New
                          Password</label>
                        <div class="col-md-8 col-lg-9">
                          <div class="form-floating">
                            <input type="password" class="form-control" id="floatingnewPassword" placeholder="newPassword" />
                            <label for="floatingnewPassword">New Password</label>
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label for="renewPassword" class="col-md-4 col-lg-3 col-form-label">Re-enter
                          New Password</label>
                        <div class="col-md-8 col-lg-9">
                          <div class="form-floating">
                            <input type="password" class="form-control" id="floatingrenewPassword" placeholder="renewPassword" />
                            <label for="floatingrenewPassword">Re New Password</label>
                          </div>
                        </div>
                      </div>

                      <div class="text-center mt-5">
                        <button type="submit" class="btn btn-primary rounded-pill">Change Password</button>
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