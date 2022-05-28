import React, { useEffect, useState } from 'react'

import { ClassSidebar } from '../Classroom/ClassSidebar';
import {Classroommaterials} from '../Classroom/Classroommaterials';
import FrontLayout from '../../containers/FrontLayout';
import { UploadVideo } from '../Videos/UploadVideo';
import JoinClass from './JoinClass';

export  function Classroom() {

  const [keyword, setKeyword] = useState('');
  let origin = window.location.pathname;


  useEffect(() => {
    setKeyword('');
  }, [origin]);
  //alert(origin);
   return (<>
   
     <FrontLayout 
      title=""
      pageTitle="" keyword={keyword} 
      setKeyword={setKeyword} >
      <ClassSidebar/>
      {origin.split('/')[1] === 'my-classroom' &&  window.location.pathname.split("/").pop() !== 'upload-video' && <Classroommaterials/>}
      {window.location.pathname.split("/").pop() === 'upload-video' && <UploadVideo/>}
       {origin === '/join-classroom' &&  <JoinClass/>}
    </FrontLayout>
  
   </>)
}
