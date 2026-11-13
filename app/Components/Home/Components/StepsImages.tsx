"use client";
import React from 'react';
import Image from 'next/image';
import Explora from "@/public/Explora.png"
import Aplica from "@/public/Aplica.png"
import Entrevista from "@/public/Entrevista.png"
import Adopcion from "@/public/Adopcion.png"

export default function StepsImages() {
    return(
        <>  
            {/* BANNER FINAL */}
            <div className='relative mn:px-6 mn:py-2 md:p-6'>
                <div className='grid max-w-7xl mx-auto'>
                    <h2 className='mn:text-2xl md:text-4xl font-semibold text-brown'>
                        Pasos para {<span className='text-green drop-shadow-[2px_1px_0px_#ADADAD]'>adoptar</span>} a tu nuevo compañero
                    </h2>
                </div>
            </div>

            <div className="bg-brownLight mn:max-w-[350px] md:max-w-[700px] lg:max-w-4xl xl:max-w-7xl mx-auto mt-10 mb-20 lg:gap-4 py-8 md:py-4 align-items-center gap-6 grid mn:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center rounded-lg shadow-lg">
                {/* Card 1 */}
                <div className="flex flex-col items-center gap-2">
                    <Image
                        className="mn:w-32 mn:h-40 md:w-36 md:h-48 lg:w-40 lg:h-52 xl:w-44 xl:h-60"
                        src={Explora.src}
                        width={100}
                        height={100}
                        alt="Explora"
                    />
                </div>
                
                {/* Card 2 */}
                <div className="flex flex-col items-center gap-2">
                    <Image
                        className="mn:w-32 mn:h-40 md:w-36 md:h-48 lg:w-40 lg:h-52 xl:w-44 xl:h-60"
                        src={Aplica.src}
                        width={100}
                        height={100}
                        alt="Aplica"
                    />
                </div>
                
                {/* Card 3 */}
                <div className="flex flex-col items-center gap-2">
                    <Image
                        className="mn:w-32 mn:h-40 md:w-36 md:h-48 lg:w-40 lg:h-52 xl:w-44 xl:h-60"
                        src={Entrevista.src}
                        width={100}
                        height={100}
                        alt="Entrevista"
                    />
                </div>
                {/* Card 4 */}
                <div className="flex flex-col items-center gap-2">
                    <Image
                        className="mn:w-32 mn:h-40 md:w-36 md:h-48 lg:w-40 lg:h-52 xl:w-44 xl:h-60"
                        src={Adopcion.src}
                        width={100}
                        height={100}
                        alt="Adopción"
                    />
                </div>
            </div>           
        </>
    )
}