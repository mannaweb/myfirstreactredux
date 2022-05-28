import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import  BASE_URL  from "../config/host";

export const trackSlice = createSlice({
    name: 'tracks',
    loading: false,
    initialState: {
        trackList: [],
        counttrack: 0,
        trackDetails:{},
        contentDetails:{}
        
    },
    reducers:{
        trackDetailsRequested:(state,action)=>{
            state.loading = true;
        },
        trackDetailsRequestFailed: (state, action)=>{
            state.loading = false;
            state.trackDetails ='';
            //console.log(action.payload);
        },
        trackListReceived: (state, action)=>{
            state.loading = false;
            if(action.payload.count > 0){
              state.trackList = action.payload.results;
              state.counttrack = action.payload.count;
              
             }
        },
        moretrackListReceived: (state,action)=>{
            if(action.payload.count>0){
                state.trackList=[...state.trackList,...action.payload.results];
                state.counttrack=action.payload.count;
            }
        },
        trackDetailsReceived: (state,action)=>{
            state.loading = false;
            if(action.payload){
                state.trackDetails= action.payload;
            }
        },
        contentDetailsReceived: (state,action)=>{
          
            if(action.payload){
                state.contentDetails= action.payload;
            }
        },
        trackDetailsReset: (state,action)=>{
            if(action.payload){
                state.trackDetails= null;
            }
        },
        trackListRequested:(state,action)=>{
            state.loading = true;
        },
        trackListRequestFailed: (state, action)=>{
            state.loading = false;
            state.trackDetails ='';
            //console.log(action.payload);
        }
    }
});

export const {trackListReceived ,trackListRequested,trackListRequestFailed,moretrackListReceived,trackDetailsReceived,trackDetailsReset,contentDetailsReceived,trackDetailsRequested,trackDetailsRequestFailed} = trackSlice.actions;
//console.log(body);
export const fetchTracks = (body)=> apiCallBegan({
    url: '/tracks/content?limit='+body.limit+'&offset='+body.offset,
    method: 'get',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: trackListReceived.type,
    onStart: trackListRequested.type,
    onError: trackListRequestFailed.type
});
export const morefetchTracks = (body)=> apiCallBegan({
    url: '/tracks/content?limit='+body.limit+'&offset='+body.offset,
    method: 'get',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: moretrackListReceived.type,
 
});
export const fetchTrackDetails = (body)=> apiCallBegan({
    url: '/tracks/content/'+body.id,
    method: 'get',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: trackDetailsReceived.type,
    onStart: trackDetailsRequested.type,
    onError: trackDetailsRequestFailed.type
 
});
export const fetchContentDetails = (body)=> apiCallBegan({
    url: '/contents/content/'+body.id,
    method: 'get',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: contentDetailsReceived.type,
 
});

