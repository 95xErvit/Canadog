'use client'
import React, { useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Toast } from 'primereact/toast'
import { Button } from "@nextui-org/button";
import { signIn } from 'next-auth/react';
import { Input } from "@nextui-org/input";
import { EyeFilledIcon } from "../../public/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../public/EyeSlashFilledIcon";
import { UserIcon } from "../../public/UserIcon";
import Image from 'next/image';
import Canadog from "@/public/LogoCanadog.jpg"
import Feat from "@/public/featuring.png"
import Innminds from "@/public/Innminds.png"
import Flyer from "@/public/CuranElAlma.jpg"
import  axios from 'axios';

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

        setIsLoading(true)
        const { error, status, ok, url } : any = await signIn('credentials', { redirect: false, Password: pass, User: user, TypeId: "32b3a8f6-1977-4964-b2f0-d98c768764e2" })
        console.log(error, status, ok, url)
        if(error !== null && status !== 200)
        {
          toast.current?.show({ severity: 'warn', summary: '¡Atención!', detail: "Credenciales incorrectas", life: 3000 });
          setIsLoading(false)
        }
        else
        {
            router.push('/UserCanaDog/CMS')
        }

        /*try
        {
            await signIn({username:user, password: pass, options:{
                clientMetadata:{
                    secretHash:"qlv2g2ouhe9jdqh8s74nosm507uqqacsisel1utpu3vld1ockuv"
                }
            } })
        }
        catch(e){
            console.log(e)
        }
        toast.current?.show({severity:'info', summary: 'Bienvenido', detail:'Inicio de sesión exitoso', life: 7000});
        router.push('/UserCanaDog/CMS')
       
        /*else
        {
            toast.current?.show({severity:'error', summary: 'Fallo en el inicio de sesión', detail:'Tienes un error en el usuario o contraseña', life: 7000});
            setIsLoading(false)
        }*/
        
    }

    return (
        <section className="Login">
            <Toast ref={toast}/>
            <div className="grid grid-cols-1 xl:grid-cols-2 min-h-screen">
                <div className="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
                    <div className="absolute inset-0">
                        <Image 
                            className="w-full h-full object-cover" 
                            src={Flyer} 
                            alt="Login-Canadog"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/40"/>

                    <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                        <div className="flex justify-center items-center gap-4 m-4 mt-6">
                            <Image 
                                className="mn:w-8 md:w-14 h-full rounded-full" 
                                src={Canadog} 
                                alt="Canadog"
                            />
                            <Image 
                                className="mn:w-4 md:w-8 h-full" 
                                src={Feat} 
                                alt="featuring"
                            />
                            <Image 
                                className="mn:w-24 md:w-28 h-full" 
                                src={Innminds} 
                                alt="Innminds"
                            />
                        </div>
                    </div>
                    
                    <div className="absolute inset-0 flex flex-col items-center p-28 mn:mt-20 lg:mt-6">
                        
                    </div>
                </div>

                <div className="flex items-center justify-center px-4 py-10 bg-white md:p-8 lg:px-8 lg:py-0 xl:py-24 ">
                    <div className="md:grid md:grid-cols-2 xl:grid-cols-none mn:max-w-[330px] md:max-w-full xl:max-w-md xl:mx-auto text-blackGora">
                        <div className='flex flex-col justify-center gap-4'>
                            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                                Bienvenido
                            </h2>
                            <h3 className="text-xl md:text-2xl font-bold text-blackCanadog">
                                Gestión contenido Web <span className="text-greenCanadog">Canadog</span>
                            </h3>
                            <p className="mt-4 text-base text-gray-600">
                                Ingresa tus datos de administrador para iniciar sesión, En caso de no tenerlos o haberlos olvidado contactate con 
                                <a href="#" title="" className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline ml-2">
                                    InnMinds
                                </a>
                            </p>
                            {/* <span className="filter drop-shadow-[0_0_0.1rem_#DF6536] inline-block">
                                <Image alt="" src="" height="60" width="60"/>
                            </span>  */}
                        </div>

                        <form action="#" method="POST" className="mt-4">
                            <div className="flex justify-center">
                                <div className="w-full">
                                    <div className="flex flex-col justify-center items-center">
                                        <div className="relative">
                                            <div className="mt-2 mb-2 justify-center">
                                                <div className="flex mn:w-[320px] md:w-[300px] lg:w-[400px]">
                                                    <Input
                                                        //type="email"
                                                        label="Usuario"
                                                        size="lg" 
                                                        labelPlacement={'outside'}
                                                        description={'Ingrese su usuario'}
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
                                                <div className="flex mn:w-[320px] md:w-[300px] lg:w-[400px]">
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
                                                className='bg-greenCanadog text-white font-semibold hover:bg-mentaCanadog flex mn:w-[320px] md:w-[300px] lg:w-[400px]' 
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
                        </form>
                    </div>
                </div>
            </div>
        </section> 
    )
}
