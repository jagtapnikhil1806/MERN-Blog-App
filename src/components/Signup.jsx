import React, { useState } from 'react'
import {useDispatch } from 'react-redux'
import {Logo,Button,Input} from "./index"
import { useNavigate,Link } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'


function Signup() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const[error,setError]=useState("")
    const {register,handleSubmit}=useForm()
 
const signup=async(data)=>{
    setError("")
    try {
        const userData=await authService.createAccount(data) 
        if(userData){
           const user= await authService.getCurrentUser(userData)
           if(user){
            dispatch(login(user))
            navigate("/")
           }
        }

    } catch (error) {
        setError(error.message)
    }
}

  return (
    <div className='flex items-center justify-center w-full'>
    <div className={`mx-auto w-full mx-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className='mb-2 flex justify-center'
        >
            <span className='inline-block w-full max-w-[100px]'>
                <Logo width="100%"/>
            </span>

        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'
        > Sign in to your account</h2>
        <p className='mt-2 text-center text-base text-black/60'>
            Already have an account?&nbsp;
            <Link to="/login" 
            className=' font-medium text-primary transition-all duration-200 hover:underline'>
                Sign In
                </Link>
        </p>
        {error && <p className='text-red-600 mt-8 text-center'>{error}</p>
        }

        <form onSubmit={handleSubmit(signup)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                type="text"
                label="Name :"
                placeholder="Enter your name"
                {...register("name",{
                    required:true})}
                />
                <Input
                type="email"
                label="Email :"
                placeholder="Enter your name"
                {...register("email",{
                    required:true,
                    validate:{
                        matchPattern:(value)=>{
                            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(value) || "Email address must be valid address"
                        }
                    }
                })}
                />
                <Input
                type="password"
                label="Password :"
                placeholder="Enter your password"
                {...register("password",{
                    required:true
                })}
                />
                <Button
                  type='submit'
                  className='w-full'
                > Create Account</Button>



            </div>
        </form>
        </div>
        </div>
  )
}

export default Signup