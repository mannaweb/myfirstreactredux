import axios from "axios";
import * as actions from '../api';
//import {ADMIN_URl} from '../../config/host';

const api = ({dispatch}) => next => async action => {
    // console.log(action.payload, `type: ${action.type}`);
    // console.log(actions.apiCallBegan.type);
    // console.log('****break***');
    if(action.type !== actions.apiCallBegan.type){
        return next(action)
    }
    const {url, method, data, onStart, onSuccess, onError, baseUrl} = action.payload;
    if(onStart){
        dispatch({
            type: onStart
        })
    }
    next(action);

    try{
        var response = '';
        if(data.token){
             response = await axios.request({
                baseURL: baseUrl,
                url,
                method,
                data,
                headers: {
                    Authorization: 'Bearer '+data.token,
                   //'content-type': 'multipart/form-data',
                   // 'content-type': 'application/x-www-form-urlencoded' 
                   }
            });
        }else{
             response = await axios.request({
                baseURL: baseUrl,
                url,
                method,
                data
            });
        }
      

        dispatch(actions.apiCallSuccess(response.data));

        if(onSuccess){
            dispatch({
                type: onSuccess,
                payload: response.data
            })
            // console.log(response.data);
        }

    }catch(err){
        dispatch(actions.apiCallFailed(err.response.data));
        if(onError){
            dispatch({
                type: onError,
                payload: err.response.data
            })
        }
    }
}

export default api