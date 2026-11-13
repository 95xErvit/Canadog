"use client";
import React from 'react';
import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import Image from 'next/image';
import { Divider } from "@nextui-org/react";
import { motion, useReducedMotion } from 'framer-motion';

const heroContentVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.18,
        },
    },
};

const heroItemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.75, ease: 'easeOut' as const },
    },
};

export default function Hero() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Hook para controlar el estado del modal
    const prefersReducedMotion = useReducedMotion();
    const entranceProps = prefersReducedMotion
        ? {}
        : {
              initial: 'hidden' as const,
              whileInView: 'visible' as const,
              viewport: { once: true, amount: 0.3 },
          };

    return (
       <>
            <section>
                <div className='relative p-6 md:py-12'>
                    <div className='grid xl:max-w-7xl mx-auto lg:grid-cols-2 text-black'>
                        <motion.div
                            {...entranceProps}
                            variants={heroContentVariants}
                            className='mn:order-last lg:order-first'
                        >
                            <motion.h2
                                variants={heroItemVariants}
                                className='mn:ml-2 md:ml-0 mn:text-3xl xl:text-5xl mn:text-center xl:text-start font-semibold text-brown'
                            >
                                Bienvenido a {<span className='text-green drop-shadow-[2px_1px_0px_#ADADAD]'>ComeDOG</span>}
                            </motion.h2>

                            <motion.p
                                variants={heroItemVariants}
                                className='mn:text-lg xl:text-xl mn:ml-4 md:ml-0 mn:max-w-full lg:max-w-lg mn:mt-4 md:mt-10'
                            >
                                a través de nosotros vas a poder conocer a tu nuevo compañero de vida. En nuestra plataforma, 
                                conectamos a mascotas que necesitan un hogar para toda la vida con familias amorosas.
                            </motion.p>

                            <motion.p
                                variants={heroItemVariants}
                                className='mn:text-lg xl:text-xl mn:ml-4 md:ml-0 mn:max-w-full lg:max-w-lg mt-4'
                            >
                                ¡Descubre cómo puedes cambiar tu vida y la de un animal para siempre adoptando a tu nuevo mejor amigo!
                            </motion.p>

                            <motion.div
                                variants={heroItemVariants}
                                className="flex mn:my-8 mn:justify-center lg:justify-start"
                            >
                                <Button  className='bg-brown hover:bg-brownLight text-white mn:text-base lg:text-xl font-semibold w-40 shadow-md shadow-black/40' radius="full" size="lg" onPress={onOpen}>
                                    Quiero donar
                                </Button>
                                
                                <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='3xl' backdrop='blur' placement='center'>
                                    <ModalContent className="py-4">
                                        <>
                                            <ModalHeader className="flex gap-2 justify-center text-green drop-shadow-[2px_1px_0px_#ADADAD] mn:text-sm md:text-3xl">
                                                ¡Bienvenido {<p className='text-black font-light'> a tu próxima gran aventura</p>}!
                                            </ModalHeader>

                                            <ModalBody className='max-w-2xl mx-auto'>
                                                <p className='text-blackGora px-4 mn:text-md xl:text-base'> 
                                                    Nos emociona que estés considerando darle un hogar a uno de nuestros adorables peluditos! Por favor, completa este sencillo formulario para comenzar el proceso de adopción.
                                                </p>

                                                <h3 className='text-center mn:py-2 xl:py-4 text-blackGora mn:text-xs xl:text-xl font-semibold'>
                                                    Queremos conocerte un poco mejor.
                                                </h3>

                                                <div className="flex w-full flex-col gap-4">
                                                    <div className="flex mb-6 md:mb-0 gap-4 h-[48px]">
                                                        <Input type="name" variant={'faded'} label="Nombres y Apellidos"/>
                                                    </div>

                                                    <div className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 h-[48px]">
                                                        <Input type="email" variant={'faded'} label="Correo electrónico"/>

                                                        <Input type="Phone" variant={'faded'} label="Celular" />
                                                    </div>
                                                </div> 
                                            </ModalBody>

                                            <ModalFooter className='flex justify-center'>
                                                <div className='flex flex-col w-full'>
                                                    <div className='flex justify-evenly'>
                                                        <Button className='bg-brown hover:bg-brownLight text-white font-semibold my-4 text-base' radius="full" size="lg">
                                                            Enviar
                                                        </Button>                          
                                                    </div>

                                                    <Divider className="max-w-2xl mx-auto my-4"/>

                                                    <div className='flex flex-col flex-wrap justify-center items-center gap-2 text-greenCanadog mn:text-xs xl:text-sm font-semibold my-4 px-4'> 
                                                        <p className='text-center'>
                                                            ¡Gracias por tomarte el tiempo para completar este formulario! 
                                                            <br/> Nos emociona poder ayudarte a encontrar a tu nuevo mejor amigo peludo.
                                                        </p>
                                                        <p>
                                                            ¡Pronto nos pondremos en contacto contigo para continuar con el proceso de adopción!
                                                        </p>
                                                    </div> 
                                                </div>
                                            </ModalFooter>
                                        </>
                                    </ModalContent>
                                </Modal>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            {...entranceProps}
                            variants={heroItemVariants}
                            className='mn:order-first mn:mt-6 lg:order-last'
                        >
                            <div className='flex justify-center'>
                                <Image src='/Banner.png' alt='card' width={550} height={550} className='h-auto mn:w-80 lg:w-[600px] xl:w-full'/>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section> 
       </>
    )
}