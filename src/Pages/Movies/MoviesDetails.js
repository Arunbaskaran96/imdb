import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import "./Movie.css"
import { useDispatch, useSelector } from 'react-redux'
import { addindividualmovie } from '../../Redux/Reducers/MovieSlice'

function MoviesDetails() {
    const dispatch=useDispatch()
    const params=useParams()
    const movie=useSelector(state=>state.Movies.movie)
    const [isloading,setLoading]=useState(true)
    useEffect(()=>{
        getMovie()
    },[])

    const getMovie=async()=>{
        try {
            const {data}=await axios.get(`https://imdbwebapi.onrender.com/movie/${params.id}`,{
                headers:{
                    Authorization:`${window.localStorage.getItem("token")}`
                }
            })
            dispatch(addindividualmovie(data))
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    isloading ? 
    <div className='loading-spinner'>
    <div class="spinner-border text-danger" role="status">
         <span class="sr-only">Loading...</span>
    </div>
    <h5 className='loading-text'>Loading...</h5>
    </div>
    :
    (    <div className='container-fluid'>
             <div className='row'>
                <div className='col-3'>
                    <Link to="/portal/Movies" className='btn btn-info btn-sm'>Back</Link>
                </div>
             </div>
    <div className='row  movie-details-container'>
        <div className='col-4'>
            <img className='mov-det-image' src={movie.poster}/>
        </div>
        <div className='col-8' style={{marginTop:"40px"}}>
            <div>
                <h5><b>Name : </b>{movie.name}</h5>
                <h5><b>Director : </b>{movie.director}</h5>
                <h5><b>Released Year : </b>{movie.year}</h5>
                <h5><b>Producer : </b>{movie.producer}</h5>
                <p><b>About : </b>{movie.synopsis}</p>
            </div>
        </div>
    </div>
    <div className='row'>
        <div style={{textAlign:'center'}} className='col-12'>
            <h4 className='cast'>Cast Details</h4>
        </div>
    </div>
    <div className='row'>
        {
            movie.cast.map((data,idx)=>{
                return(
                    <div key={idx} className='col-3 casting'><span>{idx+1} . </span>{data}</div>
                )
            })
        }
    </div>
</div>)
  )
}

export default MoviesDetails