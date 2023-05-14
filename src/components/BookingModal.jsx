import React, {useState} from 'react'
import {useCookies} from 'react-cookie';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentForm from '../pages/PaymentForm';


const PUBLIC_KEY="pk_test_51N4jM3SAU7pPO0d0DjR8YnTnb0VIhCw6VSKwONE7XNW79TEK4BIFdGf9HimlN557eFC38DHVBEVCu3wzudlbIeyb00MJuGZorq"
const stripeTestPromise = loadStripe(PUBLIC_KEY);


function getNextDayOfWeek(dayOfWeek) {
    const now = new Date();
    const currentDay = now.getDay(); // Sunday is 0, Monday is 1, etc.
  
    if (dayOfWeek === currentDay) {
    // If the specified day is the current day, return the current date
    //   console.log(now.toDateString());
      return now.toDateString().split(" ");
    }
  
    let daysUntilNextDayOfWeek = (dayOfWeek + 7 - currentDay) % 7;
    let nextDayOfWeek = new Date(now.getTime() + daysUntilNextDayOfWeek * 24 * 60 * 60 * 1000);
  
    const arr = nextDayOfWeek.toDateString().split(" ");
    // console.log(arr);
    // return nextDayOfWeek.toDateString();
    return arr;
  }

export default function BookingModal(props) {

    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [cookies, setCookie] = useCookies();
    const [proceedToPayment, setProceedToPayment] = useState(false);

    const navigate = useNavigate();

  const confirmBooking = () => {
    console.log("confirm booking");
    console.log("doctor id: ", props.details.id);
    console.log("selected day: ", selectedDay);
    console.log("selected time: ", selectedTime);
    console.log("user: ", cookies.id);

    axios.put("http://localhost:5000/api/booking/put/", {
        doctorId: props.details._id,
        date: selectedDay,
        time: selectedTime,
        userId: cookies.id
    }).then(
        (response) => {
            console.log("Success");
            setProceedToPayment(true);
        }
    )
    .catch(
        (err) => {
            console.log("Appointment Not Booked", err);
            navigate("/error");
        }
    )
  }

  return (
    <div className='flex justify-center items-center fixed backdrop-blur-sm w-screen h-screen top-0 left-0'>
        <div className='bg-white max-sm:w-full max-md:w-4/5 md:w-3/5 md:rounded-xl h-[90vh] shadow-2xl rounded-xl overflow-y-scroll scrollable'>
            <button onClick={()=>{props.close(false)}} className=' text-gray-400 hover:text-red-500 cursor-pointer text-right w-full pr-3 text-lg font-semibold pt-1'>x</button>

            <div className='px-10 mb-10 flex flex-col'>
                <h1 className='text-3xl text-blue-500 font-bold text-center mt-0 mb-5 mx-auto'>
                    Book Appointment
                </h1>
                <h2 className='text-xl text-center text-slate-400 mb-5'> <span className='text-blue-500 font-semibold'>Dr. {props.details?.name}</span>  is available on </h2>
                {/* {console.log("schedule: ", props.details)} */}
                <h3 className='text-lg font-semibold text-blue-500 max-sm:text-center'>Select Date:</h3>
                <div className='h-[1px] bg-blue-500 w-full mb-5'></div>
                <div className='flex flex-row items-center justify-center gap-2 max-sm:flex-wrap max-sm:flex-col max-sm:w-full'>
                    {props.details?.schedule.map((day,index) => (
                        <button key={index} onClick={()=>{day!==null?setSelectedDay(index):setSelectedDay(selectedDay)}} className={`flex flex-col border-2 ${selectedDay===index?"bg-blue-500 text-white":""} rounded-lg flex items-center justify-center leading-none h-20 p-1 sm:w-[80px] max-sm:w-full max-sm:flex-row max-sm:h-10 max-sm:gap-2 text-center  ${day===null? "text-gray-500 border-gray-500 bg-gray-300":"text-blue-500 cursor-pointer hover:text-white hover:bg-blue-400 border-blue-500"}`}>{<>{getNextDayOfWeek(index)[0]}<br /> <span className='font-semibold text-3xl'>{getNextDayOfWeek(index)[2]}</span>  {getNextDayOfWeek(index)[1]}</>}   </button>
                    ))}
                </div>
                <h3 className='text-lg font-semibold text-blue-500 max-sm:text-center mt-10'>Select Time:</h3>
                <div className='h-[1px] bg-blue-500 w-full mb-5'></div>
                {selectedDay!==null &&
                <div className='flex flex-row gap-2 flex-wrap justify-center'>
                    {Object.entries(props.details?.schedule[selectedDay? selectedDay:0]).map(([key, value])=>(
                        <button onClick={()=>{setSelectedTime(key);}} className={`border-2  ${!value? ` ${selectedTime===key? "bg-blue-500 text-white border-blue-500 hover:bg-blue-400 hover:border-blue-400 ":"hover:bg-blue-200 border-blue-400"} cursor-pointer text-blue-600`:"border-gray-500 cursor-default bg-gray-300 text-gray-500"} rounded-lg px-4 py-2`} key={key}>
                            {key}
                        </button>
                    ))}
                </div>
                }
                
            </div>
            <div className='w-full flex flex-col items-center justify-center'>
            <h3
                className='text-lg text-center text-blue-500 font-semibold max-sm:text-center max-sm:px-5 mb-2'>
                Cost for Consultation
            </h3>
                <h3
                    className='text-3xl text-center text-green-500 font-semibold max-sm:text-center max-sm:px-5 mb-4 bg-green-400/20 p-2 rounded-xl'>Rs. 500/-</h3>
            </div>
            <div className='w-full flex items-center justify-center'>
                <button onClick={confirmBooking} className='text-xl bg-blue-500 py-2 px-4 font-semibold hover:bg-blue-400 text-blue-100 shadow-lg rounded-lg '>Confirm Booking</button>
            </div>
            
                {
                    proceedToPayment &&
                    <div className='border-blue-400 bg-gradient-to-tl from-blue-900 to bg-slate-950 shadow-xl mt-10 rounded-lg border-2 lg:mx-auto lg:w-[50%] h-56 p-8 m-10'>
                    <Elements stripe={stripeTestPromise}>
                    <PaymentForm/>
                    </Elements>
                    </div>
                }
            
        </div>
    </div>
  )
}
