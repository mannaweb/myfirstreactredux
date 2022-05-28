import React, { useEffect } from "react";
import { fetchContentDetails } from "../../store/track";
import { nFormatter } from '../../helpers/numberFormat';
 export const TrackItem = ({videoItem,length,index,removedKey,setremovedKey,video,setvideo}) =>{
    function getcontentDetails(id,index,videoSlug) {     
        setremovedKey(removedKey=index); 
        setvideo({...video,videoslug:videoSlug,views:views,title:title,presenter_name:presenter_name})                     
      }
    const {title, videoSlug,views,videoId} = videoItem.contentDetails;
    const {presenter_name} = videoItem.presenter[0];
return (
 
    <div onClick={() => getcontentDetails(videoItem.content_id,index,videoSlug,title,presenter_name,views)} className="track-item" key={videoId}>
    
    <div className="track-item-img">
      <div className="track-item-count">{index+1}/{length}</div>
      <img src={'https://img.youtube.com/vi/'+videoSlug+'/mqdefault.jpg'} alt=""/>
    </div>
    <div className="track-item-content">
      <div className="track-item-title">{title}</div>
      <div className="track-item-meta">
        <div className="meta-item">{presenter_name}</div>
        <div className="meta-item">{nFormatter(views?views:0)} views</div>
      </div>
    </div>
    <div className="track-item-action">
      <div className="dropdown track-dropdown">
        <button className="dropdown-toggle" type="button" data-toggle="dropdown"><i className="far fa-fw fa-ellipsis-v"></i></button>
        <div className="dropdown-menu dropdown-menu-right">
          <button type="button" className="dropdown-item"><i className="far fa-fw fa-edit mr-2"></i> Edit</button>
          <button type="button" className="dropdown-item"><i className="far fa-fw fa-trash-alt mr-2"></i> Delete</button>
        </div>
      </div>
    </div>     
     
  </div>
  

)
}