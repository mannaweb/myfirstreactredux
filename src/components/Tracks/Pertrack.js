import React from "react";

export const Pertrack= ({item})=>{
    const {track_thumbnail,track_name,content} = item;

    return(     
        <>
            <div className="learning-img"><img src={track_thumbnail} alt=""/></div>
            <div className="learning-content">
                <div className="learning-title">{track_name}</div>
                <div className="learning-meta">
                  <div className="learning-meta-item">{content.length} Videos</div>
                </div>
            </div>
        </>
        
    )
}