import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Movie.css"
import axios from 'axios'

function Addmovie() {
    const nav=useNavigate()
    const [actor,setActor]=useState([])
    const [producer,setProducer]=useState([])
    useEffect(()=>{
        getActor()
        getProducer()
    },[])
    const getActor=async()=>{
        try {
            const {data}=await axios.get("https://imdbwebapi.onrender.com/getactors",{
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
            const {data}=await axios.get("https://imdbwebapi.onrender.com/getproducer",{
                headers:{
                    Authorization:`${window.localStorage.getItem("token")}`
                }
            })
            setProducer(data)
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
                await axios.post("https://imdbwebapi.onrender.com/addmovie",value,{
                    headers:{
                        Authorization:`${window.localStorage.getItem("token")}`
                    }
                })
                alert("Movie created successfully")
                nav("/portal/Movies")
            } catch (error) {
                console.log(value)
            }
        }
    })
  return (
    <div className='container-fluid add-movie-container'>
        <div className='row'>
            <div className='col-md-3'>
                <Link to="/portal/Movies" className='btn btn-info btn-sm'>Back</Link>
            </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
            <div className='row'>
                <div className='col-md-4 addmovie-labels' style={{textAlign:"end"}}>
                    <label className='addmovie-lbl'>Movie Name : </label><br/>
                    <label className='addmovie-lbl'>Director : </label><br/>
                    <label className='addmovie-lbl'>Released Year : </label><br/>
                    <label className='addmovie-lbl'>Genre : </label><br/>
                    <label className='addmovie-lbl'>Poster : </label><br/>
                    <label className='addmovie-lbl'>Synopsis : </label><br/>
                    <label className='addmovie-lbl'>Producer : </label><br/>
                    <label style={{marginTop:"110px"}} className='addmovie-lbl'>cast : </label><br/>
                </div>
                <div className='col-md-8'>
                    <input type='text' name='name' placeholder='Enter The Movie Name' value={formik.values.name} onChange={formik.handleChange} className='add-movie-inpt'/><span>{formik.errors.name}</span><br/>
                    <input type='text' name='director'  placeholder='Enter The Director Name' value={formik.values.director} onChange={formik.handleChange}  className='add-movie-inpt'/><span>{formik.errors.director}</span><br/>
                    <input type='text' name='year'  placeholder='Enter The Released Year' value={formik.values.year} onChange={formik.handleChange}  className='add-movie-inpt'/><span>{formik.errors.year}</span><br/>
                    <input name='genre'  placeholder='Enter The Genre' value={formik.values.genre} onChange={formik.handleChange}  className='add-movie-inpt'/><span>{formik.errors.genre}</span><br/>
                    <input name='poster' placeholder='Enter The Poster URL'  value={formik.values.poster} onChange={formik.handleChange}  className='add-movie-inpt'/><span>{formik.errors.poster}</span><br/>
                    <input name='synopsis' placeholder='Enter The Synopsis' value={formik.values.synopsis} onChange={formik.handleChange}  className='add-movie-inpt'/><span>{formik.errors.synopsis}</span><br/>
                    <input name='producer' placeholder='Enter The Producer Name' value={formik.values.producer} onChange={formik.handleChange}  className='add-movie-inpts'/><span>{formik.errors.producer}</span><br/>
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
                    <input name='cast' value={formik.values.cast} placeholder='Enter The Cast Details'  onChange={formik.handleChange}  className='add-movie-inpts'/><span>{formik.errors.cast}</span><br/>
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

export default Addmovie