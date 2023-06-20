import React, { useEffect, useState } from 'react'
import "./Producer.css"
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addProducer } from '../../Redux/Reducers/ProducerSlice'

function Producer() {
    const [isloading,setLoading]=useState(true)
    const dispatch=useDispatch()
    const data=useSelector(state=>state.Producer.item)
    const [search,setSearch]=useState("")
    useEffect(()=>{
        getProducer()
    },[])

    const getProducer=async()=>{
        try {
            const {data}=await axios.get("http://localhost:8000/getproducer",{
                headers:{
                    Authorization:`${window.localStorage.getItem("token")}`
                }
            })
            dispatch(addProducer(data))
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
    </div>:
    <div className='container-fluid producer-container'>
        <div className='row' style={{marginBottom:"20px"}}>
            <div className='col-3'>
                <Link to="/addProducer" className='btn btn-primary'>Add Producer</Link>
            </div>
            <div className='col-8' style={{textAlign:"start"}}>
                <input className='actor-search' placeholder='Search here.....' onChange={(e)=>{
                  setSearch(e.target.value)
                }}/>
            </div>
        </div>
        <div className='row'>
            {
                data.filter(item=>{
                    return search.toLowerCase()===""?item : item.name.toLowerCase().includes(search.toLowerCase())
                }).map((d)=>{
                    return(
                        <div className='col-4 producer-card'>
                            <div>
                                <img className='producer-img' src={d.img} alt='person-img'/>
                            </div>
                            <div className='producer-details'>
                                <h6 className='producer-name'><b>Name : </b>{d.name}</h6>
                                <h6 className='producer-dob'><b>DOB : </b>{d.dob}</h6>
                                <h6 className='producer-gender'><b>Gender : </b>{d.gender}</h6>
                                <h6 className='producer-gender'><b>label : </b>{d.label}</h6>
                                <Link to={`/producerdetials/${d._id}`}  className='btn btn-primary btn-sm producer-btn'>View more </Link>
                                <Link to={`/editproducer/${d._id}`} className='btn btn-secondary btn-sm producer-btn' >Edit</Link>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}


export default Producer