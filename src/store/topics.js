import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import  BASE_URL  from "../config/host";



export const topicSlice = createSlice({
    
    name: 'topics',
    initialState: {
        topicList: [],
        counttopics: 0,
        loading : false
    },
    reducers:{
         
        topicListRequested: (state, action)=>{
            state.loading = true;
         }, 
         topicListRequestFailed: (state, action)=>{
            state.loading = false;
         },
        topicListReceived: (state, action)=>{
            state.loading = false;
           if(action.payload.length > 0){
              state.topicList = action.payload;
              state.counttopics = action.payload.length;
              
             }
        },
        moretopicListReceived: (state, action)=>{
            //console.log(action.payload.length);
             if(action.payload.length > 0){
               state.topicList = [...state.topicList,...action.payload];
               state.counttopics = state.topicList.length;
               
              }
         },
         filtertopicListReceived: (state, action)=>{
           
         }
       
    }
});

export const {topicListReceived,moretopicListReceived,filtertopicListReceived,topicListRequested,topicListRequestFailed} = topicSlice.actions;
//console.log(body);
export const fetchTopics = (body)=> apiCallBegan({
    url: 'contents/topics?limit='+body.limit+'&offset='+body.offset,
    method: 'get',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: topicListReceived.type,
    onStart: topicListRequested.type,
    onError: topicListRequestFailed.type
});

export const morefetchTopics = (body)=> apiCallBegan({
    url: 'contents/topics?limit='+body.limit+'&offset='+body.offset,
    method: 'get',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: moretopicListReceived.type,
 
});

// export const filterfetchTopics = (body)=> {
//     //alert(body.char);
 
// }




