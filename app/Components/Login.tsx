'use client'
import React, { useRef } from 'react'
import { Toast } from 'primereact/toast'
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { EyeFilledIcon } from "../../public/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../public/EyeSlashFilledIcon";
import { UserIcon } from "../../public/UserIcon";

export default function Login() {
    const toast = useRef(null)

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className='bg-gray-medium relative mn:my-8 mn:py-8 md:my-0 md:py-0'>	
            <div className="flex justify-center m-6 py-6">
                <Toast ref={toast}/>
                <div className="m-4 py-2 md:py-6 border-2 bg-white border-gray drop-shadow-lg rounded-3xl w-80">
                    <div className="flex justify-center lg:flex md:flex md:items-center">
                        <div className="m-4 p-4">
                            <div className="flex flex-col items-center flex-wrap"  >      
                                <h1 className="mb-2 text-2xl font-semibold text-blackGora">Inicio de sesión</h1>
                            </div> 
                            <div className="relative">
                                <div className="mt-2 mb-2 justify-center">
                                    <div className="flex w-full">
                                        <Input
                                        type="email"
                                        label="Email"
                                        labelPlacement={'outside'}
                                        description={'Ingrese su correo'}
                                        required
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
                                            required
                                        />
                                    </div>  
                                </div> 
                            </div>
                            <div className='flex justify-center mt-6'>
                            <Button className='bg-greenGora text-white font-semibold hover:bg-OrangeLightGora hover:text-greenGora ' radius='md' variant="shadow" startContent={<UserIcon/>}>
                                Ingresar
                            </Button>  			
                            </div>
                            <p className="mt-4 text-center text-sm text-gray-dark">
                                Olvido su contraseña?{' '}
                                <a href="#" className="font-semibold leading-6 text-red hover:text-orangeGora">
                                Recuperar
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
