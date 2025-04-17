import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_URL, BASE_URL_LMS } from '../../config';
import ContentLoader from '../loader/ContentLoader';
import { Link } from 'react-router-dom';
import { countriesData, statesData } from '../../helper/AdditionalData';
import { SOMETHING_WENT_WRONG, SUCCESS } from '../../constants/strings';
import { getDefaultProfileImage } from '../../helper/commonHelper';
import { makeApiCall } from '../../services/httpService';
import Select from 'react-select'



const ClientTable = ({ clientsArr }) => {

    const [clientData, setClientData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        logourl: "",
        webUrl: "",
        emailPassword: "",
        services: [],
        leadServices: [],
    });

    const [clients, setClients] = useState([]);
    const [clientsHeaders, setClientsHeaders] = useState([]);
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [btnMethod, setBtnMethod] = useState("create")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [sizeable, setSizeable] = useState({
        page: 1,
        limit: 10
    });



    useEffect(() => {
        loadClients();
        loadFeatures();
    }, [])

    const leadServices = ["SMS", "EMAIL", "WHATSAPP", "NOTIFICATION"]

    const loadClients = async (page = 1, limit = 10) => {
        try {
            setLoading(true);
            const axiosRes = await axios({
                method: "GET",
                //headers: { 'x-access-token': localStorage.getItem('token') },
                url: `${BASE_URL}/api/v1/clients?page=${page}&limit=${limit}`,
                //data: { portfolioType: ptype }
            });
            console.log("loadClients [SUCCESS]", axiosRes.data);
            if (axiosRes.data.status === SUCCESS) {
                setLoading(false);
                setClientsHeaders(axiosRes.data.data.clientHeaders);
                setClients(axiosRes.data.data.clients);
            } else {
                console.log("loadClients [HANDLED ERROR]", axiosRes);
                setLoading(false);
                toast.error(axiosRes.data.message);
            }
        } catch (err) {
            console.log("loadClient  [UNHANDLED ERROR]", err);
            setLoading(false);
            toast.error(SOMETHING_WENT_WRONG);

        }

    }

    const toggleClientModal = (method, clientInfo) => {
        if (method === "create") {
            setBtnMethod("create")
            setClientData({});
        }

        if (method === "update") {
            setBtnMethod("update");
            setClientData({
                id: clientInfo?.id,
                name: clientInfo?.client_name,
                email: clientInfo?.client_email,
                logourl: clientInfo?.logourl,
                services: clientInfo?.client_services
            });
        }
        setShow(true);
    }

    const changeSizeable = (userAction) => {
        if (userAction === "prev") {
            if (sizeable.page <= 1) { toast("You are already on Page 1"); }
            else {
                let prevPage = --sizeable.page;
                setSizeable({ ...sizeable, page: prevPage });
                loadClients(prevPage, sizeable.limit);
            }

        }

        if (userAction === "next") {
            let nextPage = ++sizeable.page;
            setSizeable({ ...sizeable, page: nextPage });
            loadClients(nextPage, sizeable.limit);

        }

    }

    const changeLimit = (e) => {
        console.log(e.target.value);
        setSizeable({ ...sizeable, limit: e.target.value });
        loadClients(sizeable.page, e.target.value);
    }


    const handleChange = (e) => {
        setClientData({ ...clientData, [e.target.name]: e.target.value });
    }

    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChangeDropDown = (selected) => {
        setSelectedOptions(selected);
        setClientData({ ...clientData, services: selected })
        console.log("Selected options:", selected);
    };

    const handleChangeTextbox = (e) => {
        console.log(e.target.name);
        let clientServices = clientData.services || [];
        let clientLeadServices = clientData.leadServices || [];

        if (e.target.checked == true && features.includes(e.target.value)) {
            clientServices.push(e.target.value);
        } else if (e.target.checked == false) {
            clientServices = clientServices.filter(item => item !== e.target.value);
        }

        if (e.target.checked == true && leadServices.includes(e.target.value)) {
            clientLeadServices.push(e.target.value);
        } else if (e.target.checked == false) {
            clientLeadServices = clientLeadServices.filter(item => item !== e.target.value);
        }

        setClientData({ ...clientData, services: clientServices, leadServices: clientLeadServices });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (btnMethod === "create") createClient();
        if (btnMethod === "update") editClient();
    }

    const getCheckBoxValue = (service) => {

        if (features.includes(service)) {
            if (clientData?.services?.includes(service)) {
                return true;
            } else {
                return false;
            }
        }

        if (leadServices.includes(service)) {
            if (clientData?.leadServices?.includes(service)) {
                return true;
            } else {
                return false;
            }
        }

    }

    const createClient = async () => {
        try {
            setBtnLoading(true);
            const newClientAuthReqAxiosRes = await axios({
                method: "POST",
                headers: { 'x-access-token': localStorage.getItem('token') },
                url: `${BASE_URL}/api/v1/clients`,
                data: clientData
            });

            console.log("auth client Creation", newClientAuthReqAxiosRes);

            if (newClientAuthReqAxiosRes.status === 200) {
                setBtnLoading(false);
                setShow(false);
                toast.success(newClientAuthReqAxiosRes.data.message);
                loadClients();

            } else {
                console.log("create client [HANDLED ERROR]", newClientAuthReqAxiosRes);
                setBtnLoading(false);
                toast.error(newClientAuthReqAxiosRes.data.message);
            }
        } catch (err) {
            console.log("create client  [UNHANDLED ERROR]", err);
            setBtnLoading(false);
            toast.error(SOMETHING_WENT_WRONG);

        }
    }

    const editClient = async () => {
        try {
            setBtnLoading(true);

            const axiosRes = await axios({
                method: "PATCH",
                //headers: { 'x-access-token': localStorage.getItem('token') },
                url: `${BASE_URL}/api/v1/clients/single/${clientData?.id}`,
                data: clientData
            });
            console.log("editClient [SUCCESS]", axiosRes.data);
            if (axiosRes.data.status === SUCCESS) {
                setBtnLoading(false);
                setShow(false);
                toast.success(axiosRes.data.message);
                loadClients();

            } else {
                console.log("editClient [HANDLED ERROR]", axiosRes);
                setBtnLoading(false);
                toast.error(axiosRes.data.message);
            }
        } catch (err) {
            console.log("editClient  [UNHANDLED ERROR]", err);
            setBtnLoading(false);
            toast.error(SOMETHING_WENT_WRONG);

        }

    }

    const changeStatus = async (clientId, clientStatus) => {
        try {
            clientStatus = clientStatus == "active" ? "inactive" : "active";
            const axiosRes = await axios({
                method: "PATCH",
                //headers: { 'x-access-token': localStorage.getItem('token') },
                url: `${BASE_URL}/api/v1/clients/single/${clientId}`,
                data: { status: clientStatus }
            });
            console.log("changeStatus [SUCCESS]", axiosRes.data);
            if (axiosRes.data.status === SUCCESS) {
                setBtnLoading(false);
                setShow(false);
                toast.success(axiosRes.data.message);
                loadClients();

            } else {
                console.log("changeStatus [HANDLED ERROR]", axiosRes);
                setBtnLoading(false);
                toast.error(axiosRes.data.message);
            }
        } catch (err) {
            console.log("changeStatus  [UNHANDLED ERROR]", err);
            setBtnLoading(false);
            toast.error(SOMETHING_WENT_WRONG);

        }

    }

    const loadFeatures = async (page = 1, limit = 10) => {
        try {
            setLoading(true);
            let url = `${BASE_URL}/api/v1/features`;

            const apiRes = await makeApiCall("GET", null, url)
            console.log("loadFeatures [SUCCESS]", apiRes);
            if (apiRes.statusCode === 200) {
                setFeatures(apiRes.data);
            } else {
                console.log("loadFeatures [HANDLED ERROR]", apiRes);
                setLoading(false);
            }
        } catch (err) {
            console.log("loadFeatures  [UNHANDLED ERROR]", err);
            setLoading(false);

        }

    }



    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-12">
                            <div className="card top-selling overflow-auto">

                                <div className="card-body pb-0">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h5 className="card-title"> <span></span></h5>
                                        <Button variant="primary" onClick={() => toggleClientModal("create", null)}>
                                            <i className="bi bi-plus"></i> Add
                                        </Button>
                                    </div>
                                    {
                                        loading ? <ContentLoader /> :
                                            <>
                                                <table id="myTable" className="table table-striped table-bordered table-hover table-checkable order-column valign-middle dataTable no-footer">
                                                    <thead>
                                                        <tr>
                                                            {
                                                                clientsHeaders && clientsHeaders.map((clientHeader) => (
                                                                    <th className="sortingColumn" rowspan="1" colspan="1">{clientHeader?.label}</th>
                                                                ))
                                                            }

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            clients && clients.map((client, idx) => {
                                                                return (
                                                                    <tr className="gradeX odd">
                                                                        <td className="patient-img sorting_1">
                                                                            {
                                                                                client?.logourl != "" && client.logourl != null ?
                                                                                    <img src={client?.logourl} alt="" />
                                                                                    :
                                                                                    <img src={getDefaultProfileImage(client?.client_name)} alt="Profile" />
                                                                                // <span className="d-none d-lg-block">{user?.client_name}</span>
                                                                            }
                                                                        </td>

                                                                        <td>
                                                                            {client?.client_name} </td>
                                                                        <td>
                                                                            {client?.client_code} </td>
                                                                        <td>
                                                                            {client?.client_secret} </td>
                                                                        <td className="left">{client?.features.map(singleService => (
                                                                            <h6>{singleService?.name}</h6>
                                                                        ))}
                                                                        </td>
                                                                        <td className="left">{client?.status == "active" ? " Active 🟢" : "Inactive 🔴"} </td>

                                                                        <td>
                                                                            <Link to={`/clients/${client?.client_code}`} className="tblEditBtn">
                                                                                <i className="bi bi-person-fill"></i>
                                                                            </Link>
                                                                            {
                                                                                client.status === "active" ?
                                                                                    <>
                                                                                        <Link className="tblDelBtn" onClick={() => changeStatus(client.id, client?.status)}>
                                                                                            <i className="bi bi-trash-fill"></i>
                                                                                        </Link>
                                                                                    </>
                                                                                    :
                                                                                    <>
                                                                                        <Link className="tblActiveBtn" onClick={() => changeStatus(client?.id, client?.status)}>
                                                                                            <i className="bi bi-person-bounding-box"></i>
                                                                                        </Link>
                                                                                    </>
                                                                            }

                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }


                                                    </tbody>
                                                </table>
                                            </>
                                    }

                                    <div className="table-pagination">
                                        <div className="dataTables_info" role="status" aria-live="polite">
                                            Limit {
                                                <select onChange={changeLimit}>
                                                    <option value="10">10</option>
                                                    <option value="20">20</option>
                                                    <option value="30">30</option>
                                                    <option value="40">40</option>
                                                    <option value="50">50</option>
                                                </select>
                                            }Entries</div>

                                        <div className="dataTables_paginate paging_simple_numbers">
                                            <ul className="pagination">
                                                <li className="paginate_button page-item previous">
                                                    <button onClick={() => changeSizeable("prev")} className="page-link">Previous</button>
                                                </li>
                                                {/* <li className="paginate_button page-item ">
                                                    <a href="javascript:void(0)" aria-controls="example4" data-dt-idx="1" tabindex="0" className="page-link">
                                                        1
                                                    </a>
                                                </li> */}
                                                <li className="paginate_button page-item active">
                                                    <button className="page-link">
                                                        {sizeable.page}
                                                    </button>
                                                </li>
                                                <li className="paginate_button page-item next" id="example4_next">
                                                    <button onClick={() => changeSizeable("next")} className="page-link">
                                                        Next
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='justify-content-center'>{btnMethod == "create" ? <>Add Client</> : <>Edit Client</>}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-dialog mt-0 mb-0">
                        <div className="modal-content">
                            {/* <div className="modal-header justify-content-center">
                                <h4 className="modal-title fw-bold"></h4>
                            </div> */}
                            <div className="modal-body">
                                <form className="row g-3" onSubmit={handleSubmit}>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floatingName" placeholder="Your Name" name="name" onChange={handleChange} value={clientData?.name || ""} />
                                            <label htmlFor="floatingName">Client Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floatingPhone" placeholder="Your Phone" name="mobile" onChange={handleChange} value={clientData?.mobile || ""} />
                                            <label htmlFor="floatingName">Phone</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="email" className="form-control" id="floatingEmail" placeholder="Your Email" name="email" onChange={handleChange} value={clientData?.email || ""} />
                                            <label htmlFor="floatingEmail">Email</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floatingPassword" placeholder="Moile" name="password" onChange={handleChange} value={clientData?.password || ""} />
                                            <label htmlFor="floatingPassword">Client Password</label>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" placeholder="Address" id="floatingTextarea" rows="4" name="logourl" onChange={handleChange} value={clientData?.logourl || ""} />
                                            <label htmlFor="floatingTextarea">Logo URL</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" placeholder="https://mycomp.com" id="floatingTextarea" rows="4" name="webUrl" onChange={handleChange} value={clientData?.webUrl || ""} />
                                            <label htmlFor="floatingTextarea">Web URL</label>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <p>Select Services</p>

                                            <Select
                                                isSearchable={true}
                                                isClearable={true}
                                                isMulti
                                                value={selectedOptions}
                                                onChange={handleChangeDropDown}
                                                options={features?.map(feature => (
                                                    { value: feature.value, label: feature.name }
                                                ))} />
                                        </div>
                                    </div>
                                    <br />
                                    {
                                        selectedOptions?.map(singleOption => {
                                            if (singleOption.value == "notification_service")
                                                return (
                                                    <>
                                                        <div className="col-md-10">
                                                            <div className="form-floating">
                                                                <div class="input-group">
                                                                    <input type="text" className="form-control" id="floatingTextarea" rows="4" name="emailPassword" placeholder="Enter Email App Password" onChange={handleChange} value={clientData?.emailPassword || ""} />
                                                                    {/* <label htmlFor="floatingTextarea">Email Secret Password</label> */}
                                                                    <a target='_blank' href="https://knowledge.workspace.google.com/kb/how-to-create-app-passwords-000009237">How to Get?</a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {
                                                            leadServices.map(service => (
                                                                <>  <div className="col-md-3">
                                                                    <div className="form-floating">
                                                                        <input class="form-check-input me-1" type="checkbox" id={service} name="leadservices" value={service} checked={getCheckBoxValue(service)} onChange={handleChangeTextbox} />{service}{" "}
                                                                    </div>
                                                                </div>
                                                                </>

                                                            ))
                                                        }
                                                    </>
                                                )

                                        })



                                    }


                                    {/* <div className="col-md-4">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" id="floatingSelect" aria-label="State" name="state" onChange={handleChange} value={clientData?.state || ""}>
                                                 <option value="Orissa">Orissa</option>
                                                <option value="Goa">Goa</option>
                                                <option value="Pune">Pune</option>
                                                <option value="Delhi">Delhi</option>
                                                <option value="Mumbai">Mumbai</option> 
                                                {
                                                    statesData.map((singleState, idx) => (
                                                        <option value={singleState?.state}>{singleState?.state}</option>
                                                    ))
                                                }
                                            </select>
                                            <label htmlFor="floatingSelect">State</label>
                                        </div>
                                    </div> */}
                                    {/* <div className="col-md-4">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" id="floatingSelect" aria-label="State" name="country" onChange={handleChange} value={clientData?.country || ""}>
                                                <option value={"India"}>{"India"}</option>
                                                {
                                                    // countriesData.map((country, idx) => (
                                                    //     <option value={country?.country}>{country?.country}</option>
                                                    // ))
                                                }
                                            </select>
                                            <label htmlFor="floatingSelect">Country</label>
                                        </div>
                                    </div> */}
                                    {/* <div className="col-md-4">
                                        <input className="form-check-input" type="radio"
                                            name="employment_status"
                                            value="unemployed"
                                            onChange={handleChange}
                                            checked={tenantProfile?.employment_status == "unemployed" ? true : false}
                                        />
                                        <label className="form-check-label" >
                                            Unemployed
                                        </label>
                                    </div> */}
                                    <div className="text-center modal-footer pt-2">
                                        <Button variant="danger" onClick={handleClose}>
                                            Close
                                        </Button>
                                        {
                                            btnLoading ?
                                                <Button variant="primary" type="submit" disabled="true">
                                                    Saving...
                                                </Button>
                                                :
                                                <Button variant="primary" type="submit">
                                                    Save Changes
                                                </Button>

                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer> */}
            </Modal >

        </>
    )
}

export default ClientTable