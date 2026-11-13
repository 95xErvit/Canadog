"use client";
import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import Explora from "@/public/Explora.png"
import Aplica from "@/public/Aplica.png"
import Entrevista from "@/public/Entrevista.png"
import Adopcion from "@/public/Adopcion.png"

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.18,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.75, ease: 'easeOut' as const },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: 'easeOut' as const,
            delayChildren: 0.25,
            staggerChildren: 0.18,
        },
    },
};

export default function StepsImages() {
    const prefersReducedMotion = useReducedMotion();
    const entranceProps = prefersReducedMotion
        ? {}
        : {
              initial: 'hidden' as const,
              whileInView: 'visible' as const,
              viewport: { once: true, amount: 0.3 },
          };

    return(
        <>  
            {/* BANNER FINAL */}
            <div className='relative mn:px-6 mn:py-2 md:p-6'>
                <motion.div {...entranceProps} variants={containerVariants} className='grid max-w-7xl mx-auto'>
                    <motion.h2 variants={itemVariants} className='mn:text-2xl md:text-4xl font-semibold text-brown'>
                        Pasos para {<span className='text-green drop-shadow-[2px_1px_0px_#ADADAD]'>adoptar</span>} a tu nuevo compañero
                    </motion.h2>
                </motion.div>
            </div>

            <motion.div {...entranceProps} variants={cardVariants} className="bg-brownLight mn:max-w-[350px] md:max-w-[700px] lg:max-w-4xl xl:max-w-7xl mx-auto mt-10 mb-20 lg:gap-4 py-8 md:py-4 align-items-center gap-6 grid mn:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center rounded-lg shadow-lg">
                {/* Card 1 */}
                <motion.div variants={itemVariants} className="flex flex-col items-center gap-2">
                    <Image
                        className="mn:w-32 mn:h-40 md:w-36 md:h-48 lg:w-40 lg:h-52 xl:w-44 xl:h-60"
                        src={Explora.src}
                        width={100}
                        height={100}
                        alt="Explora"
                    />
                </motion.div>
                
                {/* Card 2 */}
                <motion.div variants={itemVariants} className="flex flex-col items-center gap-2">
                    <Image
                        className="mn:w-32 mn:h-40 md:w-36 md:h-48 lg:w-40 lg:h-52 xl:w-44 xl:h-60"
                        src={Aplica.src}
                        width={100}
                        height={100}
                        alt="Aplica"
                    />
                </motion.div>
                
                {/* Card 3 */}
                <motion.div variants={itemVariants} className="flex flex-col items-center gap-2">
                    <Image
                        className="mn:w-32 mn:h-40 md:w-36 md:h-48 lg:w-40 lg:h-52 xl:w-44 xl:h-60"
                        src={Entrevista.src}
                        width={100}
                        height={100}
                        alt="Entrevista"
                    />
                </motion.div>
                {/* Card 4 */}
                <motion.div variants={itemVariants} className="flex flex-col items-center gap-2">
                    <Image
                        className="mn:w-32 mn:h-40 md:w-36 md:h-48 lg:w-40 lg:h-52 xl:w-44 xl:h-60"
                        src={Adopcion.src}
                        width={100}
                        height={100}
                        alt="Adopción"
                    />
                </motion.div>
            </motion.div>
        </>
    )
}