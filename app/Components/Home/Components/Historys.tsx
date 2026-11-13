"use client";
import React, { useEffect, useState } from 'react';
import { Card } from "@nextui-org/react";
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

const historyTextVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: 'easeOut' as const },
    },
};

const historyCardVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

export default function Historys({ CardsHistory }: any) {
    const prefersReducedMotion = useReducedMotion();
    const HistoryCards = CardsHistory ?? [];                // Asegurarse de que HistoryCards sea un array, incluso si CardsHistory es undefined
    const [currentIndex, setCurrentIndex] = useState(0);    // Estado para controlar el índice actual de las tarjetas visibles
    const [cardsToShow, setCardsToShow] = useState(1);      // Estado para controlar cuántas tarjetas se muestran según el tamaño de la pantalla

    useEffect(() => {
        const updateCardsToShow = () => {
            setCardsToShow(window.innerWidth >= 1280 ? 3 : window.innerWidth >= 768 ? 2 : 1);
        };

        updateCardsToShow();
        window.addEventListener('resize', updateCardsToShow);
        return () => window.removeEventListener('resize', updateCardsToShow);
    }, []);

    useEffect(() => {
        setCurrentIndex(0);
    }, [cardsToShow]);
    
    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + cardsToShow < HistoryCards.length ? prevIndex + cardsToShow : prevIndex
        );
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => Math.max(0, prevIndex - cardsToShow));
    };

    const hasPrevious = currentIndex > 0;
    const hasNext = currentIndex + cardsToShow < HistoryCards.length;

    return (
        <>
            {/* CARDS HISTORIAS */}
            <div className='relative mn:px-6 mn:py-2 md:p-6 text-black'>
                <div className='grid max-w-7xl mx-auto'>
                    <motion.h2
                        initial={prefersReducedMotion ? false : 'hidden'}
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={prefersReducedMotion ? undefined : historyTextVariants}
                        className='mn:text-2xl md:text-4xl text-brown font-semibold'
                    >
                        Historias {<span className='text-green drop-shadow-[2px_1px_0px_#ADADAD]'>Emotivas</span>}
                    </motion.h2>
                </div>

                <div className='max-w-7xl mx-auto'>
                    <motion.p
                        initial={prefersReducedMotion ? false : 'hidden'}
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={prefersReducedMotion ? undefined : historyTextVariants}
                        className='mt-4 lg:text-xl'
                    >
                        Nuestro objetivo es hacer que muchos animales conozcan el  
                        {<span className='text-green drop-shadow-[2px_1px_0px_#ADADAD] font-semibold'> amor</span>}, 
                        rescatándolos de las calles, rehabilitándolos y encontrando una familia adoptante para ser su compañía por el resto de sus vidas.
                    </motion.p>
                </div>
            </div>

            <div className="relative mx-auto max-w-7xl mn:px-6 mn:py-2 md:p-6 xl:p-0">
                <div className="flex items-center gap-2 py-4 md:gap-4 md:py-8">
                    <button
                        onClick={handlePrevious}
                        disabled={!hasPrevious}
                        aria-label="Historias anteriores"
                        className={`shrink-0 bg-green p-3 py-2 rounded-xl text-white shadow transition ${!hasPrevious ? 'cursor-not-allowed opacity-50' : 'hover:bg-mentaCanadog'}`}
                    >
                        <i className="pi pi-angle-left" style={{ fontSize: '1rem' }}/>
                    </button>

                    <div className="flex min-w-0 flex-1 justify-center gap-4 overflow-hidden md:gap-6">
                        {HistoryCards.map((card: any, index: any) => {
                            const isVisible =
                            index >= currentIndex &&
                            index < currentIndex + cardsToShow;

                            return (
                                <motion.div
                                    key={`${card.id}-${isVisible ? currentIndex : 'hidden'}`}
                                    initial={prefersReducedMotion ? false : 'hidden'}
                                    animate={prefersReducedMotion ? (isVisible ? 'visible' : 'hidden') : undefined}
                                    whileInView={prefersReducedMotion || !isVisible ? undefined : 'visible'}
                                    viewport={{ once: true, amount: 0.2 }}
                                    variants={prefersReducedMotion ? undefined : historyCardVariants}
                                    transition={{
                                        duration: prefersReducedMotion ? 0 : 0.6,
                                        delay: prefersReducedMotion || !isVisible ? 0 : 0.18 + (index - currentIndex) * 0.12,
                                    }}
                                    className={`aspect-[5/3] min-w-0 overflow-hidden rounded-2xl border border-brown bg-white shadow-none transition-shadow hover:shadow-md
                                        ${isVisible ? "flex flex-row" : "hidden"}
                                        ${cardsToShow === 1 ? "w-full" : cardsToShow === 2 ? "w-[calc(50%-0.5rem)]" : "w-[calc(33.333%-1rem)]"}`
                                    }
                                >
                                    <Card className="flex h-full w-full flex-row border-none bg-transparent shadow-none">
                                        <div className="flex h-full min-w-0 flex-1 flex-col justify-center gap-2 overflow-hidden p-3 sm:p-4">
                                            <h3 className="font-bold text-brown text-lg leading-tight sm:text-xl">
                                                {card.ANIMALS_NAME}
                                                <span className="block text-sm font-semibold text-black sm:text-base">
                                                    y su familia
                                                </span>
                                            </h3>

                                            <p className="text-xs leading-tight text-black sm:text-sm">
                                                Agregar descripción con un tamaño y scroll
                                            </p>

                                            {/* {card.ANIMALS_DESCRIPTION && (
                                            <p className="line-clamp-7 text-xs leading-tight text-black sm:text-sm">
                                                {card.ANIMALS_DESCRIPTION} fcc
                                            </p>
                                        )} */}
                                        </div>

                                        <div className="relative h-full w-1/2 shrink-0 self-stretch">
                                            <Image
                                                src={card.ANIMALS_IMAGE_1}
                                                alt={`${card.ANIMALS_NAME} y su familia`}
                                                className="object-cover"
                                                fill
                                                sizes="(min-width: 1280px) 16vw, (min-width: 768px) 24vw, 50vw"
                                            />
                                        </div>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={!hasNext}
                        aria-label="Siguientes historias"
                        className={`shrink-0 bg-green p-3 py-2 rounded-xl text-white shadow transition ${!hasNext ? 'cursor-not-allowed opacity-40' : 'hover:bg-green'}`}
                    >
                        <i className="pi pi-angle-right" style={{ fontSize: '1rem' }}/>
                    </button>
                </div>
            </div>
        </>
    );
}