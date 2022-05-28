import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import  BASE_URL  from "../config/host";



export const userSlice = createSlice({
    
    name: 'users',
    initialState: {
        userData: null,
        userError: null,
        loginData: null,
        loginError: null,
        forgotData: null,
        forgotError: null,
        TokenData:[],
        watchHistory :[],
        recentClass:[],
        loading:false,
        badgeloading:false,
        badgeList:[],
        followingData:[],
        unfollowingData:[],
        followData:[],
        usersData:[],
        isfollow:false,
        followersData:[]
    },
    reducers:{
        userRegisterReceived: (state, action)=>{
           state.userData = action.payload;
        },
        userRegisterFailed: (state, action)=>{
            //console.log(action.payload);
            state.userError = action.payload;
         },
         userForgotReceived: (state, action)=>{
            //console.log(action.payload);
            state.forgotData = action.payload;
         },
         userForgotFailed: (state, action)=>{
            //console.log(action.payload);
            state.forgotError = action.payload;
         },
         userLoginReceived: (state, action)=>{
            //console.log(action.payload);
            state.loginData = action.payload;
         },
         userloginFailed: (state, action)=>{
            //console.log(action.payload);
            state.loginError = action.payload;
         },
         userRequested: (state, action) => {
           state.loading = true;
        },
        userRequestFailed: (state, action) => {
            //state.loading = false
        },
        userTokenDetails: (state, action) => {
            state.loading = false;
            //console.log(action.payload);
            state.TokenData = action.payload;
        },
        removeUserDetails: (state, action) => {
            state.TokenData = {}
        },
        userUpdateDetails: (state, action) => {
            console.log(action.payload);
        },
        userWatchHistory: (state, action) => {
            state.loading = false;
            state.watchHistory = action.payload.results;
        },
        userMoreWatchHistory: (state, action) => {
            state.loading = false;
           state.watchHistory = [...state.watchHistory,...action.payload.results];
        },
        userRecentRequested: (state, action) => {
            state.loading = true;
        },
        userRecentFailed: (state, action) => {
           state.loading = false;
        },
        userRecentClass: (state, action) => {
            //console.log(action.payload.results);
            state.loading = false;
            state.recentClass = action.payload.results;
        },
        badgeRequested: (state, action) => {
            state.badgeloading = true;
        },
        badgeFailed: (state, action) => {
           state.badgeloading = false;
        },
        badgeReceived: (state, action) => {
            //console.log(action.payload.results);
            state.badgeloading = false;
            state.badgeList = action.payload.results;
        },
        followingRequested: (state, action) => {
            state.badgeloading = true;
        },
        followingFailed: (state, action) => {
           state.badgeloading = false;
        },
        followingReceived: (state, action) => {
            //console.log(action.payload.results);
            state.badgeloading = false;
            state.followingData = action.payload.results;
        },
        followersRequested: (state, action) => {
            state.badgeloading = true;
        },
        followersFailed: (state, action) => {
           state.badgeloading = false;
        },
        followersReceived: (state, action) => {
            //console.log(action.payload.results);
            state.badgeloading = false;
            state.followersData = action.payload.results;
        },
        unfollowRequested: (state, action) => {
            state.isfollow = true;
            state.badgeloading = true;
        },
        unfollowFailed: (state, action) => {
           state.badgeloading = false;
        },
        unfollowReceived: (state, action) => {
            //console.log(action.payload.results);
            state.isfollow = false;
            state.badgeloading = false;
            state.unfollowingData = action.payload;
        },
        followRequested: (state, action) => {
            state.isfollow = true;
            state.badgeloading = true;
        },
        followFailed: (state, action) => {
           state.badgeloading = false;
        },
        followReceived: (state, action) => {
            state.isfollow = false;
            //console.log(action.payload.results);
            state.badgeloading = false;
            state.followData = action.payload;
        },
        usersRequested: (state, action) => {
            state.badgeloading = true;
        },
        usersFailed: (state, action) => {
           state.badgeloading = false;
        },
        usersReceived: (state, action) => {
            //console.log(action.payload.results);
            state.badgeloading = false;
            state.usersData = action.payload.results;
        },
        userLogout: (state, action) => {
            console.log(action.payload);
        }
       
    }
});

