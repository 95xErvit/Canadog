'use client';

import { Link } from "@nextui-org/react";
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import MakroPet from "@/public/Makropet.jpg"
import FormaDogs from "@/public/Formadogs.jpg"
import AnimalClinic from "@/public/AnimalClinic.jpeg"
import GoodBoy from "@/public/goodboy.jpg"
import SenIntimo from "@/public/SEN_ÍNTIMO_LOGO.jpg"
import EddieRoffing from"@/public/EDDIE_ROOFING_LOGO.jpeg"
import LogoMarilsa from "@/public/Logo-Marilsa.jpg"
import LogoVeñata from "@/public/Logo-Veñata.jpg"
import LogoFamigo from "@/public/Logo_Famigo.png"

// Animación de entrada para el título y subtítulo
const headingVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: 'easeOut' as const },
    },
};

// Animación de entrada para las tarjetas
const alliesTrackVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08 },
    },
};

// Animación de entrada para cada tarjeta individual
const allyCardVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6, ease: 'easeOut' as const },
    },
};

export default function Historys() {
    const prefersReducedMotion = useReducedMotion();

    // Json datos de aliados 
    const allies = [
        { 
            name: "Makro Pet", 
            username: "@makropetveterinaria", 
            url: "https://www.instagram.com/makropetveterinaria/", 
            image: MakroPet.src 
        },
        { 
            name: "Formadogs", 
            username: "@formadogs.escuelacanina", 
            url: "https://www.instagram.com/formadogs.escuelacanina/", 
            image: FormaDogs.src 
        },
        { 
            name: "Animal Clinic", 
            username: "@animalcliniccolina", 
            url: "https://www.instagram.com/animalcliniccolina/", 
            image: AnimalClinic.src 
        },
        { 
            name: "goodboy", 
            username: "@goodboy_petstudio", 
            url: "https://www.instagram.com/goodboy_petstudio/", 
            image: GoodBoy.src 
        },
        { 
            name: "Sen Intimo", 
            username: "@senintimo", 
            url: "https://www.instagram.com/senintimo/", 
            image: SenIntimo.src 
        },
        { 
            name: "Eddie Roofing", 
            username: "@eddieroofingsolutionllc", 
            url: "https://www.instagram.com/eddieroofingsolutionllc/", 
            image: EddieRoffing.src 
        },
        { 
            name: "Marilsa", 
            username: "@marilsaoficial", 
            url: "https://www.instagram.com/marilsaoficial/", 
            image: LogoMarilsa.src 
        },
        { 
            name: "Veñata", 
            username: "@venatastudio", 
            url: "https://www.instagram.com/venatastudio/", 
            image: LogoVeñata.src 
        },
        { 
            name: "Famigo", 
            username: "@famigo.official", 
            url: "https://www.instagram.com/famigo.official/", 
            image: LogoFamigo.src 
        }
    ];
    return(
        <>
            {/*AGRADECIMIENTOS */}
            <section className="py-8 mb-10 overflow-hidden">
                <motion.div
                    initial={prefersReducedMotion ? false : 'hidden'}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={prefersReducedMotion ? undefined : headingVariants}
                    className="text-center py-8 mx-auto max-w-7xl"
                >
                    <h2 className="mb-6 text-3xl font-bold text-brown mn:text-2xl sm:text-4xl xl:text-5xl">
                        Gracias aliados
                    </h2>
                    <p className="mt-4 text-xl font-normal text-black mn:text-base sm:text-lg xl:text-xl">
                        ¡Su ayuda es{" "}
                        <span className="text-greenCanadog font-semibold">TODO</span> para
                        nosotros y para ellos!
                    </p>
                </motion.div>

                <div
                    className="overflow-hidden relative w-full my-10"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                    }}
                >
                    <motion.div
                        initial={prefersReducedMotion ? false : 'hidden'}
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={prefersReducedMotion ? undefined : alliesTrackVariants}
                        className="flex w-max animate-marquee motion-reduce:animate-none hover:[animation-play-state:paused]"
                    >
                        {[...allies, ...allies].map((ally, index) => (
                            <motion.div
                                key={`${ally.name}-${index}`}
                                variants={prefersReducedMotion ? undefined : allyCardVariants}
                            >
                                <Link href={ally.url} target="_blank" className="flex justify-center items-center">
                                    <div className="bg-white text-black py-2 flex flex-col items-center gap-2 w-[230px] md:w-[250px] border-2 border-[#a0cf47] hover:border-green rounded-lg mx-2">
                                        <Image className="w-28 h-28 rounded-full" src={ally.image} width={100} height={100} alt={ally.name} />
                                        <div className="flex flex-col justify-center items-center">
                                            <p className="text-xl md:text-2xl font-bold">{ally.name}</p>
                                            <p className="text-sm md:text-base font-semibold">{ally.username}</p>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </>
    )
}