import React, { useEffect, useState } from "react";
import  Plyr  from 'plyr-react';
import "plyr-react/dist/plyr.css";
import FrontLayout from '../../containers/FrontLayout';
import { fetchVideosDetails } from '../../store/video';
import { updateWatchHistory } from '../../store/video';
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../Loader/Loader";
import { nFormatter } from '../../helpers/numberFormat';
import { fetchVideos } from '../../store/video';
import { getWatchDetails } from '../../store/video';
import { morefetchVideos } from '../../store/video';
import InfiniteLoader from 'react-infinite-loader';
import RatingModal from "./RatingModal";
export const VideoDetails = ({item}) => {
    const { videoDetails,loading,watchData,videoList } = useSelector(state => state.videos);
    const{id} = useParams();
    const dispatch = useDispatch();
    let token = localStorage.getItem('accesstoken');
    const [limit] = useState(6);
    const [offset, setOffset] = useState(0);
    const [sub, setSub] = useState(false);
    const [fev, isFev] = useState(false);
    //console.log(token);
   

    useEffect(() => {
        dispatch(fetchVideos({
          limit: limit,offset:offset
        }))
        
       
      }, [id]);

    useEffect(() => {
        dispatch(fetchVideosDetails({
            id: id,
        }))
        
        }, [id]);

        useEffect(() => {
            if(watchData && watchData.is_subscribed === true){
                setSub(false)
            }else if(watchData && typeof watchData.is_subscribed === "boolean" &&  watchData.is_subscribed === false){
               setSub(true)
            }  
            
            }, [watchData?.is_subscribed]);

            useEffect(() => {
              document.getElementById("myFev").checked = watchData.marked_favourite;
              if(watchData && watchData.marked_favourite === true){
                isFev(false)
               
              }else if(watchData && typeof watchData.marked_favourite === "boolean" &&  watchData.marked_favourite === false){
                isFev(true)
              }  
              
              }, [watchData?.marked_favourite]);
    

        useEffect(() => {
        if(token !== null){
          dispatch(updateWatchHistory({
            content: id,
            token: token,
        }))
        dispatch(getWatchDetails({
            content: id,token:token
        }))

        }
       
        }, [token]);

          
        const loadData = async () => {
            setOffset(offset+limit);
               //alert( props.topicId);
                await dispatch(morefetchVideos({ limit: limit,offset: offset+limit}))
              }

        const subscribe = value => ()=>{
            //alert(value);
            if(value === true){
                setSub(false);
                document.getElementById("sub").innerHTML= "Subscribed";
                
            }else if(value === false){
                setSub(true);
               document.getElementById("sub").innerHTML= "Subscribe";
            }
            
              dispatch(updateWatchHistory({token:token,content:id,is_subscribed:value}));
            
           
           
          };

          const doFev = value => ()=>{
            //alert(value);
            if(value === true){
              isFev(false);
              document.getElementById("myFev").checked = value;
                
            }else if(value === false){
              isFev(true);
              document.getElementById("myFev").checked = value;
            }
            
              dispatch(updateWatchHistory({token:token,content:id,marked_favourite:value}));
            
           
           
          };
     //  console.log(videoDetails);
        const videoSlug= videoDetails.contentDetails?.videoSlug;
        // const {score,views,description,created_at} = videoDetails;
        // const {presenter_name} = videoDetails.presenter[0];
        const videoSrc = {
            type: "video",
            sources: [
                {
                src: videoSlug ,
                provider: "youtube",
                }
            ],
            autoplay: true
          
         };

         
 
    
    return (
        <>
        <FrontLayout 
      title=""
      pageTitle="Video Details"
    > {!loading && <div className="learning-tracks-video-details-section">
         <div className="track-panel-video-details">
       <div className="track-upcoming">
         <div className="track-upcoming-header">Related videos</div>
         <div className="track-list">
         {
                    videoList.length !== 0 && videoList.map((item,index) => {
                        if(item.contentDetails !== undefined){
                            return (   
                               
             <div className="track-item" index={index} key={index}>
                <Link to={"/video/"+item.contentDetails?.videoId}>
             <div className="track-item-img">
             
               <img src={'https://img.youtube.com/vi/'+item.contentDetails?.videoSlug+'/mqdefault.jpg'} alt=""/>
             </div>
             </Link>
             
             <Link to={"/video/"+item.contentDetails?.videoId} className="track-item-content">
               <div className="track-item-title">{item.contentDetails?.title.length > 18 ? item.contentDetails?.title.substring(0,18)+'...':item.contentDetails?.title}</div>
               <div className="track-item-meta">
                 <div className="meta-item">{item.contentDetails?.channelTitle.length > 18 ? item.contentDetails?.channelTitle.substring(0,18)+'...':item.contentDetails?.channelTitle}</div>
                 <div className="meta-item">{nFormatter(item.contentDetails?.views)} views</div>
               </div>
             </Link>
             <div className="track-item-action">
               <div className="dropdown track-dropdown">
                 <button className="dropdown-toggle" type="button" data-toggle="dropdown"><i className="far fa-fw fa-ellipsis-v"></i></button>
                 <div className="dropdown-menu dropdown-menu-right">
                   <button type="button" className="dropdown-item"><i className="far fa-fw fa-edit mr-2"></i> Edit</button>
                   <button type="button" className="dropdown-item"><i className="far fa-fw fa-trash-alt mr-2"></i> Delete</button>
                 </div>
               </div>
             </div>
           </div>  )
                        }
                    })
          }
         </div>
         <InfiniteLoader onVisited={ () =>loadData() } />
       </div>
     </div>
    <div className="track-video-details-panel">
        <div className="track-video">
        <div className="video-player"  data-plyr-provider="youtube" data-plyr-embed-id="" >{videoSlug && <Plyr   source={videoSrc} /> }</div>
        </div>
        <div className="track-video-details">
        <div className="track-video-info">
          
            <div className="track-video-content">
            <div className="track-video-title">{videoDetails.contentDetails?.title}</div>
            <div className="track-video-meta">
                <div className="meta-item">{videoDetails.contentDetails?.channelTitle}</div>
                <div className="meta-item">{nFormatter(videoDetails.contentDetails?.views)} views</div>
            </div>
            </div>
        </div>
        <div className="track-video-options">
            <div className="track-video-comment">
            <button type="button" className="btn-track-comment"><i className="far fa-fw fa-comment-alt-lines"></i></button>
            </div>

            {!token && 
             <Link to="/login">
             <div className="video-favorite">
               <input type="checkbox" className="video-favorite-input" />
               <div className="video-favorite-label"></div>
             </div>
             </Link>
             }
            <div className="track-video-favorite">
            <input type="checkbox" className="track-favorite-input" id="myFev" onChange={doFev(fev)}/>
            <div className="track-favorite-label"></div>
            </div>
            <div className="dropdown track-option-dropdown">
            <button className="dropdown-toggle" type="button" data-toggle="dropdown"><i className="far fa-fw fa-ellipsis-v"></i></button>
            <div className="dropdown-menu dropdown-menu-right">
            <button type="button"  data-toggle="modal" data-target="#exampleModalCenter" className="dropdown-item" > <i className="far fa-star fa-fw mr-2"></i> Rate this video</button>
                <button type="button" className="dropdown-item"><i className="far fa-clock fa-fw mr-2"></i> Watch later</button>
            </div>
            </div>
        </div>
        <div className="track-video-others">
            <div className="track-video-count"></div>
           <div className="track-video-subscribe">
           {token &&  <button type="button" className="btn-track-subscribe" id="sub" onClick={subscribe(sub)}>{watchData.is_subscribed && 'Subscribed'}{!watchData.is_subscribed && 'Subscribe'}</button> }
             
            </div>
            
            <div className="track-video-rating">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="far fa-star"></i>
            </div>
        </div>
        <div className="video-description">
              <div className="video-des">
                  <p>{videoDetails?.description}</p>
              </div>
          </div>
        </div>
         {/* <div className="track-video-comments">
        <div className="track-comments-title">Comments</div>
        <div className="track-comments-list">
            <div className="comment-item">
            <div className="comment-item-img"><img src="assets/img/image-02.png" alt=""/></div>
            <div className="comment-item-content">
                <div className="comment-item-title">James Gillmore<span className="comment-item-date">- Aug 23, 2021</span></div>
                <div className="comment-item-text">
                <p>Ham frankfurter tail, meatball sirloin strip steak jowl doner pork pig brisket. Boudin hamburger ball tip prosciutto buffalo chislic venison beef, tongue shoulder pig jerky meatloaf jowl strip steak. Capicola spare ribs porchetta tail kevin, swine shankle beef brisket tri-tip turducken ground round sausage pork belly. Beef andouille venison shoulder. Cow prosciutto pork loin bresaola spare ribs bacon pastrami ribeye flank leberkas fatback meatball rump buffalo chislic. Pork salami meatloaf pork loin shank, kielbasa tongue swine alcatra fatback landjaeger sirloin cupim.</p>
                </div>
            </div>
            </div>
            <div className="comment-item">
            <div className="comment-item-img"><img src="assets/img/image-02.png" alt=""/></div>
            <div className="comment-item-content">
                <div className="comment-item-title">James Gillmore<span className="comment-item-date">- Aug 23, 2021</span></div>
                <div className="comment-item-text">
                <p>Ham frankfurter tail, meatball sirloin strip steak jowl doner pork pig brisket. Boudin hamburger ball tip prosciutto buffalo chislic venison beef, tongue shoulder pig jerky meatloaf jowl strip steak. Capicola spare ribs porchetta tail kevin, swine shankle beef brisket tri-tip turducken ground round sausage pork belly. Beef andouille venison shoulder. Cow prosciutto pork loin bresaola spare ribs bacon pastrami ribeye flank leberkas fatback meatball rump buffalo chislic. Pork salami meatloaf pork loin shank, kielbasa tongue swine alcatra fatback landjaeger sirloin cupim.</p>
                </div>
            </div>
            </div>
            <div className="comment-item">
            <div className="comment-item-img"><img src="assets/img/image-02.png" alt=""/></div>
            <div className="comment-item-content">
                <div className="comment-item-title">James Gillmore<span className="comment-item-date">- Aug 23, 2021</span></div>
                <div className="comment-item-text">
                <p>Ham frankfurter tail, meatball sirloin strip steak jowl doner pork pig brisket. Boudin hamburger ball tip prosciutto buffalo chislic venison beef, tongue shoulder pig jerky meatloaf jowl strip steak. Capicola spare ribs porchetta tail kevin, swine shankle beef brisket tri-tip turducken ground round sausage pork belly. Beef andouille venison shoulder. Cow prosciutto pork loin bresaola spare ribs bacon pastrami ribeye flank leberkas fatback meatball rump buffalo chislic. Pork salami meatloaf pork loin shank, kielbasa tongue swine alcatra fatback landjaeger sirloin cupim.</p>
                </div>
            </div>
            </div>
            <div className="comment-item">
            <div className="comment-item-img"><img src="assets/img/image-02.png" alt=""/></div>
            <div className="comment-item-content">
                <div className="comment-item-title">James Gillmore<span className="comment-item-date">- Aug 23, 2021</span></div>
                <div className="comment-item-text">
                <p>Ham frankfurter tail, meatball sirloin strip steak jowl doner pork pig brisket. Boudin hamburger ball tip prosciutto buffalo chislic venison beef, tongue shoulder pig jerky meatloaf jowl strip steak. Capicola spare ribs porchetta tail kevin, swine shankle beef brisket tri-tip turducken ground round sausage pork belly. Beef andouille venison shoulder. Cow prosciutto pork loin bresaola spare ribs bacon pastrami ribeye flank leberkas fatback meatball rump buffalo chislic. Pork salami meatloaf pork loin shank, kielbasa tongue swine alcatra fatback landjaeger sirloin cupim.</p>
                </div>
            </div>
            </div>
            <div className="comment-item">
            <div className="comment-item-img"><img src="assets/img/image-02.png" alt=""/></div>
            <div className="comment-item-content">
                <div className="comment-item-title">James Gillmore<span className="comment-item-date">- Aug 23, 2021</span></div>
                <div className="comment-item-text">
                <p>Ham frankfurter tail, meatball sirloin strip steak jowl doner pork pig brisket. Boudin hamburger ball tip prosciutto buffalo chislic venison beef, tongue shoulder pig jerky meatloaf jowl strip steak. Capicola spare ribs porchetta tail kevin, swine shankle beef brisket tri-tip turducken ground round sausage pork belly. Beef andouille venison shoulder. Cow prosciutto pork loin bresaola spare ribs bacon pastrami ribeye flank leberkas fatback meatball rump buffalo chislic. Pork salami meatloaf pork loin shank, kielbasa tongue swine alcatra fatback landjaeger sirloin cupim.</p>
                </div>
            </div>
            </div>
            <div className="comment-item">
            <div className="comment-item-img"><img src="assets/img/image-02.png" alt=""/></div>
            <div className="comment-item-content">
                <div className="comment-item-title">James Gillmore<span className="comment-item-date">- Aug 23, 2021</span></div>
                <div className="comment-item-text">
                <p>Ham frankfurter tail, meatball sirloin strip steak jowl doner pork pig brisket. Boudin hamburger ball tip prosciutto buffalo chislic venison beef, tongue shoulder pig jerky meatloaf jowl strip steak. Capicola spare ribs porchetta tail kevin, swine shankle beef brisket tri-tip turducken ground round sausage pork belly. Beef andouille venison shoulder. Cow prosciutto pork loin bresaola spare ribs bacon pastrami ribeye flank leberkas fatback meatball rump buffalo chislic. Pork salami meatloaf pork loin shank, kielbasa tongue swine alcatra fatback landjaeger sirloin cupim.</p>
                </div>
            </div>
            </div>
            <div className="comment-item">
            <div className="comment-item-img"><img src="assets/img/image-02.png" alt=""/></div>
            <div className="comment-item-content">
                <div className="comment-item-title">James Gillmore<span className="comment-item-date">- Aug 23, 2021</span></div>
                <div className="comment-item-text">
                <p>Ham frankfurter tail, meatball sirloin strip steak jowl doner pork pig brisket. Boudin hamburger ball tip prosciutto buffalo chislic venison beef, tongue shoulder pig jerky meatloaf jowl strip steak. Capicola spare ribs porchetta tail kevin, swine shankle beef brisket tri-tip turducken ground round sausage pork belly. Beef andouille venison shoulder. Cow prosciutto pork loin bresaola spare ribs bacon pastrami ribeye flank leberkas fatback meatball rump buffalo chislic. Pork salami meatloaf pork loin shank, kielbasa tongue swine alcatra fatback landjaeger sirloin cupim.</p>
                </div>
            </div>
            </div>
        </div>
        </div> */}
    </div>
</div>
  
}
{
                loading && <div className="video-panel d-flex justify-content-center"><Loader /></div>
         }
          
      </FrontLayout>
      <RatingModal id={id}/>
    
        </>
    )
}
