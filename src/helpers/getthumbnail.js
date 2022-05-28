export const get_youtube_thumbnail = (url, quality) => {
    if(url){
        var video_id, thumbnail, result;
        if(result = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/))
        {
            video_id = result.pop();
        }
        else if(result = url.match(/youtu.be\/(.{11})/))
        {
            video_id = result.pop();
        }

        if(video_id){
            if(typeof quality == "undefined"){
                quality = 'high';
            }
        
            var quality_key = 'maxresdefault'; // Max quality
            if(quality === 'low'){
                quality_key = 'sddefault';
            }else if(quality === 'medium'){
                quality_key = 'mqdefault';
            } else if (quality === 'high') {
                quality_key = 'hqdefault';
            }

            var thumbnail = "http://img.youtube.com/vi/"+video_id+"/"+quality_key+".jpg";
            return thumbnail;
        }
    }
    return false;
}

export const youtube_parser = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length===11)? match[7] : false;
}


