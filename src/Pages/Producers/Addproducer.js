import { useFormik } from 'formik'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Producer.css"
import axios from 'axios'

function Addproducer() {
    const nav=useNavigate()
    const formik=useFormik({
        initialValues:{
            name:"",
            dob:"",
            bio:"",
            label:"",
            img:"",
            gender:''
        },
        validate:(value)=>{
            let errors={}

            if(!value.name){
                errors.name="Please Enter The Name"
            }
            if(!value.dob){
                errors.dob="Please Enter The Date of Birth"
            }
            if(!value.bio){
                errors.bio="Please Enter The Bio"
            }
            if(!value.img){
                errors.img="Please Enter The Image URL"
            }
            if(!value.gender){
                errors.gender="Please Select The Gender"
            }
            if(!value.label){
                errors.label="Please Enter The Production House Name"
            }

            return errors
        },
        onSubmit:async(value)=>{
            try {
                await axios.post("http://localhost:8000/addproducer",value,{
                    headers:{
                        Authorization:`${window.localStorage.getItem("token")}`
                    }
                })
                alert('Successfully Added')
                nav("/portal/Producers")
            } catch (error) {
                console.log(error)
            }
        }
    })
  return (
    <div className='container-fluid add-proucer-container' style={{backgroundColor:"gray",height:"100vh"}}>
        <div className='row'>
            <div className='col-3'>
                <Link className='btn btn-primary' to="/portal/Producers">Back</Link>
            </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
            <div className='row'>
                <div className='col-4' style={{textAlign:"end"}}>
                    <label className='addproducer-lbl'>Name : </label><br/>
                    <label className='addproducer-lbl'>Date of Birth : </label><br/>
                    <label className='addproducer-lbl'>Production : </label><br/>
                    <label className='addproducer-lbl'>Image URL : </label><br/>
                    <label className='addproducer-lbl'>Bio : </label><br/>
                    <label className='addproducer-lbl'>Gender : </label><br/>
                </div>
                <div className='col-8'>
                    <input name='name' className='add-producer-inpt' value={formik.values.name} onChange={formik.handleChange}/><span>{formik.errors.name}</span><br/>
                    <input type='date' name='dob' className='add-producer-inpt' value={formik.values.dob} onChange={formik.handleChange}/><span>{formik.errors.dob}</span><br/>
                    <input name='label' className='add-producer-inpt' value={formik.values.label} onChange={formik.handleChange}/><span>{formik.errors.label}</span><br/>
                    <input name='img' className='add-producer-inpt' value={formik.values.img} onChange={formik.handleChange}/><span>{formik.errors.img}</span><br/>
                    <input name='bio'className='add-producer-inpt' value={formik.values.bio} onChange={formik.handleChange}/><span>{formik.errors.bio}</span><br/>
                    <input name='gender' type='radio' id='male' value="Male" onChange={formik.handleChange} /><label style={{marginRight:"35px"}} for="male">Male</label>
                    <input name='gender' type='radio'  id='female' value="Female" onChange={formik.handleChange} /><label style={{marginRight:"35px"}}  for="female">Female</label>
                    <input name='gender' type='radio' id='others'  value="Others" onChange={formik.handleChange}/><label for="others">Others</label><span>{formik.errors.gender}</span><br/>
                    <input name='gender' className='add-producer-inpt' value={formik.values.gender}/><br/>
                    <input  className='add-producer-inpt btn btn-success' type='submit' value="Submit" />
                </div>
            </div>
        </form>
    </div>
  )
}

export default Addproducer