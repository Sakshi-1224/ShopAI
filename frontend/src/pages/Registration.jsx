import React from 'react'
import Logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import google from '../assets/google.png'
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useState } from 'react';
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';

function Registration() {
    const [show, setShow] = useState(false)
    const { serverUrl } = useContext(authDataContext)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { userdata, getCurrentUser } = useContext(userDataContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        
        // Basic client-side validation
        if (!name || !email || !password) {
            setError('All fields are required')
            setLoading(false)
            return
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError('Please enter a valid email address')
            setLoading(false)
            return
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            setLoading(false)
            return
        }

        try {
            const result = await axios.post(
                `${serverUrl}/api/auth/registration`,
                { name, email, password },
                { 
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            
            getCurrentUser()
            navigate("/")
            toast.success("User Registration Successful")
            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.error('Registration error:', error)
            
            if (error.response) {
                // The request was made and the server responded with a status code
                const errorMsg = error.response.data?.message || 'Registration failed'
                setError(errorMsg)
                toast.error(errorMsg)
            } else if (error.request) {
                // The request was made but no response was received
                setError('No response from server')
                toast.error('Network error - please try again')
            } else {
                // Something happened in setting up the request
                setError('Request setup error')
                toast.error('An error occurred')
            }
        }
    }

    const googleSignup = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            const user = response.user
            const name = user.displayName
            const email = user.email

            const result = await axios.post(
                `${serverUrl}/api/auth/googlelogin`,
                { name, email },
                { withCredentials: true }
            )
            
            getCurrentUser()
            navigate("/")
            toast.success("User Registration Successful")

        } catch (error) {
            console.error('Google signup error:', error)
            const errorMsg = error.response?.data?.message || 'Google registration failed'
            toast.error(errorMsg)
        }
    }
  
    return (
        <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>
            <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' onClick={() => navigate("/")}>
                <img className='w-[40px]' src={Logo} alt="" />
                <h1 className='text-[22px] font-sans '>ShopAI</h1>
            </div>

            <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
                <span className='text-[25px] font-semibold'>Registration Page</span>
                <span className='text-[16px]'>Welcome to ShopAI, Place your order</span>
            </div>
            
            <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center '>
                <form onSubmit={handleSignup} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>
                    <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer' onClick={googleSignup}>
                        <img src={google} alt="" className='w-[20px]'/> Registration with Google
                    </div>
                    
                    <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>
                        <div className='w-[40%] h-[1px] bg-[#96969635]'></div> OR <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
                    </div>
                    
                    <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>
                        {error && (
                            <div className="w-full p-2 bg-red-500/20 text-red-300 text-center rounded">
                                {error}
                            </div>
                        )}
                        
                        <input 
                            type="text" 
                            className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' 
                            placeholder='UserName' 
                            onChange={(e) => setName(e.target.value)} 
                            value={name}
                        />
                        
                        <input 
                            type="email" 
                            className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' 
                            placeholder='Email' 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email}
                        />
                        
                        <input 
                            type={show ? "text" : "password"} 
                            className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' 
                            placeholder='Password' 
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password}
                        />
                        
                        {!show ? (
                            <IoEyeOutline 
                                className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[45%]' 
                                onClick={() => setShow(prev => !prev)}
                            />
                        ) : (
                            <IoEye 
                                className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[45%]' 
                                onClick={() => setShow(prev => !prev)}
                            />
                        )}
                        
                        <button 
                            type="submit"
                            className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'
                            disabled={loading}
                        >
                            {loading ? <Loading/> : "Create Account"}
                        </button>
                        
                        <p className='flex gap-[10px]'>
                            You have any account? 
                            <span 
                                className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer' 
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registration
