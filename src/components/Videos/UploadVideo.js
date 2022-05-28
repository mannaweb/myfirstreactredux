import React, { useEffect, useState } from 'react'
import  Plyr  from 'plyr-react';
import "plyr-react/dist/plyr.css";
import { youtube_parser } from '../../helpers/getthumbnail';

export const UploadVideo = ({item}) => {
  const [youtubeCode, setYoutubeCode] = useState(null);
  const [videoTitle, setVideotitle] = useState(null);
  const [channelTitle, setChannelTitle] = useState(null);
  console.log(videoTitle);
  console.log(channelTitle);
  const getThumnail= (e)=> {
  const code = youtube_parser(e.target.value);
   setYoutubeCode(code);
}
console.log(youtubeCode);

useEffect(() => {
  fetch("https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=39BUvmddfjU&ab_channel=OverviewBible&format=json")
    .then(res => res.json())
    .then(
      (result) => {
        setVideotitle(result.title);
        setChannelTitle(result.author_name);
      },
    (error) => {
      setVideotitle(null);
      setChannelTitle(null);
      }
    )
}, [youtubeCode])

const videoSrc = {
  type: "video",
  sources: [
      {
      src: youtubeCode ,
      provider: "youtube",
      }
  ]
 

};
  return (
        <> <div className="classroom-panel upload-video">
       <div className="upload-title">Submit Content</div>
       <div className="form-video-upload">
           <div className="form-video">
            <div className="form-group">
                <div className="control-label">Paste YouTube Link</div>
                <div className="input-style"><input type="text" className="input" placeholder="Paste YouTube Link"  onKeyUp={getThumnail}/></div>
            </div>
           {youtubeCode && <div className="video-preview">
                <div className="preview-title">Preview</div>
                <div className="track-video">
                    <div className="video-player"  data-plyr-provider="youtube" data-plyr-embed-id="juKd26qkNAw"> <Plyr   source={videoSrc} /></div>
                </div>
            </div>}
            
             </div>
        </div>
       <div className="submit">
        {/* <div className="video-img-frame">
          <img src="assets/img/video-frame.svg"/>
        </div> */}
        <div className="video-text">
          {/* <div className="greetings">Thank You!</div>
          <div className="des">
            Your video has been submitted for 
            review. You will be notified when it 
            is approved.
          </div> */}
          <div className="confirm">
            <button className="submit-btn">Submit</button>
            
          </div>

        </div>
      </div>

      </div>
       
        </>
    )
}
