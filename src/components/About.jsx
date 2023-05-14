import React from 'react'
import aboutus from "../images/aboutus.png";

export default function About() {
  return (
    <div id='About' className=''>
    <div className="container mx-auto flex flex-row max-[640px]:flex-col justify-center items-center  max-[640px]:mt-28">

    <div className="w-80 basis-1/2 p-20 max-[640px]:p-0 pl-36 flex flex-col gap-4">
        <h1 className='text-4xl font-bold text-blue-600 max-[640px]: text-center max-[640px]:mt-12'>About Us</h1>
        <p className="text-lg text-justify font-semibold text-slate-500 max-[640px]:leading-6">
        We believe that access to quality healthcare is a fundamental right for everyone. That's why we've created a platform that makes finding and booking doctors across various hospitals simple and convenient. <br /><br /> Our team of dedicated professionals works tirelessly to ensure that our users have access to the best healthcare providers in their area. We're committed to providing an exceptional user experience, which is why we've designed our platform to be intuitive and easy to use. <br /><br /> Join us in our mission to democratize healthcare and improve the lives of people everywhere.
        </p>
      </div>

      <div className=" flex items-center justify-start max-[640px]:justify-center basis-1/2">
        <img
          src={aboutus}
          alt="doctors"
          className="w-[80%]"
        />
      </div>

      

    </div>
  </div>
  )
}
