import { createSlice } from "@reduxjs/toolkit";



export const Actor=createSlice({
    name:"Actor",
    initialState:{
        item:[],
        actor:{}
    },
    reducers:{
        addActor:(state,action)=>{
            state.item=action.payload
        },
        addindividual:(state,action)=>{
            state.actor=action.payload
        },
    }
})

export const {addActor,addindividual}=Actor.actions

export default Actor.reducer