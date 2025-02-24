import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import DContext from '../../context/DContext';

const ClientDetail = () => {
  let { clientcode } = useParams();

  const { authState, authDispatch, logout } = useContext(DContext);
  const { user } = authState;

  return (
    <>
      <h2>{clientcode}</h2>
      <div className='row'>
        <div class="col-xl-12">

          <div class="card">
            <div class="card-body pt-3">
              {/* <!-- Bordered Tabs --> */}
              <ul class="nav nav-tabs nav-tabs-bordered">

          

                <li class="nav-item">
                  <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit
                    Profile</button>
                </li>


                <li class="nav-item">
                  <button class="nav-link" data-bs-toggle="tab"
                    data-bs-target="#profile-change-password">Change Password</button>
                </li>

              </ul>
              <div class="tab-content pt-2">

        
                <div class="tab-pane fade show active profile-edit pt-3" id="profile-edit">

                  {/* <!-- Profile Edit Form --> */}
                  <form>
                    {/* <div class="row mb-3">
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
                    </div> */}

                    <div class="row mb-3 align-items-center">
                      <label for="fullName" class="col-md-4 col-lg-3 col-form-label">Client Name</label>
                      <div class="col-md-8 col-lg-9">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingPassword" placeholder="Full Name" />
                          <label for="floatingPassword">Client Name</label>
                        </div>
                      </div>
                    </div>

                    {/* <div class="row mb-3 ">
                      <label for="about" class="col-md-4 col-lg-3 col-form-label mt-2">About</label>
                      <div class="col-md-8 col-lg-9">
                        <div class="form-floating">
                          <textarea class="form-control" placeholder="About" id="floatingTextarea" style={{ height: "120px" }}></textarea>
                          <label for="floatingTextarea">About</label>
                        </div>
                      </div>
                    </div> */}

                    <div class="row mb-3 align-items-center">
                      <label for="company"
                        class="col-md-4 col-lg-3 col-form-label">Client Code</label>
                      <div class="col-md-8 col-lg-9">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingCompany" placeholder="Company" />
                          <label for="floatingCompany">Client Code</label>
                        </div>
                      </div>
                    </div>

                    <div class="row mb-3 align-items-center">
                      <label for="Job" class="col-md-4 col-lg-3 col-form-label">Client Secret</label>
                      <div class="col-md-8 col-lg-9">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingJob" placeholder="Job" />
                          <label for="floatingJob">Client Secret</label>
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
    </>
  )
}

export default ClientDetail