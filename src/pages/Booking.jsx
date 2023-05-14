import React, {useEffect, useState} from 'react'
import axios from 'axios';
import BookingModal from '../components/BookingModal';
import DetailsModal from '../components/DetailsModal';



export default function Booking() {


  const [openDetails, setOpenDetails] = useState(false);
  const [openBooking, setOpenBooking] = useState(false);
  const [doctorList, setDoctorList] = useState(null);

  const [details, setDetails] = useState(null);

  useEffect(()=>{
    axios.get('http://localhost:5000/api/doctor/get')
    .then((response)=>{
      setDoctorList(response.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  }, [])

  return (
    <div>
        <h1 className='text-3xl text-blue-500 font-bold text-center mt-16 mb-12 mx-auto'>
          Book an appointment
        </h1>
      <div className='flex flex-col items-center justify-center gap-4'>
        {
          doctorList && doctorList.map((doctor, index)=>(
            (
              <div className='flex flex-col p-4 border-2 border-blue-300 shadow-xl max-sm:w-11/12 max-md:w-4/5 md:w-3/5 rounded-xl' key={index}>
                <div className='flex-row flex justify-between w-full'>
                <h1 className='text-xl text-blue-500 font-bold'>{doctor.name}</h1>
                {/* <h3 className='text-blue-400 text-sm w-fit rounded-full'>{doctor.id}</h3> */}
                </div>
                <h2 className='text-slate-500 text-sm w-fit rounded-full'> <span className='font-semibold'>Specialization:</span>  {doctor.spec}</h2>

                <div className=' self-end justify-self-end flex flex-row gap-2 max-sm:flex-row max-sm:self-center max-sm:gap-1 max-sm:w-full max-sm:mt-4'>
                  <button onClick={()=>{setOpenBooking(!openBooking); setDetails(doctor)}} className='bg-blue-500 text-white hover:bg-blue-600 max-sm:basis-1/2 py-1 px-3 rounded-lg'>Book Now</button>
                  <button onClick={()=>{setOpenDetails(!openDetails); setDetails(doctor)}} className='bg-green-500 text-white hover:bg-green-600 max-sm:basis-1/2 py-1 px-3 rounded-lg'>See Details</button>
                </div>
                {/*Modal */}
                  {/* Details Modal */}
                      {<div className={""+(!openBooking && `hidden`) }><BookingModal details={details} close={setOpenBooking}/></div> }
                      {<div className={""+(!openDetails && `hidden`) }><DetailsModal details={details} close={setOpenDetails}/></div>}
              </div>
            )
          ))
        }
      </div>
    </div>
  )
}
