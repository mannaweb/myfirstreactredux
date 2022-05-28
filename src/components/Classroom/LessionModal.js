import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
const LessionModal = (props) => {
    const closeModal = ()=>{
        $('#exampleModalCenter').modal('hide');
       
      };
    
    return (
        <div>
  <div class="modal fade modal-tech" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle">How Would You Like to Use This Lesson?</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <i class="far fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
      <div class="lesson-use">
        <a href="#" class="teach-lesson">
          <div class="icon"><i class="far fa-chalkboard"></i></div>
          <div class="text">Teach Now</div>
        </a>
        <Link to={"/my-classroom/"+props.classCode}  onClick={closeModal} class="teach-lesson">
          <div class="icon"><i class="far fa-pen"></i></div>
          <div class="text">
            <div class="sub-text">Copy to My Classroom and Edit</div>
            <div class="des">(This will override your current classroom)</div>
          </div>
        </Link>
      </div>
      </div>
     
    </div>
  </div>
</div>
        </div>
    );
};

export default LessionModal;