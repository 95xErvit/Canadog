"use client"
import React from 'react';
import { Link, Image } from "@nextui-org/react"
import { useRouter } from 'next/navigation'
import { FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { motion, useReducedMotion } from 'framer-motion';

// configuración de la animación
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.18,
        },
    },
};

// links animación
const linksVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

// items animación
const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.75, ease: 'easeOut' as const },
    },
};

export default function Footer(){
    const router = useRouter()                              // Hook para navegar entre rutas
    const prefersReducedMotion = useReducedMotion();        // Hook para manejar la animación

    // Configuración de la animación
    const entranceProps = prefersReducedMotion ? {} : {     
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, amount: 0.3 },
    };

    return(
        <div id="site-footer">
            <motion.div
                {...entranceProps}
                variants={containerVariants}
                className="flex mn:flex-col md:flex-row justify-evenly bg-brown py-4 md:py-8"
            >
                <motion.div
                    variants={itemVariants}
                    className=" flex flex-col text-center items-center border-none bg-brown mn:p-0 md:p-2 xl:p-4 md:hidden lg:block"
                >
                    <Link href="/" className="flex justify-center items-center pt-4">
                        <Image
                            className='mn:w-28 md:w-32 xl:w-40'
                            src="/LogoFooter.png"
                            width="100"
                            height="100"
                            alt="Logo ComeDog"
                        />
                    </Link>
                </motion.div>

                <motion.div
                    variants={linksVariants}
                    className="flex flex-col justify-center md:justify-evenly lg:justify-center items-center p-2"
                >
                    <motion.div variants={itemVariants}>
                        <Link
                            className="text-white hover:text-[#C8E395] mn:text-lg lg:text-xl py-2"
                            href="#adopciones"
                        >
                            Adopciones
                        </Link>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Link
                            className="text-white hover:text-[#C8E395] mn:text-lg lg:text-xl py-2 cursor-pointer"
                            onClick={() => router.push('/Store')}
                        >
                            Tienda Canadog
                        </Link>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Link
                            className="text-white hover:text-[#C8E395] mn:text-lg lg:text-xl py-2 cursor-pointer"
                            onClick={() => router.push('/Home/AboutUs')}
                        >
                            ¿Quiénes somos?
                        </Link>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Link
                            className="text-white hover:text-[#C8E395] mn:text-lg lg:text-xl py-2 cursor-pointer"
                            onClick={() => router.push('/Home/Donations')}
                        >
                            Ayúdanos
                        </Link>
                    </motion.div>
                </motion.div>


                <motion.div
                    variants={itemVariants}
                    className=" flex flex-col text-center items-center border-none bg-brown mn:p-0 md:p-2 xl:p-4 mn:hidden md:block lg:hidden"
                >
                    <Link
                        href="/"
                        className="flex justify-center items-center pt-4"
                    >
                        <Image
                            className='w-24'
                            src="/LogoFooter.png"
                            width="100"
                            height="100"
                            alt="Logo ComeDog"
                        />
                    </Link>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="flex mn:flex-col md:flex-cols justify-center text-center gap-4 mn:text-lg lg:text-xl p-2"
                >
                    <div className='space-y-2'>
                        <p className="text-white font-semibold items-center lg:text-start">
                            Contáctanos:
                        </p>

                        <Link className='flex justify-center items-center space-x-2' href='https://wa.me/+573104684683' target='_blank'>
                            <FaWhatsapp className="text-white hover:text-white/80 cursor-pointer" size={30} />

                            <p className="text-white font-normal mn:text-base lg:text-lg">
                                +57 3104684683
                            </p>
                        </Link>

                    </div>

                    <div className='space-y-2'>
                        <p className="text-white font-semibold items-center lg:text-start">
                            Siguenos:
                        </p>

                        <div className="flex justify-center items-center space-x-4">
                            <Link href="https://www.facebook.com/ProyectoComedogYumbo/" target='_blank'><FaFacebook className="text-white hover:text-white/80 cursor-pointer" size={30} /></Link>

                            <Link href="https://www.instagram.com/proyectocomedogyumbo" target='_blank'><BsInstagram className="text-white hover:text-white/80 cursor-pointer" size={30} /></Link>

                            <Link href="https://www.tiktok.com/@proyecto.comedog" target='_blank'><FaTiktok className="text-white hover:text-white/80 cursor-pointer" size={30}/></Link>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                {...entranceProps}
                variants={containerVariants}
                className="flex mn:flex-col md:flex-row justify-evenly bg-brown text-center pt-4 pb-4"
            >
                <motion.div variants={itemVariants} className="flex mn:flex-col md:flex-row justify-center items-center">
                    <p className="mn:mt-2 md:mt-0 leading-4 text-white text-sm">
                        © {new Date().getFullYear()} ComeDog Yumbo · Todos los derechos reservados ·
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-center items-center space-x-2">
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
                </motion.div>
            </motion.div>
        </div>
    )
}
