'use client'
import React from "react"
import Image from "next/image"
import Adopta from "../../../public/Adopta.jpg"
import Carta from "../../../public/CartaAna.jpg"
import ComeDog from "../../../public/ComeDog.jpg"
import GrupoComeDog from "../../../public/GrupoComeDog.jpg"
import {LuBone, LuHandHeart, LuHeartPulse, LuShieldCheck, LuUsers, LuShare2, LuHeartHandshake} from "react-icons/lu";
import { motion, useReducedMotion } from "framer-motion";

const revealDuration = 0.75;
const staggerDelay = 0.22;

const revealVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
};

const cardFadeVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: revealDuration, ease: "easeOut" as const },
    },
};

const staggerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: staggerDelay,
        },
    },
};

// Contenido para las tarjetas de las formas de ayudar
const queHacemos = [
  {
    titulo: "Alimentamos la esperanza",
    descripcion:
      "Facilitamos el acceso al alimento para animales vulnerables mediante dispensadores y el apoyo de la comunidad.",
    icono: LuBone,
  },
  {
    titulo: "Movilizamos la solidaridad",
    descripcion:
      "Promovemos donaciones de alimento e insumos necesarios para apoyar nuestras iniciativas.",
    icono: LuHandHeart,
  },
  {
    titulo: "Acompañamos casos",
    descripcion:
      "Compartimos casos de animales que necesitan atención para conectarlos con personas dispuestas a ayudar.",
    icono: LuHeartPulse,
  },
  {
    titulo: "Creamos conciencia",
    descripcion:
      "Fomentamos el cuidado responsable, el respeto y la protección de los animales.",
    icono: LuShieldCheck,
  },
];

const formasDeAyudar = [
  {
    titulo: "Dona alimento",
    descripcion:
      "Aporta alimento seco o húmedo para perros y gatos, según las necesidades de nuestras campañas.",
    icono: LuBone,
  },
  {
    titulo: "Haz una donación económica",
    descripcion:
      "Tu aporte puede contribuir a cubrir las necesidades de las iniciativas activas. Consulta nuestros canales oficiales para conocer cómo donar.",
    icono: LuHandHeart,
  },
  {
    titulo: "Sé voluntario",
    descripcion:
      "Comparte tu tiempo, tus habilidades o tu disposición para apoyar las actividades del proyecto.",
    icono: LuUsers,
  },
  {
    titulo: "Conviértete en aliado",
    descripcion:
      "Si tienes un negocio o emprendimiento, podemos explorar formas de trabajar juntos por el bienestar animal.",
    icono: LuHeartHandshake,
  },
  {
    titulo: "Comparte nuestros casos",
    descripcion:
      "Difundir una publicación también puede conectar a un animal necesitado con alguien que sí puede ayudar.",
    icono: LuShare2,
  },
];

