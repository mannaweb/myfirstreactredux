import React, { useState } from 'react'
import  TrackDetails from './Details';
import FrontLayout from '../../containers/FrontLayout';
export default function Home() {
  const [removedKey, setremovedKey] = useState(0);

   return (<>
     <FrontLayout 
      title=""
      pageTitle="Site settings"
    >
    <TrackDetails removedKey={removedKey} setremovedKey={setremovedKey}/>
    </FrontLayout>
  
   </>)
}