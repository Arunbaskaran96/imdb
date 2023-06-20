import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { addindividualproducer } from '../../Redux/Reducers/ProducerSlice'
import { addMovies } from '../../Redux/Reducers/MovieSlice'

function Producerdetails() {
    const dispatch =useDispatch()
    const [isloading,setLoading]=useState(true)
    const producer=useSelector(state=>state.Producer.producer)
    const movies=useSelector(state=>state.Movies.item)
    const params=useParams()

    useEffect(()=>{
        getProducer()
        getMovies()
    },[])

    const getMovies=async()=>{
        try {
            const {data}= await axios.get(`https://imdbwebapi.onrender.com/filterproducermovie/${params.id}`,{
                headers:{
                    Authorization:`${window.localStorage.getItem("token")}`
                }
            })
            dispatch(addMovies(data))
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const getProducer=async()=>{
        try {
            const {data}=await axios.get(`https://imdbwebapi.onrender.com/getproducer/${params.id}`,{
                headers:{
                    Authorization:`${window.localStorage.getItem("token")}`
                }
            })
            dispatch(addindividualproducer(data))
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
    <div className='container-fluid'>
    <div className='row'>
        <div className='col-3'>
            <Link to="/portal/Producers"  className="btn btn-primary btn-sm">Back</Link>
        </div>
    </div>
    if(producer){
        <div className="row" style={{marginTop:"30px"}}>
        <div className="col-4">
            <img className="act-det-img" src={producer.img} alt="actor-image"/>
        </div>
        <div className="col-8" style={{marginTop:"50px"}}>
            <h5><b>Name : </b>{producer.name}</h5>
            <h5><b>Date of Birth : </b>{producer.dob}</h5>
            <h5><b>Gender : </b>{producer.gender}</h5>
            <h5><b>Production : </b>{producer.label}</h5>
            <p><b>About : </b>{producer.bio}</p>
        </div>
    </div>
    }
    <div className="row" style={{marginTop:"25px"}}>
        <h5 style={{color:"gold"}}>{producer.name} -Movie List</h5>
        {
            movies.length>0?movies.map((d)=>{
                return(
                    <div className='col-4 movie-container'>
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

export default Producerdetails