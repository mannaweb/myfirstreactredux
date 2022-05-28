import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import profile from "../../assets/img/profile.png";
import { fetchUsers } from "../../store/user";
import { doFollow } from "../../store/user";

const AddFollowing = () => {
  let token = localStorage.getItem("accesstoken");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [limit] = useState(12);
  const [offset, setOffset] = useState(0);
  const { usersData } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(
        fetchUsers({
        token: token,
        limit: limit,
        offset: offset,
      })
    );
  }, [token]);
  console.log(usersData);

  const Follow = value => ()=>{
    dispatch(
      doFollow({
        token: token,
        account: value,
      })
    );
    navigate('/following');
   };

  return (
    <>
      
      <div className="watch-later-list">
        {usersData.length !== 0 &&
          usersData.map((user) => {
            return (
              <div className="learning" key={user.id} >
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
                  <a onClick={Follow(user.id)} className="views">Follow</a>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default AddFollowing;
