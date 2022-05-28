import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getWatchData } from '../../store/user';
import { nFormatter } from '../../helpers/numberFormat';
import { getMoreWatchData } from '../../store/user';
import InfiniteLoader from 'react-infinite-loader';
import { Loader } from '../Loader/Loader';
export const Favourites = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [limit] = useState(12);
  const [offset, setOffset] = useState(0);
  const {watchHistory,loading} = useSelector(state => state.users);
  const favouritesHistory = watchHistory && watchHistory.filter(mark =>mark.marked_favourite===true);
  let token = localStorage.getItem('accesstoken');

  useEffect(() => {
    dispatch(getWatchData({
      token:token,limit:limit  
     }));
  }, [token]);
  //console.log(favouritesHistory.length);
  const loadData = async () => {
    setOffset(offset+limit);
    dispatch(getMoreWatchData({
      token:token,limit:limit,offset:offset+limit
     })); 
        
      }

  return (
        <> 
          {!loading && favouritesHistory && favouritesHistory.length !== 0 && favouritesHistory.map((item,index) => {
      return(
        <>
      <Link to={"/video/"+item.content.contentDetails.videoId} key={item.content.contentDetails.videoId} class="learning">
        <div class="learning-img"><img src={'https://img.youtube.com/vi/'+item.content.contentDetails.videoSlug+'/0.jpg'} alt=""/></div>
              <div class="learning-content">
                <div class="learning-title">{item.content.contentDetails.title?item.content.contentDetails.title:''}</div>
                <div class="learning-meta">
                  <div class="learning-meta-item">{item.content.contentDetails.channelTitle?item.content.contentDetails.channelTitle:''}</div>
                 
                </div>
                <div class="views">{nFormatter(item.content.contentDetails?.views)} Views</div>
               
              </div>
              
      </Link>
      {loading && <div className="d-flex justify-content-center"><Loader /></div>}
      {favouritesHistory.length > limit && <InfiniteLoader onVisited={ () =>loadData() } />}
      </>
      )
          })
        }
    </>
  )
}
