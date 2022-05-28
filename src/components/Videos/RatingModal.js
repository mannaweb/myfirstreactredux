import React, { useRef } from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import { updateWatchHistory } from '../../store/video';
import { useDispatch, useSelector } from "react-redux";
const RatingModal = ({ id, deleteUser }) => {
  const closeRef = useRef(null);
  const dispatch = useDispatch();
  let token = localStorage.getItem('accesstoken');
  
  const handleChange = () => (event) => {
    dispatch(updateWatchHistory({
      content: id,
      rating_given:event,
      token: token
      }))
    };

  return (
    <div className="modal-rating modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalCenterTitle">Rate this Video</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"/>
            <i className="far fa-times"></i>
        </div>
        <div className="modal-body">
          <div className="rating-section">
              <div className="rating-title">Thanks for watching !</div>
              <div className="rating-part">
              <Rating  emptySymbol="far fa-star fa-2x "
  fullSymbol="fa fa-star fa-2x" onChange={handleChange()} 
/>
              </div>
              
           
          </div>
        </div>
       
      </div>
    </div>
  </div>	
  )
}

export default connect(null)(RatingModal);