export default function About() {
    const prefersReducedMotion = useReducedMotion();
    const revealProps = prefersReducedMotion
        ? {}
        : {
              initial: "hidden" as const,
              whileInView: "visible" as const,
              viewport: { once: true, amount: 0.2 },
              variants: revealVariants,
              transition: { duration: revealDuration, ease: "easeOut" as const },
          };

    return(
        <div className="flex flex-col md:items-center md:justify-center gap-4 m-10 text-black pt-20">
            {/* SOMOS*/}
            <section
                id="somos"
                aria-labelledby="titulo-quienes-somos"
                className="mx-auto grid w-full grid-cols-1 items-center gap-8 px-4 py-8 sm:px-6 md:gap-12 md:px-10 md:py-16 lg:grid-cols-2 xl:gap-16 xl:px-16 2xl:px-20"
            >
                {/* Texto */}
                <motion.div {...revealProps} className="flex flex-col items-start gap-5">
                    <div>
                        <h2 className="mt-2 text-3xl font-semibold text-brown md:text-4xl">
                            Somos
                        </h2>

                        <p className="text-3xl font-extrabold
                            leading-tight text-green sm:text-4xl md:text-5xl drop-shadow-[2px_1px_0px_#ADADAD]">
                            COMEDOG YUMBO
                        </p>
                    </div>

                    <p className="text-base leading-7 text-black md:text-lg">
                        Somos Proyecto Comedog Yumbo, una iniciativa de compromiso social y amor por los animales que busca contribuir a su
                        bienestar mediante la solidaridad de la comunidad. Creemos que el cuidado animal es una responsabilidad compartida y
                        que, cuando las personas se unen por una causa, pueden generar cambios reales.
                    </p>

                    <p className="text-base leading-7 text-black md:text-lg">
                        Por eso promovemos acciones de apoyo, alimentación y sensibilización, e invitamos a ciudadanos, emprendimientos y
                        organizaciones a ser parte de esta misión. No podemos resolver todas las necesidades solos ... <span><span className="font-bold text-brown">Juntos podemos llegar más lejos.</span></span>
                    </p>
                </motion.div>

                {/* Imagen */}
                <motion.div {...revealProps} className="relative mx-auto w-full max-w-xl">
                    <div className="overflow-hidden rounded-3xl">
                    <Image
                        src={ComeDog.src}
                        alt="Iniciativas de alimentación y cuidado animal de ComeDog Yumbo"
                        width={700}
                        height={600}
                        className="h-64 w-full object-cover sm:h-80 lg:h-[420px]"
                    />
                    </div>
                </motion.div>
            </section>
            
            {/* ¿QUÉ HACEMOS? */}
            <section
                id="que-hacemos"
                aria-labelledby="titulo-que-hacemos"
                className="mx-auto grid w-full grid-cols-1 gap-8 px-4 py-8 sm:px-6 md:gap-12 md:px-10 md:py-16 lg:px-10 xl:gap-16 xl:px-16 2xl:px-20"
            >
                {/* Encabezado de la sección */}
                <motion.div {...revealProps} className="flex flex-col items-start gap-3">
                    <h2 className="text-2xl font-semibold text-brown md:text-4xl">
                        ¿Qué hacemos?
                    </h2>

                    <p className="max-w-3xl text-base leading-7 text-black md:text-lg">
                        Impulsamos iniciativas de alimentación, solidaridad y
                        cuidado responsable para contribuir al bienestar de
                        los animales en situación de vulnerabilidad.
                    </p>
                </motion.div>

                {/* Cards de las iniciativas */}
                <motion.div
                    {...revealProps}
                    variants={prefersReducedMotion ? undefined : staggerVariants}
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {queHacemos.map((item) => {
                        const Icono = item.icono;

                        return (
                            <motion.article
                                key={item.titulo}
                                variants={cardFadeVariants}
                                className="group h-full rounded-2xl border border-green bg-white p-6 shadow-md shadow-green/40 transition-all duration-300
                                    hover:-translate-y-1 hover:border-brown/40 hover:shadow-lg hover:shadow-brownLight/40
                                "
                            >
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-green text-brown/70">
                                    <Icono size={32} strokeWidth={1.7} />
                                </div>

                                <h3 className="text-lg font-semibold leading-snug text-brown">
                                    {item.titulo}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-gray-600">
                                    {item.descripcion}
                                </p>
                            </motion.article>
                        );
                    })}
                </motion.div>
            </section>

            {/* ¿CÓMO PUEDES AYUDAR? */}
             <section
                id="como-ayudar"
                aria-labelledby="titulo-como-ayudar"
                className="mx-auto grid w-full grid-cols-1 items-center gap-8 px-4 py-8 sm:px-6 md:gap-12 md:px-10 md:py-16 lg:grid-cols-2 xl:gap-16 xl:px-16 2xl:px-20"
            >
                {/* Imagen */}
                <motion.div {...revealProps} className="order-2 lg:order-1">
                    <div className="relative h-[300px] overflow-hidden rounded-2xl sm:h-[400px] lg:h-[520px]">
                    <Image
                        src={GrupoComeDog.src}
                        alt="Voluntarios apoyando el bienestar de perros y gatos"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                    />
                    </div>
                </motion.div>

                {/* Contenido */}
                <motion.div {...revealProps} className="order-1 lg:order-2">
                    <h2 id="titulo-como-ayudar" className="mt-2 text-2xl font-bold text-brown sm:text-3xl md:text-4xl">
                        ¿Cómo puedes ayudar?
                    </h2>

                    <p className="mt-4 text-base leading-7 text-gray-600 md:text-lg">
                        No necesitas hacer algo extraordinario para generar un cambio.
                        Puedes comenzar con lo que tienes a tu alcance.
                    </p>

                    {/* Formas de ayudar */}
                    <motion.ul
                        variants={prefersReducedMotion ? undefined : staggerVariants}
                        className="mt-7 space-y-5"
                    >
                        {formasDeAyudar.map((item) => {
                            const Icono = item.icono;

                            return (
                                <motion.li key={item.titulo} variants={revealVariants} className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green/15 text-brown">
                                        <Icono size={23} strokeWidth={1.8} />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-brown">
                                            {item.titulo}
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-gray-600 md:text-base">
                                            {item.descripcion}
                                        </p>
                                    </div>
                                </motion.li>
                            );
                        })}
                    </motion.ul>

                    {/* Botón de acción */}
                    <motion.div
                        variants={prefersReducedMotion ? undefined : revealVariants}
                        transition={prefersReducedMotion ? undefined : {
                            duration: revealDuration,
                            ease: "easeOut",
                            delay: (formasDeAyudar.length - 1) * staggerDelay + revealDuration,
                        }}
                        className="mt-8"
                    >
                        <a
                            href="/Home/Voluntariado"
                            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-green px-7 py-3 font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
                        >
                            QUIERO SUMARME
                            <span aria-hidden="true" className="ml-2">
                            →
                            </span>
                        </a>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    )
}