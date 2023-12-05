import React from 'react';
import { BiSolidArchiveIn } from "react-icons/bi";
import { HiOutlinePhoneMissedCall as MissedCall } from "react-icons/hi";
import { VscCallIncoming  as IncomingCall} from "react-icons/vsc";
import { VscCallOutgoing as OutgoingCall } from "react-icons/vsc";
import { LuInfo as Info } from "react-icons/lu";




const CallList = () => {



    return(
        <>
        <ul>
        <li><p className=''>Hello</p>


        <div className="inline-flex items-center justify-center w-full">
    <hr className="w-64 h-px my-5 bg-gray-100 border-0 dark:bg-gray-500" />
    <span className="absolute px-3 font-medium text-xs text-gray-900 -translate-x-1/2 bg-transparent left-1/2 dark:text-white dark:bg-gray-900">22 October 1995</span>
</div>

        <div className="w-72 mx-auto text-gray-300 bg-white border border-gray-100 rounded-lg dark:bg-gray-700 dark:border-gray-300 dark:text-white">
    <button type="button" className="relative inline-flex focus:outline-none items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
       <IncomingCall className='me-3'/>
       Profile
    </button>
    
</div>
</li>


<li>

<div className="inline-flex items-center justify-center w-full">
<hr className="w-64 h-px my-5 bg-gray-100 border-0 dark:bg-gray-500" />
<span className="absolute px-3 font-medium text-xs text-gray-900 -translate-x-1/2 bg-transparent left-1/2 dark:text-white dark:bg-gray-900">22 October 1995</span>
</div>


<div className="grid grid-cols-3 gap-4 w-72 h-14 mx-auto text-gray-300 bg-white border border-gray-100 rounded-lg dark:bg-gray-700 dark:border-gray-300 dark:text-white">
<div className='inline flex items-center mx-2'><OutgoingCall className='me-3'/> <h6 className=''>Profile</h6>
</div>

<div className='inline flex items-center mx-auto text-center'>
<h6 className='mx-2 text-xs'>Hello</h6><a href='' className='text-white inline-block mx-auto'><Info size={'1.2em'} className='justify-self-center'/></a>
</div>





</div>
</li>


</ul>
        </>
    )
}

export default CallList;