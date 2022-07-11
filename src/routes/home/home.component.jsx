import React from 'react'
import Directory from '../../components/directory/directory.component'
import { Outlet } from 'react-router-dom';

const Home = () => {

  return (
    <div>
      <Directory />
      <Outlet />      {/* Child component */}
    </div>
  )
}

export default Home