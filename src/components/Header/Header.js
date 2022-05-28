  import React, { useEffect, useState } from 'react'
  import logo from '../../assets/img/logo.svg';
  import { Link } from 'react-router-dom';
  import profile from '../../assets/img/profile.png';
  import { doLogout } from '../../store/user';
import { useDispatch } from 'react-redux';
  export  const Header = (props) => {

    let token = localStorage.getItem('accesstoken');
    let refreshtoken = localStorage.getItem('refreshtoken');
    let userId = localStorage.getItem('userId');
    const dispatch = useDispatch();
  const  getInputValue = (e) => {
    if (e.key === 'Enter') {
      const userValue = e.target.value;
      props.setKeyword(userValue);
     // console.log('do validate');
    }
  }

  const logout = ()=>{
    dispatch(doLogout({
       refresh: refreshtoken,token:token
     }));
     window.localStorage.removeItem("accesstoken");
     window.location.href = '/login';
   };
 
      return (
        <>
      <header>
        <div className="brand">
          <Link to="/"  className="logo" ><img src={logo} alt="Logo"/></Link>
        </div>
        <div className="search">
          <div className="search-inner">
            <input type="text" className="search-input" defaultValue="" onKeyDown={getInputValue} placeholder="Search for gospel topics/content..."/>
            <div className="search-icon"><i className="far fa-fw fa-search"></i></div>
          </div>
        </div>
      
        <div className="authentication">
          {!token &&  <>
          <Link to="/register" className="btn-authentication">Sign Up</Link>
          <Link to="/login" className="btn-authentication alt">Login</Link>
          </>
          }
          {token &&
         <div className="menu-item dropdown">
         <Link className="menu-item dropdown-toggle" to="/profile" id="navbarDropdown" role="button" data-toggle="dropdown"
           aria-haspopup="true" aria-expanded="false">
           <div className="user-profile-img">
             <img src={profile}/>
           </div>
           </Link>
         <div className="dropdown-menu" aria-labelledby="navbarDropdown">
         <Link className="dropdown-item" to="/profile"> <div className="icon"> <i className="far fa-user fa-fw mr-2"></i></div> Profile</Link>
           <Link className="dropdown-item" to="/edit-profile"> <div className="icon"> <i className="far fa-pen fa-fw mr-2"></i></div> Edit Profile</Link>
           <a className="dropdown-item" onClick={logout}> <div className="icon"><i className="far fa-power-off fa-fw mr-2"></i></div> Log Out</a>
         </div>
       </div>
            }
        </div>
       </header>
       </>
         )
  }
  