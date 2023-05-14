import React from 'react';
import { FaStripe, FaPaypal, FaCcMastercard, FaCcVisa, FaCcAmex } from 'react-icons/fa';

function Footer() {
  return (
    <div id='Footer' className='' >      
            <footer className="bg-gradient-to-br from-cyan-300 to-blue-400">
                <div className="max-w-6xl mx-auto p-4">
                <div className="mb-6">
                <p className="text-gray-600 text-semibold flex justify-center items-center">© 2023 DocFinder, Inc. All Rights Reserved.</p>
                </div>
                <div className="flex justify-center items-center">
                  <FaStripe className="text-black-400 mr-2" />
                  <FaPaypal className="text-black-400 mr-2" />
                  <FaCcMastercard className="text-black-400 mr-2" />
                  <FaCcVisa className="text-black-400 mr-2" />
                  <FaCcAmex className="text-black-400" />
                </div>
                </div>
            </footer>
    </div>
  )
}

export default Footer