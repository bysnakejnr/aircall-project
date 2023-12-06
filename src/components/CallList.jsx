import React, {useState, useEffect} from 'react';
import Loading from './Loading.jsx';
import { IoArchiveOutline as ArchiveAll } from "react-icons/io5";
import { LuArchiveRestore as UnarchiveAll } from "react-icons/lu";
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


    // Getting the initial data from API
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

    // Formatting the Date function
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
    // Formatting the Time function
    const formattedTime = (time) =>{
        return new Date(time).toLocaleString(
            "en-US",
            {
                hour: "2-digit",
                minute: "2-digit",
            }
        )
    }
    // Sending a file to be archived
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
    // A file getting removed from the archive
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
    // Empty all archive
    const resetArchive = () => {
        if(filtered.length!==0){
        if(window.confirm("Are you sure to unarchive all calls?")){
            
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
       
        } else{
            window.alert("There is nothing to unarchive.")
      }
    }

    // Putting everything in Archive
    const allArchive = () => {
        if(activities.length!==0){
        if(window.confirm("Are you sure to archive all calls?")){
           
            
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
   
      } else{
        window.alert("There is nothing to move.")
    }
    }
    


    return(
        <>
        {/* Header Menu */}
        <h2 className='text-3xl font-medium'>{Menus[active].name}</h2>
        <div className='w-full h-96 mt-5  overflow-auto overflow-x-hidden scrollbarhidden'>
        
        <ul>
            {/* Buttons for archiving and unarchiving (disabled if loading still)*/}
            {active ===0 ? 
            <div className='relative inline-flex items-center justify-center'>
            <button className='bg-white border-2 border-black opacity-50 text-black mt-2 flex items-center' 
            disabled={loading===true ? true : false} 
            onClick={allArchive}><ArchiveAll className='mr-2'/>Archive all
            </button> 
            </div>
            : 
            <div className='relative inline-flex items-center justify-center'>
  <button
    className='bg-white border-2 border-black opacity-50 text-black mt-2 flex items-center'
    disabled={loading === true ? true : false}
    onClick={resetArchive}>
    <UnarchiveAll className='mr-2' />
    Unarchive All
  </button>
</div>
            }
            {loading===true ? <div className='flex items-center justify-center mt-12'><Loading /></div> : 
            (active ===0 ? activities : filtered).map((call) =>
            {return(
                
                <li key={call.id}>

<div className="relative inline-flex items-center justify-center w-full">
<hr className="w-64 h-px my-5 bg-gray-100 border-0 opacity-10 dark:bg-gray-500" />

<span className="absolute px-3 -translate-x-1/2 font-medium border opacity-90 left-1/2 bg-gray-100 rounded text-gray-600/100" style={{fontSize:'0.7rem'}}>
    {formattedDate(call.created_at)}</span>
</div>

{/* Call direction rendered as an icon */}
<div className="grid relative hover:bg-gray-100 grid-cols-6 w-72 h-14 mx-auto text-gray-900 bg-white border border-gray-100 rounded-lg dark:bg-white border-2 text-black dark:border-gray-300 ">     
<span class="absolute flex items-center justify-center h-5 w-5 rounded-full font-medium bg-red-500 border-2 border-gray-300 -top-2 -right-2 text-white" style={{fontSize:'0.7rem'}}>2</span>
<div className='inline flex items-center mx-3'>
   {call.direction==="inbound" ? <IncomingCall size={'1.2rem'}/>
    : <OutgoingCall size={'1.2rem'}/>
} 


</div>
{/* Call type color coded = missed:red, voicemail:blue, answered:green */}
<div className='col-span-3 mt-1'><h6 className='font-medium' style={{color:`${colorByCallType[call.call_type]}`}}>{call.from}</h6>
<h5 className='text-xs capitalize'>{call.call_type}</h5></div>

<div className='inline flex items-center col-span-2 justify-end text-center'>
<h5 className='mx-2'>{formattedTime(call.created_at)}</h5>

{/* archiving and details */}
<Link to={`/details/${call.id}`} className='text-black inline-block'><Info size={'1.2em'} className='me-2'/></Link>
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
<div className='flex justify-center mt-2'><h5>Scroll to see more</h5> <IoIosArrowDown className='animate-bounce' /></div>

{/* Active menu bar, bottom */}
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