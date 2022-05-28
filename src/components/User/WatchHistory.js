import React, { useEffect, useRef,useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getWatchData } from '../../store/user';
import { getMoreWatchData } from '../../store/user';
import InfiniteLoader from 'react-infinite-loader'
import { nFormatter } from '../../helpers/numberFormat';
import { Loader } from '../Loader/Loader';
export const WatchHistory = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state.users);
  const {watchHistory,loading} = selector;
  let token = localStorage.getItem('accesstoken');
  const [limit] = useState(12);
    const [offset, setOffset] = useState(0);
 useEffect(() => {
    dispatch(getWatchData({
      token:token,limit:limit  
     }));
  }, [token]);

  const loadData = async () => {
    setOffset(offset+limit);
    dispatch(getMoreWatchData({
      token:token,limit:limit,offset:offset+limit
     })); 
        
      }
  //console.log(watchHistory);
return (
        <> 
       
      {!loading && watchHistory && watchHistory.length !== 0 && watchHistory.map((item,index) => {
       return ( 
      
        <Link to={"/video/"+item.content.contentDetails.videoId} key={item.content.contentDetails.videoId} className="learning">
              <div className="learning-img"><img src={'https://img.youtube.com/vi/'+item.content.contentDetails.videoSlug+'/0.jpg'} alt=""/></div>
              <div className="learning-content">
                <div className="learning-title">{item.content.contentDetails.title?item.content.contentDetails.title:''}</div>
                <div className="learning-meta">
                  <div className="learning-meta-item">{item.content.contentDetails.channelTitle?item.content.contentDetails.channelTitle:''}</div>
                 
                </div>
                <div className="views">{nFormatter(item.content.contentDetails?.views)} Views</div>
               
              </div>
            </Link>
 )   
  })
 }
 {loading && <div className="d-flex justify-content-end"><Loader /></div>}
  {watchHistory.length !== 0 && <InfiniteLoader onVisited={ () =>loadData() } />}
   </>
  )
}
