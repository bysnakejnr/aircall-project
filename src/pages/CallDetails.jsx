import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import { IoMdArrowBack } from "react-icons/io";
import {Link,useParams} from "react-router-dom";
import Loading from "../components/Loading.jsx";


const CallDetails = () =>{
      const params = useParams();
      const [call, setCall] = useState([]);
      const [loading, setLoading] = useState(true);

// Getting the parameters of the call clicked, and getting data from the API
      useEffect(()=>{
       
        setLoading(true)
        fetch(`https://cerulean-marlin-wig.cyclic.app/activities/${params.id}`)
        .then(response => response.json())
        .then(data => {
          setCall(data);
          setLoading(false);
      })
          .catch(error => console.log(error.message))
      },[])

// Formatted date
      const formattedDate = (date) =>{
        return new Date(date).toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        )
    }


    return(
    <>
    <div className='screen bg-gray-100'>
    <Header />
    <Link to='/'><IoMdArrowBack className='text-black m-4 absolute text-2xl' /></Link>
    {loading===true ? <div className='flex items-center justify-center mt-12'><Loading /></div> :
    <div>
      {/* Call information */}
      
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-xl text-gray-900 mt-4">Call Details</h3>
        <p className="mt-1 max-w-2xl text-sm capitalize leading-6 text-gray-500">{call.direction}</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">To</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{call.to}</dd>
            <dt className="text-sm font-medium leading-6 text-gray-900">Via</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{call.via}</dd>
              {call.from===undefined ? <h1></h1> : <><dt className="text-sm font-medium leading-6 text-gray-900">From</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{call.from}</dd></>}
              <dt className="text-sm font-medium leading-6 text-gray-900">Duration</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{call.duration}</dd>


            <dt className="text-sm font-medium leading-6 text-gray-900">Number</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{call.from}</dd>
            <dt className="text-sm font-medium leading-6 text-gray-900">Date</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{formattedDate(call.created_at)}</dd>
          </div>
        </dl>
      </div>
    </div>
}
    </div>



    
    </>)
}


export default CallDetails;