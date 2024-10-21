import React from "react"
import { Image } from "@nextui-org/react"

export default function Header() 
{
  return (
    <header>
      <div className="relative">         
        <div className="border-none bg-greenGora py-6">
          <div className="flex justify-center items-center gap-4">
            <span className="filter drop-shadow-[0_0_0.1rem_#DF6536] inline-block">
                <Image alt="avatarGora" src="/avatarGora.png" height="48" width="48"/>
            </span> 
            <p className="mn:text-2xl lg:text-4xl font-semibold leading-6">
              <a className=" text-pinkGora">Gora Admin</a>
            </p>
          </div>
        </div> 
      </div>
    </header>
  )
}