import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import  BASE_URL  from "../config/host";

export const videoSlice = createSlice({
    name: 'videos',
    loading: false,
    moreloading : false,
    initialState: {
        videoList: [],
        countvidoes: 0,
        nexturl: null,
        pageError: null,
        videoDetails:[],
        historyData:[],
        watchData:[]
    },
    reducers:{
        videoRequested: (state, action)=>{
            state.loading = true;
        },
        videoRequestFailed: (state, action)=>{
            state.loading = false;
            state.videoList ='';
            //console.log(action.payload);
        },
        videoListReceived: (state, action)=>{
            state.loading = false;
            if(action.payload.count > 0){
               state.nexturl = action.payload.next;
               state.videoList = action.payload.results;
              state.countvidoes = action.payload.count;
              
              
             }
        },
         morevideoRequested: (state, action)=>{
            state.moreloading = true;
           
        },
        morevideoListReceived: (state, action)=>{
            state.moreloading = false;
            if(action.payload.count > 0){
              state.videoList = [...state.videoList,...action.payload.results];
              state.countvidoes = action.payload.count;
              state.nexturl = action.payload.next;
              
             }
        },
        filtervideoListReceived: (state, action)=>{
            state.loading = false;
            if(action.payload.count > 0){
              state.videoList = action.payload.results;
              state.countvidoes = action.payload.count;
              state.nexturl = action.payload.next;
             }
        },
        searchvideoListReceived: (state, action)=>{
            state.loading = false;
           // if(action.payload.count > 0){
              state.videoList = action.payload.results;
              state.countvidoes = action.payload.count;
              state.nexturl = action.payload.next;
            // }
        },
        videoDetailsRequested: (state, action)=>{
            state.loading = true;
        },
       videoDetailsRequestFailed: (state, action)=>{
            state.loading = false;
            state.videoDetails ='';
            //console.log(action.payload);
        },
        videoDetailsRecived:(state,action)=>{
            state.loading = false;
            if(action.payload){
               state.videoDetails = action.payload;
             
             }
            
        },
        videoHistoryRecived:(state,action)=>{
          // console.log(action.payload);
           state.loading = false;
           state.historyData = action.payload;
        },
        videoWatchDetails:(state,action)=>{
            // console.log(action.payload);
            state.loading = false;
            state.watchData = action.payload;
         },
         videoWatchRequested:(state,action)=>{
            // console.log(action.payload);
           state.loading = true;
          
         },
         videoWatchRequestFailed:(state,action)=>{
            // console.log(action.payload);
            state.loading = false;
            state.watchData = action.payload;
         }
    }
});

export const {videoHistoryRecived,videoWatchDetails,videoRequested,videoDetailsRequested,videoDetailsRecived,videoDetailsRequestFailed,videoRequestFailed,videoListReceived , morevideoListReceived,morevideoRequested,filtervideoListReceived,searchvideoListReceived,videoWatchRequested,videoWatchRequestFailed} = videoSlice.actions;
//console.log(body);
export const fetchVideos = (body)=> apiCallBegan({
    url: '/contents/content?limit='+body.limit+'&offset='+body.offset,
    method: 'get',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: videoListReceived.type,
    onStart: videoRequested.type,
    onError: videoRequestFailed.type
 
});

export const morefetchVideos = (body)=> {
    let url;
    if(body.keyword){
         url = 'contents/index_key/'+body.keyword+'/?limit='+body.limit+'&offset='+body.offset;
    }else{
         url = (body.topicId) ? '/contents/topic/'+body.topicId+'?limit='+body.limit+'&offset='+body.offset:'/contents/content?limit='+body.limit+'&offset='+body.offset;
    }
   
    return apiCallBegan({
      url: url,
      method: 'get',
      data: body,
      baseUrl: BASE_URL,
      onSuccess: morevideoListReceived.type,
      onStart: morevideoRequested.type,
      onError: videoRequestFailed.type
  });
  }

export const filterfetchVideos = (body)=> apiCallBegan({
    url: '/contents/topic/'+body.topic_id+'?page=1',
    method: 'get',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: filtervideoListReceived.type,
    onStart: videoRequested.type,
    onError: videoRequestFailed.type
});

export const searchfetchVideos = (body)=> {
   
    const url = (body.keyword) ? 'contents/index_key/'+body.keyword+'/?limit='+body.limit+'&offset='+body.offset:'/contents/content?limit='+body.limit;
    return apiCallBegan({
    url: url,
    method: 'get',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: searchvideoListReceived.type,
    onStart: videoRequested.type,
    onError: videoRequestFailed.type
}) };

export const fetchVideosDetails = (body)=> apiCallBegan({
    url: '/contents/content/'+body.id,
    method: 'get',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: videoDetailsRecived.type,
    onStart: videoDetailsRequested.type,
    onError: videoDetailsRequestFailed.type
 
});

export const updateWatchHistory = (body)=> apiCallBegan({
    url: 'accounts/watchdetail/',
    method: 'post',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: videoHistoryRecived.type,
  
});

export const getWatchDetails = (body)=> apiCallBegan({
    url: 'accounts/watchdetail/'+body.content+'/',
    method: 'get',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: videoWatchDetails.type,
    onStart: videoWatchRequested.type,
    onError: videoWatchRequestFailed.type
});

export const setVideokey = (body)=> apiCallBegan({
 
    onStart: body.key,
    
});





