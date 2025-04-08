"use client"
import React from 'react';
import { Link, Image } from "@nextui-org/react"
import { useRouter } from 'next/navigation'

export default function Footer(){
    const router = useRouter()

    return(
        <div>
            <div className="flex mn:flex-col md:flex-row justify-evenly bg-greenCanadog py-4">
                <div className=" flex flex-col text-center items-center border-none bg-greenCanadog mn:p-0 md:p-2 xl:p-4 md:hidden lg:block">
                    <Link href="/" className="flex justify-center items-center pt-4">
                        <Image 
                            className='rounded-full mn:w-28 md:w-32 xl:w-40' 
                            src="/LogoCanadog.jpg" 
                            width="150" 
                            height="60" 
                            alt="Logo Canadog"
                        />
                    </Link>
                </div>

                <div className="flex flex-col justify-center md:justify-evenly lg:justify-center items-center p-2">
                    <Link 
                        className="text-white hover:text-mentaCanadog mn:text-lg lg:text-xl py-2" 
                        href="#adopciones"
                    >
                        Adopciones
                    </Link>
                    <Link 
                        className="text-white hover:text-mentaCanadog mn:text-lg lg:text-xl py-2 cursor-pointer" 
                        onClick={() => router.push('/Store')}
                    >
                        Tienda Canadog
                    </Link>
                    <Link 
                        className="text-white hover:text-mentaCanadog mn:text-lg lg:text-xl py-2 cursor-pointer" 
                        onClick={() => router.push('/Home/AboutUs')}
                    >
                        ¿Quiénes somos?
                    </Link>
                    <Link 
                        className="text-white hover:text-mentaCanadog mn:text-lg lg:text-xl py-2 cursor-pointer" 
                        onClick={() => router.push('/Home/Donations')}
                    >
                        Ayúdanos
                    </Link> 
                </div>

                <div className="flex md:flex-col lg:flex-row justify-center items-center text-center mn:text-lg lg:text-xl p-2">
                    <div className=" flex flex-col text-center items-center border-none bg-greenCanadog mn:p-0 md:p-2 xl:p-4 mn:hidden md:block lg:hidden">
                        <Link 
                            href="/"
                            className="flex justify-center items-center pt-4"
                        >
                            <Image 
                                className='rounded-full w-24' 
                                src="/LogoCanadog.jpg" 
                                width="150" 
                                height="60" 
                                alt="Logo Canadog"
                            />
                        </Link>
                    </div>
                    <p className="text-white py-2">
                        Nuestro hogar de paso esta<br/> ubicado en Rionegro-Antioquia
                    </p>
                </div>

                <div className="flex mn:flex-col md:flex-cols justify-center text-center gap-4 mn:text-lg lg:text-xl p-2">
                    <div className='space-y-2'>
                        <p className="text-white items-center lg:text-start">
                            Contactanos:
                        </p>
                        <Link 
                            href='https://wa.me/+573104684683' 
                            target='_blank'
                        >
                            <div className='flex justify-center items-center space-x-2'>
                                <Image 
                                    alt="lovePets" 
                                    src="/LogoWhatsapp.png" 
                                    height={40} 
                                    width={40} 
                                    className="mn:h-8 mn:w-8 xl:h-10 xl:w-10"
                                />
                                <p className="text-white mn:text-lg lg:text-xl">
                                    +57 3104684683
                                </p>
                            </div>
                        </Link>
                        
                    </div>
                    
                    <div className='space-y-2'>
                        <p className="text-white items-center lg:text-start">
                            Siguenos:
                        </p> 
                        <a href="https://www.instagram.com/canadog_store/" target='_blank' className="flex justify-center items-center space-x-1">
                            <svg x="0px" y="0px" width="40" height="40" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" className="text-white hover:text-[#e1306c] hover:scale-110 mn:p-1 md:p-0">
                                <path 
                                    fillRule="evenodd" 
                                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" 
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-white">
                                canadog_store
                            </span>
                        </a> 
                    </div>    
                </div>
            </div>

            <div className="flex mn:flex-col md:flex-row justify-evenly bg-greenCanadog text-center pt-4 pb-4">
                <div className="flex mn:flex-col md:flex-row justify-center items-center">
                    <p className="mn:mt-2 md:mt-0 leading-4 text-white text-sm">
                        © {new Date().getFullYear()} Canadog Todos los derechos reservados
                    </p>
                </div>
                <div className="flex justify-center items-center space-x-2">
                    <p className="flex mn:mt-2 md:mt-0 leading-4 text-sm text-white">
                        Creado con 
                    </p>
                    <span className="filter drop-shadow-[0_0_0.5rem_#f82e03] animate-pulse inline-block mn:m-2 md:m-0">
                        <Image 
                            alt="lovePets" 
                            src="/mascotas.png" 
                            height="28" 
                            width="28"
                        />
                    </span> 
                    <p className="flex mn:mt-2 md:mt-0 leading-4 text-sm text-white">
                        por
                    </p>
                    <Link 
                        href="https://www.innminds.com.co/" 
                        target='_blank' 
                        className="flex items-center mn:m-4 md:m-0"
                    >
                        <Image 
                            src="/Innminds.png" 
                            width="110" 
                            height="110" 
                            alt="Logo-InnMinds" 
                            className="rounded-none"
                        />
                    </Link>
                </div>       
            </div>
        </div>
    )
}

