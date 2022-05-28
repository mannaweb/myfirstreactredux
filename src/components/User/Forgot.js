import React, { useEffect, useRef,useState } from 'react';
import logo from '../../assets/img/form-logo.svg';
import { Link } from 'react-router-dom';
import { forgotUser } from '../../store/user';
import { useDispatch, useSelector } from 'react-redux';
import toastr from 'toastr';

export const Forgot = () => {
  const dispatch = useDispatch();
  const {forgotData,forgotError} = useSelector(state => state.users);
  const [userDetails, setUsers] = useState({
     email: ''
  });
  const [status, setStatus] = useState(false);
  const inputChange = (e) => {
    setUsers({
        ...userDetails, [e.target.name]: e.target.value
    })
};

  const forgotSubmit = ()=>{

    dispatch(forgotUser(userDetails));
    setStatus(true);
};
useEffect(()=>{
  if(forgotData && status){
    toastr.success(forgotData.success);
    setStatus(false);
  }

}, [forgotData,status])
useEffect(()=>{
  if(forgotError && status){
  toastr.error(forgotError.email[0]);
  setStatus(false);
    return
  }

}, [forgotError,status])
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
                          <span className="form-title">Forgot Password?</span>
                        </div>
                       
                        <div className="form-group">
                          <div className="input-wrap">
                            <div className="icon"><i className="fal fa-fw fa-user"></i></div>
                            <input type="text" className="form-input" autoComplete='off' placeholder="Email"  name="email" value={userDetails.email} onChange={inputChange}/>
                          
                          </div>
                        </div>
                      
                       
                         <div className="submit-btn">
                          <a className="form-button" value="" onClick={forgotSubmit}>Submit</a>
                        </div>
                        <div className="auth-options">
                            <div className="text">New to Gospel Learning? <Link to="/register" className="signup-link">Create Account</Link></div>
                            <div className="text"><Link to="/login" className="forgot-link" >Login</Link></div>
                          </div>
                       
                      </form>
                   </div>
            </div>
        </div>
    </section>
    </>
  )
}
