import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate  } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { MutatingDots } from "react-loader-spinner";

export default function Login() {

  const [isLoading, setLoading] = useState(false);
  const loadingHandle = (e) => {
    setLoading(e);
  };
  const [data, setData] = useState({});
  const navigate = useNavigate ();
  const [cookies, setCookie] = useCookies("");

  const validate = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
  });

  useEffect(() => {
    loadingHandle(true);
        //Is Logged In?
        axios.get(`http://localhost:5000/api/auth/get`, {
            headers: {
                Accept: "application/json",
                accesstoken: `${cookies.token?cookies.token:""}`,
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
                "Access-Control-Allow-Headers":
                "Origin, Content-Type, Accept, accesstoken , ngrok-skip-browser-warning"
            },
        })
        .then(res => {
          //Return to Profile
          navigate("/profile");
          loadingHandle(false);
        })
        .catch(err => {
          loadingHandle(false);
          // console.log("Not Logged In");
        })}, [])

  const [error, setError] = useState('');

  return (
    <div className='container mx-auto flex flex-wrap justify-center items-center h-[88vh]'>
      <Formik
      initialValues={data}
      validationSchema={validate}
      onSubmit={(values)=>{
        loadingHandle(true);
        //User Login Post
        axios.post(`http://localhost:5000/api/auth/post/`, values)
        .then(res => {
          setCookie('token', res.data.token);
          setCookie('username', res.data.user.name);
          setCookie('id', res.data.user._id);
          loadingHandle(false);
          if(res.data.status === "Success")
            // console.log("Success: ", localStorage.getItem('username'), " : ", localStorage.getItem('id'));
            navigate("/profile");
        })
        .catch(err => {
          // console.log(err.response.data);
          loadingHandle(false);
          setError(err.response.data);
        })

      }}
      >{({ errors, touched }) => (
        <Form className=' w-[30%] max-[1024px]:w-[50%] max-[640px]:w-[90%] rounded-lg bg-gradient-to-br from-slate-200 to-cyan-200 shadow-xl flex flex-col items-center justify-center p-10'>
          <h2 className='text-2xl font-bold text-center text-blue-800 mb-4'>Login</h2>
          <label htmlFor="" className='font-semibold text-blue-800 self-start m-1'>Email:</label>
          <Field type="text" name="email" className='w-full h-10 shadow-lg rounded-lg p-1'/>
          <h4 className='text-base text-red-600 mt-2'>{errors.email}</h4>
          <label htmlFor="" className='font-semibold text-blue-800 self-start m-1'>Password:</label>
          <Field type="password" name="password" className='w-full h-10 shadow-lg rounded-lg p-1'/>
          <h4 className='text-base text-red-600 mt-2'>{errors.password}</h4>
          <button type='submit' className="text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out px-10 self-center mt-5 py-2 rounded-xl bg-gradient-to-tl from-blue-500 to-cyan-300 text-white font-semibold max-[640px]:text-2xl max-[640px]:px-12">Login</button>
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
          <div className='flex flex-row mt-3'>
          <h3 className=''>Don't have an account? </h3><Link to="/SignUp" className="font-semibold text-blue-800 self-start">&nbsp; SignUp</Link>
          </div>
        </Form>
        )}
      </Formik>
    </div>
  )
}
