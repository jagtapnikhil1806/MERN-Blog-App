import React from 'react'
import { logout } from '../../store/authSlice.js'
import authService from '../../appwrite/auth.js'
import { useDispatch } from 'react-redux'

function LogoutBtn() {
    const dispatch=useDispatch()
    const LogoutBtnHandler=()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        }

        ).catch((err)=>{console.log(err)})
        
    }
    
  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={LogoutBtnHandler}>
        Logout
    </button>
  )
}

export default LogoutBtn