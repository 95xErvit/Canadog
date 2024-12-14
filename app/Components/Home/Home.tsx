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
import 'primeicons/primeicons.css';

//{Dogs, Cats}: any
export default function Home({cardsDogs , cardsCats, cardsHistory}: any) {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    //const [expand, setExpand] = useState(false);
    const [isDog, setIsDog] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedCard, setExpandedCard] = useState<number | null>(null);

    const toggleExpand = (id: number) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    const itemsAdoptions = 9; // Cantidad de tarjetas para mostrar por página
    const cards = isDog ? cardsDogs : cardsCats;
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
          prevIndex + cardsToShow < cardsHistory.length ? prevIndex + 1 : prevIndex
        );
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    };

    return(
        <div>
            {/* BANNER */}
            <section>
                <div className='relative p-6 md:py-16'>
                    <div className='grid md:max-w-7xl mx-auto md:grid-cols-2'>
                        <div className='flex flex-col justify-center mn:order-last mn:mt-8 md:ml-8 md:px-6 md:order-first '>
                            <h2 className='mn:ml-2 md:ml-0 mn:text-3xl md:text-4xl font-semibold text-mentaCanadog'>
                                !Encuentra{<span className='text-greenCanadog'> a tu compañero perfecto!</span>}
                            </h2>
                            <p className='mn:max-w-md md:max-w-lg mn:ml-3 mn:m-4 md:ml-0 md:my-8'>
                                Bienvenido a CANADOG, tu destino para encontrar tu compañero peludo perfecto. En nuestra plataforma, conectamos a mascotas necesitadas con familias amorosas. 
                                ¡Descubre cómo puedes hacer una diferencia en la vida de un animal y en la tuya propia adoptando hoy!
                            </p>
                            <div className="flex mn:my-4 mn:justify-center md:justify-start">
                                <Button  className='bg-greenCanadog text-white font-semibold rounded-lg' size="lg" onPress={onOpen}>
                                    Adopta un fiel amigo
                                </Button>
                                <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='3xl' backdrop='blur' placement='center'>
                                    <ModalContent>
                                        <>
                                            <ModalHeader className="flex justify-center text-greenCanadog mn:text-sm md:text-3xl">
                                                ¡Bienvenido {<p className='text-blackGora ml-1'> a tu próxima gran aventura</p>}!
                                            </ModalHeader>
                                            <ModalBody>
                                                <p className='text-blackGora px-4 mn:text-xs xl:text-md'> 
                                                    Nos emociona que estés considerando darle un hogar a uno de nuestros adorables peluditos! Por favor, completa este sencillo formulario para comenzar el proceso de adopción.
                                                </p>
                                                <h3 className='text-center mn:py-2 xl:py-4 text-blackGora mn:text-xs xl:text-xl font-semibold'>
                                                    Queremos conocerte un poco mejor.
                                                </h3>
                                                <div className='flex flex-col'>
                                                    <p className='text-blackGora px-4 mn:text-xs xl:text-md text-center'> 
                                                        Inicia el proceso de adopción diligenciado el siguiente formulario
                                                    </p>
                                                </div>

                                                {/* <div className="flex w-full flex-col gap-4">
                                                    <div className="flex mb-6 md:mb-0 gap-4 h-[48px]">
                                                        <Input type="name" variant={'faded'} label="Nombre y Apellidos"/>
                                                    </div>
                                                    <div className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 h-[48px]">
                                                        <Input type="email" variant={'faded'} label="Correo electrónico"/>
                                                        <Input type="Phone" variant={'faded'} label="Celular" />
                                                    </div>
                                                </div>  */}
                                            </ModalBody>
                                            <ModalFooter className='flex justify-center'>
                                                <div className='flex flex-col w-full'>
                                                    <div className='flex justify-evenly'>
                                                        <Button href='https://forms.gle/m9oTCTt8n1qibjFU8' className='bg-greenCanadog text-pinkLightGora my-4 text-sm' radius="full" size="lg" onClick={() => window.open('https://forms.gle/m9oTCTt8n1qibjFU8', '_blank')}>
                                                            Formulario adopción
                                                        </Button>                          
                                                    </div>

                                                    <Divider className="my-4"/>
                                                    <div className='flex flex-wrap flex-col gap-2 text-greenCanadog mn:text-xs xl:text-sm font-semibold my-4 px-4'> 
                                                        <p>
                                                            ¡Gracias por tomarte el tiempo para completar este formulario! Nos emociona poder ayudarte a encontrar a tu nuevo mejor amigo peludo.
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
                            </div>
                        </div>
                        {/* <MotionTransition className='mn:order-first mn:mt-6 md:order-last'>
                            <div className='flex justify-center'>
                                <Image src='' alt='card' width={550} height={550} className='h-auto w-80 md:w-full'/>
                            </div>
                        </MotionTransition> */}
                    </div>
                </div>
            </section>

            <Divider className="my-4"/>

            {/* CARDS ADOPCION */}
            <section className='adopciones' id='adopciones'>
                <div className='md:px-4 md:mx-4'>
                    <div className='relative px-6 md:mx-6 mn:py-2 mn:mt-2 md:py-6 md:mt-4'>
                        <div className='grid max-w-7xl mx-auto md:gris-cols-2'>
                            <h2 className='mn:text-2xl md:text-4xl font-semibold'>
                                Encuentra a tu {<span className='text-greenCanadog'>mejor amigo</span>}
                            </h2>
                            <div className="flex gap-4 mn:my-4 md:my-8 mn:justify-center md:justify-start">
                                <div className="group relative flex flex-col items-center mn:mt-14 lg:mt-10">
                                    <div className="absolute bottom-12 left-0 flex justify-center items-center w-full h-full transform translate-y-full opacity-0 group-hover:-translate-y-2 group-hover:opacity-100 transition-all duration-300">
                                        <Image
                                            alt="guauButton"
                                            src="/guauButton.gif"
                                            height="100"
                                            width="100"
                                        />
                                    </div>
                                    <Button
                                        onClick={(e) => setIsDog(true)}
                                        className={`bg-transparent border ${isDog ? "bg-greenCanadog text-pinkLightGora font-semibold" : "border-greenCanadog text-greenCanadog font-semibold"} hover:bg-greenCanadog hover:text-pinkLightGora font-semibold rounded-lg`}
                                        size="lg"
                                    >
                                        Guaus
                                    </Button>
                                </div>
                                <div className="group relative flex flex-col items-center mn:mt-14 lg:mt-10">
                                    <div className="absolute bottom-12 left-0 flex justify-center items-center w-full h-full transform translate-y-full opacity-0 group-hover:-translate-y-1.5 group-hover:opacity-100 transition-all duration-300">
                                    <Image
                                        alt="catButton"
                                        src="/CatIcon.gif"
                                        height="100"
                                        width="100"
                                    />
                                    </div>
                                    <Button
                                        onClick={(e) => setIsDog(false)}
                                        className={`bg-transparent border ${!isDog ? "bg-greenCanadog text-pinkLightGora font-medium" : "border-greenCanadog text-greenCanadog font-semibold"} hover:bg-greenCanadog hover:text-pinkLightGora font-semibold rounded-lg`}
                                        size="lg"
                                    >
                                        Miaus
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {   
                    isDog ?
                    (
                        <div className='px-4 py-4'>
                            <div className='flex flex-wrap max-w-7xl mx-auto'>
                                <Card isBlurred className="border-none w-full" shadow="md">
                                    <ScrollShadow className="mn:w-full mn:h-[450px] md:w-full md:h-[500px] mt-6 mb-6" size={0}>
                                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                            {cardsDogs.map((card: any) => (
                                            <div
                                                key={card.id}
                                                className={`relative m-4 transition-all duration-300 
                                                    ${expandedCard === card.id ? 'row-span-2' : 'row-span-1'}
                                                    ${expandedCard === card.id ? 'h-auto' : 'h-[200px]'}
                                                `}
                                                onClick={() => toggleExpand(card.id)}
                                            >
                                                <Card className="transition-transform duration-300">
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
                                                        <h1 className={`flex font-semibold text-purpleGora ${expandedCard === card.id ? 'justify-start text-2xl' : 'px-2 justify-end w-full mn:text-xl md:text-2xl'}`}>
                                                          {card.title.substring(0, 3)}
                                                          <span className='text-greenCanadog'>{card.title.substring(3)}</span>
                                                        </h1>
                                                        <h1 className={`flex font-semibold text-purpleGora ${expandedCard === card.id ? 'justify-start mn:text-xl xl:text-2xl mn: hidden' : 'px-2 justify-end w-full mn:text-xs xl:text-sm'}`}>
                                                          Edad: {card.old}
                                                        </h1>
                                                        {expandedCard === card.id && (
                                                            <div className='flex flex-wrap'>
                                                                <div className='flex items-center'>
                                                                    <Button className='bg-greenCanadog border border-greenCanadog text-white text-sm h-7' radius="full">
                                                                        Adoptame
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
                                                            Más sobre mi
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
                                    <div className="flex justify-center mb-4">
                                        <Pagination
                                            showControls
                                            color={"secondary"}
                                            total={totalPagesAdoptions} // Total de páginas basado en el número de cartas
                                            page={currentPage} // Página actual
                                            onChange={handlePageChange} // Función para manejar el cambio de página
                                        />
                                    </div>
                                </Card>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className='px-4 py-4'>
                            <div className='flex flex-wrap max-w-7xl mx-auto'>
                                <Card isBlurred className="border-none w-full" shadow="md">
                                    <ScrollShadow className="mn:w-full mn:h-[300px] md:w-full md:h-[500px] mt-6 mb-6" size={0}>
                                        <div className='flex flex-wrap justify-evenly'>
                                            {cardsCats.map((card: any) => (
                                            <Card
                                                key={card.id}
                                                className={`m-4 transition-all duration-300 ${expandedCard === card.id ? 'w-full md:w-[30%] h-[424px]' : 'w-full md:w-[30%] h-[200px]'}`}
                                            >
                                                <div className={`flex items-center ${expandedCard === card.id ? 'flex flex-col gap-2' : ''}`}>
                                                    <Image
                                                        alt="Album cover"
                                                        className={`object-cover shadow-md transition-all duration-300 rounded-none ${expandedCard === card.id ? 'w-full h-[200px]' : 'w-[170px] h-[200px]'}`}
                                                        width={170}
                                                        height={200} 
                                                        src={card.image}
                                                    />
                                                    <CardBody className={`${expandedCard === card.id ? 'w-full h-[200px]' : 'w-[170px] h-[200px] justify-around'}`}>
                                                        <div className={`${expandedCard === card.id ? 'flex items-center justify-around' : 'flex w-full flex-wrap'}`}>
                                                            <h1 className={`flex font-semibold text-purpleGora ${expandedCard === card.id ? 'justify-start text-2xl' : 'px-2 justify-end w-full mn:text-xl md:text-2xl'}`}>
                                                                {card.title.substring(0, 3)}
                                                                <span className='text-greenCanadog'>{card.title.substring(3)}</span>
                                                            </h1>
                                                            <h1 className={`flex font-semibold text-purpleGora ${expandedCard === card.id ? 'justify-start mn:text-xl xl:text-2xl mn: hidden' : 'px-2 justify-end w-full mn:text-xs xl:text-sm'}`}>
                                                                Edad: {card.old}
                                                            </h1>
                                                            {expandedCard === card.id && (
                                                                <div className='flex flex-wrap'>
                                                                    <div className='flex items-center'>
                                                                        <Button className='bg-greenCanadog border border-greenCanadog text-white text-sm h-7' radius="full">
                                                                            Adoptame
                                                                        </Button>
                                                                    </div>
                                                                    <div className='flex items-center'>
                                                                        <Button
                                                                            onClick={() => toggleExpand(card.id)}
                                                                            className='bg-transparent text-greenCanadog text-end'
                                                                            radius="full"
                                                                            endContent={<i className="pi pi-arrow-circle-up" style={{ color: '#489E84', fontSize: '1.5rem' }} />}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
            
                                                        <p className={`flex font-normal text-gray ${expandedCard === card.id ? 'w-[308px] h-[120px] text-[14px] px-2.5 mt-1' : ' text-right w-full h-[58px] text-[12px]'}`}>
                                                            {expandedCard === card.id ? card.longDescription : card.shortDescription.substring(0,75) + "..."}
                                                        </p>
            
                                                        {expandedCard !== card.id && (
                                                            <div className="flex justify-center">
                                                                <Button
                                                                    onClick={() => toggleExpand(card.id)}
                                                                    className='bg-transparent border border-greenCanadog text-greenCanadog'
                                                                    radius="full"
                                                                    endContent={<i className="pi pi-arrow-circle-down" style={{ color: '#489E84' }} />}
                                                                >
                                                                    Más sobre mi
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </CardBody>
                                                </div>
                                            </Card>
                                            ))}
                                        </div>
                                    </ScrollShadow>

                                    {/* Paginador */}
                                    <div className="flex justify-center mb-4">
                                        <Pagination
                                            showControls
                                            color={"secondary"}
                                            total={totalPagesAdoptions} // Total de páginas basado en el número de cartas
                                            page={currentPage} // Página actual
                                            onChange={handlePageChange} // Función para manejar el cambio de página
                                        />
                                    </div>
                                </Card>
                            </div>
                        </div>  
                    )
                }
            </section>

            <Divider className="my-4"/>

            {/* CARDS HISTORIAS */}
            <div className='relative mn:px-6 mn:py-2 mn:mt-2 md:px-6 md:py-6 md:mt-8'>
                <div className='grid max-w-7xl mx-auto md:grid-cols-2'>
                    <h2 className='mn:text-2xl md:text-4xl font-semibold'>
                        Historias {<span className='text-greenCanadog'>Emotivas</span>}
                    </h2>
                </div>
                <div className='max-w-7xl mx-auto'>
                    <p className='mt-4 font-normal text-blackGora'>
                        Nuestro objetivo es hacer que muchos animales conozcan el  
                        {<span className='text-greenCanadog font-semibold'> amor</span>}, 
                        rescatándolos de las calles, rehabilitándolos y encontrando una familia adoptante para ser su compañía por el resto de sus vidas.
                    </p>
                </div>
            </div>

            <div className="relative px-4">
                <div className="flex justify-center gap-4 p-4 md:p-8 overflow-x-auto">
                    {cardsHistory.map((card: any, index: any) => {
                        const isVisible =
                        index >= currentIndex &&
                        index < currentIndex + cardsToShow;

                    return (
                        <Card
                            key={card.id}
                            className={`duration-300 w-[70%] sm:w-[38%] md:w-[40%] lg:w-[22%] transition-transform hover:scale-105 ${
                                isVisible ? "block" : "hidden"
                            }`}
                        >
                            <div className="flex flex-col items-center">
                                <div className="m-2 border-2 border-mentaCanadog rounded-xl">
                                    <div className="flex flex-col justify-center gap-6 md:gap-2">
                                        <div className="m-4">
                                            <h1 className="flex flex-col justify-center font-bold text-purpleGora text-2xl gap-2">
                                                {card.title}
                                                <span className="flex justify-start font-semibold text-blackGora text-base lg:text-xl">
                                                    y su familia
                                                </span>
                                            </h1>
                                        </div>
                                        <Image
                                            alt="cover"
                                            className="object-cover rounded-b-xl"
                                            height={150}
                                            src={card.image}
                                            width={300}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    );
                    })}
                </div>

                {/* Controles */}
                <div className="absolute top-1/2 left-0 mn:left-5 lg:left-10 transform -translate-y-1/2">
                    <button
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        className="p-4 py-2 bg-mentaCanadog rounded-xl shadow hover:bg-greenCanadog text-white"
                    >
                        ❮
                    </button>
                </div>
                <div className="absolute top-1/2 right-0 mn:right-5 lg:right-10 transform -translate-y-1/2">
                    <button
                        onClick={handleNext}
                        className="p-4 py-2 bg-mentaCanadog rounded-xl shadow hover:bg-greenCanadog text-white"
                    >
                        ❯
                    </button>
                </div>
            </div>

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
            <div>
                <section className="py-8 mb-10">
                    <div className="text-center py-8 max-w-6xl mx-auto">
                        <h2 className="mb-6 text-3xl font-bold text-blackGora mn:text-2xl sm:text-4xl xl:text-5xl">Gracias aliados</h2>
                        <p className="mt-4 text-xl font-normal text-blackGora mn:text-base sm:text-lg xl:text-xl">
                            ¡Su ayuda es {<span className='text-greenCanadog font-semibold'>TODO</span>} para nosotros y para ellos!
                        </p>
                    </div>

                    <div className="max-w-7xl mn:mx-10 lg:mx-auto align-items-center grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 justify-center lg:gap-4 py-4">
                        {/* Card 1 */}
                        
                        <Link href='https://www.instagram.com/makropetveterinaria/' target="_blank">
                            <div className="bg-white text-blackGora py-2 px-4 flex flex-col items-center gap-2 w-full border-2 border-greenCanadog hover:border-mentaCanadog rounded-lg">
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
                        <Link href='https://www.instagram.com/formadogs.escuelacanina/' target="_blank">
                            <div className="bg-white text-blackGora py-2 px-4 flex flex-col items-center gap-2 w-full border-2 border-greenCanadog hover:border-mentaCanadog rounded-lg">
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
                        <Link href='https://www.instagram.com/animalcliniccolina/' target="_blank">
                            <div className="bg-white text-blackGora py-2 px-4 flex flex-col items-center gap-2 w-full border-2 border-greenCanadog hover:border-mentaCanadog rounded-lg">
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
                        <Link href='https://www.instagram.com/danii.colibri/' target="_blank">
                            <div className="bg-white text-blackGora py-2 px-4 flex flex-col items-center gap-2 w-full border-2 border-greenCanadog hover:border-mentaCanadog rounded-lg">
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
                        <Link href='https://www.instagram.com/makropetveterinaria/' target="_blank">
                            <div className="bg-white text-blackGora py-2 px-4 flex flex-col items-center gap-2 w-full border-2 border-greenCanadog hover:border-mentaCanadog rounded-lg">
                                <Image
                                    className="w-28 h-28 rounded-full"
                                    src={FormaDogs.src}
                                    width={100}
                                    height={100}
                                    alt="James"
                                />
                                <div className='flex flex-col justify-center items-center'>
                                    <p className="text-2xl font-bold">Formadogs</p>
                                    <p className="text-base font-semibold">@kanumascotas</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>
            </div> 

            <Divider className="my-4"/>

            {/* BANNER FINAL */}
            {/* BANNER FINAL */}
            <div className='relative mn:px-6 mn:py-2 mn:mt-2 md:px-6 md:py-6 md:mt-8'>
                <div className='grid max-w-7xl mx-auto'>
                    <h2 className='mn:text-2xl md:text-4xl font-semibold text-blackGora'>
                        Pasos para {<span className='text-Canadog'>adoptar</span>} a tu nuevo compañero
                    </h2>
                </div>
            </div>
            <div className="mn:max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto mt-10 mb-20 lg:gap-4 py-4 align-items-center gap-6 grid mn:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 justify-center border-2 border-greenGora rounded-lg">
                {/* Card 1 */}
                <div className="bg-white text-blackGora flex flex-col items-center gap-2">
                    <Image
                        className="mn:w-36 mn:h-48 lg:w-40 lg:h-52 xl:w-44 xl:h-60"
                        src={Explora.src}
                        width={100}
                        height={100}
                        alt="Explora"
                    />
                </div>
                
                {/* Card 2 */}
                <div className="bg-white text-blackGora flex flex-col items-center gap-2">
                    <Image
                        className="mn:w-36 mn:h-48 lg:w-40 lg:h-52 xl:w-44 xl:h-60"
                        src={Aplica.src}
                        width={100}
                        height={100}
                        alt="Aplica"
                    />
                </div>
                
                {/* Card 3 */}
                <div className="bg-white text-blackGora flex flex-col items-center gap-2">
                    <Image
                        className="mn:w-36 mn:h-48 lg:w-40 lg:h-52 xl:w-44 xl:h-60"
                        src={Entrevista.src}
                        width={100}
                        height={100}
                        alt="Entrevista"
                    />
                </div>
                {/* Card 4 */}
                <div className="bg-white text-blackGora flex flex-col items-center gap-2">
                    <Image
                        className="mn:w-36 mn:h-48 lg:w-40 lg:h-52 xl:w-44 xl:h-60"
                        src={Adopcion.src}
                        width={100}
                        height={100}
                        alt="Adopción"
                    />
                </div>
            </div>
        </div>
    )
}


{ /* Estructura formulario
<h1 className='text-center py-4 text-blackGora font-semibold'>
    ¿Dónde viviría tu nueva mascota?
</h1>
<p className='text-blackGora px-4 text-sm'> 
    Cuéntanos un poco sobre tu hogar y el espacio que tienes disponible para un nuevo compañero.
</p>
<div className='flex flex-row justify-center my-2 gap-2 space-x-2'>
    <Checkbox 
        classNames={{
            base: cn(
            "inline-flex w-36 max-w-md bg-content1",
            "hover:bg-content2 items-center justify-start",
            "cursor-pointer rounded-lg p-2 border-2 border-transparent",
            "data-[selected=true]:border-primary",
            ),
            label: "w-full",
        }}
        >
        <div className="flex justify-between gap-2 text-blackGora text-sm">
            Casa
        </div>
    </Checkbox>
    <Checkbox 
        classNames={{
            base: cn(
            "inline-flex w-36 max-w-md bg-content1",
            "hover:bg-content2 items-center justify-start",
            "cursor-pointer rounded-lg p-2 border-2 border-transparent",
            "data-[selected=true]:border-primary",
            ),
            label: "w-full",
        }}
        >
        <div className="flex justify-between gap-2 text-blackGora text-sm">
            Apartamento
        </div>
    </Checkbox>
    <Checkbox 
        classNames={{
            base: cn(
            "inline-flex w-36 max-w-md bg-content1",
            "hover:bg-content2 items-center justify-start",
            "cursor-pointer rounded-lg p-2 border-2 border-transparent",
            "data-[selected=true]:border-primary",
            ),
            label: "w-full",
        }}
        >
        <div className="flex justify-between gap-2 text-blackGora text-sm">
            Finca
        </div>
    </Checkbox>
    <Checkbox 
        classNames={{
            base: cn(
            "inline-flex w-36 max-w-md bg-content1",
            "hover:bg-content2 items-center justify-start",
            "cursor-pointer rounded-lg p-2 border-2 border-transparent",
            "data-[selected=true]:border-primary",
            ),
            label: "w-full",
        }}
        >
        <div className="flex justify-between gap-2 text-blackGora text-sm">
            Otra
        </div>
    </Checkbox>
</div>
<div className='flex flex-row justify-start px-8 mx-6 my-2 gap-2 space-x-2'>
    <Checkbox 
        classNames={{
            base: cn(
            "inline-flex w-36 max-w-md bg-content1",
            "hover:bg-content2 items-center justify-start",
            "cursor-pointer rounded-lg p-2 border-2 border-transparent",
            "data-[selected=true]:border-primary",
            ),
            label: "w-full",
        }}
        >
        <div className="flex justify-between gap-2 text-blackGora text-sm">
            Propia
        </div>
    </Checkbox>
    <Checkbox 
        classNames={{
            base: cn(
            "inline-flex w-36 max-w-md bg-content1",
            "hover:bg-content2 items-center justify-start",
            "cursor-pointer rounded-lg p-2 border-2 border-transparent",
            "data-[selected=true]:border-primary",
            ),
            label: "w-full",
        }}
        >
        <div className="flex justify-between gap-2 text-blackGora text-sm">
            Familiar
        </div>
    </Checkbox>
    <Checkbox 
        classNames={{
            base: cn(
            "inline-flex w-36 max-w-md bg-content1",
            "hover:bg-content2 items-center justify-start",
            "cursor-pointer rounded-lg p-2 border-2 border-transparent",
            "data-[selected=true]:border-primary",
            ),
            label: "w-full",
        }}
        >
        <div className="flex justify-between text-blackGora text-sm">
            Arrendada
        </div>
    </Checkbox>
</div>
<div className='flex flex-row my-2 px-4 space-x-1'>
    <p className='text-blackGora text-sm'> 
        ¿En caso de ser arrendador, el dueño del inmueble tiene conocimiento de la posible adopción 
        y dio autorización para llevarla a cabo?
    </p>
    <Checkbox className='text-blackGora text-sm p-2 border-2 border-greenCanadog rounded-xl'>Si</Checkbox>
    <Checkbox className='text-blackGora text-sm p-2 border-2 border-greenCanadog rounded-xl'>No</Checkbox>
</div> */}