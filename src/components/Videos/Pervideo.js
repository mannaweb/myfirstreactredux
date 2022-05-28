import React from 'react'
import { Link } from 'react-router-dom';
import { Fevourite } from '../Videos/Fevourite';
import { nFormatter } from '../../helpers/numberFormat';
export const PerVideo = ({item,index}) => {
    const {channelTitle,videoId, title,videoSlug,views} = item.contentDetails;
    const {score} = item;
    let token = localStorage.getItem('accesstoken');
   
  
  return (
        <>
           
           <Link to={"/video/"+videoId} key={videoId}>
             <div className="video-inner">
             <div className="video-img">
               {/* <div className="video-duration">{score}<span>min</span></div> */}
               <img src={'https://img.youtube.com/vi/'+videoSlug+'/mqdefault.jpg'} alt=""/>
             </div>
             <div className="video-content">
               {/* <div className="video-user"><img src="assets/img/user-01.png" alt=""/></div> */}
               <div className="video-info">
                 <div className="video-title">{channelTitle.length > 18 ? title.substring(0,22)+'...':title}</div>
                 <div className="video-meta">
                   <div className="video-meta-item">{channelTitle.length > 12 ? channelTitle.substring(0,12)+'..':channelTitle}</div>
                   <div className="video-meta-item">{nFormatter(views)} views</div>
                 </div>
               </div>
             </div>
           </div>
           </Link>
           <div className="video-options">
             {token && 
             <div className="dropdown video-actions">
               <button className="dropdown-toggle" type="button" data-toggle="dropdown"><i className="far fa-fw fa-ellipsis-v"></i></button>
               <div className="dropdown-menu dropdown-menu-right">
                 <button type="button" className="dropdown-item"><i className="far fa-fw fa-time-o mr-2"></i> Add to Watch Later</button>
                 
               </div>
             </div>
             }
           </div>
     
        </>
    )
}
