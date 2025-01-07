import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import DContext from '../../context/DContext';

import logo from '../../assets/logo/custom/logo.png';
import toast from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    //const {redirecturl} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const {authState,authDispatch,login,logout} = useContext(DContext);
    const {user} = authState;

    const [loginInfo,setLoginInfo] = useState({
        "code":"",
        "password":""
    });

    const [btnDisabled,setBtnDisabled] = useState(false);
    const [btnText,setBtnText] = useState("Login");

    const handleChange = (e) =>{
        setLoginInfo({...loginInfo,[e.target.name]:e.target.value})
    }


    const handleSubmit = async(e) =>{
        e.preventDefault();
        setBtnDisabled(true);
        setBtnText("Please Wait...");
        const loginRes = await login(loginInfo);
        if(loginRes.status && loginRes.status == "success"){
            toast.success(loginRes.message);
            localStorage.setItem('token',loginRes.data.token)
            authDispatch({type:"LOGIN",payload:loginRes.data.client});
            //redirectRoute();
        }else{
            toast.error(loginRes.response ? loginRes.response.data.message : loginRes.message);
            setBtnDisabled(false);
            setBtnText("Login");
        } 

        
    }

    const redirectRoute =() =>{
        let redirectUrl = searchParams.get('redirecturl')
        if(redirectUrl !== null){
            console.log("redirect url found",redirectUrl);
            navigate(`/${redirectUrl}`);
        }else{
            navigate("/");
        }
    }

    useEffect(()=>{

    },[])


    return (
        <>
            <div className="auth_login">
                <div className="auth_bg">
                    <div className="auth_content">
                        <div className="flex50 ">
                            <div className="auth_left">
                                <div className="bg_caption">
                                    <div className="bg_caption_welcome">
                                        <Link to="/">
                                            <img src={logo} className="mb-3" alt="" />
                                        </Link>
                                        <h4>Tej Tech</h4>
                                        {/* <div className="bg_caption_signup">
                                            <p>Don't have an account?</p>
                                            <Link to="/signup">Register Now</Link>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex50">
                            <div className="auth_right">
                                <form onSubmit = {handleSubmit} className="login_form">
                                    <div className="login_form_inner">
                                        <div className="form_title">
                                            <h3>Login</h3>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-floating">
                                                <input type="text" 
                                                name="code" 
                                                className="form-control" 
                                                id="clientcode" 
                                                placeholder="Client Code" 
                                                onChange={handleChange}
                                                />
                                                <label for="clientcode">Client Code</label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-floating">
                                                <input 
                                                type="password" 
                                                name="password"
                                                className="form-control" 
                                                id="password" 
                                                placeholder="Password"
                                                onChange={handleChange}
                                                />
                                                <label for="password">Password</label>
                                            </div>
                                        </div>
                                        <div className="mt-5 mb-5 d-flex align-items-center justify-content-between">
                                            <div className="form_pass">
                                                <a href="#">
                                                    <p className="pb-0">Forgot Password?</p>
                                                </a>
                                            </div>
                                            <div className="form_pass">
                                                {/* <button id="login"  type="submit" className="btn submit-btn">Login</button> */}
                                                <button type='submit' className="btn submit-btn" disabled={btnDisabled}>{btnText}</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;