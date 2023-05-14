import React from 'react'

export default function Error() {
  return (
    <div className='flex flex-col gap-4 justify-center items-center w-full h-[80vh]'>
    <svg
        className='w-80'
        xmlns="http://www.w3.org/2000/svg"
        width="120"
        height="120"
        enableBackground="new 0 0 32 32"
        overflow="visible"
        viewBox="0 0 32 32"
        >
        <g>
            <g>
            <circle cx="16" cy="16" r="16" fill="#D72828"></circle>
            <path fill="#E6E6E6" d="M14.5 25h3v-3h-3v3zm0-19v13h3V6h-3z"></path>
            </g>
        </g>
        </svg>
        <h1 className='text-8xl font-bold text-red-600 max-[640px]: text-center max-[640px]:mt-12'>ERROR</h1>
        <h1 className='text-4xl font-bold text-blue-600 max-[640px]: text-center max-[640px]:mt-12'>Something Unexpected Happened</h1>
    </div>
  )
}
