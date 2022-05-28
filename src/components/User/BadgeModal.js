import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
const BadgeModal = (props) => {
    const closeModal = ()=>{
        $('#exampleModalCenter').modal('hide');
       
      };
    
    return (
        <div class="modal-badge modal fade" id="badgemodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"/>
          <i class="far fa-times"></i>
      </div>
      <div class="modal-body">
    <div class="badge-title">Congrats!</div>
    <div class="badge-part">
      <div class="badge-image">
        <img alt="" src="./assets/img/badge-1.png"/>
      </div>
      <div class="badge-no">1</div>
      <div class="badge-text">Attends Classroom</div>
    </div>
    <div class="badge-share">
      <div class="share-title">Tell your friends</div>
      <div class="share-social">
        <div class="icon">
          <a href=""><i class="fab fa-facebook-f"></i></a>
        </div>
        <div class="icon">
          <a href=""><i class="fab fa-twitter"></i></a>
        </div>
        <div class="icon">
          <a href=""><i class="fab fa-instagram"></i></a>
        </div>
      </div>
    </div>
    <div class="next-badge">
      <div class="badge-stripe-title">Next Student Badges to earn</div>
      <div class="sub-title">Up next!</div>
      <div id="badges-slider"  class="owl-carousel owl-theme owl-loaded">
        <a class="badges">
          <div class="badges-img">
            <img src="./assets/img/badge-2.png" alt=""/>
          </div>
        </a>
        <a class="badges">
          <div class="badges-img">
            <img src="./assets/img/badge-3.png" alt=""/>
          </div>
        </a>
        <a class="badges">
          <div class="badges-img">
            <img src="./assets/img/badge-4.png" alt=""/>
          </div>
        </a>
        <a class="badges">
          <div class="badges-img">
            <img src="./assets/img/badge-1.png" alt=""/>
          </div>
        </a>
      </div>

    </div>
      </div>
     
    </div>
  </div>
</div>	
    );
};

export default BadgeModal;