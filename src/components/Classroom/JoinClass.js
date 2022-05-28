import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { enrollClassroom } from '../../store/classroom';
import toastr from 'toastr';
import { getClassroomDetails } from '../../store/classroom';
import { getMyclassroom } from '../../store/classroom';
import  Plyr  from 'plyr-react';
import "plyr-react/dist/plyr.css";
import { Link, useNavigate } from 'react-router-dom';

const JoinClass = () => {
  let token = localStorage.getItem('accesstoken');
    const [data, setData] = useState({
      classroom: '',token:token  
    });
    const {enrollList} = useSelector(state => state.classrooms);
    console.log(enrollList);
    useEffect(() => {
      dispatch(getMyclassroom({
          token : token
      }))
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [token]);

    const [msg, setMsg] = useState(null);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const {enrollclassDetail,enrollclassDetailerror,classDetail} = useSelector(state => state.classrooms);
    const handleChange = (e) => {
       // alert(e);
        setData({classroom: e,token:token})
       
    };
  
    const classDetailSort = classDetail.materials && classDetail.materials.slice().sort(function(a,b) {return(a.position) - parseInt(b.position)});
    
    
   

    useEffect(()=>{
     if(enrollclassDetailerror.status && enrollclassDetailerror.status === 'error'){
      toastr.error(enrollclassDetailerror.data.classroom[0]);
       }
      return
    }, [enrollclassDetailerror])

    useEffect(()=>{
      if(enrollclassDetail.status && enrollclassDetail.status === 'success'){
        toastr.success('You are successfully joined this classroom');
        navigate('/join/'+enrollclassDetail.data.classroom)
      }
      return
    }, [enrollclassDetail])
  
   
    const joinClass = ()=>{
        // return dispatch(enrollClassroom(data)).then((response) => {
        //   console.log(response);
        // }).catch((error)=> { 
        //   console.log(error) 
        // });
        dispatch(enrollClassroom(data))
        try {
         
        } catch (error) {
          console.log(error);
        }
      };
    //console.log(classDetail.materials.length);
  
    return (
           <>
        <div className="classroom-panel join-class">
        <div className="classroom-header">
          <div className="classroom-header-title">Join A Class</div>
        </div>
        <div className="classroom-body">
            <div className="classroom-join mb-4">
                <div className="join-title">Enter Classroom Code</div>
              
                  <OtpInput 
        value={data.classroom}
        onChange={handleChange}
        numInputs={5}
        hasErrored="false"
        inputStyle="inputStyle"
        separator={<span>-</span>}/>
                
                <div className="join-btn">
                  <button type="button" className="join-btn-class" onClick={joinClass}>Join Classroom</button>
                </div>
            </div>
            {/* <div className="teach-class">
              <div className="title">Teach a Class</div>
              <div className="class-teaching">
                <div className="title-part">
                <div className="title">My Classroom: The Holy Ghost</div>
                <div className="sub-title">Ready to teach? Share your code with the class</div>
              </div>
              <div className="code-part">
                <div className="code">
                  <div className="text">5T4Y8</div>
                </div>
                <div className="manage-code">
                  <a className="manage-btn" href="">View/Manage</a>
                </div>
              </div>
              </div>
            </div> */}
            <div class="lesson-list-part">
              <div class="lesson-title">Recently Attend</div>
              <div class="lesson-item">
                <div class="lesson-list">
                {
                    enrollList.length !== 0 && enrollList.map(item => {
                        return ( <Link to={"/join/"+item.classroom_code} class="lesson">
                        <div class="title">
                          <div class="text-title">{item.classroom_name}</div>
                          <div class="date-time">
                          <div class="date">{item.classroom_code}</div>
                          </div>
                        </div>
                       </Link>)
                           
                    })
             } 
                  
                </div>
              </div>
              <div class="view-action">
                <button href="" class="view-btn">View All</button>
              </div>
            </div>
           

        </div>
      </div> 
      
      
 </>
    );
};

export default JoinClass;