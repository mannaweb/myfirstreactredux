import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {getrecentClass}  from '../../store/user';
import PerRecentClass from './PerRecentClass';
import { Loader } from '../Loader/Loader';
export  function RecentClass() {
    const dispatch = useDispatch();
    let token = localStorage.getItem('accesstoken');
    const selector = useSelector(state => state.users);
    const {recentClass,loading} = selector;
    const [limit] = useState(8);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        dispatch(getrecentClass({
            token: token,
            limit:limit,
            offset:offset
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [token]);

  console.log(recentClass);
   return (<>
         {!loading && recentClass.length !== 0 && recentClass.map(item => {
                        return (<>
                        <Link to={"/classroom/"+item.classroom_code} className="learning">
                            <PerRecentClass item={item}/>
                           </Link>
                           </>)
                           
                    })
             } 
   {loading && <div className="d-flex justify-content-end"><Loader /></div>}
   </>)
}
