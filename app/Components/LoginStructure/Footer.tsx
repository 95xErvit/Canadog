import React from "react"

export default function Footer() 
{
    return ( 
        <footer>
            <div className="flex mn:flex-col md:flex-row text-center justify-center items-center border-none bg-greenGora mn:py-4 xl:py-6">
                <div className="flex justify-center items-center">
                    <p className="mn:text-xs lg:text-base mn:mt-2 md:mt-0 leading-4 text-pinkLightGora">
                        © {new Date().getFullYear()} · Gora · Todos los derechos reservados ·
                    </p>    
                </div>
            </div>
        </footer> 
    )
}