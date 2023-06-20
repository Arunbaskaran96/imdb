import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function Editproducer() {
    const [data,setData]=useState({})
    const params=useParams()
    const nav=useNavigate()
    const[isloading,setLoading]=useState(true)

    useEffect(()=>{
        getProducer()
    },[])

    const getProducer=async()=>{
        try {
            const {data} = await axios.get(`http://localhost:8000/getproducer/${params.id}`,{
                headers:{
                    Authorization:`${window.localStorage.getItem("token")}`
                }
            })
            formik.setValues(data)
            setData(data)
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
            label:"",
            bio:"",
            img:""
        },
        validate:(value)=>{
            let errors={}

            if(!value.name){
                errors.name="Please Enter The Name"
            }
            if(!value.dob){
                errors.dob="Please Enter The Date of Birth"
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
                await axios.put(`http://localhost:8000/editproducer/${params.id}`,value,{
                    headers:{
                        Authorization:`${window.localStorage.getItem("token")}`
                    }
                })
                alert("Successfully Edited")
                nav('/portal/Producers')
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
    <div className='container-fluid' style={{backgroundColor:"gray",height:"100vh"}}>
    <div className='row'>
        <div className='col-3'>
            <Link className='btn btn-info ' to="/portal/Producers">Back</Link>
        </div>
    </div>
    <form onSubmit={formik.handleSubmit}>
        <div className='row'>
            <div className='col-4' style={{textAlign:"end"}}>
            <label className='editproducer-lbl'>Name : </label><br/>
                <label className='editproducer-lbl'>Date of Birth : </label><br/>
                <label className='editproducer-lbl'>Production : </label><br/>
                <label className='editproducer-lbl'>Image URL : </label><br/>
                <label className='editproducer-lbl'>Bio : </label><br/>
                <label className='editproducer-lbl'>Gender : </label><br/>
            </div>
            <div className='col-8'>
                <input name='name' className='edit-producer-inpt' value={formik.values.name} onChange={formik.handleChange}/><span>{formik.errors.name}</span><br/>
                <input type='date' name='dob' className='edit-producer-inpt' value={formik.values.dob} onChange={formik.handleChange}/><span>{formik.errors.dob}</span><br/>
                <input name='label' className='edit-producer-inpt' value={formik.values.label} onChange={formik.handleChange}/><span>{formik.errors.label}</span><br/>
                <input name='img' className='edit-producer-inpt' value={formik.values.img} onChange={formik.handleChange}/><span>{formik.errors.img}</span><br/>
                <input name='bio' className='edit-producer-inpt' value={formik.values.bio} onChange={formik.handleChange}/><span>{formik.errors.bio}</span><br/>
                <input name='gender' type='radio' id='male' value="Male" onChange={formik.handleChange} /><label style={{marginRight:"25px"}} for="male">Male</label>
                <input name='gender' type='radio'  id='female' value="Female" onChange={formik.handleChange} /><label style={{marginRight:"25px"}}  for="female">Female</label>
                <input name='gender' type='radio' id='others'  value="Others" onChange={formik.handleChange}/><label for="others">Others</label><span>{formik.errors.gender}</span><br/>
                <input name='gender' className='edit-producer-inpt' value={formik.values.gender}/><br/>
                <input  className='edit-producer-inpt btn btn-success' type='submit' value="Submit" />
            </div>
        </div>
    </form>
</div>
  )
}

export default Editproducer