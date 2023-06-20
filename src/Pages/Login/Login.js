import React, { useState } from 'react'
import "./Login.css"
import { useFormik } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const nav=useNavigate()
    const[disable,setDisable]=useState(false)
    const formik=useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validate:(value)=>{
            let errors={}

            if(!value.email){
                errors.email="Please Enter Your Email"
            }
            if(!value.password){
                errors.password="Please Enter Your password"
            }
            
            return errors
        },
        onSubmit:async(value)=>{
            try {
            setDisable(true)
              const {data}=  await axios.post("https://imdbwebapi.onrender.com/signin",value)
              window.localStorage.setItem("token",data.token)
              nav("/portal/Movies")
            } catch (error) {
                console.log(error)
                alert("Incorrect Username/Password")
                setDisable(false)
            }
        }
    })
  return (
    <div className='container-fluid login-main-card'>
        <div className='row  login-container'>
            <div className='col-5'>
                <h4>Benefits of your free IMDb account</h4>
                <h6>Personalized Recommendations</h6>
                <p>Discover shows you'll love.</p>
                <h6>Your Watchlist</h6>
                <p>Track everything you want to watch and receive e-mail when movies open in theaters.</p>
                <h6>Your Ratings</h6>
                <p>Rate and remember everything you've seen.</p>
                <h6>Contribute to IMDb</h6>
                <p>Add data that will be seen by millions of people and get cool badges.</p>
            </div>
            <div className='col-7 login-rightside' style={{textAlign:"center"}} >
                <form onSubmit={formik.handleSubmit}>
                    <label for="email" className='login-label email'>Email</label><br/>
                    <input name='email' value={formik.values.email}  placeholder='Enter your email here'  onChange={formik.handleChange} id='email' className='login-inpt' type='email' /><br/>
                    <span>{formik.errors.email}</span><br/>
                    <label for="pass" className='login-label password'>Password</label><br/>
                    <input name='password'  value={formik.values.password} onChange={formik.handleChange} id='pass' className='login-inpt' type='password'  placeholder='Enter your password here'/><br/>
                    <span>{formik.errors.password}</span><br/>
                    <input disabled={disable} className='login-inpt btn btn-success' type='submit' value="Sign in" style={{marginTop:"20px"}} />
                </form>
                <Link className='login-inpt btn btn-primary' to="/forgot-password" style={{marginTop:"10px"}}>Forgot Password</Link><br/>
                <Link className='login-inpt btn btn-secondary' to="/register" style={{marginTop:"10px"}}>Sign up</Link><br/>
            </div>
        </div>
        <div className='row'>
            <div className='col-12 sample-login' style={{textAlign:"center"}}>
                <p style={{color:"red",fontSize:"25px",margin:"0px"}}>User Name : <b style={{color:"black"}}>admin@gmail.com</b></p>
                <p style={{color:"red",fontSize:"25px"}}>password : <b style={{color:"black"}}>Admin</b></p>
            </div>
        </div>
    </div>
  )
}

export default Login