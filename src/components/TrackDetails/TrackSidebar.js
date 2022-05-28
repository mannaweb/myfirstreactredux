import React from "react";
import { TrackItem } from "./TrackItem";
import { nFormatter } from '../../helpers/numberFormat';
export const TrackSidebar= ({item,removedKey,setremovedKey,video,setvideo})=>{
  const {content} = item;
  const removed= removedKey;
  const video_slug= video.videoslug;
  const title= video.title;
  const presenter_name= video.presenter_name;
  const views= video.views;
    return(     
      <div className="track-panel">
      <div className="track-panel-title">Articles of Faith ({content?.length} Videos)</div>
      <div className="current-track">
        <div className="current-track-img">
          <div className="track-count">{removed+1}/{content?.length}</div>
          <img src={'https://img.youtube.com/vi/'+video_slug+'/mqdefault.jpg'} alt=""/>
        </div>
        <div className="current-track-content">
          <div className="current-track-status">Now Playing</div>
          <div className="current-track-title">{title}</div>
          <div className="current-track-meta">
            <div className="meta-item">{presenter_name}</div>
            <div className="meta-item">{nFormatter(views?views:0)} views</div>
          </div>
        </div>
      </div>
      <div className="track-upcoming">
        <div className="track-upcoming-header">Up Next</div>
        <div className="track-list">
          {
           content && content.length !== 0 && content.map((videoItem,index) => {
                return ( index !== removed && (<TrackItem videoItem={videoItem} index={index} length={content?.length} removedKey={removedKey} setremovedKey={setremovedKey} video={video} setvideo={setvideo} /> ) )
                    
            })
          }
        </div>
      </div>
    </div>
        
    )
}
export default TrackSidebar;