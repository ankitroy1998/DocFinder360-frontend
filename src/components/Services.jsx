import React from 'react';
import ico1 from '../images/appointment.png';
import ico2 from '../images/database.png';
import ico3 from '../images/creditcard.png';

function Services() {

    const services = [
        {
            id : 1,
            title: "Easy Online Appointments",
            // description: "Book appointments with ease, anytime.",
            icon: ico1,
        },
        {
            id : 2,
            title: "Easy Profile Management",
            // description: "Life with effortless profile management.",
            icon: ico2,
        },
        {
            id : 3,
            title: "Secure Payments",
            // description: "Your payment is our priority!",
            icon: ico3,
        },
        
    ]

    return (
        <div id='Services' className='bg-white pt-4 mb-1'>
          <h1 className='text-4xl font-bold text-blue-600 max-[640px]: text-center max-[640px]:mt-12'>Why DocFinder?</h1>
          <div className="container mx-auto flex flex-wrap flex-row max-[640px]:flex-col justify-center items-center">
            {services.map((service, index) => (
              <div className='flex flex-col items-center justify-center m-10 w-56' key={index}>
                <div className=' mb-2 shadow-lg overflow-clip rounded-full w-40 h-40 bg-white flex items-center justify-center'>
                  <img className=' w-80' src={service.icon} alt="service" />
                </div>
                <h1 className='text-xl text-center font-bold text-blue-400'>{service.title}</h1>
              </div>
            ))}
          </div>
        </div>
      )
      

}

export default Services