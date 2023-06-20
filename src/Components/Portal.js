import React from 'react'
import Topbar from './Topbar/Topbar'
import Categories from './Categories/Categories'
import { Outlet } from 'react-router-dom'

function Portal() {
  return (
    <div>
        <Topbar/>
        <Categories/>
        <Outlet></Outlet>
    </div>
  )
}

export default Portal