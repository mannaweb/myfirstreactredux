import React, { useEffect, useState } from 'react'
import { Loader } from '../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getTokenDetails } from '../store/user';
//import { setUserDetails, removeUserDetails } from '../store/userDetails';

export const ProtectedRoute = (props) => {

  const selector = useSelector(state => state.users);
  const {TokenData} = selector;

  // console.log(TokenData);
  // console.log(TokenData);
  const dispatch = useDispatch();

  let navigate = useNavigate();
  const [isLoader, setIsLoader] = useState(true);
  const [auth, setAuth] = useState(false)
  let token_ = localStorage.getItem('accesstoken');
  useEffect(() => {
   if(TokenData && token_){
     //console.log(TokenData);
     localStorage.setItem('userId', TokenData.id)
        setIsLoader(false);
        setAuth(true);
        return
      }else{
       // alert('gi');
        setAuth(false);
        setIsLoader(false);
        navigate('/login')
      }
      
      if(token_){
        dispatch(getTokenDetails({
          token: token_
        }));
       
      }else{
        //alert('gi');
        setIsLoader(false);
        navigate('/login')
      }


  }, [TokenData, dispatch])



  return (
    <>
    {
      isLoader && <Loader/>
    }

    {
      auth && props.children
    }
    </>
  )
}

