import React from 'react'
import "./Fp.css"
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Forgotpassword() {
    const nav=useNavigate()
    const formik=useFormik({
        initialValues:{
            email:""
        },
        validate:(value)=>{
            let errors={}
            if(!value.email){
                errors.email="Please Enter Your Email"
            }

            return errors
        },
        onSubmit:async(value)=>{
            try {
                await axios.post("http://localhost:8000/forgot",value)
                alert("Link Sent To Your Mail Id")
                nav("/")
            } catch (error) {
                console.log(error)
            }
        }
    })
  return (
    <div className='forgot-container'>
        <div className='fp-card'>
            <form onSubmit={formik.handleSubmit}>
            <label className='fp-lbl'>Email : </label><br/>
            <input name='email' className='fb-inpt' value={formik.values.email} onChange={formik.handleChange} type='email' /><br/>
            <span className='fp-span'>{formik.errors.email}</span><br/>
            <input className='btn btn-primary' type='submit' value="Submit" />
            </form>
        </div>
    </div>
  )
}

export default Forgotpassword