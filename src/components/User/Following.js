import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import profile from "../../assets/img/profile.png";
import { fetchFollowing } from "../../store/user";
import { doUnfollow } from "../../store/user";

const Following = () => {
  let token = localStorage.getItem("accesstoken");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [limit] = useState(12);
  const [offset, setOffset] = useState(0);
  const { followingData } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(
      fetchFollowing({
        token: token,
        limit: limit,
      })
    );
  }, [token]);
  //console.log(followingData);

  const Unfollow = value => ()=>{
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
       <Link to="/following/add" className="btn btn-info">
          Add
        </Link>
      <div className="watch-later-list">
        {followingData.length !== 0 &&
          followingData.map((user) => {
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
                  <a onClick={Unfollow(user.id)} className="views">Unfollow</a>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Following;
