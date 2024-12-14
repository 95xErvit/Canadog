'use client'
import React, { useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Toast } from 'primereact/toast'
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { EyeFilledIcon } from "../../public/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../public/EyeSlashFilledIcon";
import { UserIcon } from "../../public/UserIcon";
import  axios from 'axios';
import { Image } from "@nextui-org/react"

export default function Login() {
    const toast = useRef<Toast>(null)
    const [isVisible, setIsVisible] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [user, setUser] = React.useState("");
    const [pass, setPass] = React.useState("");
    const router = useRouter()
   
    const handleClick = async (e: any) => {
        setIsLoading(true)
        e.preventDefault()
        const response = await axios.post("/UserGora/CMS/api/users",{data:{Id:user, Pass:pass}})
        console.log(response.data)
        if(response.data.data)
        {
            router.push('/UserGora/CMS')
        }
        else
        {
            toast.current?.show({severity:'error', summary: 'Fallo en el inicio de sesión', detail:'Tienes un error en el usuario o contraseña', life: 7000});
            setIsLoading(false)
        }
        
    }

    return (
        <section className="bg-white">
            <Toast ref={toast}/>
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                <div className="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
                    <div className="absolute inset-0">
                        <img className="w-full h-full object-cover" src="/CuranElAlma.jpg" alt="Login-Canadog"/>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/30"/>

                    <div className="absolute top-2 right-5 flex flex-col items-center">
                        <div className="flex justify-center gap-4 m-4 mt-6">
                            <img className="mn:w-16 md:w-24 h-full" src="/Logo.png" alt="TeamGora"/>
                            <img className="mn:w-4 md:w-8 h-full" src="/featuring.png" alt="featuring"/>
                            <img className="mn:w-24 md:w-28 h-full" src="/InnMinds.png" alt="Innminds"/>
                        </div>
                    </div>
                    
                    <div className="absolute inset-0 flex flex-col items-center p-28 mn:mt-20 lg:mt-0">
                        <div className="w-full text-center max-w-xl xl:w-full xl:mx-auto xl:max-w-xl">
                            <h3 className="text-xl md:text-2xl lg:text-4xl font-bold text-pinkLightGora">Gestión contenido<br className="hidden xl:block" /> Gora Adopciones</h3>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
                    <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto text-blackGora">
                        <div className='flex items-center gap-4'>
                            <h2 className="text-3xl font-bold leading-tight sm:text-5xl">Bienvenido</h2>
                            <span className="filter drop-shadow-[0_0_0.1rem_#DF6536] inline-block">
                                <Image alt="avatarGora" src="/avatarGora.png" height="60" width="60"/>
                            </span> 
                        </div>
                        
                        <p className="mt-4 text-base text-gray-600">Ingresa tus datos de administrador para iniciar sesión, En caso de no tenerlos o haberlos olvidado contactate con 
                            <a href="#" title="" className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline ml-2">InnMinds</a>
                        </p>

                        <form action="#" method="POST" className="mt-4">
                            <div className="flex justify-center">
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
                                                            onChange={((e)=> setUser(e.target.value))}
                                                            required
                                                            minLength={5}
                                                            maxLength={12}
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
                                                            onChange={((e)=> setPass(e.target.value))}
                                                            isDisabled={isLoading}
                                                            maxLength={20}
                                                            minLength={5}
                                                            required
                                                        />
                                                    </div>  
                                                </div> 
                                            </div>
                                            <div className='flex justify-center mt-6'>
                                                <Button 
                                                    className='bg-greenCanadog text-white font-semibold hover:bg-mentaCanadog flex w-[300px] lg:w-[400px]' 
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
