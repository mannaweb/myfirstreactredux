import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/img/form-logo.svg';
import facebook from '../../assets/img/facebook-brands (1) 1.svg';
import google from '../../assets/img/logo_google.svg';
import { Link } from 'react-router-dom';
import { loginUser } from '../../store/user';
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
export const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const {loginData,loginError} = useSelector(state => state.users);
  const [loginDetails, setLogin] = useState({
    username: '',
    email: '',
    password: ''  
});
const [status, setStatus] = useState(false);


  const inputChange = (e) => {
    setLogin({
        ...loginDetails, [e.target.name]: e.target.value
    })
};

const loginSubmit = ()=>{

  dispatch(loginUser(loginDetails));
  setStatus(true);
};

useEffect(()=>{
  if(loginData && status){
  
      toastr.success('Successfully logged in');
      let getaccess = loginData.tokens.replaceAll("'", '"');
      let accesstoken = JSON.parse(getaccess).access;
      let accessrefresh = JSON.parse(getaccess).refresh;
      localStorage.setItem('accesstoken', accesstoken);
      localStorage.setItem('refreshtoken', accessrefresh);
      let token = localStorage.getItem('accesstoken');
      setStatus(false);
        if(token){
            navigate('/profile')
        }
      //alert(JSON.parse(token).access);
      
  }

}, [loginData,status])

useEffect(()=>{
  if(loginError && status){
      
      
      {loginError.email &&  toastr.error(loginError.email[0])}
      {loginError.password &&  toastr.error(loginError.password[0])}
      {loginError.detail && toastr.error(loginError.detail)}
      setStatus(false);
    return
  }

}, [loginError,status])

  return (
        <> 
        <section className="login-form">
        <div className="container">
            <div className="row justify-content-center">
             <div className="col-md-6">
                      <form action="" className="form">
                        <Link to="/" className="form-logo">
                            <img src={logo}/>
                        </Link>
                     <div className="title-form">
                          <span className="form-title">Log In</span>
                        </div>
                       
                        <div className="form-group">
                          <div className="input-wrap">
                            <div className="icon"><i className="fal fa-fw fa-user"></i></div>
                            <input type="text" className="form-input" autocomplete="off" placeholder="Email" name="email" value={loginDetails.email} onChange={inputChange}/>
                          
                          </div>
                        </div>
                       <div className="form-group">
                            <div className="input-wrap">
                                <div className="icon"> <i className="fal fa-key"></i></div>
                               <input type="password" className="form-input"  autocomplete="off"  placeholder="Password " name="password" value={loginDetails.password} onChange={inputChange}/>
                              <a href="#!" className="password-icon"></a>
                            </div>
                          </div>
                        {/* <div className="custom-checkbox">
                            <input type="checkbox" className="custom-checkbox-input" name="remember" checked/>
                            <label className="custom-checkbox-label">Remember me</label>
                          </div> */}
                         <div className="submit-btn">
                          <a className="form-button" value="" onClick={loginSubmit}>Log In</a>
                        </div>
                        <div className="auth-options">
                            <div className="text">New to Gospel Learning? <Link to="/register" className="signup-link">Create Account</Link></div>
                            <div className="text"><Link to="/forgot-password" className="forgot-link" >Forgot password?</Link></div>
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
    </section>
    </>
  )
}
