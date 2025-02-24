import React, { useEffect, useState } from 'react'
import PageTitleAndSnackBar from '../../components/common/PageTitleAndSnackBar'
import DataTable from '../../components/common/DataTable'
import CommonModal from '../../components/common/CommonModal'
import { useLocation } from 'react-router';
import ContentLoader from '../../components/loader/ContentLoader';
import axios from 'axios';
import { BASE_URL } from '../../config';
import toast from 'react-hot-toast';
import ClientTable from '../../components/common/ClientTable';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



const Clients = () => {
    const location = useLocation();
    const pathname = window.location.pathname;

    const [loading, setLoading] = useState(false);
    const [clientsData, setClientsData] = useState([]);
  
  
    useEffect(() => {
        //loadClients();
    }, [])

    const loadClients = async () => {
        try {
            setLoading(true);
            const axiosRes = await axios({
                method: "GET",
                //headers: { 'x-access-token': localStorage.getItem('token') },
                url: `${BASE_URL}/api/v1/clients`,
                //data: { portfolioType: ptype }
            });
            console.log("loadClients [SUCCESS]", axiosRes.data);
            if (axiosRes.data.success) {
                setLoading(false);
                setClientsData(axiosRes.data.resData);

            } else {
                console.log("loadClients [HANDLED ERROR]", axiosRes);
                setLoading(false);
                toast.error(axiosRes.data.message);
            }
        } catch (err) {
            console.log("loadClient  [UNHANDLED ERROR]", err);
            setLoading(false);
            toast.error("Something Went Wrong " + err.message);

        }

    }

    // console.log(location);
    // console.log(pathname);

    //we can use as many useEffects we want
    // useEffect(()=>{

    // },[])

    return (
        <>
            <PageTitleAndSnackBar pageTitle="Clients" />
            <section className="section dashboard">
                {
                    loading ?
                        <ContentLoader />
                        :
                        <ClientTable clientsArr={clientsData} />
                }
            </section>
        </>
    )
}

export default Clients