import React, { useContext, useEffect, useState } from 'react';
import { Econtext } from '../context/Econtext';
import PortfolioStats from '../components/user/PortfolioStats';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from '../config';
import toast from 'react-hot-toast';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';





const SingleTender = () => {
    const { tenderId } = useParams();


    const [loading, setLoading] = useState(true);
    const [tender, setTender] = useState();


    useEffect(() => {
        loadTenders();
    }, [])


    const loadTenders = async () => {
        try {
            setLoading(true);
            const axiosRes = await axios({
                method: "GET",
                headers: { 'x-access-token': localStorage.getItem('token') },
                url: `${BASE_URL}/api/tenders/${tenderId}`,
            });
            console.log("tender load [SUCCESS]", axiosRes.data.resData);
            if (axiosRes.data.success) {
                setLoading(false);
                setTender(axiosRes.data.resData)
            } else {
                setLoading(false);

            }
        } catch (err) {
            console.log("tender load [ERROR]", err);
            setLoading(false);
        }
    }


    return (
        <>
            <Card>
                <Card.Header>Tender Ends At: {new Date(tender?.tender?.endTime).toLocaleString()}</Card.Header>
                <Card.Body>
                    <Card.Title>{tender?.tender?.name}</Card.Title>
                    <Card.Text>
                        {tender?.tender?.desc}
                    </Card.Text>
                    <Card.Title>Total Bids: {tender?.totalBids}</Card.Title>
                </Card.Body>
            </Card>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Company Name</th>
                        <th>Amount</th>
                        <th>At Buffer Time</th>
                    </tr>
                </thead>
                {tender && tender?.bids.map((singleBid, idx) => {
                    return (
                        <tbody>
                            <tr>
                                <td>{idx+1}</td>
                                <td>{singleBid?.user?.name}</td>
                                <td>{singleBid?.companyName}</td>
                                <td>{singleBid?.amount}</td>
                                <td>{singleBid.placedinBufferTime == true ? "Yes" : "No"}</td>
                            </tr>
                      
                        </tbody>
                    )
                })

                }

            </Table>
        </>
    )
}

export default SingleTender