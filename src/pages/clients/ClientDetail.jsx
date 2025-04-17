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

  const getFeatureCheckedValue = (feature) => {
    for (let userFeature of clientInfo?.features) {
      if (userFeature.value == feature) {
        return true;
      }

    }
    return false;
  }

  if (loading) { return <ContentLoader /> }
  return (
    <>
      <div className='row'>
        <div className="col-xl-12">

          <div className="card">
            <div className="card-body pt-3">
              {/* <!-- Bordered Tabs --> */}
              <ul className="nav nav-tabs nav-tabs-bordered">



                <li className="nav-item">
                  <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit
                    Profile</button>
                </li>


                <li className="nav-item">
                  <button className="nav-link" data-bs-toggle="tab"
                    data-bs-target="#profile-change-password">Change Password</button>
                </li>

              </ul>
              <div className="tab-content pt-2">


                <div className="tab-pane fade show active profile-edit pt-3" id="profile-edit">

                  {/* <!-- Profile Edit Form --> */}
                  <form>
                    {/* <div className="row mb-3">
                      <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">Profile
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
                    </div> */}

                    <div className="row mb-3 align-items-center">
                      <div className="col-md-9 col-lg-12">
                        <div className="form-floating">
                          <input type="text" className="form-control" id="clientLogo" placeholder="Client Logo"
                            value={clientInfo?.logourl || ""}
                            readOnly

                          />
                          <label htmlFor="clientLogo">Client Logo</label>
                        </div>
                      </div>

                    </div>



                    <div className="row mb-3 align-items-center">
                      <div className="col-md-9 col-lg-12">
                        <div className="form-floating">
                          <input type="text" className="form-control" id="fullName" placeholder="Full Name"
                            value={clientInfo?.client_name || ""}
                            readOnly
                          />
                          <label htmlFor="fullName">Client Name</label>
                        </div>
                      </div>
                    </div>

                    {/* <div className="row mb-3 ">
                      <label htmlFor="about" className="col-md-4 col-lg-3 col-form-label mt-2">About</label>
                      <div className="col-md-8 col-lg-9">
                        <div className="form-floating">
                          <textarea className="form-control" placeholder="About" id="floatingTextarea" style={{ height: "120px" }}></textarea>
                          <label htmlFor="floatingTextarea">About</label>
                        </div>
                      </div>
                    </div> */}

                    <div className="row mb-3 align-items-center">

                      <div className="col-md-9 col-lg-12">
                        <div className="form-floating">
                          <input type="text" className="form-control" id="floatingCompany" placeholder="Company"
                            value={clientInfo?.client_code || ""}
                            disabled={true}
                          />
                          <label htmlFor="floatingCompany">Client Code</label>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3 align-items-center">
                      <div className="col-md-9 col-lg-12">
                        <div className="form-floating">
                          <input type="text" className="form-control" id="floatingJob" placeholder="Job"
                            value={clientInfo?.client_secret || ""}
                            disabled={true}
                            readOnly

                          />
                          <label htmlFor="floatingJob">Client Secret</label>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3 align-items-center">

                      <div className="col-md-9 col-lg-12">
                        <div className="form-floating">
                          <input type="text" className="form-control" id="floatingCountry" placeholder="Email"
                            value={clientInfo?.client_email || ""}
                            readOnly

                          />
                          <label htmlFor="floatingCountry">Client Email</label>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3 align-items-center">

                      <div className="col-md-9 col-lg-12">
                        <div className="form-floating">
                          <input type="text" className="form-control" id="phone" placeholder="Phone"
                            value={clientInfo?.client_phone || ""}
                            readOnly

                          />
                          <label htmlFor="phone">Client Phone</label>
                        </div>
                      </div>
                    </div>


                    <div className="row mb-3 align-items-center">

                      <div className="col-md-9 col-lg-12">
                        <div className="form-floating">
                          <input type="text" className="form-control" id="status" placeholder="Status"
                            disabled
                            value={clientInfo?.status == "active" ? " Active 🟢" : "Inactive 🔴" || ""}
                            readOnly

                          />
                          <label htmlFor="status">Client Status</label>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Service Opted</label>
                      <div className="col-md-8 col-lg-9">

                        {
                          allFeatures.map(feature => (
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" id="changesMade"
                                checked={getFeatureCheckedValue(feature?.value)} />
                              <label className="form-check-label" htmlFor="changesMade">
                                {feature?.name}
                              </label>
                            </div>

                          ))

                        }
                      </div>


                    </div>


                    <div className="text-center mt-5">
                      <button type="submit" className="btn btn-primary rounded-pill">Save Changes</button>
                    </div>
                  </form>
                  {/* <!-- End Profile Edit Form --> */}

                </div>


                <div className="tab-pane fade pt-3" id="profile-change-password">
                  {/* <!-- Change Password Form --> */}
                  <form>

                    <div className="row mb-3 align-items-center">
                      <label htmlFor="currentPassword"
                        className="col-md-4 col-lg-3 col-form-label">Current Password</label>
                      <div className="col-md-8 col-lg-9">
                        <div className="form-floating">
                          <input type="password" className="form-control" id="floatingcurrentPassword" placeholder="currentPassword" />
                          <label htmlFor="floatingcurrentPassword">Current Password</label>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3 align-items-center">
                      <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">New
                        Password</label>
                      <div className="col-md-8 col-lg-9">
                        <div className="form-floating">
                          <input type="password" className="form-control" id="floatingnewPassword" placeholder="newPassword" />
                          <label htmlFor="floatingnewPassword">New Password</label>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">Re-enter
                        New Password</label>
                      <div className="col-md-8 col-lg-9">
                        <div className="form-floating">
                          <input type="password" className="form-control" id="floatingrenewPassword" placeholder="renewPassword" />
                          <label htmlFor="floatingrenewPassword">Re New Password</label>
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
    </>
  )
}

export default ClientDetail