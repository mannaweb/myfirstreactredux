
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { checkJson } from '../../helpers/checkJson';
import { Loader } from '../Loader/Loader';
import { getClassroomDetails } from '../../store/classroom';

export  function Classroommaterials(props) {
 const {code} =  useParams();
 const dispatch = useDispatch();
 const {classDetail,detailloading} = useSelector(state => state.classrooms);
 //console.log(classDetail);
const classDetailSort =classDetail.materials && classDetail.materials.slice().sort(function(a,b) {return(a.position) - parseInt(b.position)});


useEffect(() => {
  if(code !== undefined){
    dispatch(getClassroomDetails({
      classroom_code : code
  }))
  }
 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

 return (<>
   
   <div className="classroom-panel">
        <div className="classroom-header">
          <div className="classroom-header-title">Your Lesson</div>
          {code && 
          <div className="classroom-actions">
            <div className="classroom-actions-label">Add</div>
            <button type="button" className="btn-action"><i className="fal fa-fw mr-1 fa-text"></i>Text</button>
            <button type="button" className="btn-action"><i className="fal fa-fw mr-1 fa-image"></i>Image</button>
            <Link to={'/my-classroom/'+code+'/upload-video'} className="btn-action"><i className="fal fa-fw mr-1 fa-video"></i>Video</Link>
            <button type="button" className="btn-action"><i className="fal fa-fw mr-1 fa-file-alt"></i>File</button>
          </div>
          }
        </div>
         {!detailloading && code &&
        <div className="classroom-body">
          <div className="classroom-form">
            <div className="classroom-input-title">
              <div className="control-label">Display Title</div>
              <div className="input-style">
                <input type="text" className="input" value={classDetail.classroom_name?classDetail.classroom_name:''} placeholder=""/>
              </div>
            </div>
            <div className="classroom-media-list" id="sortable">
            { classDetail.length !== 0 && classDetailSort.map(content => {
                const des = content.type === "T" && checkJson(content.description) && JSON.parse(content.description);
              // console.log(des);
              return( <>
                 {content.type === "F" && 
                    <div className="media-item-photo">
                    <div className="media-item-inner">
                      <div className="media-item-sort"><i className="far fa-fw fa-sort-alt"></i></div>
                      <div className="media-img">
                        <img src={content.file} alt=""/>
                      </div>
                      <div className="media-content">
                        <div className="media-title">{content.title?content.title:''}</div>
                        <div className="media-meta">
                          <div className="meta-item">{content.description?content.description:''}</div>
                        </div>
                      </div>
                      <div className="media-action">
                        <div className="dropdown media-dropdown">
                          <button className="dropdown-toggle" type="button" data-toggle="dropdown"><i className="far fa-fw fa-ellipsis-v"></i></button>
                          <div className="dropdown-menu dropdown-menu-right">
                            <button type="button" className="dropdown-item"><i className="far fa-fw fa-edit mr-2"></i> Edit</button>
                            <button type="button" className="dropdown-item"><i className="far fa-fw fa-trash-alt mr-2"></i> Delete</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                    }
                {content.type === "T" && 
                     <div class="comment-item-text">
                        
                       <div className="media-item-file">
                       <div className="media-item-inner">
                         <div className="media-item-sort"><i className="far fa-fw fa-sort-alt"></i></div>
                         <div className="media-file-icon"><i className="fal fa-fw fa-file-alt"></i></div>
                         <div className="media-content">
                          <div className="media-meta"><div className="meta-item">
                          {des && des.length !== 0 && des.map((text,index) => {
                             return (<>{text.insert > 50 ? text.insert.substring(0,50)+'..':text.insert}</>)
                            })
                          }
                          </div>
                           </div>
                         </div>
                         <div className="media-action">
                           <div className="dropdown media-dropdown">
                             <button className="dropdown-toggle" type="button" data-toggle="dropdown"><i className="far fa-fw fa-ellipsis-v"></i></button>
                             <div className="dropdown-menu dropdown-menu-right">
                               <button type="button" className="dropdown-item"><i className="far fa-fw fa-edit mr-2"></i> Edit</button>
                               <button type="button" className="dropdown-item"><i className="far fa-fw fa-trash-alt mr-2"></i> Delete</button>
                             </div>
                           </div>
                         </div>
                       </div>
                       </div>
                      </div>
                    }
            
              </>
              )

                 })
                } 
            </div>
          </div>
        </div>
        }
         {detailloading &&
         <div className="classroom-body d-flex justify-content-center"><Loader/></div>
}
      </div>
  
   </>)
}


