import React from 'react'
import { useLocation } from 'react-router-dom'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import UserList from './UserList'
import './Users.css'


const Users = ({ slideIn, handleSlideIn }) => {
  return (
    <div className="home-container-1">
      <LeftSideBar slideIn={slideIn} handleSlideIn={handleSlideIn} />
        <div className="home-container-2" style={{marginTop: '30px'}}>
            <h1 style={{fontWeight: '400'}}>Users</h1>
            <UserList />
        </div>
    </div>
  )
}

export default Users
