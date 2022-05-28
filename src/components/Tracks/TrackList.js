import React,{ useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTracks } from '../../store/track';
import{morefetchTracks} from '../../store/track'
import { Pertrack } from './Pertrack';
import { Loader } from '../Loader/Loader';
import InfiniteLoader from 'react-infinite-loader'

const TrackList = () => {
const dispatch = useDispatch();
const { trackList,loading,counttrack } = useSelector(state => state.tracks);
const [limit] = useState(10);
const [offset, setOffset] = useState(0);


useEffect(() => {
dispatch(fetchTracks({
    limit: limit,
    offset:offset,
}))
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


const loadData = async () => {
  setOffset(offset+limit);
   await dispatch(morefetchTracks({ offset: offset + limit,limit:limit }))
 }
  return (
  
    <div className="learning-panel">
      {!loading &&
        <div className="learning-column">
          <div className="learning-column-title">Learning Tracks</div>
          <div className="learning-list">
          {
            trackList.length !== 0 && trackList.map(item => {
                return (  <Link to={"/learning/"+item.id+""} className="learning" key={item.id}><Pertrack item={item} /> </Link> )
                    
            })
          }
          </div>
          {
           trackList.length < counttrack && 
           <InfiniteLoader onVisited={ () =>loadData() } />
          }
         
        </div>
       }
         {
                loading && <div className="learning-column d-flex justify-content-center"><Loader /></div>
         }
          
       </div>
       
  )
}

export default TrackList