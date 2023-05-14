import React from 'react'

export default function DetailsModal(props) {
  return (
    <div className='flex justify-center items-center fixed backdrop-blur-sm w-screen h-screen top-0 left-0'>
        <div className='bg-white max-sm:w-full max-md:w-4/5 md:w-3/5 md:rounded-xl h-[90vh] shadow-2xl rounded-xl'>
            <button onClick={()=>{props.close(false)}} className=' text-gray-400 hover:text-red-500 cursor-pointer text-right w-full pr-3 text-lg font-semibold pt-1'>x</button>

            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-3xl text-blue-500 font-bold text-center mt-0 mb-12 mx-auto'>
                    {props.details?.name}
                </h1>
                <div className="rounded-full w-40 h-40 bg-slate-400 border-4 border-blue-600 overflow-hidden flex flex-col  items-center m-10">
                <div className="w-12 h-16 bg-slate-200 rounded-full relative top-7"></div>
                <div className="w-24 h-28 bg-slate-200 rounded-full relative top-10"></div>
              </div>
                <div className='flex flex-col items-center justify-center gap-4 border-2 border-blue-400 rounded-md py-5 px-5'>
                    <h2 className='text-blue-500 text-base w-fit rounded-full'> <span className='font-bold'>ID:</span>  {props.details?._id}</h2>
                    <h2 className='text-blue-500 text-base w-fit rounded-full'> <span className='font-bold'>Name:</span>  {props.details?.name}</h2>
                    <h2 className='text-blue-500 text-base w-fit rounded-full'> <span className='font-bold'>Specialization:</span>  {props.details?.spec}</h2>
                    <h2 className='text-blue-500 text-base w-fit rounded-full'> <span className='font-bold'>Email:</span>  {props.details?.email}</h2>
                    <h2 className='text-blue-500 text-base w-fit rounded-full'> <span className='font-bold'>Phone:</span> +91&nbsp;{props.details?.phone}</h2>
                    <h2 className='text-blue-500 text-base w-fit rounded-full'> <span className='font-bold'>Hospital:</span>  {props.details?.hospital}</h2>
                    <h2 className='text-blue-500 text-base w-fit rounded-full'> <span className='font-bold'>Address:</span>  {props.details?.address}</h2>
                </div>
            </div>
        </div>
    </div>
  )
}
