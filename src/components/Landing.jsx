import React from 'react'
import doctors from "../images/landing.png";
import logo from "../images/logo.png";
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <>
      <div className="container mx-auto mb-5 flex flex-row max-[640px]:flex-col justify-center items-center">

        <div className=" flex items-center justify-end max-[640px]:justify-center basis-1/2">
          <img
            src={doctors}
            alt="doctors"
            className="w-[80%] max-[640px]:w-[75%]"
          />
        </div>

        <div className="w-80 basis-1/2 p-20 max-[640px]:p-0 pr-36 flex flex-col">
          <div className='h-16 overflow-hidden flex items-center justify-center'>
                <img src={logo} alt="docfinder" className='w-64'/>
          </div>
          <p className="text-lg max-[640px]:leading-6 text-justify font-semibold text-slate-500">
            Find the best doctors in your area! We make finding and booking
            doctors across various hospitals easy and stress-free. With our
            user-friendly interface, you can quickly search for doctors in your
            area, read reviews from other patients, and book appointments
            online. Say goodbye to long wait times and hello to better
            healthcare with our platform.
          </p>
          <Link to="/signup" className="text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out px-10 self-center mt-5 py-2 rounded-xl bg-gradient-to-tl from-blue-500 to-cyan-300 text-white font-semibold max-[640px]:text-2xl max-[640px]:px-12">Book Now</Link>
        </div>
      </div>
    </>
  )
}
