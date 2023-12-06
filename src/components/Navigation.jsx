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
        <div className="bg-white min-h-[4.4rem] px-6 rounded-t-xl relativeinset-x-0 bottom-0">
      <ul className="flex relative">
        <span
          className={`bg-green-400 duration-500 ${Menus[active].dis} border-4 border-gray-100 h-16 w-16 absolute
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
              onClick={() => setActive(i)}
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
    );

};

export default Navigation;