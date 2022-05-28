import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import  BASE_URL  from "../config/host";

export const classSlice = createSlice({
    name: 'classrooms',
    loading: false,
    detailloading: false,
    initialState: {
        classDetail: [],
        lessionPlans: [],
        enrollclassDetail:[],
        enrollclassDetailerror:[],
        enrollList:[]
     },
    reducers:{
        classDetailReceived:(state,action)=>{
            state.detailloading = false;
            state.classDetail = action.payload;
        },
        classDetailRequested:(state,action)=>{
            state.detailloading = true;
        },
        classDetailRequestFailed:(state,action)=>{
            state.detailloading = false;
        },
        fetchLessionsReceived:(state,action)=>{
            state.loading = false;
            state.lessionPlans = action.payload.results;
        },
        fetchLessionsRequested:(state,action)=>{
            state.loading = true;
        },
        fetchLessionsRequestFailed:(state,action)=>{
            state.loading = false;
        },
        enrollclassReceived:(state,action)=>{
            state.loading = false;
            state.enrollclassDetail = action.payload;
        },
        enrollclassRequested:(state,action)=>{
            state.loading = true;
        },
        enrollclassRequestFailed:(state,action)=>{
            state.loading = false;
            state.enrollclassDetailerror = action.payload;
        },
        enrolllistReceived:(state,action)=>{
            state.loading = false;
            state.enrollList = action.payload.results;
        },
        enrolllistRequested:(state,action)=>{
            state.loading = true;
        },
        enrolllistRequestFailed:(state,action)=>{
            state.loading = false;
           
        }
     
    }
});

export const {classDetailReceived ,classDetailRequested,classDetailRequestFailed,fetchLessionsReceived,fetchLessionsRequested,fetchLessionsRequestFailed,enrollclassReceived,enrollclassRequested,enrollclassRequestFailed,enrolllistReceived,enrolllistRequested,enrolllistRequestFailed} = classSlice.actions;
//console.log(body);
export const getClassroomDetails = (body)=> apiCallBegan({
    url: 'classrooms/classroom/'+body.classroom_code+'/',
    method: 'get',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: classDetailReceived.type,
    onStart: classDetailRequested.type,
    onError: classDetailRequestFailed.type
});

export const fetchLessionplans = (body)=> apiCallBegan({
    url: 'classrooms/lessonplans?limit='+body.limit+'&offset='+body.offset,
    method: 'get',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: fetchLessionsReceived.type,
    onStart:fetchLessionsRequested.type,
    onError: fetchLessionsRequestFailed.type
});
export const enrollClassroom = (body)=> apiCallBegan({
    url: 'classrooms/enroll',
    method: 'post',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: enrollclassReceived.type,
    onStart:enrollclassRequested.type,
    onError: enrollclassRequestFailed.type
});

export const getMyclassroom = (body)=> apiCallBegan({
    url: '/classrooms/enrolledclassrooms?limit='+body.limit+'&offset='+body.offset,
    method: 'get',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: enrolllistReceived.type,
    onStart:enrolllistRequested.type,
    onError: enrolllistRequestFailed.type
});

