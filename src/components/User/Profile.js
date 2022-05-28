import React, { useEffect, useRef,useState } from 'react';

import FrontLayout from '../../containers/FrontLayout';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTokenDetails } from '../../store/user';
import { WatchHistory } from './WatchHistory';
import { UserSidebar } from './UserSidebar';
import { EditProfile } from './EditProfile';
import { RecentClass } from '../Classroom/RecentClass';
import  {ClassroomDetails}  from '../Classroom/ClassroomDetails';
import { Favourites } from './Favourites';
import  Following  from './Following';
import  Followers  from './Followers';
import AddFollowing from './AddFollowing';
import BadgeModal from './BadgeModal';
export const Profile = () => {
        const selector = useSelector(state => state.users);
        const {TokenData,isfollow} = selector;
        const dispatch = useDispatch();
        let navigate = useNavigate();
        let token = localStorage.getItem('accesstoken');
        //console.log(TokenData);
       const [profileData, setprofileData] = useState([]); 
       const [msgData, setmsgData] = useState(null); 
       const [statusData, setstatusData] = useState(null); 
       const allowedExts = ['jpg', 'jpeg', 'png','gif', 'svg'];
       const [profileImage, setProfileImage] = useState(null);
       
      let pathname= window.location.pathname;
      let firstpath = window.location.pathname.split('/')
     //console.log(TokenData);     

useEffect(() => {
    setprofileData({
      profile_image:profileImage,
      first_name: TokenData.first_name,
      last_name: TokenData.last_name,
      age: TokenData.age,
      token:token 
     });
 
 
   }, [TokenData])
   
  useEffect(() => {
    if(TokenData){
         dispatch(getTokenDetails({
           token: token
         }));
        
       }else{
        navigate('/login')
        
       }
 
 
   }, [token,isfollow])

 





//alert(pathname);
 

  return (
        <> 
        <FrontLayout 
      title=""
      pageTitle="Video Details"
    >
     <div className="profile-section">
     <div className="index-panel">
     <UserSidebar profileData={TokenData}/>
      </div>
      
      <div className="profile-learning-panel">
     <div className="profile-tabs">
    { pathname !== '/edit-profile' && firstpath[1] && firstpath[1] !== 'following' && firstpath[1] && firstpath[1] !== 'followers' &&
          <div className="tab-menu">
            <div className={`navigation-menu ${pathname === '/profile' ? "active" : ""}`}><Link to="/profile" className="tab-menu-link">Watch History</Link></div>
            <div className={`navigation-menu ${pathname === '/favourites' ? "active" : ""}`}><Link to="/favourites" className="tab-menu-link">Favourites</Link></div>
            <div className={`navigation-menu ${pathname === '/watch-later' ? "active" : ""}`}><Link to="/watch-later" className="tab-menu-link">Watch Later</Link></div>
            <div className={`navigation-menu ${pathname === '/recent-classroom' ? "active" : ""}`}><Link to="/recent-classroom" className="tab-menu-link">Recently Attended Classrooms</Link></div>
          </div>
}
          {pathname === '/profile'  &&
          <div className="watch-history-list">
            <WatchHistory/>
            </div>
          }
          {pathname === '/following'  &&
          <div className="watch-history-list following-profile">
            <Following/>
            </div>
          }

          {pathname === '/followers'  &&
          <div className="watch-history-list following-profile">
            <Followers/>
            </div>
          }

           {pathname === '/following/add'  &&
          <div className="watch-history-list">
            <AddFollowing/>
            </div>
          }


           {pathname === '/favourites'  &&
          <div className="watch-history-list">
            <Favourites/>
            </div>
          }
          {pathname === '/recent-classroom'  &&
          <div className="watch-history-list">
            <RecentClass/>
            </div>
          }
          {firstpath[1] && firstpath[1] === 'classroom'  &&
                  <ClassroomDetails classroom_code={firstpath[2]}/>
          }
        </div>
        {pathname === '/edit-profile' && <EditProfile profileData={profileData} TokenData={TokenData}/>}
        
      </div>
    </div>
    <BadgeModal/>
 </FrontLayout>
    </>
  )
}
