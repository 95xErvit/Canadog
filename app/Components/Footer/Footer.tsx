"use client"
import React from 'react';
import { Link, Image } from "@nextui-org/react"

export default function Footer(){

    return(
        <div>
            <div className="flex mn:flex-col md:flex-row justify-evenly bg-greenGora">
                <div className=" flex flex-col text-center items-center border-none bg-greenGora mn:p-0 md:p-2 xl:p-4">
                    <Link href="/" className="flex justify-center items-center pt-4">
                        <Image src="LogoGora.png" width="150" height="60" alt="Logo Gora"/>
                    </Link>
                    <div className="flex justify-center items-center py-3">
                        <a href="#" className="text-OrangeLightGora hover:text-RedLightGora hover:scale-125 px-2">
                            <span className="sr-only">Facebook</span>
                            <svg x="0px" y="0px" width="40" height="40" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" className="mn:p-1 md:p-0">
                                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/gorafundacion/" className="text-OrangeLightGora hover:text-RedLightGora hover:scale-125 px-2">
                            <span className="sr-only">Instagram</span>
                            <svg x="0px" y="0px" width="40" height="40" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" className="mn:p-1 md:p-0">
                                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                            </svg>
                        </a>
                        <a href="https://www.tiktok.com/@gorafundacion" className="text-OrangeLightGora hover:text-RedLightGora hover:scale-125 px-2">
                            <span className="sr-only">TikTok</span>
                            <svg x="0px" y="0px" width="40" height="40" aria-hidden="true" viewBox="0 0 514 500" className="mn:p-1 md:p-0" fill="currentColor">
                                <path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center p-2">
                    <Link className="text-OrangeLightGora hover:text-orangeGora mn:text-md md:text-lg py-2" href="#adopciones">
                        Adopciones
                    </Link>
                    <Link className="text-OrangeLightGora hover:text-orangeGora mn:text-md md:text-lg py-2" href="https://gorafundacion.org/">
                        Tienda Gora
                    </Link>
                    <Link className="text-OrangeLightGora hover:text-orangeGora mn:text-md md:text-lg py-2" href="https://nibi.com.co/fundaciones/id/GORA_FUNDACI%C3%93N">
                        Ayúdanos
                    </Link> 
                </div>

                <div className="flex mn:flex-col md:flex-cols justify-evenly text-center mn:text-md md:text-lg p-2">
                    <p className="text-OrangeLightGora py-2">
                        Estamos ubicados <br/>en Medellín-Antioquia
                    </p>
                    <p className="text-OrangeLightGora py-2">
                        Calle 54 #94 - 35.
                    </p>          
                </div>

                <div className="flex mn:flex-col md:flex-cols justify-evenly text-center mn:text-md md:text-lg p-2">
                    <p className="text-OrangeLightGora">
                        Contactanos:
                    </p>
                    <p className="text-OrangeLightGora">
                        E-mail: <br/> fundacion@gorafundacion.com
                    </p>
                    <p className="text-OrangeLightGora">
                        Whatsapp: 300000000
                    </p>            
                </div>
            </div>

            <div className="flex mn:flex-col md:flex-row justify-evenly bg-greenGora text-center pt-4 pb-4">
                <div className="flex mn:flex-col md:flex-row justify-center items-center">
                    <p className="mn:mt-2 md:mt-0 leading-4 text-OrangeLightGora text-sm">
                        © {new Date().getFullYear()} Gora Todos los derechos reservados
                    </p>
                </div>
                <div className="flex mn:flex-col md:flex-row justify-center items-center space-x-2">
                    <p className="flex mn:mt-2 md:mt-0 leading-4 text-sm text-OrangeLightGora">
                        Creado con 
                    </p>
                    <span className="filter drop-shadow-[0_0_0.5rem_#f82e03] animate-pulse inline-block">
                        <Image alt="lovePets" src="mascotas.png" height="28" width="28"/>
                    </span> 
                    <p className="flex mn:mt-2 md:mt-0 leading-4 text-sm text-OrangeLightGora">
                        por
                    </p>
                    <Link href="/" className="flex items-center mn:mt-2 md:mt-0">
                        <Image src="Innminds.png" width="120" height="120" alt="Logo-InnMinds" className="rounded-none"/>
                    </Link>
                </div>       
            </div>
        </div>
    )
}

