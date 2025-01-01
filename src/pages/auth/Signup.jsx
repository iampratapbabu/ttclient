import React from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {
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
                                    <img  src="./assets/images/light-logo.png" className="mb-3" alt=""/>
                                </Link>
                                <h4>Hude Production</h4>
                                <div className="bg_caption_signup">
                                    <p>You have an account?</p>
                                    <Link to='/login'>Login Now</Link>
                                </div>
                            </div>
                       </div>
                    </div>
                </div>
                <div className="flex50">
                    <div className="auth_right">
                        <form method="post" className="login_form" enctype="multipart/form-data">
                            <div className="login_form_inner">
                                <div className="form_title">
                                    <h3>Register Account</h3>
                                </div>
                                <div className="form-group">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="userName" placeholder="User Name" value="Prashant Mishra"/>
                                        <label for="userName">User Name</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-floating">
                                        <input type="email" className="form-control" id="registeremail" placeholder="Email" value="prashant@gmail.com"/>
                                        <label for="registeremail">Email</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-floating">
                                        <input type="password" className="form-control" id="registerpassword" placeholder="Password" value="123456"/>
                                        <label for="registerpassword">Password</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-floating">
                                        <input type="password" className="form-control" id="confirmregisterpassword" placeholder="Confirm Password" value="123456"/>
                                        <label for="confirmregisterpassword">Confirm Password</label>
                                    </div> 
                                </div>
                                <div className="mt-5  d-flex align-items-center justify-content-between">
                                    <div className="form_pass w-100">
                                        <a href="login.html"  type="submit" className="btn submit-btn w-100">Register</a>
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

export default Signup;