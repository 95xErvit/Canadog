import React from "react"
import { Image } from "@nextui-org/react"

export default function Header() 
{
  return (
    <header>  
        <div className="border-none bg-greenGora py-6">
          <div className="flex justify-center items-center gap-4">
            <span className="filter inline-block">
                <Image alt="avatarGora" src="/LogoCanadog.jpg" height="60" width="60"/>
            </span> 
            <p className="mn:text-2xl lg:text-4xl font-semibold leading-6">
              <a className=" text-greenCanadog">Canadog admin</a>
            </p>
          </div>
        </div> 
    </header>
  )
}