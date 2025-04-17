import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import DContext from '../../context/DContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_URL } from '../../config';
import ContentLoader from '../../components/loader/ContentLoader';


const ClientDetail = () => {

  const { commonState, commonDispatch, loadAllFeatures } = useContext(DContext);
  const { allFeatures } = commonState;

  let { clientcode } = useParams();

  const { authState, authDispatch, logout } = useContext(DContext);
  const { user } = authState;
  const [loading, setLoading] = useState(true);
  const [clientInfo, setClientInfo] = useState();


  useEffect(() => {
    loadClientDetail();
  }, []);

  const loadClientDetail = async () => {
    try {
      setLoading(true);
      const axiosRes = await axios({
        method: "GET",
        //headers: { 'x-access-token': localStorage.getItem('token') },
        url: `${BASE_URL}/api/v1/clients/single/${clientcode}`,
        //data: { portfolioType: ptype }
      });
      console.log("loadClientDetail [SUCCESS]", axiosRes.data);
      if (axiosRes.data.statusCode == 200) {
        setLoading(false);
        setClientInfo(axiosRes.data.data);

      } else {
        console.log("loadClientDetail [HANDLED ERROR]", axiosRes);
        setLoading(false);
        toast.error(axiosRes.data.message);
      }
    } catch (err) {
      console.log("loadClientDetail  [UNHANDLED ERROR]", err);
      setLoading(false);
      toast.error("Something Went Wrong " + err.message);

    }

  }

  const getFeatureCheckedValue = (feature) =>{
    for(let userFeature of clientInfo?.features){
      if(userFeature.value == feature){
        return true;
      }
    
    }
    return false;
  }

  if (loading) { return <ContentLoader /> }
  return (
    <>
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
                      <div class="col-md-9 col-lg-12">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingPassword" placeholder="Full Name"
                            value={clientInfo?.logourl || ""}
                          />
                          <label for="floatingPassword">Client Logo</label>
                        </div>
                      </div>

                    </div>



                    <div class="row mb-3 align-items-center">
                      <div class="col-md-9 col-lg-12">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingPassword" placeholder="Full Name"
                            value={clientInfo?.client_name || ""}
                          />
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

                      <div class="col-md-9 col-lg-12">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingCompany" placeholder="Company"
                            value={clientInfo?.client_code || ""}
                            disabled={true}
                          />
                          <label for="floatingCompany">Client Code</label>
                        </div>
                      </div>
                    </div>

                    <div class="row mb-3 align-items-center">
                      <div class="col-md-9 col-lg-12">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingJob" placeholder="Job"
                            value={clientInfo?.client_secret || ""}
                            disabled={true}
                          />
                          <label for="floatingJob">Client Secret</label>
                        </div>
                      </div>
                    </div>

                    <div class="row mb-3 align-items-center">

                      <div class="col-md-9 col-lg-12">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingCountry" placeholder="Email"
                            value={clientInfo?.client_email || ""}
                          />
                          <label for="floatingCountry">Client Email</label>
                        </div>
                      </div>
                    </div>

                    <div class="row mb-3 align-items-center">

                      <div class="col-md-9 col-lg-12">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingAddress" placeholder="Phone"
                            value={clientInfo?.client_phone || ""}
                          />
                          <label for="floatingAddress">Client Phone</label>
                        </div>
                      </div>
                    </div>


                    <div class="row mb-3 align-items-center">

                      <div class="col-md-9 col-lg-12">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="floatingAddress" placeholder="Status"
                            disabled
                            value={clientInfo?.status == "active" ? " Active 🟢" : "Inactive 🔴" || ""}
                          />
                          <label for="floatingAddress">Client Status</label>
                        </div>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label for="fullName" class="col-md-4 col-lg-3 col-form-label">Service Opted</label>
                      <div class="col-md-8 col-lg-9">

                        {
                          allFeatures.map(feature => (
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" id="changesMade"
                                checked={getFeatureCheckedValue(feature?.value)} />
                              <label class="form-check-label" for="changesMade">
                                {feature?.name}
                              </label>
                            </div>

                          ))

                        }
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