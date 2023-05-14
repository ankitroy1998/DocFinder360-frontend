import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useCookies } from 'react-cookie';
import { MutatingDots } from "react-loader-spinner";

export default function SignUp() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies("");
  const [data, setData] = useState({});
  const [error, setError] = useState('');
  

  const [isLoading, setLoading] = useState(false);
  const loadingHandle = (e) => {
    setLoading(e);
  };

  const validate = Yup.object().shape({
    name: Yup.string()
      .min(4, 'Username must be at least 4 characters long')
      .max(50, 'Username must be at most 50 characters long')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .required('Phone Number is required'),
    pass1: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
    pass2: Yup.string()
      .oneOf([Yup.ref('pass1'), null], 'Passwords must match')
      .required('Confirm Password is required')
  });

  useEffect(() => {
    loadingHandle(true);
    axios.get(`https://docfinder360-backend.onrender.com/api/auth/get/`, {
        headers: {
            Accept: "application/json",
            accesstoken: `${cookies.token}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            "Access-Control-Allow-Headers":
            "Origin, Content-Type, Accept, accesstoken , ngrok-skip-browser-warning"
        },
    })
    .then(res => {
      //Return to Profile
      loadingHandle(false);
      navigate("/profile");
    })
    .catch(err => {
      loadingHandle(false);
      //console.log("Not Signed In");
    })}, [])

  return (
    <div className='container mx-auto mt-0 flex flex-wrap justify-center h-[88vh] items-center '>
    <Formik
      initialValues={data}
      validationSchema={validate}
      onSubmit={(values)=>{
        //Handle Form Submission
        loadingHandle(true);
        axios.post(`https://docfinder360-backend.onrender.com/api/user/post`,
        {
          name: values.name,
          email: values.email,
          phone: values.phone,
          password: values.pass1,
          img: "",
          bookings: []
        })
        .then(res => {
          //console.log(res);
          // setCookie('token', res?.data.token);
          // setCookie('username', res?.data.user.name);
          // setCookie('id', res?.data.user._id);
          loadingHandle(false);
          // if(res.status === 200)
            //console.log("Success: ", localStorage.getItem('username'), " : ", localStorage.getItem('id'));
            navigate("/login");
        })
        .catch(err => {
          // console.log(err);
          loadingHandle(false);
          setError(err.response.data);
        })

      }}
      >
      {({ errors, touched }) => (
      <Form className=' w-[30%] max-[1024px]:w-[50%] max-[640px]:w-[90%]  rounded-lg bg-gradient-to-br from-slate-200 to-cyan-200 shadow-xl flex flex-col items-center justify-center p-10'>
        <h2 className='text-2xl font-bold text-center text-blue-800 mb-4'>SignUp</h2>
        <label htmlFor="name" className='font-semibold text-blue-800 self-start m-1'>Name:</label>
        <Field type="text" name="name" className='w-full h-10 shadow-lg rounded-lg p-1'/>
        <h4 className='text-base text-red-600 mt-2'>{errors.name}</h4>
        <label htmlFor="email" className='font-semibold text-blue-800 self-start m-1'>Email:</label>
        <Field type="text" name="email" className='w-full h-10 shadow-lg rounded-lg p-1'/>
        <h4 className='text-base text-red-600 mt-2'>{errors.email}</h4>
        <h4 className='text-base text-red-600 mt-2'>{error}</h4>
        <label htmlFor="phone" className='font-semibold text-blue-800 self-start m-1'>Phone:</label>
        <Field type="text" name="phone" className='w-full h-10 shadow-lg rounded-lg p-1'/>
        <h4 className='text-base text-red-600 mt-2'>{errors.phone}</h4>
        <label htmlFor="pass1" className='font-semibold text-blue-800 self-start m-1'>Create Password:</label>
        <Field type="password" name="pass1" className='w-full h-10 shadow-lg rounded-lg p-1'/>
        <h4 className='text-base text-red-600 mt-2'>{errors.pass1}</h4>
        <label htmlFor="pass2" className='font-semibold text-blue-800 self-start m-1'>Confirm Password:</label>
        <Field type="password" name="pass2" className='w-full h-10 shadow-lg rounded-lg p-1'/>
        <h4 className='text-base text-red-600 mt-2'>{errors.pass2}</h4>
        {isLoading ? (
                    
                    <MutatingDots
                      height="100"
                      width="100"
                      color="#ffffff"
                      secondaryColor="#60A6FA"
                      radius="12.5"
                      ariaLabel="mutating-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  
                ) : (null
)}
        <button type='submit' className="text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out px-10 self-center mt-5 py-2 rounded-xl bg-gradient-to-tl from-blue-500 to-cyan-300 text-white font-semibold max-[640px]:text-2xl max-[640px]:px-12">Signup</button>
        
        <div className='flex flex-row mt-3'>
        <label className="">Already have an account?</label><Link to="/Login" className="font-semibold text-blue-800 self-start">&nbsp;Login</Link>
        </div>
        
      </Form>
      )}
    </Formik>
    </div>
  )
}
