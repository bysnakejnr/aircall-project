import { useState } from "react";
import { FaBeer } from "react-icons/fa";


const Navigation = () => {
    const Menus =[
        {name:"Active Calls", dis:"translate-x-32"},
        {name:"Archived Calls", dis:"translate-x-48"}
    ]

    const [active, setActive] = useState("");

    return (
    
        <div className="bg-white max-h-[4.4rem] px-6 rounded-t-xl">
            <ul className="flex relative">
            {Menus.map((menu, i)=>(
                <li key={i} className="w-16 align-middle">
                    <a className="flex flex-col text-center pt-6 border">
                        <span className="text-xl cursor-pointer margin-auto border m-auto">
                            <FaBeer className="align-middle"/>
                        </span>
                        <span>{menu.name}</span>
                    </a>
                </li>
            ))}
            </ul>

        </div>
    );

};

export default Navigation;