import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { MutatingDots } from "react-loader-spinner";

export default function Profile() {
  const navigate = useNavigate();
  const cookies = useCookies("");
  const [userData, setUserData] = useState({});
  const [setError] = useState("");
  const [doctors, setDoctors] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const loadingHandle = (e) => {
    setLoading(e);
  };

  useEffect(() => {
    //Get Doctors
    axios.get(`https://docfinder360-backend.onrender.com/api/doctor/get`)
    .then((res) => {
      setDoctors(res.data);
    }
    )
    .catch((err) => {
      console.log(err);
    }
    )
  }, []);

  function getDoctorName(id) {
    const doctor = doctors?.find((doctor) => doctor._id === id);
    return doctor ? doctor.name : '';
  }

  function getDoctorHospital(id) {
    const doctor = doctors?.find((doctor) => doctor._id === id);
    return doctor ? doctor.hospital : '';
  }

  function getDoctorAddress(id) {
    const doctor = doctors?.find((doctor) => doctor._id === id);
    return doctor ? doctor.address : '';
  }

  //User Login
  useEffect(() => {
    if (!cookies[0].token) {
      navigate("/login");
    } else {
      loadingHandle(true);
      axios
        .get(`https://docfinder360-backend.onrender.com/api/auth/get`, {
          headers: {
            Accept: "application/json",
            accesstoken: `${cookies[0].token}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            "Access-Control-Allow-Headers":
              "Origin, Content-Type, Accept, accesstoken , ngrok-skip-browser-warning",
          },
        })
        .then((res) => {
          // console.log("Logged Status Success: ", res);
          axios
            .get(`https://docfinder360-backend.onrender.com/api/user/get/${cookies[0].id}`, {
              headers: {
                Accept: "application/json",
                accesstoken: `${cookies[0].token}`,
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
                "Access-Control-Allow-Headers":
                  "Origin, Content-Type, Accept, accesstoken , ngrok-skip-browser-warning",
              },
            })
            .then((res) => {
            //   console.log("User Data Fetched: ", res.data);
              setUserData(res.data);
              loadingHandle(false);
            })
            .catch((err) => {
            //   console.log(err.response.data);
              loadingHandle(false);
              setError(err.response.data);
            });
        })
        .catch((err) => {
        //   console.log("Logged Status Error: ", err);
          navigate("/login");
          loadingHandle(false);
        });
    }
  }, []);

  //Get Bookings
  const [bookings, setBookings] = useState([]);
  useEffect(()=>{
    axios.get(`https://docfinder360-backend.onrender.com/api/booking/get/${cookies[0].id}`)
    .then((res)=>{
      setBookings(res.data);
      console.log(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[]);

  const [isOpen, setIsOpen] = useState(false);
  
  const toggleModal = () => {
      setIsOpen(!isOpen);
    };
    
  const [image, setImage] = useState(null);
  const [picMessage, setPicMessage] = useState("Please select an image");
  
  const postDetails  = async (e) => {
      e.preventDefault();
      loadingHandle(true);
    const pics = image;
    if (!pics) {
        return setPicMessage("Please select an image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "docfinder");
        data.append("cloud_name", "dj3p6sirz");
        fetch("https://api.cloudinary.com/v1_1/dj3p6sirz/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Uploaded to Cloudinary");
            console.log(data.secure_url);
            axios.put(`https://docfinder360-backend.onrender.com/api/user/update/${cookies[0].id}`, { newImage: data.secure_url.toString() })
            .then((res) => {
                console.log(res.data);
                loadingHandle(false);
                toggleModal();
                window.location.reload();
            }
            ).catch(
                (err) => {
                    console.log(err);
                }
            );
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return setPicMessage("Please select an image file (png or jpeg)");
      }
  };

  return (
    <div className="mt-20 overflow-x-hidden">
      <div className="flex flex-col justify-center items-center">
        {isLoading ? (
          <MutatingDots
            height="100"
            width="100"
            color="#64CCFA"
            secondaryColor="#60A6FA"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ) : (
          <>
          {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-60 backdrop-blur-sm"></div>
                    <div className="relative bg-white rounded-lg w-1/2 max-w-lg p-6">
                    <span
                        className="absolute top-1 right-3 text-gray-500 cursor-pointer text-2xl"
                        onClick={toggleModal}
                    >
                        &times;
                    </span>
                    <div className="m-5 flex flex-col items-center justify-center">
                    <form onSubmit={(e)=>{postDetails(e)}} className="flex flex-col items-center justify-center">
                        <label htmlFor="image-input">
                            <div className="relative rounded-lg bg-blue-200 flex items-center justify-center">
                            <input
                                id="image-input"
                                type="file"
                                className="absolute h-full w-full opacity-0 cursor-pointer"
                                onChange={(e) => {setImage(e.target.files[0]);
                                }}
                            />
                            
                            <svg
                                className="h-80 w-80 text-blue-400"
                                xmlns="http://www.w3.org/2000/svg"
                                width="1000"
                                height="1000"
                                enableBackground="new 0 0 512 512"
                                version="1.1"
                                fill="currentColor"
                                viewBox="0 0 512 512"
                                xmlSpace="preserve"
                                >
                                <path d="M368 224c26.5 0 48-21.5 48-48s-21.5-48-48-48-48 21.5-48 48 21.5 48 48 48z"></path>
                                <path d="M452 64H60c-15.6 0-28 12.7-28 28.3v327.4c0 15.6 12.4 28.3 28 28.3h392c15.6 0 28-12.7 28-28.3V92.3c0-15.6-12.4-28.3-28-28.3zM348.9 261.7c-3-3.5-7.6-6.2-12.8-6.2-5.1 0-8.7 2.4-12.8 5.7L304.6 277c-3.9 2.8-7 4.7-11.5 4.7-4.3 0-8.2-1.6-11-4.1-1-.9-2.8-2.6-4.3-4.1L224 215.3c-4-4.6-10-7.5-16.7-7.5-6.7 0-12.9 3.3-16.8 7.8L64 368.2V107.7c1-6.8 6.3-11.7 13.1-11.7h357.7c6.9 0 12.5 5.1 12.9 12l.3 260.4-99.1-106.7z"></path>
                                </svg>
                            </div>
                            {image? <h3 className="text-lg text-blue-500 text-center my-3">Image Ready! Click To Change Image <br /> or</h3>:<h3 className="text-lg text-blue-500 text-center my-3">{picMessage}</h3>}
                            <button type="submit" className="py-2 w-full bg-blue-600 text-white hover:bg-blue-400 rounded-xl">Upload Image</button>
                        </label>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            )}
            <h1 className="text-4xl font-bold text-blue-600 max-[640px]: text-center max-[640px]:mt-12">
              Hi {userData.name},
            </h1>
            <br />
            <br />
            <div>
            {userData.img? (
              <div className="rounded-full w-40 h-40 bg-white-400 border-4 border-blue-600 overflow-hidden flex flex-col justify-center  items-center">
                <img src={userData.img} alt="" />
              </div>
            ) : (
              <div className="rounded-full w-40 h-40 bg-slate-400 border-4 border-blue-600 overflow-hidden flex flex-col  items-center">
                <div className="w-12 h-16 bg-slate-200 rounded-full relative top-7"></div>
                <div className="w-24 h-28 bg-slate-200 rounded-full relative top-10"></div>
              </div>
            )}
            <div onClick={toggleModal} className=" cursor-pointer rounded-full w-10 h-10 flex items-center relative bottom-10 left-28 justify-center font-semibold text-2xl text-center bg-blue-300 text-blue-800">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                version="1.1"
                viewBox="0 0 29 30"
                xmlSpace="preserve"
                >
                <g fill="#231F20">
                    <path
                    d="M7.536 5.169H18.381999999999998V27.849H7.536z"
                    transform="scale(-1) rotate(45.004 39.849 -31.28)"
                    ></path>
                    <path d="M27.638 3.996l-2.46-2.459a3.476 3.476 0 00-4.917 0l-1.725 1.724 7.67 7.669 1.725-1.724c1.357-1.358 1.066-3.852-.293-5.21z"></path>
                    <path d="M0 30L7.088 30 0 22.28z"></path>
                </g>
                </svg></div>
            </div>
            <br />
            <h1 className="text-2xl font-bold text-blue-600 max-[640px]: text-center max-[640px]:mt-12">
              User Id : {userData._id}
            </h1>
            <h1 className="text-2xl font-bold text-slate-400 max-[640px]: text-center max-[640px]:mt-12">
              {userData.email}
            </h1>
            <h1 className="text-2xl font-bold text-slate-400 max-[640px]: text-center max-[640px]:mt-12">
              {userData.phone}
            </h1>
            <br />
            <br />
            <div className="flex flex-col max-md:w-[100vw] md:w-[60vw] lg:w-[40vw]">
              {(bookings?.length > 0) &&<div className="flex flex-col iems-center justify-center w-full">
                <Link to="/booking" className="text-lg w-[80%] mx-auto mb-10 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out px-10  py-2 rounded-xl bg-gradient-to-tl from-blue-500 to-cyan-300 text-white font-semibold max-[640px]:text-2xl text-center max-[640px]:px-12">Book Appointment</Link>
              </div>}
              <div className="flex flex-col-reverse items-center justify-center">{bookings?.length > 0 ? (
                bookings?.map((booking,index) =>
                <>
                  <div className="bg-white flex flex-col shadow-xl p-4 m-2 rounded-xl border-4 border-x-0 border-b-0 border-t-blue-400">
                      <h2 className=""> <span className="text-blue-500 font-bold">Booking ID:</span> {booking._id}</h2>
                      <h2 className=""> <span className="text-blue-500 font-bold">Doctor Name:</span> {getDoctorName(booking.doctorId)}</h2>
                      <h2 className=""> <span className="text-blue-500 font-bold">Appointment on:</span> {booking.time}, {booking.date}</h2>
                      <h2 className=""> <span className="text-blue-500 font-bold">Hospital:</span> {getDoctorHospital(booking.doctorId)}</h2>
                      <h2 className=""> <span className="text-blue-500 font-bold">Visit Location:</span> {getDoctorAddress(booking.doctorId)}</h2>
                      <h2 className=""> <span className="text-blue-500 font-bold">Doctor Charge:</span> Rs. 500/-</h2>
                  </div>
                </>)
              ) : (<div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-blue-400 max-[640px]: text-center max-[640px]:mt-12 mb-5">No Bookings Yet!</h1>
                    <Link to="/booking" className="text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out px-10  py-2 rounded-xl bg-gradient-to-tl from-blue-500 to-cyan-300 text-white font-semibold max-[640px]:text-2xl text-center max-[640px]:px-12">Book Appointment</Link>
                  </div>
              )}</div>
              
            </div>
          </>
        )}
      </div>
    </div>
  );
}
