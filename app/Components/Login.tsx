'use client'
import React, { useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Toast } from 'primereact/toast'
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { EyeFilledIcon } from "../../public/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../public/EyeSlashFilledIcon";
import { UserIcon } from "../../public/UserIcon";
import { Image } from "@nextui-org/react"

export default function Login() {
    const toast = useRef(null)
    const [isVisible, setIsVisible] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const router = useRouter()
   
    const handleClick = (e: any) => {
        setIsLoading(true)
        e.preventDefault()
        router.push('/UserGora/CMS')
    }

    return (
        <section className="bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                <div className="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
                    <div className="absolute inset-0">
                        <img className="w-full h-full object-cover" src="/TeamGora.png" alt="TeamGora"/>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-blackGora"/>

                    <div className="absolute top-2 right-8 lg:top-2 lg:right-5 flex flex-col items-center justify-end">
                        <div className="flex justify-center gap-4 m-4 mt-6">
                            <img className="w-24 h-full " src="/LogoGora.png" alt="TeamGora"/>
                            <img className="w-8 h-full " src="/featuring.png" alt="featuring"/>
                            <img className="w-28 h-full " src="/InnMinds.png" alt="Innminds"/>
                        </div>
                    </div>
                    
                    <div className="absolute inset-0 flex flex-col items-center p-28">
                        <div className="w-full text-center max-w-xl xl:w-full xl:mx-auto xl:max-w-xl">
                            <h3 className="text-xl lg:text-4xl font-bold text-white">Gestión contenido<br className="hidden xl:block" />Gora Adopciones</h3>
                            {/* <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                                <li className="flex items-center space-x-3">
                                    <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                        <svg className="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <span className="text-lg font-medium text-white"> Commercial License </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-greenGora rounded-full">
                                        <svg className="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <span className="text-lg font-medium text-white"> Unlimited Exports </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                        <svg className="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <span className="text-lg font-medium text-white"> 120+ Coded Blocks </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                        <svg className="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <span className="text-lg font-medium text-white"> Design Files Included </span>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
                    <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                        <div className='flex items-center gap-4'>
                            <h2 className="text-3xl font-bold leading-tight text-black sm:text-5xl">Bienvenido</h2>
                            <span className="filter drop-shadow-[0_0_0.1rem_#DF6536] inline-block">
                                <Image alt="avatarGora" src="/avatarGora.png" height="60" width="60"/>
                            </span> 
                        </div>
                        
                        <p className="mt-4 text-base text-gray-600">Ingresa tus datos de administrador para iniciar sesión, En caso de no tenerlos o haberlos olvidado contactate con 
                            <a href="#" title="" className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline ml-2">InnMinds</a>
                        </p>

                        <form action="#" method="POST" className="mt-4">
                            <div className="flex justify-center">
                                <Toast ref={toast}/>
                                <div className="w-80">
                                    <div className="flex justify-center md:flex md:items-center">
                                        <div className="m-4 ">
                                            <div className="relative">
                                                <div className="mt-2 mb-2 justify-center">
                                                    <div className="flex w-[300px] lg:w-[400px]">
                                                        <Input
                                                            //type="email"
                                                            label="Usuario"
                                                            size="lg" 
                                                            labelPlacement={'outside'}
                                                            description={'Ingrese su correo'}
                                                            className=''
                                                            required
                                                            isDisabled={isLoading}
                                                        />
                                                    </div>  
                                                </div> 
                                            </div>
                                            <div className="relative">
                                                <div className="mt-2 mb-2 justify-center">
                                                    <div className="flex w-full">
                                                        <Input
                                                            type={isVisible ? "text" : "password"}
                                                            label="Contraseña"
                                                            size="lg" 
                                                            labelPlacement={'outside'}
                                                            description={'Ingrese su contraseña'}
                                                            endContent={
                                                                <button className="focus:outline-none text-2xl text-default-400" type="button" onClick={toggleVisibility}>
                                                                    {isVisible ? (
                                                                        <EyeSlashFilledIcon/>
                                                                    ) : (
                                                                        <EyeFilledIcon/>
                                                                    )}
                                                                </button>
                                                            }
                                                            isDisabled={isLoading}
                                                            required
                                                        />
                                                    </div>  
                                                </div> 
                                            </div>
                                            <div className='flex justify-center mt-6'>
                                                <Button 
                                                    className='bg-greenGora text-white font-semibold hover:bg-pinkLightGora hover:text-greenGora flex w-[300px] lg:w-[400px]' 
                                                    size="lg" 
                                                    radius='md' 
                                                    variant="shadow" 
                                                    startContent={<UserIcon/>}
                                                    isDisabled={isLoading}
                                                    onClick={handleClick}
                                                >
                                                    Ingresar
                                                </Button>  			
                                            </div>
                                            {/* <p className="mt-4 text-center text-sm text-gray-dark">
                                                Olvido su contraseña?{' '}
                                                <a href="#" className="font-semibold leading-6 text-red hover:text-orangeGora">
                                                Recuperar
                                                </a>
                                            </p> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section> 
    )
}
