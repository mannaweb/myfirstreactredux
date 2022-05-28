import { combineReducers } from "redux";

import { videoSlice } from "./video";
import { topicSlice } from "./topics";
import { userSlice } from "./user";
import { trackSlice } from "./track";
import { classSlice } from "./classroom";
export default combineReducers({
     videos: videoSlice.reducer,
     topics: topicSlice.reducer,
     users: userSlice.reducer,
     tracks: trackSlice.reducer,
     classrooms: classSlice.reducer
})