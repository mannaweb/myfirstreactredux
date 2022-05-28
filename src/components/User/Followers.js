import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import profile from "../../assets/img/profile.png";
import { fetchFollowers } from "../../store/user";
import { doUnfollow } from "../../store/user";

const Followers = () => {
  let token = localStorage.getItem("accesstoken");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [limit] = useState(12);
  const [offset, setOffset] = useState(0);
  const { followersData } = useSelector((state) => state.users);
  console.log(followersData);
  useEffect(() => {
    dispatch(
        fetchFollowers({
        token: token,
        limit: limit,
      })
    );
  }, [token]);
  //console.log(followingData);

  const removeFollow = value => ()=>{
    dispatch(
      doUnfollow({
        token: token,
        account: value,
       })
    );
    document.getElementById("user"+value).remove();
   };

  return (
    <>
     
      <div className="watch-later-list">
        {followersData.length !== 0 &&
          followersData.map((user) => {
            return (
              <div className="learning" key={user.id} id={'user'+user.id}>
                <div className="learning-img">
                  <img
                    src={user.profile_image ? user.profile_image : profile}
                    alt=""
                    className="rounded-circle"
                  />
                </div>
                <div className="learning-content">
                  <div className="learning-title">
                    {user.first_name?user.first_name:user.email} {user.last_name?user.last_name:''}
                  </div>
                  <div className="learning-meta">
                    <div className="learning-meta-item">{user.level_title} |</div>
                    <div className="learning-meta-item">Level {user.points}</div>
                  </div>
                  <a onClick={removeFollow(user.id)} className="views">Remove</a>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Followers;
