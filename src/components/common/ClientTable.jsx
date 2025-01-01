import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_URL } from '../../config';
import ContentLoader from '../loader/ContentLoader';
import { Link } from 'react-router-dom';
import { countriesData, statesData } from '../../helper/AdditionalData';
import { SOMETHING_WENT_WRONG } from '../../constants/strings';


const ClientTable = ({ clientsArr }) => {

    const [clientData, setClientData] = useState({
        clientname: "",
        mobile: "",
        email: "",
        phone1: "",
        phone2: "",
        address1: " ",
        address2: "",
        city: "",
        state: "",
        country: ""
    })
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [btnMethod, setBtnMethod] = useState("create")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [sizeable,setSizeable] = useState({
        page:1,
        limit:10
    });

 

    useEffect(() => {
        loadClients();
    }, [])

    const loadClients = async (page=1,limit=10) => {
        try {
            setLoading(true);
            const axiosRes = await axios({
                method: "GET",
                //headers: { 'x-access-token': localStorage.getItem('token') },
                url: `${BASE_URL}/construct/one/v1/clients?page=${page}&limit=${limit}`,
                //data: { portfolioType: ptype }
            });
            console.log("loadClients [SUCCESS]", axiosRes.data);
            if (axiosRes.data.statusCode === 200) {
                setLoading(false);
                setClients(axiosRes.data.resData);
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
            setClientData(clientInfo);
        }
        setShow(true);
    }

    const changeSizeable = (userAction) =>{
        if(userAction === "prev"){
            if(sizeable.page <= 1)  {toast("You are already on Page 1");}
            else{
                let prevPage = --sizeable.page;
                setSizeable({...sizeable,page:prevPage});
                loadClients(prevPage,sizeable.limit);
            }
    
        }

        if(userAction === "next"){
            let nextPage = ++sizeable.page;
            setSizeable({...sizeable,page:nextPage});
            loadClients(nextPage,sizeable.limit);

        }

    }
    
    const changeLimit = (e) =>{
        console.log(e.target.value);
        setSizeable({...sizeable,limit:e.target.value});
        loadClients(sizeable.page,e.target.value);
    }


    const handleChange = (e) => {
        setClientData({ ...clientData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e,) => {
        e.preventDefault();
        console.log(clientData);
        if (btnMethod === "create") createClient();
        if (btnMethod === "update") editClient();
    }

    const createClient = async () => {
        try {
            setBtnLoading(true);
            clientData.country = "India";

            const axiosRes = await axios({
                method: "POST",
                //headers: { 'x-access-token': localStorage.getItem('token') },
                url: `${BASE_URL}/construct/one/v1/clients`,
                data: clientData
            });
            console.log("create client [SUCCESS]", axiosRes.data);
            if (axiosRes.data.statusCode === 200) {
                setBtnLoading(false);
                setShow(false);
                toast.success(axiosRes.data.message);
                loadClients();

            } else {
                console.log("create client [HANDLED ERROR]", axiosRes);
                setBtnLoading(false);
                toast.error(axiosRes.data.message);
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
            clientData.country = "India";

            const axiosRes = await axios({
                method: "PATCH",
                //headers: { 'x-access-token': localStorage.getItem('token') },
                url: `${BASE_URL}/construct/one/v1/clients`,
                data: clientData
            });
            console.log("editClient [SUCCESS]", axiosRes.data);
            if (axiosRes.data.statusCode === 200) {
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

    const deleteClient = async (clientId) => {
        console.log(clientData);
        try {
            toast("Changing Client status")
            const axiosRes = await axios({
                method: "DELETE",
                //headers: { 'x-access-token': localStorage.getItem('token') },
                url: `${BASE_URL}/construct/one/v1/clients/${clientId}`,
                //data: clientData
            });
            console.log("deleteClient [SUCCESS]", axiosRes.data);
            if (axiosRes.data.statusCode === 200) {
                toast.success(axiosRes.data.message);
                loadClients();

            } else {
                console.log("deleteClient [HANDLED ERROR]", axiosRes);
                toast.error(axiosRes.data.message);
            }
        } catch (err) {
            console.log("deleteClient  [UNHANDLED ERROR]", err);
            toast.error(SOMETHING_WENT_WRONG);

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
                                                            <th className="sorting" rowspan="1" colspan="1" style={{ width: "40px" }}></th>
                                                            <th className="sortingColumn" rowspan="1" colspan="1"> Name <i onclick="sortTable(2)"
                                                                className="bi bi-sort-up"></i></th>
                                                            <th className="sortingColumn" rowspan="1" colspan="1"> Mobile <i onclick="sortTable(4)"
                                                                className="bi bi-sort-up"></i></th>
                                                            <th className="sortingColumn" rowspan="1" colspan="1"> Status <i onclick="sortTable(5)"
                                                                className="bi bi-sort-up"></i></th>
                                                            <th className="sortingColumn" rowspan="1" colspan="1">Address <i onclick="sortTable(6)"
                                                                className="bi bi-sort-up"></i></th>
                                                            <th className="sortingColumn" rowspan="1" colspan="1"> Action <i onclick="sortTable(7)"
                                                                className="bi bi-sort-up"></i></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            clients && clients.map((client, idx) => {
                                                                return (
                                                                    <tr className="gradeX odd">
                                                                        <td className="patient-img sorting_1">
                                                                            {/* <img src="./assets/images/user5.jpg" alt="" /> */}
                                                                        </td>

                                                                        <td>{client?.clientname}</td>
                                                                        <td>
                                                                            {client?.mobile} </td>
                                                                        <td>
                                                                            {client?.status} </td>
                                                                        <td className="left">{client?.address1},{client?.address2}</td>
                                                                        <td>
                                                                            <Link className="tblEditBtn" onClick={() => toggleClientModal("update", client)}>
                                                                                <i className="bi bi-pencil-fill"></i>
                                                                            </Link>
                                                                            {
                                                                                client.status === "ACTIVE" ?
                                                                                    <>
                                                                                        <Link className="tblDelBtn" onClick={() => deleteClient(client?.clientid)}>
                                                                                            <i className="bi bi-trash-fill"></i>
                                                                                        </Link>
                                                                                    </>
                                                                                    :
                                                                                    <>
                                                                                        <Link className="tblActiveBtn" onClick={() => deleteClient(client?.clientid)}>
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
                                                    <button onClick={()=>changeSizeable("prev")} className="page-link">Previous</button>
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
                                                    <button onClick={()=>changeSizeable("next")} className="page-link">
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


            <Modal show={show} onHide={handleClose}>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center">
                                <h4 className="modal-title fw-bold">{btnMethod == "create" ? <>Add Client</> : <>Edit Client</>}</h4>
                            </div>
                            <div className="modal-body">
                                <form className="row g-3" onSubmit={handleSubmit}>
                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floatingName" placeholder="Your Name" name="clientname" onChange={handleChange} value={clientData?.clientname || ""} />
                                            <label for="floatingName">Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="email" className="form-control" id="floatingEmail" placeholder="Your Email" name="email" onChange={handleChange} value={clientData?.email || ""} />
                                            <label for="floatingEmail">Email</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floatingPassword" placeholder="Moile" name="mobile" onChange={handleChange} value={clientData?.mobile || ""} />
                                            <label for="floatingPassword">Mobile</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea className="form-control" placeholder="Address" id="floatingTextarea" rows="4" name="address1" onChange={handleChange} value={clientData?.address1 || ""}></textarea>
                                            <label for="floatingTextarea">Address Line 1</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea className="form-control" placeholder="Address" id="floatingTextarea" rows="4" name="address2" onChange={handleChange} value={clientData?.address2 || ""}></textarea>
                                            <label for="floatingTextarea">Address Line 2</label>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="col-md-12">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="floatingCity" placeholder="City" name="city" onChange={handleChange} value={clientData?.city || ""} />
                                                <label for="floatingCity">City</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" id="floatingSelect" aria-label="State" name="state" onChange={handleChange} value={clientData?.state || ""}>
                                                {/* <option value="Orissa">Orissa</option>
                                                <option value="Goa">Goa</option>
                                                <option value="Pune">Pune</option>
                                                <option value="Delhi">Delhi</option>
                                                <option value="Mumbai">Mumbai</option> */}
                                                {
                                                    statesData.map((singleState, idx) => (
                                                        <option value={singleState?.state}>{singleState?.state}</option>
                                                    ))
                                                }
                                            </select>
                                            <label for="floatingSelect">State</label>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" id="floatingSelect" aria-label="State" name="country" onChange={handleChange} value={clientData?.country || ""}>
                                                <option value={"India"}>{"India"}</option>
                                                {
                                                    // countriesData.map((country, idx) => (
                                                    //     <option value={country?.country}>{country?.country}</option>
                                                    // ))
                                                }
                                            </select>
                                            <label for="floatingSelect">Country</label>
                                        </div>
                                    </div>
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
                                    <div className="text-center modal-footer pt-4">
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
            </Modal>

        </>
    )
}

export default ClientTable