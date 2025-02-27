'use client'
import React from "react"
import Image from "next/image"
import Adopta from "../../../public/Adopta.jpg"
import Carta from "../../../public/CartaAna.jpg"

export default function About() {

    return(
        <div className='flex flex-col md:items-center md:justify-center gap-4 m-10 text-blackCanadog'>
            <div className='flex flex-col gap-2 mn:items-center md:items-start'>
                <h1 className=' mn:text-lg md:text-4xl'>
                    Hogar de paso
                </h1>
                <h1 className="text-greenCanadog font-bold mn:text-xl md:text-5xl">
                    CANADOG
                </h1>
            </div>
            
            <div className='flex flex-col gap-2 md:w-[400px] lg:w-[580px] xl:w-[820px] mn:text-sm md:text-[14px] lg:text-xl'>
                <p>
                    Hola soy Ana Cristina, apasionada por el servicio, el amor y el respeto por la vida.
                    Tengo un espacio de mi hogar para brindar refugio, atención y rehabilitación a perros en situación de abandono,
                    maltrato y vulnerabilidad, proporcionandoles cuidado, amor y una segunda oportunidad para encontrar un hogar definitivo donde sean valorado y protegidos.
                </p>
            </div>
            <div className="flex mn:flex-col md:flex-row justify-center items-center mn:my-4 lg:my-10 mn:gap-4 lg:gap-10">
                <Image
                    src={Carta.src}
                    alt="card"
                    width={1512}
                    height={550}
                    className="object-cover w-full mn:h-full md:h-80 lg:h-[400px] xl:h-[480px] md:px-4"
                />
                <Image
                    src={Adopta.src}
                    alt="card"
                    width={1512}
                    height={550}
                    className="object-cover w-full mn:h-full md:h-80 lg:h-[400px] xl:h-[480px]"
                />
            </div>
        </div>
    )
}