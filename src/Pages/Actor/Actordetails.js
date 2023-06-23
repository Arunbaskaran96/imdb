import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addindividual } from "../../Redux/Reducers/ActorSlice";
import { addMovies } from "../../Redux/Reducers/MovieSlice";

function Actordetails(){
    const params=useParams()
    const dispatch=useDispatch()
    const actor=useSelector(state=>state.Actor.actor)
    const movies=useSelector(state=>state.Movies.item)
    const [isloading,setLoading]=useState(true)


    useEffect(()=>{
        getActor()
        getMovies()
    },[])

    const getActor=async()=>{
        try {
            const {data}=await axios.get(`https://imdbwebapi.onrender.com/getactor/${params.id}`,{
                headers:{
                    Authorization:`${window.localStorage.getItem("token")}`
                }
            })
            dispatch(addindividual(data))
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const getMovies=async()=>{
        try {
            const {data}= await axios.get(`https://imdbwebapi.onrender.com/filtermovie/${params.id}`,{
                headers:{
                    Authorization:`${window.localStorage.getItem("token")}`
                }
            })
            dispatch(addMovies(data))
        } catch (error) {
            console.log(error)
        }
    }


    return(
        isloading?
        <div className='loading-spinner'>
        <div class="spinner-border text-danger" role="status">
             <span class="sr-only">Loading...</span>
        </div>
        <h5 className='loading-text'>Loading...</h5>
        </div>
        :
        <div className="conatiner-fluid">
        <div className="row">
            <div className="col-md-3" style={{marginTop:"20px"}}>
                <Link to="/portal/Actors"  className="btn btn-primary btn-sm">Back</Link>
            </div>
        </div>
        <div className="row" style={{marginTop:"30px"}}>
            <div className="col-md-4">
                <img className="act-det-img" src={actor.img} alt="actor-image"/>
            </div>
            <div className="col-md-8 actor-det-right" style={{marginTop:"50px"}}>
                <h5><b>Name : </b>{actor.name}</h5>
                <h5><b>Date of Birth : </b>{actor.dob}</h5>
                <h5><b>Gender : </b>{actor.gender}</h5>
                <p><b>About : </b>{actor.bio}</p>
            </div>
        </div>
        <div className="row" style={{marginTop:"25px"}}>
            <h5 style={{color:"gold"}}>{actor.name} -Movie List</h5>
            {
                movies.length>0?movies.map((d)=>{
                    return(
                        <div className='col-md-4 movie-container'>
                        <div>
                            <img className='movie-poster' src={d.poster}/>
                        </div>
                        <div className='movie-card'>
                            <h6 className='movie-det'><b>Movie : </b>{d.name}</h6>
                            <h6 className='movie-det'><b>Director : </b>{d.director}</h6>
                            <h6 className='movie-det'><b>Released Year : </b>{d.year}</h6>
                            <h6 className='movie-det'><b>Genre : </b>{d.genre}</h6>
                            <Link to={`/moviedetail/${d._id}`} className='btn btn-secondary '>Know More</Link>
                            <Link to={`/editmovie/${d._id}`} style={{marginLeft:"10px"}} className='btn btn-info'>Edit</Link>
                        </div>
                    </div>
                    )
                }):<h4 style={{color:"white"}}>No Movie Found</h4>
            }
        </div>
    </div>
    )
}

export default Actordetails