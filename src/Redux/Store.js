import { configureStore } from "@reduxjs/toolkit";
import MovieSlice from "./Reducers/MovieSlice";
import ActorSlice from "./Reducers/ActorSlice";
import ProducerSlice from "./Reducers/ProducerSlice";



export default configureStore({
    reducer:{
        Movies:MovieSlice,
        Actor:ActorSlice,
        Producer:ProducerSlice
    }
})