"use client";
import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import QrBancolombia from "@/public/QRBancolombiaCanadog.jpeg";
import { buildPawPattern } from "@/app/utils/pawPattern";

// Patrón de huellas decorativo, verde y muy sutil sobre el fondo café
const pawPattern = buildPawPattern('%23C8E395', 0.07);

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

export default function DonationSection() {
    const prefersReducedMotion = useReducedMotion();
    const entranceProps = prefersReducedMotion
        ? {}
        : {
              initial: 'hidden' as const,
              whileInView: 'visible' as const,
              viewport: { once: true, amount: 0.3 },
          };

    const downloadQr = () => {
        const link = document.createElement('a');
        link.href = QrBancolombia.src;
        link.download = "QRBancolombiaCanadog.jpeg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section
            id="ayudanos"
            className="relative overflow-hidden bg-brown scroll-mt-24 mt-10 py-12 md:py-20"
            style={{ backgroundImage: pawPattern }}
        >
            {/* Brillo suave de fondo */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(circle at 75% 50%, rgba(200,227,149,0.18), transparent 55%)' }}
            />

            <motion.div
                {...entranceProps}
                variants={containerVariants}
                className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16"
            >
                {/* Mensaje */}
                <div className="text-center lg:text-start">
                    <motion.h2
                        variants={itemVariants}
                        className="mn:text-3xl md:text-4xl xl:text-5xl font-semibold text-white"
                    >
                        Sé padrino o madrina de{' '}
                        <span className="text-green drop-shadow-[2px_1px_0px_rgba(0,0,0,0.35)]">rescate</span>
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className="mt-5 mn:text-lg xl:text-xl text-white/90 lg:max-w-lg"
                    >
                        Con tu aporte ellos tendrán lo necesario para empezar una vida feliz: comida, vacunas, desparasitantes e higiene. Además, estarás aportando a nuestra causa y a que podamos realizar más rescates y ayudas.
                    </motion.p>
                </div>

                {/* Tarjeta con el QR */}
                <motion.div variants={itemVariants} className="relative mx-auto w-full max-w-sm">
                    <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-black/40 text-center">
                        <p className="text-2xl font-semibold text-greenCanadog">
                            <span className="text-mentaCanadog">Dona</span> Bancolombia
                        </p>

                        <div
                            className="group relative mt-5 flex cursor-pointer items-center justify-center"
                            onClick={downloadQr}
                            role="button"
                            aria-label="Descargar código QR de Bancolombia"
                        >
                            <Image
                                className="object-cover mn:w-[230px] mn:h-[230px] md:w-[270px] md:h-[270px] transition-all duration-300 ease-in-out group-hover:opacity-50"
                                src={QrBancolombia.src}
                                alt="Código QR de Bancolombia para donar"
                                width={300}
                                height={300}
                            />
                            <div className="absolute inset-0 rounded-xl bg-black/70 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
                            <i className="pi pi-download absolute z-10 text-4xl text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
                        </div>

                        <p className="mt-5 mn:text-sm xl:text-base text-blackCanadog">
                            ¡Lo que puedas! Todo es de gran ayuda
                        </p>
                        <p className="mt-1 text-xs text-gray">Toca el QR para descargarlo</p>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
