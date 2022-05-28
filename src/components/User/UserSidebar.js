import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cover from '../../assets/img/profile-cover.jpg';
import profile from '../../assets/img/profile.png';
import { fetchBadge } from '../../store/user';
import { updateProfile } from '../../store/user';
import { convertToBase64 } from '../../helpers/image';
import toastr from 'toastr';
import BadgeModal from './BadgeModal';
export const UserSidebar = (props) => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state.users);
    const {badgeList} = selector;
    let token = localStorage.getItem('accesstoken');
    const allowedExts = ['jpg', 'jpeg', 'png','gif', 'svg'];
    const [limit] = useState(40);
    const [offset, setOffset] = useState(0);
   const [userimg, setUserimg] = useState({
        selectedFile: null
    });
    const [favImage, setFavImage] = useState(null);
    //console.log(pathname);
    const badgeListSort =badgeList && badgeList.slice().sort(function(a,b) {  

        // equal items sort equally
        if (a.order === b.order) {
            return 0;
        }
        // nulls sort after anything else
        else if (a.order === null) {
            return 1;
        }
        else if (b.order === null) {
            return -1;
        }
        else if (true) {
            return a.order < b.order ? -1 : 1;
        }
       
        // if descending, highest sorts first
        else { 
            return a.order < b.order ? 1 : -1;
        }
    
      });
      

    useEffect(() => {
    dispatch(fetchBadge({
     limit:limit ,offset:offset 
     }));
  }, [token]);
  //console.log(badgeListSort);
  const onFileChange = event => {
   console.log(event.target.file[0]);
  
  };

  

//   useEffect(() => {
//     const formData = new FormData();
//     formData.append(
//         "profile_image",
//         userimg
//       );
//       dispatch(updateProfile(formData));
//   }, [userimg]);


    return (
        <> <div className="profile-panel">
            <div className="profile-part">
                <div className="profile-cover">
                    <div className="cover-img">
                        <img src={cover}/>
                    </div>
                    <div className="profile-content">
                   
                        <div className="upload-img">
                          <input type="file" id="image" className="input-file" name="selectedFile" onChange={onFileChange}/>
                          <label className="btn-file" htmlFor="image" ><i className="far fa-camera"></i></label>
                        </div>
                        <div className="edit"><Link to="/edit-profile" className="profile-edit"><i className="far fa-pen"></i></Link></div>
                        <div className="tag-line">{props.profileData.level_title}</div>
                    </div>
                </div>
                <div className="profile-feature">
                    <div className="profile">

                     

                     
                        <div className="profile-photo">
                          <div className="knob-wrap"><input type="text" value="87" className="dial" data-width="100%"/></div>
                          <div className="img-wrap">
                            <img src={profile}/>
                          </div>
                            
                        </div>
                       
                        <div className="badge">REVEIWER</div>
                        <div className="level">
                            <div className="level-tag">Lvl {props.profileData.level}</div>
                            <div className="level-score">{props.profileData.points}/800</div>
                        </div>
                    </div>
                    <div className="profile-follow">
                      <div className="following-section">
                        <Link to="/followers" className="follower">
                          <div className="no">{props.profileData.followers ? props.profileData.followers : 0} </div>
                          <div className="text">
                              Followers</div>
                      </Link>
                      <Link to="/following" className="follower">
                          <div className="no">{props.profileData.following ? props.profileData.following : 0} </div>
                          <div className="text">
                          Following</div>
                      </Link>
                      </div>
                      {/* <div className="follow-action">
                        <button type="button" className="follow-btn">Follow</button>
                      </div> */}
                        
                    </div>
               
                </div>
            </div>
            <div className="badge-panel">
              <div className="badge-list">
               <div className="learning-column-title">Your Badges</div>
                  <div className="badges">

                   {
                    badgeListSort.length !== 0 && badgeListSort.map((item,index) => {
                       const badge = item.level.filter(mark =>mark.level_title==='Bronze' || mark.level_title===null)
                       // console.log(badge);
                    return ( <> <a data-toggle="modal" data-target="#badgemodal" class="badge-img active"><div className="badge-img" key={index}>
                        <div className="img-wrap">
                            <img src={badge[0] && badge[0].badge_image}/>
                        </div>
                    </div></a></>)
                   
                    })
             } 

                   </div>
              </div>
              
             </div>
          
        </div>
     
        </>
        )
}