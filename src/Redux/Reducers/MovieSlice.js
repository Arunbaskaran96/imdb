import { createSlice } from "@reduxjs/toolkit";


export const Movies=createSlice({
    name:"Movies",
    initialState:{
        item:[],
        movie:{}
    },
    reducers:{
        addMovies:(state,action)=>{
            state.item=action.payload
        },
        addindividualmovie:(state,action)=>{
            state.movie=action.payload
        },
    }
})


export const {addMovies,addindividualmovie}=Movies.actions

export default Movies.reducer