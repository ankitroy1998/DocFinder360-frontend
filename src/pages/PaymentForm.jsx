import React, {useState} from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {color: '#fce883'},
      '::placeholder': {color: '#87bbfd'}
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee'
    }
  }
}



export default function PaymentForm() {
  const Navigate = useNavigate()
  const [success, setSuccess] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe) {
      console.log('Stripe not initialized')
      return
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })

    if(!error) {
      try {
        const {id} = paymentMethod
        const response = await axios.post('http://localhost:5000/api/payment/post', {
          amount: 500,
          id
        })

        if(response.data.success) {
          console.log('Successful payment')
          setSuccess(true)
          
          setTimeout(() => {
            Navigate("/profile");
          }, 2000);
        }

      } catch (error) {
        console.log('Error', error)
      }
    } else {
      console.log(error.message)
      setError(error.message)
    }
  }

  return (
    <div>
      {
        !success ?
        <form className='flex flex-col h-40 justify-between' onSubmit={handleSubmit}>
          {/* <h3 className='text-lg font-semibold text-blue-300 '>Enter Your Payment Details</h3> */}
          <fieldset className="FormGroup w-full">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS}/>
            </div>
          </fieldset>
          {
            error && <div className='text-red-500 text-sm'>{error}</div>
          }
          <button className='bg-blue-400 w-24 border-gray-500 self-end justify-self-end hover:bg-blue-500 text-white rounded-lg px-4 py-2 mt-5 shadow-xl cursor-pointer'>Pay</button>
        </form>
        :
        <div>
          <h2 className='text-center font-semibold text-xl text-blue-200'>Payment Successful</h2>
        </div>
      }
    </div>
  )
}
