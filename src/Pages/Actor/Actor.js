import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./Actor.css"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addActor } from '../../Redux/Reducers/ActorSlice'

function Actor() {
  const dispatch=useDispatch()
  const actor=useSelector(state=>state.Actor.item)
  const[isloading,setLoading]=useState(true)
  const [search,setSearch]=useState("")
    useEffect(()=>{
        getActorData()
    },[])

    const getActorData=async()=>{
        try {
            const {data}= await axios.get('http://localhost:8000/getactors',{
              headers:{
                  Authorization:`${window.localStorage.getItem("token")}`
              }
          })
          dispatch(addActor(data))
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
    <div className='container-fluid actor-container'>
    <div className='row' style={{marginBottom:"20px"}}>
      <div className='col-3' style={{marginBottom:"20px",marginLeft:"15px"}}>
         <Link to="/addactor" className='btn btn-primary'> Add Actor</Link>
      </div>
      <div className='col-8' style={{textAlign:"start"}}>
      <input className='actor-search' placeholder='Search here.....' onChange={(e)=>{
        setSearch(e.target.value)
      }}/>
      </div>
    </div>
      <div className='row'>
      {
        actor.filter((item)=>{
          return search.toLowerCase()===""?item : item.name.toLowerCase().includes(search.toLowerCase())
        }).map((data)=>{
          return(
            <div className='col-sm-4  col-md-4 actor-card'>
              <div className='actor-minicontainer'>
                <div>
                  <img className='actor-img' src={data.img} alt='actor-image'/>
                </div>
                <div className='actor-details'>
                  <h5 className='actor-name'><b>Name : </b>{data.name}</h5>
                  <p className='actor-dob'><b>DOB : </b>{data.dob}</p>
                  <p className='actor-gender'><b>Gender : </b>{data.gender}</p>
                  <Link to={`/actordetails/${data._id}`} className='btn btn-primary btn-sm'>View more </Link>
                  <Link to={`/editactor/${data._id}`} style={{marginLeft:"8px"}} className='btn btn-secondary btn-sm'>Edit</Link>
                </div>
              </div>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

export default Actor