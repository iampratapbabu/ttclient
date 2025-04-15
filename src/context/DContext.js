import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';


//auth
import { login, logout, register } from './functions/AuthFunction';
import { authReducer, initialAuthState } from './reducers/AuthReducer';



export const DContext = React.createContext();


export const DProvider = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();


    const [authState, authDispatch] = useReducer(authReducer, initialAuthState);



    useEffect(() => {
        console.log("Dcontext started with api", BASE_URL);
        loadUser();
    }, [])

    const loadUser = async () => {
        try {
            let token = localStorage.getItem('token');
            if (!token) {
                console.log("No token found logging out");
                authDispatch({ type: "LOGOUT" });
                navigate('/login')
            } else {
                //make a call to server using token and fetch the detail to keep in context
                const axiosRes = await axios({
                    method: "GET",
                    headers: { 'x-access-token': token },
                    url: `${BASE_URL}/api/v1/clients/verify-token`,
                });
                console.log("----axiosRes", axiosRes);
                if (axiosRes.data.statusCode == 200) {
                    console.log("loadUser [SUCCESS]", axiosRes.data);
                    authDispatch({ type: "USER_LOADED", payload: axiosRes.data.data });

                } else {
                    authDispatch({ type: "LOGOUT" });
                    navigate('/login');
                }

            }
        } catch (err) {
            console.log("loadUser [ERROR]", err);
            authDispatch({ type: "LOGOUT" });
            navigate('/login');
        }
    }

    return (
        <DContext.Provider
            value={{
                // auth Reducer state
                authState,
                authDispatch,
                // auth global functions
                login,
                register,
                logout,

            }}>
            {props.children}
        </DContext.Provider>
    )
}

export default DContext