import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClassroomDetails } from '../../store/classroom';
const PerRecentClass = ({item}) => {
    const {classroom_name,classroom_code} = item;
  
    const dispatch = useDispatch();
    const {classDetail} = useSelector(state => state.classrooms);
    const img = classDetail.materials && classDetail.materials.filter(material => material.type === "F")[0].file;
    console.log(classroom_code);
    useEffect(() => {
        dispatch(getClassroomDetails({
          classroom_code : classroom_code
        }))
        return
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
    return (
        <>
        <div className="learning-img">
            <img src={img} alt=""/>
         </div>
        <div class="learning-content">
        <div class="learning-title">{classroom_name?classroom_name:''}</div>
        <div class="learning-meta">
        <div class="learning-meta-item">Code : {classroom_code?classroom_code:''}</div>
        </div>
        </div>
        </>
    );
};

export default PerRecentClass;