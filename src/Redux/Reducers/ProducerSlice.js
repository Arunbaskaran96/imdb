import { createSlice } from "@reduxjs/toolkit";


export const Producer=createSlice({
    name:"Producer",
    initialState:{
        item:[],
        producer:{}
    },
    reducers:{
        addProducer:(state,action)=>{
            state.item=action.payload
        },
        addindividualproducer:(state,action)=>{
            state.producer=action.payload
        }
    }
})

export const {addProducer,addindividualproducer}=Producer.actions

export default Producer.reducer