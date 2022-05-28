import React from 'react'
import {Sidebar} from '../Sidebar/Sidebar';
import  Tracks from './TrackList';
import FrontLayout from '../../containers/FrontLayout';
export default function Home() {
   return (<>
     <FrontLayout 
      title=""
      pageTitle="Site settings"
    ><Sidebar />
    <Tracks />
    </FrontLayout>
  
   </>)
}