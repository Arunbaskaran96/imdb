import React from 'react'
import "../components.css"
import { Link } from 'react-router-dom'

function Categories() {
    const data=[
    {
        type:"Actors"
    },
    {
        type:"Movies"
    },
    {
        type:"Producers"
    },
]
  return (
    <div className='cat-container'>
        {
            data.map((d,idx)=>{
                return(
                    <Link to={`/portal/${d.type}`} key={idx} className='cat-list'>{d.type}</Link>
                )
            })
        }
    </div>
  )
}

export default Categories