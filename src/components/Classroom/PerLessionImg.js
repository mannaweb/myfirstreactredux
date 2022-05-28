import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassroomDetails } from '../../store/classroom';
const PerLessionImg = (props) => {
  
   
    const dispatch = useDispatch();
    const {classDetail} = useSelector(state => state.classrooms);
    const img = classDetail.materials && classDetail.materials.filter(material => material.type === "F")[0].file;
    useEffect(() => {
        dispatch(getClassroomDetails({
          classroom_code : props.classroom_code
        }))
       
        }, [props.classroom_code]);
    return (
        <>
        <div className="revelation-img">
            <img src={img} alt=""/>
         </div>
        </>
    );
};

export default PerLessionImg;