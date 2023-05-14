import React, {useState} from 'react'
import logo from '../images/logo.png'
import {Link} from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { useNavigate  } from "react-router-dom";

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    const [cookies, setCookies] = useCookies("");
    const navigate = useNavigate ();

    //Logout function to call /logout for user route using axios
    // const handleLogout = () => {
    //     console.log("Logging Out");
    //     axios.post(`https://docfinder360-backend.onrender.com/api/auth/logout`)
    //     .then(res => {
    //         console.log(res.cookies.token);
    //         setCookies('token', "", { path: '/' });
    //         console.log(res.cookies.token);
    //         navigate("/login");
    //     })
    //     .catch(err => {
    //         console.log("Logged Out Error: ", err);
    //     })
    // }
    
    //Direct Logout from Frontend
    const handleLogout = () => {
        console.log("Logging Out");
        setCookies('token', "", { path: '/' });
        navigate("/login");
    }


    return (
    <nav className='bg-gradient-to-br from-cyan-300 to-blue-400'>

        <div className='container mx-auto flex flex-row items-center justify-between p-4 max-[640px]:p-0'>

            {/* Logo */}
            <Link to="/" className='h-10 overflow-hidden flex items-center justify-center'>
                <img src={logo} alt="docfinder" className='w-48'/>
            </Link>

            {/* Hamburger button for mobile devices */}
            <button onClick={()=>{setIsOpen(!isOpen)}} className='bg-blue-700/20 w-10 h-10 m-4 p-1 flex flex-col items-center justify-center gap-1 rounded-full min-[641px]:hidden'>
                <div className='w-5 h-[3px] bg-blue-800/60 rounded-full'></div>
                <div className='w-5 h-[3px] bg-blue-800/60 rounded-full'></div>
                <div className='w-5 h-[3px] bg-blue-800/60 rounded-full'></div>
            </button>

            {
                isOpen && 
                    <div className='absolute top-20 right-2 w-[40%] rounded-xl shadow-lg bg-blue-300/50 backdrop-filter backdrop-blur-sm min-[641px]:hidden'>
                        <div className='container mx-auto flex flex-col items-center justify-center p-4'>
                            <ul className='flex flex-col gap-4 items-center font-semibold text-lg'>
                                {/* <Link onClick={()=>{setIsOpen(false)}} to="/" className='text-blue-600 hover:text-blue-800'>Home</Link> */}
                                {/* <Link onClick={()=>{setIsOpen(false)}} href="/About" className='text-blue-600 hover:text-blue-800'>About Us</Link> */}
                                {!cookies.token?<>
                                <Link onClick={()=>{setIsOpen(false)}} to="/signup" className='text-blue-600 hover:text-blue-800'>SignUp</Link>
                                <Link onClick={()=>{setIsOpen(false)}} to="/login" className='text-blue-600 hover:text-blue-800'>Login</Link>
                                </>:<li onClick={handleLogout} className='text-blue-600 hover:text-blue-800'>Logout</li>}
                            </ul>
                        </div>
                    </div>
            }

            {/* options for larger devices */}
            <div className='max-[640px]:hidden p-4'>
                <ul className='flex flex-row cursor-pointer gap-4 items-center font-semibold text-lg'>
                    {/* <Link to="/" className='text-white hover:text-blue-800'>Home</Link> */}
                    {/* <a href="#About" className='text-white hover:text-blue-800'>About Us</a> */}
                    {!cookies.token?<>
                        <Link to={"/signup"} className='text-blue-600 hover:text-white hover:bg-blue-500/80 bg-blue-100/70 px-4 py-1 rounded-full shadow-lg'>SignUp</Link>
                        <Link to={"/login"} className='text-blue-600 hover:text-white hover:bg-blue-500/80 bg-blue-100/70 px-4 py-1 rounded-full shadow-lg'>Login</Link>
                    </>:<li onClick={handleLogout} className='text-blue-600 hover:text-white hover:bg-blue-500/80 bg-blue-100/70 px-4 py-1 rounded-full shadow-lg'>Logout</li>}
                </ul>
            </div>
        </div>
    </nav>
  )
}
