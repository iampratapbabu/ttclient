import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import Loader from '../../components/loader/FullLoader';



import { Econtext } from '../../context/Econtext';

const Signup = () => {
    const navigate = useNavigate();

    const { authState, authDispatch, register } = useContext(Econtext);
    const { authError } = authState;

    const [signupInfo, setSignupInfo] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: ""
    })

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(signupInfo)
        setLoading(true);
        const res = await register(signupInfo);
        if (res.success) {
            localStorage.setItem('token', res.resData.token);
            authDispatch({ type: "REGISTER", payload: res.resData.user })
            navigate('/');
            toast.success("Registration Successfull");
        } else {
            console.log(res.message);
            if (res.response) {
                toast.error(res.response.data.message);
            } else {
                toast.error("Signup Failed " + res.message);
            }
            setLoading(false);
        }
    }


    if (loading) { return <Loader type={"blocks"} /> }
    return (
        <>
            <section>
                <h2>Create An Account</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Control name="name" type="text" placeholder="Enter Name" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control name="email" type="email" placeholder="Enter email" onChange={handleChange} />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control name="password" type="password" placeholder="Enter Password" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                        <Form.Control name="confirmPassword" type="password" placeholder="Enter Confirm Password" onChange={handleChange} />
                    </Form.Group>
                    <select className="form-select" name="role" id="floatingSelect" aria-label="State" onChange={handleChange} >
                    <option value="">Select User Type</option>
                        <option value="ADMIN">Admin</option>
                        <option value="USER">User</option>
                    </select>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

                <p>Already Have an account <Link to='/login'>Login</Link></p>

            </section>
        </>
    )
}

export default Signup