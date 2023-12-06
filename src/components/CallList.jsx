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



<li>

<div className="inline-flex items-center justify-center w-full">
<hr className="w-64 h-px my-5 bg-gray-100 border-0 opacity-10 dark:bg-gray-500" />

<span className="absolute px-3 -translate-x-1/2 font-medium border opacity-90 left-1/2 bg-gray-100 rounded text-gray-600/100" style={{fontSize:'0.7rem'}}>22 October 1995</span>
</div>


<div className="grid relative hover:bg-gray-100 grid-cols-6 w-72 h-14 mx-auto text-gray-900 bg-white border border-gray-100 rounded-lg dark:bg-white border-2 text-black dark:border-gray-300 ">     
<span class="absolute flex items-center justify-center h-5 w-5 rounded-full font-medium bg-red-500 border-2 border-gray-300 -top-2 -right-2 text-white" style={{fontSize:'0.7rem'}}>2</span>
<div className='inline flex items-center mx-2'><OutgoingCall size={'1.2rem'}/> 


</div>
<div className='col-span-3 mt-1'><h6>4378882882</h6>
<p className='text-xs'>Hello there</p></div>

<div className='inline flex items-center col-span-2 justify-end text-center'>
<h6 className='mx-2 text-xs'>Hello</h6><a href='/details/1' className='text-black inline-block'><Info size={'1.2em'} className='me-2'/></a>
</div>





</div>
</li>


</ul>
        </>
    )
}

export default CallList;