import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate  } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";

export default function ForgotPassword() {

  const [isLoading, setLoading] = useState(false);
  const loadingHandle = (e) => {
    setLoading(e);
  };
  const [data, setData] = useState({});
  const navigate = useNavigate ();

  const validate = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
    password2: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
  });

  const [error, setError] = useState('');

  return (
    <div className='container mx-auto flex flex-wrap justify-center items-center h-[88vh]'>
      <Formik
      initialValues={data}
      validationSchema={validate}
      onSubmit={(values)=>{
        loadingHandle(true);

        //User Password Update
        axios.put(`https://docfinder360-backend.onrender.com/api/user/forgot/`, values)
        .then(res => {
          loadingHandle(false);
          if(res.data.status === "Success")
            console.log(res.data.status);
            navigate("/login");
        })
        .catch(err => {
          loadingHandle(false);
          setError(err.response.data);
        })

      }}
      >{({ errors, touched }) => (
        <Form className=' w-[30%] max-[1024px]:w-[50%] max-[640px]:w-[90%] rounded-lg bg-gradient-to-br from-slate-200 to-cyan-200 shadow-xl flex flex-col items-center justify-center p-10'>
          <h2 className='text-2xl font-bold text-center text-blue-800 mb-4'>Update Password</h2>
          <label htmlFor="" className='font-semibold text-blue-800 self-start m-1'>Email:</label>
          <Field type="text" name="email" className='w-full h-10 shadow-lg rounded-lg p-1'/>
          <h4 className='text-base text-red-600 mt-2'>{errors.email}</h4>
          <label htmlFor="" className='font-semibold text-blue-800 self-start m-1'>Password:</label>
          <Field type="password" name="password" className='w-full h-10 shadow-lg rounded-lg p-1'/>
          <h4 className='text-base text-red-600 mt-2'>{errors.password}</h4>
          <label htmlFor="" className='font-semibold text-blue-800 self-start m-1'>Confirm Password:</label>
            <Field type="password" name="password2" className='w-full h-10 shadow-lg rounded-lg p-1'/>
            <h4 className='text-base text-red-600 mt-2'>{errors.password2}</h4>
          <button type='submit' className="text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out px-10 self-center mt-5 py-2 rounded-xl bg-gradient-to-tl from-blue-500 to-cyan-300 text-white font-semibold max-[640px]:text-2xl max-[640px]:px-12">Update</button>
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
                  
                ) : ( <h4 className='text-base text-red-600 mt-2'>{error}</h4>)}
        </Form>
        )}
      </Formik>
    </div>
  )
}
