import React,{ useEffect, useState } from 'react'
import TrackSidebar  from './TrackSidebar';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import  Plyr  from 'plyr-react';
import { fetchTrackDetails } from '../../store/track';
import { useParams } from 'react-router-dom';
import "plyr-react/dist/plyr.css";
import { trackDetailsReset } from '../../store/track';
import { Loader } from '../Loader/Loader';
import { nFormatter } from '../../helpers/numberFormat';
import { updateWatchHistory } from '../../store/video';
import { getWatchDetails } from '../../store/video';
const TrackDetails = ({removedKey,setremovedKey}) => {
  const removed=removedKey;
  const dispatch = useDispatch();
  const { trackDetails,loading } = useSelector(state => state.tracks);
  const { historyData,watchData } = useSelector(state => state.videos);
  const{id} = useParams();
  const [video, setvideo] = useState({videoslug:trackDetails?.content?.[0].contentDetails.videoSlug,presenter_name:trackDetails?.content?.[0].presenter[0].presenter_name,views:trackDetails?.content?.[0].contentDetails.views,title:trackDetails?.content?.[0].contentDetails.title,rating:trackDetails?.rating});
  let token = localStorage.getItem('accesstoken');

  useEffect(() => {
  dispatch(fetchTrackDetails({
      id: id,
  }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    dispatch(getWatchDetails({
        content: id,token:token
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
   console.log(watchData);
  useEffect(() => {

    if(trackDetails && trackDetails?.content && trackDetails?.content[0]) {
      
      setvideo({...video,videoslug:trackDetails?.content?.[0].contentDetails.videoSlug,presenter_name:trackDetails?.content?.[0].presenter[0].presenter_name,views:trackDetails?.content?.[0].contentDetails.views,title:trackDetails?.content?.[0].contentDetails.title,rating:trackDetails?.rating})
    }
  },[ trackDetails?.content ])
  const ratinPrcentage=(video.rating/5)*100;
  const videoSrc = {
    type: "video",
    sources: [
      {
        src: video.videoslug ,
        provider: "youtube"
      }
    ],
    autoplay: true
  };

  const subscribe = value => ()=>{
    if(value == 1){
      dispatch(updateWatchHistory({token:token,content:id,is_subscribed:false}));
    }else{
      dispatch(updateWatchHistory({token:token,content:id,is_subscribed:true}));
    }
   
   
  };

  return (
    <> {!loading  &&
      <>
       <TrackSidebar item={trackDetails} removedKey={removedKey} setremovedKey={setremovedKey} video={video} setvideo={setvideo} />
      <div className="track-video-panel">
        <div className="track-video">
          <div className="video-player"  data-plyr-provider="youtube" data-plyr-embed-id=""> <Plyr source={videoSrc} /></div>
        </div>
        <div className="track-video-details">
          <div className="track-video-info">
            <div className="track-video-author">
              {/* <img src="assets/img/user-01.png" alt=""/> */}
             </div>
            <div className="track-video-content">
              <div className="track-video-title">{video.title}</div>
              <div className="track-video-meta">
                <div className="meta-item">{video.presenter_name}</div>
                <div className="meta-item">{nFormatter(video.views?video.views:0)} views</div>
              </div>
            </div>
          </div>
          <div className="track-video-options">
            <div className="track-video-comment">
              <button type="button" className="btn-track-comment"><i className="far fa-fw fa-comment-alt-lines"></i></button>
            </div>
            <div className="track-video-favorite">
              <input type="checkbox" className="track-favorite-input"/>
              <div className="track-favorite-label"></div>
            </div>
            <div className="dropdown track-option-dropdown">
              <button className="dropdown-toggle" type="button" data-toggle="dropdown"><i className="far fa-fw fa-ellipsis-v"></i></button>
              <div className="dropdown-menu dropdown-menu-right">
                <button type="button" className="dropdown-item"><i className="far fa-fw fa-edit mr-2"></i> Edit</button>
                <button type="button" className="dropdown-item"><i className="far fa-fw fa-trash-alt mr-2"></i> Delete</button>
              </div>
            </div>
          </div>
          <div className="track-video-others">
            <div className="track-video-count">Video {removed+1}/{trackDetails?.content?.length}</div>
            {watchData.is_subscribed && <div className="track-video-subscribe">
              <button type="button" className="btn-track-subscribe" onClick={subscribe(1)}>Subscribed</button>
            </div> }
            {!watchData.is_subscribed &&
            <div className="track-video-subscribe">
              <button type="button" className="btn-track-subscribe" onClick={subscribe(2)}>Subscribe</button>
            </div>
             }
            <div className="track-video-rating">
              <div className="ratting-list-wrap">
                <div className="rating-value"></div>
                <div className="rating-star">
                    <div className="backstar">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                    </div>
                    <div className="frontstar" style={{width:''+ratinPrcentage+'%'}}>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                    </div>
                </div>
              </div>
            </div>
             
          </div>
        </div>        
      </div>
      </>
      } {
                loading && <div className="video-panel d-flex justify-content-center"><Loader /></div>
         }
      </>
  )
}

export default TrackDetails;