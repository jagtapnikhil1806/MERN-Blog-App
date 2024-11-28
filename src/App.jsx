import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import authService from './appwrite/auth.js';
import { login,logout } from './store/authSlice.js';
import { CenterContainer, Footer, Header, Loader } from './components/index.js';
import { Outlet } from 'react-router-dom';
function App() {
  const [loading,setLoading]=useState(true);
  const dispatch=useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
       dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    }
    )
    .catch((error)=>{
      console.log("user auth error",error)
    })
  .finally(()=>{setLoading(false)})

  },[])
  if(!loading){
  return (
    <div className='bg-gray-400 h-screen w-full ' >
    <Header/>
     <Outlet/>
     <Footer/>
    </div>
  )
} 
else{
  return (
    <CenterContainer>
      <Loader/>
    </CenterContainer>
    
  )
} 
}
export default App
