import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import "./Actor.css"

function Editactor() {
    const nav=useNavigate()
    const params=useParams()
    const [isloading,setLoading]=useState(true)

    useEffect(()=>{
        getActor()
    },[])

    const getActor=async()=>{
        try {
           const {data}=await axios.get(`https://imdbwebapi.onrender.com/getactor/${params.id}`,{
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
            dob:"",
            gender:"",
            bio:"",
            img:""
        },
        validate:(value)=>{
            let errors={}
            if(!value.name){
                errors.name="Please Enter The Name"
            }
            if(!value.dob){
                errors.dob="Please Select The DOB"
            }
            if(!value.gender){
                errors.gender="Please Select The Gender"
            }
            if(!value.bio){
                errors.bio="Please Enter The Bio"
            }
            if(!value.img){
                errors.img="Please Enter The Image URL"
            }

            return errors
        },
        onSubmit:async(value)=>{
            try {
                await axios.put(`https://imdbwebapi.onrender.com/editactor/${params.id}`,value,{
                    headers:{
                        Authorization:`${window.localStorage.getItem("token")}`
                    }
                })
                alert("Successfully Edited")
                nav("/portal/Actors")
            } catch (error) {
                console.log(error)
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
    <div className='container-fluid'>
    <div className='row'>
        <div className='col-3'>
            <Link to="/portal/Actors" className='btn btn-secondary'>Back</Link>
        </div>
    </div>
    <form onSubmit={formik.handleSubmit}>
    <div className='row'>
        <div className='col-4' style={{textAlign:"end"}}>
            <label className='edit-actor-lbl'>Name : </label><br/>
            <label className='edit-actor-lbl'>Date Of Birth : </label><br/>
            <label className='edit-actor-lbl'>Bio : </label><br/>
            <label className='edit-actor-lbl'>Image URL : </label><br/>
            <label className='edit-actor-lbl'>Gender : </label><br/>
        </div>
        <div className='col-8'>
            <input className='edit-actor-inpt' name='name' value={formik.values.name} onChange={formik.handleChange}/><span>{formik.errors.name}</span><br/>
            <input type="date" className='edit-actor-inpt' name='dob' value={formik.values.dob} onChange={formik.handleChange}/><span>{formik.errors.dob}</span><br/>
            <input className='edit-actor-inpt' name='bio' value={formik.values.bio} onChange={formik.handleChange}/><span>{formik.errors.bio}</span><br/>
            <input className='edit-actor-inpt' name='img' value={formik.values.img} onChange={formik.handleChange}/><span>{formik.errors.img}</span><br/>
            <input type='radio' id='male' name='gender' value="Male" onChange={formik.handleChange}/>
            <label className='edit-actor-lbl' for="male">Male</label>
            <input style={{marginLeft:"40px"}} type="radio" id='female' name='gender' value="Female" onChange={formik.handleChange}/>
            <label  className='edit-actor-lbl'  for="female">Female</label>
            <input  style={{marginLeft:"40px"}} type="radio" id='others' name='gender' value="Others" onChange={formik.handleChange}/>
            <label  className='edit-actor-lbl'  for="others">Others</label><span>{formik.errors.gender}</span><br/>
            <input className='edit-actor-inpt' name='img' value={formik.values.gender}/><br/>
            <input className='btn btn-success add-actor-inpt' type='submit' value="Submit"/>
        </div>
    </div>
    </form>
</div>
  )
}

export default Editactor