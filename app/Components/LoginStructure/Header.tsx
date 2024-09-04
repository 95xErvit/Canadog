import React from "react"

export default function Header() 
{
  return (
    <header className="bg-gray">
      <div className="relative">         
        <div className="border-none bg-greenGora py-6">
          <div className="flex justify-center">
            <p className="mn:text-2xl lg:text-4xl font-semibold leading-6">
              <a className=" text-OrangeLightGora">Gora Adopciones</a>
            </p>
          </div>
        </div> 
      </div>
    </header>
  )
}