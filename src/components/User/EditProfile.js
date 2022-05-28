import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../store/user';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { dConvert } from '../../helpers/dateconvert';
import toastr from 'toastr';
export const EditProfile = (props) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [profileData, setprofileData] = useState([]); 
  const [msgData, setmsgData] = useState(null); 

  let token = localStorage.getItem('accesstoken');
  const [startDate, setStartDate] = useState(new Date());
  const [gender, setGender] = useState(null);
 //console.log(props.TokenData.date_of_birth);
 const inputChange = (e) => {
    setprofileData({
        ...profileData, [e.target.name]: e.target.value
    })
};

const inputDate = (e) => {
  setStartDate(e);
 //alert(dConvert(e));
 setprofileData({
  ...profileData, date_of_birth: dConvert(e)
  })
};

const getGender = (e) => {
  setGender(e.target.value);
  setprofileData({
    ...profileData, gender: e.target.value
    })
};

useEffect(() => {
    setprofileData({
      first_name: props.TokenData.first_name,
      last_name: props.TokenData.last_name,
      token:token 
     });
 
    { props.TokenData.date_of_birth && setStartDate(new Date(props.TokenData.date_of_birth))}
    { props.TokenData.gender && setGender(props.TokenData.gender)}

   }, [props.TokenData])
  
const profileSubmit = ()=>{

    dispatch(updateProfile(profileData));
    toastr.success('Successfully updated your profile');
  };
  

 return (
        <> 
         <div className='row'>
       <div className='col-sm-9'>
         
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">First Name</label>
    <input type="text" className="form-control"  name="first_name" value={profileData.first_name} onChange={inputChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Last Name</label>
    <input type="text" className="form-control"  name="last_name"  value={profileData.last_name}  onChange={inputChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Date Of birth</label>
    <DatePicker  locale="en"  dateFormat="dd/MM/yyyy" selected={startDate}  onChange={inputDate}/>
  </div>

  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Gender</label>
    <div onChange={getGender.bind(this)}>
        <input type="radio" value="M" name="gender" checked={gender === 'M'? true: false}/> Male
        <input type="radio" value="F" name="gender" checked={gender === 'F'? true: false}/> Female
      </div>
  </div>
  </div>
   <br/>

  <div className='col-sm-9'>
  <button type="button" className="btn btn-primary" onClick={profileSubmit} >Submit</button>
  </div>
 
 
 
   
   </div>
    </>
  )
}