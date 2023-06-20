import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Addactor() {
    const nav=useNavigate()
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
                await axios.post("https://imdbwebapi.onrender.com/addactor",value,{
                    headers:{
                        Authorization:`${window.localStorage.getItem("token")}`
                    }
                })
                alert("Successfully created")
                nav("/portal/Actors")
            } catch (error) {
                console.log(error)
            }
        }
    })
  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-3'>
                <Link to="/portal/Actors" className='btn btn-primary'>Back</Link>
            </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
            <div className='row'>
                <div className='col-4' style={{textAlign:"end"}}>
                    <label className='add-actor-lbl'>Name : </label><br/>
                    <label className='add-actor-lbl'>Date Of Birth : </label><br/>
                    <label className='add-actor-lbl'>Gender : </label><br/>
                    <label className='add-actor-lbl'>Bio : </label><br/>
                    <label className='add-actor-lbl'>Image URL : </label><br/>
                </div>
                <div className='col-8'>
                    <input className='add-actor-inpt' name='name' value={formik.values.name} onChange={formik.handleChange}/><span>{formik.errors.name}</span><br/>
                    <input type="date" className='add-actor-inpt' name='dob' value={formik.values.dob} onChange={formik.handleChange}/><span>{formik.errors.dob}</span><br/>
                    <input type='radio' id='male' name='gender' value="Male" onChange={formik.handleChange}/>
                    <label for="male">Male</label>
                    <input style={{marginLeft:"40px"}} type="radio" id='female' name='gender' value="Female" onChange={formik.handleChange}/>
                    <label for="female">Female</label>
                    <input  style={{marginLeft:"40px"}} type="radio" id='others' name='gender' value="Others" onChange={formik.handleChange}/>
                    <label for="otyers">Others</label><span>{formik.errors.gender}</span><br/>
                    <input className='add-actor-inpt' name='bio' value={formik.values.bio} onChange={formik.handleChange}/><span>{formik.errors.bio}</span><br/>
                    <input className='add-actor-inpt' name='img' value={formik.values.img} onChange={formik.handleChange}/><span>{formik.errors.img}</span><br/>
                    <input className='btn btn-success add-actor-inpt' type='submit' value="Submit"/>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Addactor