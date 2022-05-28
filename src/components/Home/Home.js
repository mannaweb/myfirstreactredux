import React, { useEffect, useState } from 'react'
import { Sidebar } from '../Sidebar/Sidebar';
import { Videos } from '../Videos/Videos';
import FrontLayout from '../../containers/FrontLayout';


export default function Home() {
  const [topicId, setTopicId] = useState(null);
  const [keyword, setKeyword] = useState('');

  let origin = window.location.href;
  useEffect(() => {
    setKeyword('');
  }, [origin]);

   return (<>
   
     <FrontLayout 
      title=""
      pageTitle="" keyword={keyword} 
      setKeyword={setKeyword} >
        <Sidebar setTopicId={setTopicId} />
        <Videos  topicId={topicId}  keyword={keyword} />
    </FrontLayout>
  
   </>)
}
