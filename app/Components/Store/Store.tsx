"use client";
import React, { useEffect, useState } from 'react';
import { Button, Card, Input,CardBody, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, usePagination, PaginationItemType, Checkbox, Textarea, Link } from "@nextui-org/react";
import {ScrollShadow} from "@nextui-org/react";
import {Divider} from "@nextui-org/divider";
import {Pagination} from "@nextui-org/react";
import MotionTransition from '../MotionTransition/MotionTransition';
import Image from 'next/image';
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
                                        className={`relative m-4 transition-all duration-300 
                                            ${expandedCard === card.id ? 'row-span-2' : 'row-span-1'}
                                            ${expandedCard === card.id ? 'h-auto' : 'h-[200px]'}
                                        `}
                                        onClick={() => toggleExpand(card.id)}
                                    >
                                        <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
                                            <div className={`flex items-center ${expandedCard === card.id ? 'flex-col gap-2' : ''}`}>
                                            <Image
                                                alt="Album cover"
                                                className={`object-cover shadow-md transition-all duration-300 
                                                ${expandedCard === card.id ? 'w-full h-[200px]' : 'w-[170px] h-[200px]'}`}
                                                width={170}
                                                height={200} 
                                                src={card.image}
                                            />
                                            <CardBody className={`${expandedCard === card.id ? 'w-full h-auto' : 'w-[170px] h-[200px] justify-around'}`}>
                                                <div className={`${expandedCard === card.id ? 'flex items-center justify-around' : 'flex w-full flex-wrap'}`}>
                                                <p className={`flex font-semibold text-blackCanadog ${expandedCard === card.id ? 'justify-start text-2xl' : 'px-2 justify-end w-full mn:text-xl md:text-2xl'}`}>
                                                    {card.title.substring(0, 3)}
                                                    <span className='text-greenCanadog'>{card.title.substring(3)}</span>
                                                </p>
                                                <p className={`flex font-semibold text-blackCanadog ${expandedCard === card.id ? 'justify-start mn:text-xl xl:text-2xl mn: hidden' : 'px-2 justify-end w-full mn:text-xs xl:text-sm'}`}>
                                                    Precio: <span className='text-greenCanadog'>{card.cost}</span>
                                                </p>
                                                <p className={`flex font-semibold text-blackCanadog ${expandedCard === card.id ? 'justify-start mn:text-xl xl:text-2xl mn: hidden' : 'px-2 justify-end w-full mn:text-xs xl:text-sm'}`}>
                                                    Unidades: <span className='text-greenCanadog'>{card.unity}</span>
                                                </p>
                                                {expandedCard === card.id && (
                                                    <div className='flex flex-wrap'>
                                                        <div className='flex items-center'>
                                                            <Button className='bg-greenCanadog border border-greenCanadog text-white text-sm h-7' radius="full">
                                                                Comprame
                                                            </Button>
                                                        </div>
                                                        <div className='flex items-center'>
                                                            <Button
                                                                onClick={() => toggleExpand(card.id)}
                                                                className='bg-transparent text-greenCanadog text-end mn:min-w-10 xl:min-w-20'
                                                                endContent={<i className="pi pi-arrow-circle-up" style={{ color: '#489E84', fontSize: '1.5rem' }} />}
                                                                radius="full"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                </div>
                                    
                                                <p className={`font-normal text-gray ${expandedCard === card.id ? 'w-full h-auto text-[14px] px-2.5 my-2' : 'w-full h-[58px] text-[12px]'}`}>
                                                {expandedCard === card.id ? card.longDescription : `${card.shortDescription.substring(0, 50)}...`}
                                                </p>
                                    
                                                {expandedCard !== card.id && (
                                                <div className="flex justify-center">
                                                    <Button
                                                    onClick={() => toggleExpand(card.id)}
                                                    className='bg-transparent border border-greenCanadog text-greenCanadog text-xs'
                                                    radius="full"
                                                    endContent={<i className="pi pi-arrow-circle-down" style={{ color: '#489E84' }} />}
                                                    >
                                                    Más sobre el producto
                                                    </Button>
                                                </div>
                                                )}
                                            </CardBody>
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

            <Divider className="my-4"/>

            {/*AGRADECIMIENTOS */}
            <section className="py-8 mb-10">
                <div className="text-center py-8 mn:max-w-xs md:max-w-[700px] lg:max-w-4xl xl:max-w-7xl mx-auto">
                    <h2 className="mb-6 text-3xl font-bold text-blackCanadog mn:text-2xl sm:text-4xl xl:text-5xl">Gracias aliados</h2>
                    <p className="mt-4 text-xl font-normal text-blackCanadog mn:text-base sm:text-lg xl:text-xl">
                        ¡Su ayuda es {<span className='text-greenCanadog font-semibold'>TODO</span>} para nosotros y para ellos!
                    </p>
                </div>

                <div className="mx-10 align-items-center grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 justify-center py-4">
                    {/* Card 1 */}
                    
                    <Link href='https://www.instagram.com/makropetveterinaria/' target="_blank" className='flex justify-center items-center'>
                        <div className="bg-white text-blackCanadog py-2 flex flex-col justify-center items-center gap-2 w-[250px] border-2 border-greenCanadog hover:border-mentaCanadog rounded-lg">
                            <Image
                                className="w-28 h-28 rounded-full"
                                src={MakroPet.src}
                                width={100}
                                height={100}
                                alt="Makro Pet"
                            />
                            <div className='flex flex-col justify-center items-center'>
                                <p className="lg:text-2xl font-bold">Makro Pet</p>
                                <p className="lg:text-base font-semibold">@makropetveterinaria</p>
                            </div>
                        </div>
                    </Link>
                    
                    {/* Card 2 */}
                    <Link href='https://www.instagram.com/formadogs.escuelacanina/' target="_blank" className='flex justify-center items-center'>
                        <div className="bg-white text-blackCanadog py-2 flex flex-col items-center gap-2 w-[250px] border-2 border-greenCanadog hover:border-mentaCanadog rounded-lg">
                            <Image
                                className="w-28 h-28 rounded-full"
                                src={FormaDogs.src}
                                width={100}
                                height={100}
                                alt="Forma Dogs"
                            />
                            <div className='flex flex-col justify-center items-center'>
                                <p className="text-2xl font-bold">Formadogs</p>
                                <p className="text-base font-semibold">@formadogs.escuelacanina</p>
                            </div>
                        </div>
                    </Link>
                    
                    {/* Card 3 */}
                    <Link href='https://www.instagram.com/animalcliniccolina/' target="_blank" className='flex justify-center items-center'>
                        <div className="bg-white text-blackCanadog py-2 flex flex-col items-center gap-2 w-[250px] border-2 border-greenCanadog hover:border-mentaCanadog rounded-lg">
                            <Image
                                className="w-28 h-28 rounded-full"
                                src={AnimalClinic.src}
                                width={100}
                                height={100}
                                alt="James"
                            />
                            <div className='flex flex-col justify-center items-center'>
                                <p className="text-2xl font-bold">Animal Clinic</p>
                                <p className="text-base font-semibold">@animalcliniccolina</p>
                            </div>
                        </div>
                    </Link>
                    {/* Card 4 */}
                    <Link href='https://www.instagram.com/danii.colibri/' target="_blank" className='flex justify-center items-center'>
                        <div className="bg-white text-blackCanadog py-2 flex flex-col items-center gap-2 w-[250px] border-2 border-greenCanadog hover:border-mentaCanadog rounded-lg">
                            <Image
                                className="w-28 h-28 rounded-full"
                                src={DaniColibri.src}
                                width={100}
                                height={100}
                                alt="James"
                            />
                            <div className='flex flex-col justify-center items-center'>
                                <p className="text-2xl font-bold">Dani Colibri</p>
                                <p className="text-base font-semibold">@danii.colibri</p>
                            </div>
                        </div>
                    </Link>
                    
                    {/* Card 5 */}
                    <Link href='https://www.instagram.com/makropetveterinaria/' target="_blank" className='flex justify-center items-center'>
                        <div className="bg-white text-blackCanadog py-2 flex flex-col items-center gap-2 w-[250px] border-2 border-greenCanadog hover:border-mentaCanadog rounded-lg">
                            <Image
                                className="w-28 h-28 rounded-full"
                                src={GoodBoy.src}
                                width={100}
                                height={100}
                                alt="James"
                            />
                            <div className='flex flex-col justify-center items-center'>
                                <p className="text-2xl font-bold">goodboy</p>
                                <p className="text-base font-semibold">@goodboy_petstudio</p>
                            </div>
                        </div>
                    </Link>
                    {/* Card 6 
                    <Link href='https://www.instagram.com/makropetveterinaria/' target="_blank">
                        <div className="bg-white text-blackCanadog py-2 px-4 flex flex-col items-center gap-2 w-full border-2 border-greenCanadog hover:border-mentaCanadog rounded-lg">
                            <Image
                                className="w-28 h-28 rounded-full"
                                src={GoodBoy.src}
                                width={100}
                                height={100}
                                alt="James"
                            />
                            <div className='flex flex-col justify-center items-center'>
                                <p className="text-2xl font-bold">Formadogs</p>
                                <p className="text-base font-semibold">@kanumascotas</p>
                            </div>
                        </div>
                    </Link>*/}
                </div>
            </section>
        </div>
    )
}