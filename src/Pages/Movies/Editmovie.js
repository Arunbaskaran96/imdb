import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function Editmovie() {
    const nav=useNavigate()
    const [actor,setActor]=useState([])
    const [producer,setProducer]=useState([])
    const [isloading,setLoading]=useState(true)
    const params=useParams()

    useEffect(()=>{
        getMovie()
        getActor()
        getProducer()
    },[])

    const getActor=async()=>{
        try {
            const {data}=await axios.get("http://localhost:8000/getactors",{
                headers:{
                    Authorization:`${window.localStorage.getItem("token")}`
                }
            })
            setActor(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getProducer=async()=>{
        try {
            const {data}=await axios.get("http://localhost:8000/getproducer",{
                headers:{
                    Authorization:`${window.localStorage.getItem("token")}`
                }
            })
            setProducer(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getMovie=async()=>{
        try {
            const {data}=await axios.get(`http://localhost:8000/movie/${params.id}`,{
                headers:{
                    Authorization:`${window.localStorage.getItem("token")}`
                }
            })
            formik.setValues(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const formik=useFormik({
        initialValues:{
            name:"",
            director:"",
            year:'',
            genre:"",
            producer:"",
            poster:"",
            cast:"",
            images:"",
            synopsis:""
        },
        validate:(value)=>{
            let errors={}

            if(!value.name){
                errors.name="Please Enter The Movie Name"
            }
            if(!value.director){
                errors.director="Please Enter The Director Name"
            }
            if(!value.year){
                errors.year="Please Enter the Released Year"
            }
            if(!value.genre){
                errors.genre="Please Enter The Genre"
            }
            if(!value.producer){
                errors.producer="Please Fill The Producer"
            }
            if(!value.poster){
                errors.poster="Please Enter The Poster"
            }
            if(!value.cast){
                errors.cast="Please Fill The Cast"
            }
            if(!value.synopsis){
                errors.synopsis="Please Fill The Synopsis"
            }
            return errors
        },
        onSubmit:async(value)=>{
            try {
                await axios.put(`http://localhost:8000/editmovie/${params.id}`,value,{
                    headers:{
                        Authorization:`${window.localStorage.getItem("token")}`
                    }
                })
                alert("Successfully Updated")
                nav('/portal/Movies')
            } catch (error) {
                console.log(value)
            }
        }
    })
  return (
    isloading?
    <div className='loading-spinner'>
    <div class="spinner-border text-danger" role="status">
         <span class="sr-only">Loading...</span>
    </div>
    <h5 className='loading-text'>Loading...</h5>
    </div>
    :
    <div className='container-fluid edit-movie-container'>
    <div className='row'>
        <div className='col-3'>
            <Link to="/portal/Movies" className='btn btn-info btn-sm'>Back</Link>
        </div>
    </div>
    <form onSubmit={formik.handleSubmit}>
    <div className='row'>
        <div className='col-4' style={{textAlign:"end"}}>
            <label className='edimovie-lbl'>Movie Name : </label><br/>
            <label className='edimovie-lbl'>Director : </label><br/>
            <label className='edimovie-lbl'>Released Year : </label><br/>
            <label className='edimovie-lbl'>Genre : </label><br/>
            <label className='edimovie-lbl'>Poster : </label><br/>
            <label className='edimovie-lbl'>Synopsis : </label><br/>
            <label className='edimovie-lbl'>Producer : </label><br/>
            <label  style={{marginTop:"110px"}} className='edimovie-lbl'>cast : </label><br/>
        </div>
        <div className='col-8'>
                <input type='text' name='name' value={formik.values.name} onChange={formik.handleChange} className='add-movie-inpt'/><span>{formik.errors.name}</span><br/>
                <input type='text' name='director' value={formik.values.director} onChange={formik.handleChange}  className='add-movie-inpt'/><span>{formik.errors.director}</span><br/>
                <input type='text' name='year' value={formik.values.year} onChange={formik.handleChange}  className='add-movie-inpt'/><span>{formik.errors.year}</span><br/>
                <input name='genre' value={formik.values.genre} onChange={formik.handleChange}  className='add-movie-inpt'/><span>{formik.errors.genre}</span><br/>
                <input name='poster' value={formik.values.poster} onChange={formik.handleChange}  className='add-movie-inpt'/><span>{formik.errors.poster}</span><br/>
                <input name='synopsis' value={formik.values.synopsis} onChange={formik.handleChange}  className='add-movie-inpt'/><span>{formik.errors.synopsis}</span><br/>
                <input name='producer' value={formik.values.producer} onChange={formik.handleChange}  className='add-movie-inpt'/><span>{formik.errors.producer}</span><br/>
                <div className='actors-list'>
                {
                            producer.map((d)=>{
                                return(
                                    <>
                                        <input id={d.name} type="radio" name='producer' value={d.name} onChange={formik.handleChange}/>
                                        <label for={d.name} >{d.name}</label><br/>
                                    </>
                                )
                            })
                        }
                </div>
                <input name='cast' value={formik.values.cast}   onChange={formik.handleChange}  className='add-movie-inpt'/><span>{formik.errors.cast}</span><br/>
                <div className='actors-list'>
                {
                            actor.map((d)=>{
                                return(
                                    <>
                                        <input id={d.name} type="checkbox" name='cast' value={d.name} onChange={formik.handleChange}/>
                                        <label for={d.name} >{d.name}</label><br/>
                                    </>
                                )
                            })
                        }
                </div>
                <input value="Submit" type='Submit' className='btn btn-success add-movie-inpt'/>
            </div>
    </div>
    </form>
</div>
  )
}

export default Editmovie