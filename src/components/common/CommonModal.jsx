import React from 'react'

const CommonModal = () => {
    return (
        <>
            <div className="modal fade" id="basicModal" tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header justify-content-center">
                            <h4 className="modal-title fw-bold">Add More People</h4>
                            <button type="button" className="btn-close popup-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="row g-3">
                                <div className="col-md-12">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="floatingName" placeholder="Your Name" value="Prashant Mishra" />
                                        <label for="floatingName">Your Name</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input type="email" className="form-control" id="floatingEmail" placeholder="Your Email" value="dummytest@gmail.com" />
                                        <label for="floatingEmail">Your Email</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value="dummytest@gmail.com" />
                                        <label for="floatingPassword">Password</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <textarea className="form-control" placeholder="Address" id="floatingTextarea" rows="4">Chinhat, Lucknow, Uttar Pradesh 226028</textarea>
                                        <label for="floatingTextarea">Address</label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floatingCity" placeholder="City" value="Lucknow" />
                                            <label for="floatingCity">City</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-floating mb-3">
                                        <select className="form-select" id="floatingSelect" aria-label="State">
                                            <option selected>Uttar Pradesh</option>
                                            <option value="1">Goa</option>
                                            <option value="2">Pune</option>
                                            <option value="2">Delhi</option>
                                            <option value="2">Mumbai</option>
                                        </select>
                                        <label for="floatingSelect">State</label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="floatingZip" placeholder="Zip" />
                                        <label for="floatingZip">Zip</label>
                                    </div>
                                </div>
                                <div className="text-center modal-footer pt-4">
                                    <button type="button" className="btn btn-danger mx-2" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CommonModal;