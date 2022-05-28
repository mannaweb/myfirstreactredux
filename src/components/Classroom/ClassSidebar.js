import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../Loader/Loader';
import { fetchLessionplans } from '../../store/classroom';
import { Link } from 'react-router-dom';
import LessionModal from './LessionModal';
export  function ClassSidebar() {
    const [limit] = useState(9);
    const [offset, setOffset] = useState(0);
    const [classCode, setClasscode] = useState(null);
     const dispatch = useDispatch();
     let token = localStorage.getItem('accesstoken');
    const { lessionPlans,classDetail,loading,detailloading} = useSelector(state => state.classrooms);
    //console.log(token);
     

    useEffect(() => {
        dispatch(fetchLessionplans({
          limit: limit,offset:offset
        }))
     }, []);
    
  
      const loadData = async () => {
        setOffset(offset+limit);
           
          }

          function fetchModal(name) {
            setClasscode(name);
            }
          
 return (<> 
 <div className="classroom-sidepanel">
 <div className="search">
   <input type="text"  className="search-input" placeholder="Search for content to add..."/>
   <div className="search-icon"><i className="far fa-fw fa-search"></i></div>
 </div>
 {/* <div className="lesson-plan">
   <div className="lesson-plan-title">Exodus 1-6</div>
   <div className="lesson-plan-text">Come Follow Me: Mar 21-27</div>
   <div className="lesson-plan-action">
     <a href="/" className="btn-lesson-plan">Use Our Lesson Plan</a>
   </div>
 </div> */}
 <div className="lesson-plan">

   <div className="lesson-plan-action">
     {token !== null && <Link to="/join-classroom" className="btn-lesson-plan">Join Classroom</Link>}
     {token === null && <Link to="/login" className="btn-lesson-plan">Join Classroom</Link>}
   </div>
 </div>

 <div className="revelation-section">
 <div className="revelation-section-title">Lession Plans</div>
 <hr></hr>
 {!loading &&
   <div className="revelation-list">
   {
    lessionPlans.length !== 0 && lessionPlans.map((item,index) => {
     
     return ( <div className="revelation" key={index}>
    
     <div className="revelation-content">
       <div className="revelation-title">{item.classroom_name}</div>
       <div className="revelation-meta">
         <div className="meta-item">{item.classroom_code}</div>
     </div>
     <div onClick={() => fetchModal(item.classroom_code)} className="revelation-action">
       <button type="button"  data-toggle="modal" data-target="#exampleModalCenter" className="btn-revelation">Use Now<i className="far fa-fw fa-chevron-right ml-1"></i></button>
     </div>
   </div>
   </div>)
      
    })
}

  
   </div>
}

        {
        loading && <div className="revelation-list d-flex justify-content-center"><Loader /></div>
        }
  
 </div>
</div> 
<LessionModal classCode={classCode}/>
</>)
}
