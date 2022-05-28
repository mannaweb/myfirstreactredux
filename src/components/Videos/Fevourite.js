import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateWatchHistory } from '../../store/video';
import { getWatchDetails } from '../../store/video';
export  function Fevourite(props) {
  
    const dispatch = useDispatch();
    let token = localStorage.getItem('accesstoken');
    const { watchData } = useSelector(state => state.videos);
    //console.log(favData.marked_favourite);
   const [checkval, setCheckval] = useState(false);
  const makeFavourite = (e) => {
        alert(e.target.checked);
     dispatch(updateWatchHistory({token:token,content:props.contentId,marked_favourite:e.target.checked}));
  };

   return (<>
          <div className="video-favorite">
         <input type="checkbox" className="video-favorite-input"  value="" onChange={makeFavourite}/>
               <div className="video-favorite-label"></div>
             </div>
     </>)
}