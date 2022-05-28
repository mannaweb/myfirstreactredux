import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/img/form-logo.svg';
import facebook from '../../assets/img/facebook-brands (1) 1.svg';
import google from '../../assets/img/logo_google.svg';
import { Link } from 'react-router-dom';
import { registerUser } from '../../store/user';
import toastr from 'toastr';

export const Register = () => {
    const dispatch = useDispatch();
    const {userData,userError} = useSelector(state => state.users);
    const [userDetails, setUsers] = useState({
        username: '',
        email: '',
        password: ''  
    });
    const [status, setStatus] = useState(false);
    const inputChange = (e) => {
        setUsers({
            ...userDetails, [e.target.name]: e.target.value
        })
    };
    const userSubmit = ()=>{
      dispatch(registerUser(userDetails));
      setStatus(true);
    };

   
    useEffect(()=>{
        if(userData && status){
            //console.log(userData);
            toastr.success('Your registration successfully completed.you have just been sent an email please check and verify.');
            setStatus(false);
        }
        if(userError && status){
          //console.log(userData);
          {userError.email && toastr.error(userError.email[0]);}
          {userError.password && toastr.error(userError.password[0]);}
          setStatus(false);
      }
    
    }, [userData,userError,status])

  

  return (
        <> <section className="register-form">
        <div className="container">
            <div className="row justify-content-center align-items-center">
           
                <div className="col-md-6">
    
                    <form action="" className="form">
                    <Link to="/"  className="form-logo">
                            <img src={logo}/>
                        </Link>
                        <div className="title-form">
                          <span className="form-title">Register Now</span>
                        </div>
                        
                        
                        <div className="form-group">
                          <div className="input-wrap">
                            <div className="icon"><i className="fal fa-fw fa-user"></i></div>
                            <input type="text" className="form-input"  autocomplete="off" placeholder="Username" name="username" value={userDetails.username} onChange={inputChange}/>
                          
                          </div>
                        </div>
          
                        <div className="form-group">
                          <div className="input-wrap">
                            <div className="icon"><i className="fal fa-envelope"></i></div>
                            <input type="email" className="form-input"  autocomplete="off" placeholder="E-mail " name="email" value={userDetails.email} onChange={inputChange}/>
                           
                          </div>
                        </div>
                     
                        <div className="form-group">
                            <div className="input-wrap">
                                <div className="icon"> <i className="fal fa-key"></i></div>
                               
                              <input type="password" className="form-input" autocomplete="off" placeholder=" Password"  name="password" value={userDetails.password} onChange={inputChange}/>
                            </div>
                        </div>

             
          
           
                        <div className="submit-btn">
                          <a className="form-button"  onClick={userSubmit}>Register</a>
                        </div>
                        <div className="back-home-log">
                           
                            <div className="log-home">
                             Have An Account?   <Link to="/login" className="log-page">Log In</Link>
                            </div>
                        </div>
                        <div className="social-login-wrap">
                          <div className="social-login-title">Login with Facebook or Google</div>
                          <div className="social-login">
                            <a className="btn-facebook" href="">
                                <div className="icon"><img alt="Facebook" src={facebook}/>
                                </div>
                                <div className="title">Continue with Facebook</div>
                            </a>
                            <a className="btn-google" href="">
                                <div className="icon"><img alt="Google" src={google}/></div>
                                <div className="title">Continue with Google</div>
                            </a>
                        </div>
                      </div>
                      </form>
    
                </div>
            </div>
        </div>
    </section></>
  )
}
