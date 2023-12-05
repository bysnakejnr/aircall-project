import { useState } from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { BiSolidArchiveIn } from "react-icons/bi";




const Navigation = () => {
    const Menus =[
        {name:"Active Calls", dis:"translate-x-8", icon:"BiSolidPhoneCall"},
        {name:"Archived Calls", dis:"translate-x-40", icon:"BiSolidArchiveIn"}
    ]

    const [active, setActive] = useState(0);

    return (
    

<div className="mt-96">
        <div className="bg-white max-h-[4.4rem] px-6 rounded-t-xl relativeinset-x-0 bottom-0">
      <ul className="flex relative">
        <span
          className={`bg-rose-600 duration-500 ${Menus[active].dis} border-4 border-gray-900 h-16 w-16 absolute
         -top-5 rounded-full`}
        >
          <span
            className="w-3.5 h-3.5 bg-transparent absolute top-4 -left-[18px] 
          rounded-tr-[11px] shadow-myShadow1"
          ></span>
          <span
            className="w-3.5 h-3.5 bg-transparent absolute top-4 -right-[18px] 
          rounded-tl-[11px] shadow-myShadow2"
          ></span>
        </span>
        {Menus.map((menu, i) => (
          <li key={i} className="w-32">
            <a
              className="flex cursor-pointer flex-col pt-8"
              onClick={() => setActive(i)}
            >
              <span
              style={{marginLeft:'21%'}}
                className={`text-xl cursor-pointer absolute duration-500 ${
                  i === active && "-mt-7 text-white"
                }`}
              >
                {menu.icon==="BiSolidArchiveIn" ?
                <BiSolidArchiveIn/>
                :
                <BiSolidPhoneCall/>
                }
              </span>
              <span
                className={` ${
                  active === i
                    ? "translate-y-6 duration-700 text-center border opacity-100"
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
        // <div className="bg-white max-h-[4.4rem] px-6 rounded-t-xl">
        //     <ul className="flex relative">
        //     {Menus.map((menu, i)=>(
        //         <li key={i} className="w-16">
        //             {active}
        //             <a className="flex flex-col text-center pt-6 border"
        //             onClick={()=>setActive(i)}>
        //                 <span className="text-xl cursor-pointer border m-auto">
        //                     <FaBeer />
        //                 </span>
        //                 <span className="">{menu.name}</span>
        //             </a>
        //         </li>
        //     ))}
        //     </ul>

        // </div>
    );

};

export default Navigation;