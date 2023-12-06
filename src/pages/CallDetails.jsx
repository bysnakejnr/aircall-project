import React from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import { IoMdArrowBack } from "react-icons/io";
import {Link} from "react-router-dom";


const CallDetails = () =>{



    return(
    <>
    <div className='screen bg-gray-100'>
    <Header />
    <Link to='/'><IoMdArrowBack className='text-black m-4 absolute text-2xl' /></Link>
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900 mt-2">Applicant Information</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Margot Foster</dd>
          </div>
        </dl>
      </div>
    </div>
    </div>



    
    </>)
}


export default CallDetails;