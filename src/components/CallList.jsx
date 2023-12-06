import React, {useState, useEffect} from 'react';
import Loading from './Loading.jsx';
import { BiSolidArchiveIn, BiArchiveIn, BiArchiveOut } from "react-icons/bi";
import { VscCallOutgoing as OutgoingCall, VscCallIncoming  as IncomingCall } from "react-icons/vsc";
import { LuInfo as Info } from "react-icons/lu";
import { BiSolidPhoneCall } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import {Link} from "react-router-dom";
import '../style/CallList.css'




const CallList = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtered, setFiltered] = useState([]);
    const [update, setUpdate] = useState(null)
    const Menus =[
        {name:"Active Calls", dis:"translate-x-8", icon:"BiSolidPhoneCall", color:"bg-green-400"},
        {name:"Archived Calls", dis:"translate-x-40", icon:"BiSolidArchiveIn", color:"bg-green-700"}
    ]
    const [active, setActive] = useState(0);
    const colorByCallType = {
        voicemail : '#3C70DD',
        missed : 'red',
        answered : 'green',
        undefined : 'black'
    }

    useEffect(()=>{
       
      setLoading(true)
      fetch("https://cerulean-marlin-wig.cyclic.app/activities")
      .then(response => response.json())
      .then(data => {
        const newData = data.filter(data => data.from !== undefined)
        setActivities(newData.filter(data => data.is_archived ===false))
        setFiltered(newData.filter(data => data.is_archived ===true))
        setLoading(false)
    })
        .catch(error => console.log(error.message))
    },[])


    const formattedDate = (date) =>{
        return new Date(date).toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    }

    const formattedTime = (time) =>{
        return new Date(time).toLocaleString(
            "en-US",
            {
                hour: "2-digit",
                minute: "2-digit",
            }
        )
    }

    const sendArchive = (id) =>{
        if(window.confirm("Archive this item?")){
        const objectToMove = activities.find((obj)=> obj.id === id);
        const updatedSourceData = activities.filter((obj)=> obj.id !== id);
        setActivities(updatedSourceData);
        setFiltered(filtered => [...filtered, objectToMove])
        fetch(`https://cerulean-marlin-wig.cyclic.app/activities/${id}`, 
        {  method: "PATCH",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
           body: JSON.stringify({
            "is_archived": true
          })})
           .then(response => {
            console.log(response.status);
            return response.json();  })
            .then(data => {console.log(data)
            })
            .catch((error)=>{console.log(error.message)});
        };
        
    };

    const removeArchive = (id) =>{
        if(window.confirm("Unarchive this item?")){
            const objectToMove = filtered.find((obj)=> obj.id === id);
            const updatedSourceData = filtered.filter((obj)=> obj.id !== id);
            setFiltered(updatedSourceData);
            setActivities(activities => [...activities, objectToMove])
        fetch(`https://cerulean-marlin-wig.cyclic.app/activities/${id}`, 
        {  method: "PATCH",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
           body: JSON.stringify({
            "is_archived": false
          })})
           .then(response => {
            console.log(response.status);
            return response.json();  })
            .then(data => console.log(data))
            .catch((error)=>{console.log(error.message)});
           }
    }

    const resetArchive = () => {
        if(window.confirm("Are you sure to unarchive all calls?")){
            if(filtered.length!==0){
            setLoading(true);
        filtered.map((data)=>{
            const newData = data;
            setActivities(activities => [...activities, newData]);
            setFiltered([])
            setUpdate(true);
            fetch(`https://cerulean-marlin-wig.cyclic.app/activities/${data.id}`, 
        {  method: "PATCH",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
           body: JSON.stringify({
            "is_archived": false
          })})
           .then(response => {
            console.log(response.status);
            setLoading(false);
            return response.json();  })
            .then(data => console.log(data))
            .catch((error)=>{console.log(error.message)
            setLoading(false)});
        })
        }
        else{
            window.alert("There is nothing to unarchive.")
        }
      }
    }


    const allArchive = () => {
        if(window.confirm("Are you sure to archive all calls?")){
           
            if(activities.length!==0){
                setLoading(true);
        activities.map((data)=>{
            const newData = data;
            setFiltered(filtered => [...filtered, newData]);
            setActivities([])
            fetch(`https://cerulean-marlin-wig.cyclic.app/activities/${data.id}`, 
        {  method: "PATCH",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
           body: JSON.stringify({
            "is_archived": true
          })})
           .then(response => {
            console.log(response.status);
            setLoading(false);
            return response.json();  })
            .then(data => console.log(data))
            .catch((error)=>{console.log(error.message)
            setLoading(false)});
        })
    }
    else{
        window.alert("There is nothing to move.")
    }
      }
    }
    


    return(
        <>
        <h2 className='text-3xl font-medium'>{Menus[active].name}</h2>
        <div className='w-full h-96 mt-5  overflow-auto overflow-x-hidden scrollbarhidden'>
        
        <ul>
            {active ===0 ? <button className='bg-white border-2 border-black opacity-50 text-black mt-2' disabled={loading===true ? true : false} onClick={allArchive}>Archive all</button> : <button className='bg-white border-2 border-black opacity-50 text-black mt-2' onClick={resetArchive}>Unarchive all</button>}
            {loading===true ? <div className='flex items-center justify-center mt-12'><Loading /></div> : 
            (active ===0 ? activities : filtered).map((call) =>
            {return(
                
                <li key={call.id}>

<div className="relative inline-flex items-center justify-center w-full">
<hr className="w-64 h-px my-5 bg-gray-100 border-0 opacity-10 dark:bg-gray-500" />

<span className="absolute px-3 -translate-x-1/2 font-medium border opacity-90 left-1/2 bg-gray-100 rounded text-gray-600/100" style={{fontSize:'0.7rem'}}>
    {formattedDate(call.created_at)}</span>
</div>


<div className="grid relative hover:bg-gray-100 grid-cols-6 w-72 h-14 mx-auto text-gray-900 bg-white border border-gray-100 rounded-lg dark:bg-white border-2 text-black dark:border-gray-300 ">     
<span class="absolute flex items-center justify-center h-5 w-5 rounded-full font-medium bg-red-500 border-2 border-gray-300 -top-2 -right-2 text-white" style={{fontSize:'0.7rem'}}>2</span>
<div className='inline flex items-center mx-3'>
   {call.direction==="inbound" ? <IncomingCall size={'1.2rem'}/>
    : <OutgoingCall size={'1.2rem'}/>
} 


</div>
<div className='col-span-3 mt-1'><h6 style={{color:`${colorByCallType[call.call_type]}`}}>{call.from}</h6>
<p className='text-xs'></p></div>

<div className='inline flex items-center col-span-2 justify-end text-center'>
<h5 className='mx-2'>{formattedTime(call.created_at)}</h5>

<Link to='/details/1' className='text-black inline-block'><Info size={'1.2em'} className='me-2'/></Link>
{active===0 ? 
<Link className='sm' onClick={() => sendArchive(`${call.id}`)}><BiArchiveIn size={'1.2em'} className='me-2'/></Link>
:
<Link className='sm' onClick={() => removeArchive(`${call.id}`)}><BiArchiveOut size={'1.2em'} className='me-2'/></Link>
}
</div>





</div>
</li>

)
})
}</ul>

</div>
<div className='flex justify-center mt-2'><h5 className=''>Scroll to see more</h5> <IoIosArrowDown className='animate-bounce' /></div>

<div className="mt-4">
        <div className="bg-white min-h-[4.4rem] px-6 rounded-t-xl relativeinset-x-0 bottom-0">
      <ul className="flex relative">
        <span
          className={`${Menus[active].color} duration-500 ${Menus[active].dis} border-4 border-gray-100 h-16 w-16 absolute
         -top-5 rounded-full`}
        >
          <span
            className="w-3.5 h-3.5 bg-transparent absolute top-4 -left-[18px] 
          rounded-tr-[11px]">
          </span>
          <span
            className="w-3.5 h-3.5 bg-transparent absolute top-4 -right-[18px] 
          rounded-tl-[11px] "
          ></span>
        </span>
        {Menus.map((menu, i) => (
          <li key={i} className="w-32">
            <a
              className="flex cursor-pointer flex-col pt-6"
              onClick={() => {
                setActive(i)
                
            }}
            >
              <span
              style={{marginLeft:'18.8%'}}
                className={`text-xl cursor-pointer absolute duration-500 ${
                  i === active && "-mt-6 text-white"
                }`}
              >
                {menu.icon==="BiSolidArchiveIn" ?
                <BiSolidArchiveIn size={'1.5rem'}/>
                :
                <BiSolidPhoneCall size={'1.5rem'}/>
                }
              </span>
              <span
                className={` ${
                  active === i
                    ? "translate-y-5 duration-700 text-center text-gray-800 opacity-80"
                    : "opacity-0 translate-y-150"
                } `}
              >
                {menu.name}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
    </div>
        </>
    )
}

export default CallList;