export const {userRequested,userRecentClass,userRecentRequested,userRecentFailed,userMoreWatchHistory,userWatchHistory,userLogout,userUpdateDetails,removeUserDetails,userRequestFailed,userRegisterReceived,userRegisterFailed,userLoginReceived,userloginFailed,userForgotReceived,userForgotFailed,userTokenDetails,badgeReceived,badgeRequested,badgeFailed,followingReceived,followingRequested,followingFailed,unfollowReceived,unfollowRequested,unfollowFailed,followReceived,followRequested,followFailed,usersReceived,usersRequested,usersFailed,followersReceived,followersRequested,followersFailed} = userSlice.actions;
//console.log(body);
export const registerUser = (body)=> apiCallBegan({
    url: 'account_auth/register/',
    method: 'post',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: userRegisterReceived.type,
    onError: userRegisterFailed.type
 
});
export const loginUser = (body)=> apiCallBegan({
    url: 'account_auth/login/',
    method: 'post',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: userLoginReceived.type,
    onError: userloginFailed.type
 
});
export const forgotUser = (body)=> apiCallBegan({
    url: 'account_auth/request-reset-email/',
    method: 'post',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: userForgotReceived.type,
    onError: userForgotFailed.type
 
});

export const getTokenDetails = (body) => apiCallBegan({
    url: 'accounts/myaccount/',
    method: 'get',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: userTokenDetails.type,
    onStart: userRequested.type,
    onError: userRequestFailed.type
});

export const updateProfile = (body) => apiCallBegan({
    url: 'accounts/myaccount/',
    method: 'put',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: userUpdateDetails.type,
    onStart: userRequested.type,
    onError: userRequestFailed.type
});

export const getWatchData = (body) => apiCallBegan({
    url: 'accounts/watchdetail/?limit='+body.limit,
    method: 'get',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: userWatchHistory.type,
    onStart: userRequested.type,
    onError: userRequestFailed.type
});

export const getMoreWatchData = (body) => apiCallBegan({
    url: 'accounts/watchdetail/?limit='+body.limit+'&offset='+body.offset,
    method: 'get',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: userMoreWatchHistory.type,
    //onStart: userRequested.type,
    //onError: userRequestFailed.type
});

export const getrecentClass = (body) => apiCallBegan({
    url: 'classrooms/enrolledclassrooms?limit='+body.limit+'&offset='+body.offset,
    method: 'get',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: userRecentClass.type,
    onStart: userRecentRequested.type,
    onError: userRecentFailed.type
});

export const fetchBadge = (body) => apiCallBegan({
    url: 'badges/badge_list/?limit='+body.limit+'&offset='+body.offset,
    method: 'get',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: badgeReceived.type,
    onStart: badgeRequested.type,
    onError: badgeFailed.type
});
export const fetchFollowing = (body) => apiCallBegan({
    url: 'accounts/following/?limit='+body.limit+'&offset='+body.offset,
    method: 'get',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: followingReceived.type,
    onStart: followingRequested.type,
    onError: followingFailed.type
});

export const fetchFollowers = (body) => apiCallBegan({
    url: 'accounts/followers/?limit='+body.limit+'&offset='+body.offset,
    method: 'get',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: followersReceived.type,
    onStart: followersRequested.type,
    onError: followersFailed.type
});


export const fetchUsers = (body) => apiCallBegan({
    url: 'accounts/accountlist/?limit='+body.limit+'&offset='+body.offset,
    method: 'get',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: usersReceived.type,
    onStart: usersRequested.type,
    onError: usersFailed.type
});

export const doUnfollow = (body) => apiCallBegan({
    url: '/accounts/unfollow/'+body.account+'/',
    method: 'post',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: unfollowReceived.type,
    onStart: unfollowRequested.type,
    onError: unfollowFailed.type
});

export const doFollow = (body) => apiCallBegan({
    url: '/accounts/follow/'+body.account+'/',
    method: 'post',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: followReceived.type,
    onStart: followRequested.type,
    onError: followFailed.type
});


export const doLogout = (body) => apiCallBegan({
    url: 'account_auth/logout/',
    method: 'post',
    data: body,
    baseUrl: BASE_URL,
    onSuccess: userLogout.type,
    onStart: userRequested.type,
    onError: userRequestFailed.type
});





