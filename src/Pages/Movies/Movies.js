import React, { useEffect, useState } from 'react'
import "./Movie.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addMovies } from '../../Redux/Reducers/MovieSlice'
function Movies() {
    const dispatch=useDispatch()
    const data=useSelector(state=>state.Movies.item)
    const [isloading,setLoading]=useState(true)
    const [search,setSearch]=useState("")
    useEffect(()=>{
        getMovies()
    },[])

    const getMovies=async()=>{
        try {
            const result=await axios.get("https://imdbwebapi.onrender.com/movies",{
                headers:{
                    Authorization:`${window.localStorage.getItem("token")}`
                }
            })
            dispatch(addMovies(result.data))
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    isloading?
    <div className='loading-spinner'>
    <div class="spinner-border text-danger" role="status">
         <span class="sr-only">Loading...</span>
    </div>
    <h5 className='loading-text'>Loading...</h5>
    </div>
    :
    <div className='container-fluid movie-main-container'>
        <div className='row'  style={{marginBottom:"20px"}}>
            <div className='col-md-3'>
                <Link to="/addmovie" className='btn btn-success btn-sm'>Add new movie</Link>
            </div>
            <div className='col-md-8' style={{textAlign:"start"}}>
                <input className='actor-search' placeholder='Search here.....' onChange={(e)=>{
                  setSearch(e.target.value)
                }}/>
            </div>
        </div>
        <div className='row'>
            {
                data.filter((item)=>{
                    return search.toLowerCase()===""?item : item.name.toLowerCase().includes(search.toLowerCase())
                }).map((d)=>{
                    return(
                        <div className='col-md-6 movie-container'>
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
                })
            }
        </div>
    </div>
  )
}

export default Movies