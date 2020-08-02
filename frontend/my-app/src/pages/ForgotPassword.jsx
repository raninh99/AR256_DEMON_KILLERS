import React, { useState, useContext }  from 'react';

import { Redirect, Link } from 'react-router-dom';

import md5 from 'md5';

import axios from 'axios';
import config from '../config.json';

import Store from '../store/store';

import './login.css';

import Avatar from '../images/avatar.svg';
import ForgotMobile from '../images/login-bg.svg';
import Wavebg from '../images/wave.png';

import './pages.css';

const ForgotPass = () => {
    const{ state } = useContext(Store);

    const [data, setData] = useState({ 
        email: ''
    });

    const [sata, setSata] = useState({ 
        password: '',
        confirmPassword: ""
    });

    const [firstVerify, setFirst] = useState(false);

    const[load, setLoad] = useState(false);
    const [secondVerify, setSecond] = useState(false);

    const [userOTP, setUserOTP] = useState('');

    const [backOTP, setBackOTP] = useState('');

    const [verified, setVerified] = useState(false);

    const [errors, setError] = useState(0); 
    // 0 no error
    //error for forgotpass page
    //1 is empty error
    //2 email does not registered
    // otp error
    //4 wrong otp
    // change password error
    // 6 is empty error
    //7 pass does not match

    const handleChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const otpChange = e => {
        setUserOTP(e.target.value);
    }

    const handleChangePassword = e => {
        setSata ({
            ...sata,
            [e.target.name]: e.target.value
        })
    }

    const verify = async() => {
        const userData = {
            email: data.email
        }

        try {    
            const res = await axios({
                url: `${config.BASE}/sendEmail1/`,
                method: "POST",
                data : userData
            });
            
            if(res.data) {
                if(res.data.status === "not registerd"){
                    window.alert("First signup with this email id");
                    setLoad(false);
                }
                else{
                    setBackOTP(res.data.status);
                
                setFirst(true);
                setLoad(false);
                }
                //console.log(res.data);
                
            }            
        }
        catch(error) {

            // if(error.response.data.error === "username does not exist") {
            //     setError(2);
            // }
            // else if(error.response.data.error === "username does not verified") {
            //     setError(3);
            // }
            // else {
            //     window.alert("Please try again");
            // }
            console.log(error);
        }   
    }

    const onSubmit = e => {
        e.preventDefault();
        if(data.email !== '' ) {
            if(!firstVerify) {
                setLoad(true);
                verify();
            }
        }
        else {
            setError(1);
        }

        //console.log("hello in submit");
    }

    const resendOTP= (e) => {
        e.preventDefault();
        setLoad(true);
        verify();
    }
    
    const submitOTP = (e) => {
        e.preventDefault();
        
        if(backOTP === md5(userOTP)) {
            
            setSecond(true);
        }
        else {
           setError(4);
        }
    }
    console.log(secondVerify);

    const passwordChange = async() => {
        const userData = {
            email: data.email,
            password: sata.password
        }
        try {
            const res = await axios({
                url: `${config.BASE}/FP/`,
                method: "POST",
                data: userData
            })

            if(res.data) {
                if(res.data.status === "done"){
                    setLoad(false);
                    window.alert("Password Succesfully changed");
                    setVerified(true);
                }
            }
        }
        catch(error) {
            setFirst(false);
            setSecond(false);
            setLoad(false);
            console.log(error.response);
        }
    }

    const changePassword = (e) => {
        e.preventDefault();
        if(sata.password === sata.confirmPassword) {
            if(sata.password !== '' && sata.confirmPassword !== '') {
                setError(0);
                setLoad(true);
                passwordChange();
            }
            else {
                setError(6);
            }
        }
        else {
            setError(7);
        }
    }

    if(verified) {
        return <Redirect to='/login' />;
    }

    if(state.isAuth) {
        return <Redirect to='/login' />;
    }

    return (
        <>
            <img className="wave" alt="background" src={Wavebg}></img>
            <div className="container_login">
                <div className="img">
                    <img src={ForgotMobile} alt="side"></img>
                </div>
                { !firstVerify && !secondVerify  &&
                    <div className="login-content">
                        <form>
                            <img src={Avatar} alt="avatar img"></img>
                            <h3 className="title">Forgot Password</h3>
                            <br></br><br></br>
                            
                            <div className="input-div pass focus">
                                <div className="i"> 
                                        <i className="fas fa-user"></i>
                                </div>
                                <div className="div">
                                        <h4>E-mail Address</h4>
                                        <input 
                                            type="text"  
                                            name='email'
                                            onChange={handleChange}
                                            required='required'
                                            className="input" 
                                        />
                                </div>
                            </div>
                            <br></br>
                            {load ? 
                                <input type="button" className="btn_login"  value="Loading...." />
                                : 
                                <input type="submit" className="btn_login" onClick={onSubmit} value="Send OTP" />
                            }                      
                            
                            <br></br>
                            <p>If you do not have account, please Click<Link to = '/signup'>  here</Link></p>
                            {errors=== 1 && 
                                <p className="error">Please fill all credentials</p>
                            }
                            {errors === 2 &&
                                <p className="error">Email does not have account</p>
                            }
                        </form>
                        
                    </div>
                }
                { firstVerify && !secondVerify &&
                    <div className="login-content">
                        <form>
                            <img src={Avatar} alt="avatar img"></img>
                            <h2 className="title">Verify</h2>
                            <br></br>
                            <div className="input-div one focus">
                                <div className="i">
                                        <i className="fas fa-envelope"></i>
                                </div>
                                <div className="div">
                                        <h4>Enter Verification Code</h4>
                                        <input 
                                            type = "text"
                                            name='otp'
                                            onChange = {otpChange}
                                            required='required'
                                            className="input" 
                                        />
                                </div>
                            </div>
                            {load ? 
                                <input type="button" className="btn_login"  value="Loading...." />
                                : 
                                <input type="submit" className="btn_login" onClick={submitOTP} value="Confirm" />
                            } 
                            <br/>
                            {load ? 
                                <input type="button" className="btn_login"  value="Loading...." />
                                : 
                                <input type="submit" className="btn_login" onClick={resendOTP} value="Resend" />
                            } 
                            <br></br>
                            <p>We have sent a Verification code to your registered email Id.</p>
                            {errors === 4 &&
                                <p className="error">Wrong otp</p>
                            }
                        </form>
                        
                    </div>

                }
                {firstVerify && secondVerify &&
                    <div className="login-content">
                        <form >
                            <img src={Avatar} alt = "avatar"></img>
                            <h3 className="title">Change Password</h3>
                            <br></br>
                            <div className="input-div pass focus">
                                <div className="i"> 
                                        <i className="fas fa-lock"></i>
                                </div>
                                <div className="div">
                                        <h4>Password</h4>
                                        <input 
                                            type="password"  
                                            name='password'
                                            onChange={handleChangePassword}
                                            required='required'
                                            className="input" 
                                        />
                                </div>
                            </div>
                            <div className="input-div pass focus">
                                <div className="i"> 
                                        <i className="fas fa-lock"></i>
                                </div>
                                <div className="div">
                                    <h4>Confirm Password</h4>
                                    <input 
                                        type="password"  
                                        name='confirmPassword'
                                        onChange={handleChangePassword}
                                        required='required'
                                        className="input" 
                                    />
                                </div>
                            </div>
                            {/* <a href="#">Forgot Password?</a> */}
                            {load ? 
                                <input type="button" className="btn_login"  value="Loading...." />
                                : 
                                <input type="submit" className="btn_login" onClick={changePassword} value="Change" />
                            } 
                            <br></br>
                            
                            {errors=== 6 && 
                                <p>Please fill all credentials</p>
                            }
                            {errors === 7 &&
                                <p  className="error">Password does not match with Confirm Password</p>
                            }
                            {errors=== 8 && 
                                <p>Error occured please try after some time</p>
                            }
                        </form>
                        
                    </div>

                }
            </div>

        </>
    );
}

export default ForgotPass;