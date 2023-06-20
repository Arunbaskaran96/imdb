import React from 'react'
import "./Register.css"
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
    const nav=useNavigate()
    const formik=useFormik({
        initialValues:{
            name:"",
            email:"",
            password:"",
            confirm:""
        },
        validate:(value)=>{
            let errors={}

            if(!value.name){
                errors.name="Please Enter Your Name"
            }
            
            if(!value.email){
                errors.email="Please Enter Your Email"
            }
            
            if(!value.password){
                errors.password="Please Enter Your Password"
            }
            
            if(!value.confirm){
                errors.confirm="Please Enter Your Confirm Password"
            }

            if(value.confirm!=value.password){
                errors.matcing="Password And Confirm Password is Different"
            }

            return errors
        },
        onSubmit:async(value)=>{
            try {
                await axios.post("http://localhost:8000/adduser",value)
                alert("Your Account Created Successfully")
                nav("/")
            } catch (error) {
                console.log(error)
            }
        }
    })
  return (
    <div className='reg-container'>
        <form onSubmit={formik.handleSubmit}>
        <div className='reg-card'>
            <label className='reg-lbl'>Name :</label><br/>
            <input name='name' value={formik.values.name} onChange={formik.handleChange} className='reg-int' type='text' /><span>{formik.errors.name}</span><br/>
            <label className='reg-lbl'>Email :</label><br/>
            <input  name='email' value={formik.values.email} onChange={formik.handleChange}  className='reg-int' type='email'/><span>{formik.errors.email}</span><br/>
            <label className='reg-lbl'>Password :</label><br/>
            <input  name='password' value={formik.values.password} onChange={formik.handleChange}  className='reg-int' type='password'/><span>{formik.errors.password}</span><br/>
            <label  className='reg-lbl' >Confirm Password :</label><br/>
            <input  name='confirm' value={formik.values.confirm} onChange={formik.handleChange}  className='reg-int' type='password'/><span>{formik.errors.confirm}</span><br/>
            <span>{formik.errors.matcing}</span><br/>
            <input style={{marginTop:"10px"}}  className='reg-int btn btn-success'value="Create" type='submit'/>
        </div>
        </form>
    </div>
  )
}

export default Register