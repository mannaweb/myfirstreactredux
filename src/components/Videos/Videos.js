import React,{ useState,useEffect,} from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { fetchVideos } from '../../store/video';
import { morefetchVideos } from '../../store/video';
import { searchfetchVideos } from '../../store/video';
import { setVideokey } from '../../store/video';
import { PerVideo } from './Pervideo';
import { Loader } from '../Loader/Loader';
import InfiniteLoader from 'react-infinite-loader';
export  const Videos = (props) => {
 const dispatch = useDispatch();
    const { videoList ,loading,countvidoes,moreloading } = useSelector(state => state.videos);
    const [limit] = useState(9);
    const [offset, setOffset] = useState(0);
  // console.log(videoList);

   useEffect(() => {
    dispatch(fetchVideos({
      limit: limit,offset:offset
    }))
  }, []);
  
 

  useEffect(() => {
    dispatch(searchfetchVideos({
      limit: limit,offset:offset,keyword: props.keyword,
    }))
  }, [props.keyword]);

  const loadData = async () => {
    setOffset(offset+limit);
       //alert( props.topicId);
        await dispatch(morefetchVideos({ limit: limit,offset: offset+limit, topicId: props.topicId,keyword: props.keyword }))
      }

      console.log(countvidoes);

    return (
       <>
       {!loading &&
       <div className="video-panel">
       <div className="video-list">
         {
                    videoList.length !== 0 && videoList.map((item,index) => {
                        if(item.contentDetails !== undefined){
                            return (  <div className="video" key={index} > <PerVideo item={item} /> </div> )
                        }
                    })
          }
          </div>
          
          <div className='d-flex justify-content-center'>
           {videoList && countvidoes >= 10 && <button className='btn btn-info'><i className={`fa fa-sync ${moreloading ? "fa-spin" : ""}`}></i> Loading</button>}
          </div>
          <InfiniteLoader onVisited={ () =>loadData() } />
       </div>
        }
        {
                loading && <div className="video-panel d-flex justify-content-center"><Loader /></div>
         }
         
         
       </>
    )
}


 