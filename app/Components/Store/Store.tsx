"use client";
import React, { useEffect, useState } from 'react';
import { Button, Card,CardHeader, CardFooter,Image, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, usePagination, PaginationItemType, Checkbox, Textarea, Link } from "@nextui-org/react";
import {ScrollShadow} from "@nextui-org/react";
import {Divider} from "@nextui-org/divider";
import {Pagination} from "@nextui-org/react";
import MotionTransition from '../MotionTransition/MotionTransition';
import MakroPet from "@/public/Makropet.jpg"
import FormaDogs from "@/public/Formadogs.jpg"
import AnimalClinic from "@/public/AnimalClinic.jpeg"
import DaniColibri from "@/public/DaniColibri.jpeg"
import Explora from "@/public/Explora.png"
import Aplica from "@/public/Aplica.png"
import Entrevista from "@/public/Entrevista.png"
import Adopcion from "@/public/Adopcion.png"
import GoodBoy from "@/public/goodboy.jpg"
import Canadog from "@/public/canadog.jpg"
import 'primeicons/primeicons.css';

//{Dogs, Cats}: any
export default function Store({ CardsProducts }: any) {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    //const [expand, setExpand] = useState(false);
    const [isDog, setIsDog] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedCard, setExpandedCard] = useState<number | null>(null);

    const toggleExpand = (id: number) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    const itemsAdoptions = 9; // Cantidad de tarjetas para mostrar por página
    const cards = CardsProducts;
    const totalPagesAdoptions = Math.ceil(cards.length / itemsAdoptions);

    const handlePageChange = (page: number) => {
        setCurrentPage(page); // Actualiza la página actual cuando cambia
    };
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(4); 

    useEffect(() => {
        const updateCardsToShow = () => {
          if (window.innerWidth < 640) {
            setCardsToShow(1); 
          } else if (window.innerWidth < 1024) {
            setCardsToShow(2); 
          } else {
            setCardsToShow(4); 
          }
        };
    
        updateCardsToShow();
        window.addEventListener("resize", updateCardsToShow);
    
        return () => window.removeEventListener("resize", updateCardsToShow);
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex + cardsToShow < CardsProducts.length ? prevIndex + 1 : prevIndex
        );
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    };

    return(
        <div>
            {/* BANNER */}
            <section>
                <div className="relative">
                    <div className="flex justify-center">
                        <Image
                            src={Canadog.src}
                            alt="card"
                            width={1512}
                            height={550}
                            className="w-full h-full rounded-lg"
                        />
                    </div>

                    <div className="absolute inset-0 flex flex-col justify-start text-center mn:p-4 md:p-8 bg-blackCanadog bg-opacity-40">
                        <h2 className="text-white max-w-full mn:text-base md:text-4xl xl:text-5xl font-semibold">
                            ¡Encuentra a tu compañero perfecto!
                        </h2>
                    </div>
                </div>

                <div className='flex mn:flex-col md:flex-row md:items-center md:justify-center mn:gap-4 md:gap-10 lg:gap-16 xl:gap-20 m-6 md:h-[200px] lg:h-[300px] text-blackCanadog'>
                    <div className='flex  mn:flex-row md:flex-col gap-2 mn:items-center md:items-start md:w-64'>
                        <p className=' mn:text-lg md:text-4xl'>
                            Bienvenido a la tienda de
                        </p>
                        <p className="text-greenCanadog font-bold mn:text-xl md:text-5xl">
                            CANADOG
                        </p>
                    </div>
                    
                    <div className='flex flex-col gap-2 md:w-[400px] lg:w-[580px] xl:w-[680px] lg:text-xl'>
                        <p>
                            Aca podras encontrar nuestros productos, con tu compra podra ayudar a 
                            nuestra hogar de paso, si tienes alguna duda no olvides conectarnos.
                        </p>
                        <p>
                            ¡Descubre cómo puedes hacer una diferencia en la vida de un animal y en la tuya propia adoptando hoy!
                        </p>
                    </div>
                </div>
            </section>

            <Divider className="my-4"/>

            {/* CARDS PRODUCTOS */}
            <section className='adopciones' id='adopciones'>
                <div className='md:px-4 md:mx-4'>
                    <div className='relative px-6 md:mx-6 mn:py-2 mn:mt-2 md:py-6 md:mt-4'>
                        <div className='grid max-w-7xl mx-auto md:gris-cols-2'>
                            <h2 className='mn:text-2xl md:text-4xl font-semibold'>
                                Encuentra nuestros {<span className='text-greenCanadog'>productos</span>}
                            </h2>
                        </div>
                    </div>
                </div>
                
                <div className='px-4 py-4'>
                    <div className='flex flex-wrap max-w-7xl mx-auto'>
                        <Card isBlurred className="border-none w-full" shadow="md">
                            <ScrollShadow className="mn:w-full mn:h-[450px] md:w-full md:h-[500px] mt-6 mb-6" size={0}>
                                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-4'>
                                    {CardsProducts.map((card: any) => (
                                    <div
                                        key={card.id}
                                        className={`relative m-4 transition-all duration-300 row-span-1 h-[200px]`}
                                    >
                                        <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
                                            <div className={`flex items-center`}>
                                            <CardHeader className="absolute z-10 top-1 flex-col items-start">
                                                <h4 className="text-black font-medium text-2xl">{card.title}</h4>
                                            </CardHeader>
                                            <Image
                                                alt="Album cover"
                                                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                                                src={card.image}
                                            />
                                            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                                                <div>
                                                <p className="text-black text-tiny">Unidades: {card.unity}</p>
                                                <p className="text-black text-tiny">Precios: {card.cost}</p>
                                                </div>
                                                <Button onClick={()=> window.open('https://api.whatsapp.com/send?phone=+573104684683&text=Hola%20quiero%20saber%20mas%20sobre%20este%20producto%20' + card.title, '_blank')} className="text-tiny" color="primary" radius="full" size="sm">
                                                 Comprar
                                                </Button>
                                            </CardFooter>
                                            </div>
                                        </Card>
                                    </div>
                                    ))}
                                </div>
                            </ScrollShadow>
        
                            {/* Paginador */}
                            <div className="flex justify-center mb-4 text-white">
                                <Pagination
                                    showControls
                                    color={"success"}
                                    total={totalPagesAdoptions} // Total de páginas basado en el número de cartas
                                    page={currentPage} // Página actual
                                    onChange={handlePageChange} // Función para manejar el cambio de página
                                    showShadow
                                />
                            </div>
                        </Card>
                    </div>
                </div>
                    
            </section>

            <Divider className="my-4"/>

            {/* PUBLICIDAD */}
            <div className='flex justify-center mt-6 mb-6 py-6'>
                <div className='relative mn:px-2 mn:py-2 md:px-6 md:py-6'>
                    <Image
                        alt="Album cover"
                        className="object-cover"
                        height={250}
                        src="/BannerAdds.png"
                        width={1280}
                    />
                </div>
            </div>
        </div>
    )
}