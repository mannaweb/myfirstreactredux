import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getClassroomDetails } from '../../store/classroom';
import  Plyr  from 'plyr-react';
import "plyr-react/dist/plyr.css";
export function ClassroomDetails(props) {
    let token = localStorage.getItem('accesstoken');
    const dispatch = useDispatch();
    const {classDetail} = useSelector(state => state.classrooms);
    const{any} = useParams();
  const classDetailSort =classDetail.materials && classDetail.materials.slice().sort(function(a,b) {return(a.position) - parseInt(b.position)});
        
    
    console.log(classDetail);
    useEffect(() => {
        dispatch(getClassroomDetails({
            classroom_code : any
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [any]);

        

    return (
       <>
       <br/>
         <div class="learning-tracks-video-details-section">
    
      <div class="track-video-details-panel classroom-details">
        <div class="track-video">
          <div class="video-player"  data-plyr-provider="youtube" data-plyr-embed-id="juKd26qkNAw"></div>
        </div>
        
        <div class="track-video-comments">
          <div class="track-comments-title">{classDetail.classroom_name?classDetail.classroom_name:''}</div>
          {
              classDetail.length !== 0 && classDetailSort.map(content => {
               
                    const des = content.type === "T" &&  JSON.parse(content.description);
                    //console.log(des);
                    const videoSrc = content.type === "V" && {
                        type: "video",
                        sources: [
                          {
                            src: content.video.videoSlug ,
                            provider: "youtube"
                          }
                        ]
                      };
                return ( 
                <div class="track-comments-list" key={content.id}>
                <div class="comment-item">
                 <div class="comment-item-content">
                     {content.type === "T" && 
                     <div class="comment-item-text">
                         { des.length !== 0 && des.map((text,index) => {
                       return (<p style={text.attributes} key={index}>{text.insert}</p>)
                         })
              }
                    </div>}
                    {content.type === "F" && 
                     <img src={content.file}/>}
                      {content.type === "V" && 
                     <div class="video-player"  data-plyr-provider="youtube" data-plyr-embed-id="juKd26qkNAw"><Plyr source={videoSrc} /></div>}
                  </div>
                </div>
             </div>)
            })
          } 
         
        </div>
      </div>
    </div>
     </>
    );
};

