  import React,{ useState,useEffect } from 'react'
  import { useSelector } from 'react-redux';
  import { useDispatch } from 'react-redux';
  import { fetchTopics } from '../../store/topics';
 //import { filterfetchTopics } from '../../store/topics';
  import { filterfetchVideos } from '../../store/video';
  import { Loader } from '../Loader/Loader';
  import $ from 'jquery';
   
  export  const Sidebar = (props) => {
    const dispatch = useDispatch();
    const { topicList,loading } = useSelector(state => state.topics);
    const [char] = useState('#');
    const [limit] = useState(100000);
    const [offset] = useState(0);
    const [topics, setTopic] = useState([]);
    //console.log(topics);
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));
  // console.log(alphabet.length);

   useEffect(() => {
    dispatch(fetchTopics({
        limit: limit,offset:offset,char : char
    }))
   
  }, []);



  function filter(letter) {
    var results = [];
    var len = topicList.length;
    for (var i = 0; i < len; i++) {
      if (topicList[i].name.indexOf(letter) === 0) results.push(topicList[i]);
    }

    setTopic(results);
    
  }

  useEffect(() => {
    if(topics.length === 0){
      setTopic(topicList);
    }
 }, [topicList,topics]);

  $('.index-panel .index-navigator .btn-index-navigator').on('click', function(){
    //alert('hi');
    $('.index-panel .index-navigator .btn-index-navigator').removeClass('active');
    $(this).addClass('active');
  });


   function filterChar(name) {
   //alert(name);
    dispatch(fetchTopics({
      limit: limit,offset:offset
  }))
      filter(name);
     
    
  }
  function filterVideo(topic_id) {
    props.setTopicId(topic_id);
    dispatch(filterfetchVideos({ topic_id: topic_id }))
    
  }
  
 

    return (
       <>
      <div className="index-panel">
        <div className="index-cta">
          <div className="index-cta-title">Preparing to Teach a Class?</div>
          <div className="index-cta-action">
            <button type="button" className="btn-cta">Get Started</button>
          </div>
        </div>
        <div className="index-inner">
          <div className="index-title">Topical Index</div>
          
          <div className="index-content">
            <div className="index-navigator">
            <button type="button" className="btn-index-navigator active" data-scroll-to="#" onClick={() => filterChar('#')}>#</button>
            {
              alphabet.length !== 0 && alphabet.map(ch => {
                return (<button type="button" key={ch} className="btn-index-navigator" data-scroll-to={ch} onClick={() => filterChar(ch)}>{ch}</button>)
            })
          } 
            </div>

            <div className="index-list">
            {!loading && 
              <div className="index-list-section" >
              {
                    topics.length !== 0 && topics.map(item => {
                        return ( <button type="button" key={item.id} className="index-link" onClick={() => filterVideo(item.id)}>{item.name}</button>)
                           
                    })
             } 
          </div>
            }
             {loading && <Loader/>}
            </div>
          </div>
           
          
        </div>
      </div>
       </>
    )
}
   