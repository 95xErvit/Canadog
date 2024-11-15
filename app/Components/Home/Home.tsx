"use client";
import React, { useEffect, useState } from 'react';
import { Button, Card, Input,CardBody, Modal, Image,ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, usePagination, PaginationItemType, Checkbox, Textarea } from "@nextui-org/react";
import {ScrollShadow} from "@nextui-org/react";
import {Divider} from "@nextui-org/divider";
import {Pagination} from "@nextui-org/react";
import { Carousel } from 'primereact/carousel';
import {ChevronIcon} from "../../../public/ChevronIcon";
import MotionTransition from '../MotionTransition/MotionTransition';
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

    const itemsAdoptions = 9; // Cantidad de tarjetas que deseas mostrar por página
    const cards = isDog ? cardsDogs : cardsCats;
    const totalPagesAdoptions = Math.ceil(cards.length / itemsAdoptions);
    
    // const card = [
    //     {
    //         id: 1,
    //         image: 'Adop1.png',
    //         title: 'Max',
    //         Description: 'Encantador cachorro de ojos brillantes y cola siempre en movimiento.',
    //     },
    //     {
    //         id: 2,
    //         image: 'Adop2.png',
    //         title: 'Lucas',
    //         Description: 'Encantador cachorro de ojos brillantes y cola siempre en movimiento.',
    //     },
    //     {
    //         id: 3,
    //         image: 'Adop3.png',
    //         title: 'Dante',
    //         Description: 'Encantador cachorro de ojos brillantes y cola siempre en movimiento.',
    //     },
    //     {
    //         id: 4,
    //         image: 'Adop4.png',
    //         title: 'Kitty',
    //         Description: 'Encantador cachorro de ojos brillantes y cola siempre en movimiento.',
    //     },
    //     {
    //         id: 5,
    //         image: 'Adop4.png',
    //         title: 'Kitty',
    //         Description: 'Encantador cachorro de ojos brillantes y cola siempre en movimiento.',
    //     },
    //     {
    //         id: 6,
    //         image: 'Adop3.png',
    //         title: 'Kitty',
    //         Description: 'Encantador cachorro de ojos brillantes y cola siempre en movimiento.',
    //     },
    //     {
    //         id: 7,
    //         image: 'Adop2.png',
    //         title: 'Kitty',
    //         Description: 'Encantador cachorro de ojos brillantes y cola siempre en movimiento.',
    //     },
    //     {
    //         id: 8,
    //         image: 'Adop1.png',
    //         title: 'Kitty',
    //         Description: 'Encantador cachorro de ojos brillantes y cola siempre en movimiento.',
    //     },
    // ];

    const handlePageChange = (page: number) => {
        setCurrentPage(page); // Actualiza la página actual cuando cambia
    };

    const itemsHistorys = 4; // Cantidad de tarjetas por página
    const { activePage, range, setPage, onNext, onPrevious, loop } = usePagination({
      total: Math.ceil(cardsHistory.length / itemsHistorys), // Total de páginas basado en el número de tarjetas
      showControls: true,
      siblings: 1,
      boundaries: 1,
    });
  
    // Calcula las tarjetas que se deben mostrar en la página actual
    const paginatedCards = cardsHistory.slice(
      (activePage - 1) * itemsHistorys,
      activePage * itemsHistorys
    );

    // const historyTemplate = (card: any) => {
    //     return (
    //         <Card
    //             isBlurred
    //             className="border-none"
    //             shadow="md"
    //             key={card.id}
    //         >
    //             <div className='flex w-1/2'>
    //                 <Card className='m-4 border border-greenGora'>
    //                     <div className="flex flex-col justify-center gap-6 md:gap-2">
    //                         <CardBody>
    //                             <div className='flex flex-col m-4'>
    //                                 <h1 className="flex mn:flex-col xl:flex-row justify-center font-bold text-purpleGora text-2xl gap-2">
    //                                     {card.title} <span className="flex justify-start font-semibold text-blackGora text-xl">y su familia</span>
    //                                 </h1>
    //                                 <p className='flex justify-center mt-4 text-md'>
    //                                     {card.description}
    //                                 </p>
    //                             </div>
    //                         </CardBody>
    //                         <Image
    //                             alt="cover"
    //                             className="object-cover"
    //                             height={150}
    //                             shadow="lg"
    //                             src={card.image}
    //                             width={300}
    //                             isZoomed
    //                         />
    //                     </div>
    //                 </Card>
    //             </div>
    //         </Card>
    //     );
    // };

    // useEffect(() => {
    //     setTimeout(onNext, 1000)
    // }, []);
    
    return(
        <div>
            {/* BANNER */}
            <section>
                <div className='relative p-6 md:py-24'>
                    <div className='grid md:max-w-7xl mx-auto md:grid-cols-2'>
                        <div className='mn:order-last mn:mt-8 md:ml-8 md:px-6 md:order-first '>
                            <h2 className='mn:ml-2 md:ml-0 mn:text-3xl md:text-4xl font-semibold text-purpleGora'>
                                ¡Encuentra {<span className='text-greenGora'>a tu compañero </span>}
                                <span className=' text-greenGora'>perfecto</span>!
                            </h2>
                            <p className='mn:ml-4 md:ml-0 mn:max-w-md md:max-w-lg mn:mt-4 md:mt-10'>
                                Bienvenido a GORA, tu destino para encontrar tu compañero peludo perfecto. En nuestra plataforma, 
                                conectamos a mascotas necesitadas con familias amorosas.<br/> 
                                ¡Descubre cómo puedes hacer una diferencia en la vida de un animal y en la tuya propia adoptando hoy!
                            </p>
                            <div className="flex mn:my-8 mn:justify-center md:justify-start">
                                <Button  className='bg-greenGora text-pinkLightGora' radius="full" size="lg" onPress={onOpen}>
                                    Adopta Hoy
                                </Button>
                                <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='3xl' backdrop='blur'>
                                    <ModalContent>
                                    {(onClose) => (
                                        <>
                                            <ModalHeader className="flex justify-center text-greenGora mn: md:text-3xl">
                                                ¡Bienvenido {<p className='text-blackGora ml-1'> a tu próxima gran aventura</p>}!
                                            </ModalHeader>
                                            <ModalBody>
                                                <p className='text-blackGora px-4 text-md'> 
                                                    Nos emociona que estés considerando darle un hogar a uno de nuestros adorables peluditos! Por favor, completa este sencillo formulario para comenzar el proceso de adopción.
                                                </p>
                                                <h3 className='text-center py-4 text-blackGora text-xl font-semibold'>
                                                    Queremos conocerte un poco mejor.
                                                </h3>
                                                <div className='flex flex-col'>
                                                    <p className='text-blackGora px-4 text-md text-center'> 
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
                                                        <Button href='https://forms.gle/m9oTCTt8n1qibjFU8' className='bg-greenGora text-pinkLightGora my-4' radius="full" size="lg" onClick={() => window.open('https://forms.gle/m9oTCTt8n1qibjFU8', '_blank')}>
                                                            Formulario adopción
                                                        </Button>                          
                                                    </div>

                                                    <Divider className="my-4"/>
                                                    <div className='flex flex-wrap flex-col gap-2 text-greenGora text-sm font-semibold my-4 px-4'> 
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
                                    )}
                                    </ModalContent>
                                </Modal>
                            </div>
                        </div>
                        <MotionTransition className='mn:order-first mn:mt-6 md:order-last'>
                            <div className='flex justify-center'>
                                <Image src='BannerGora.png' alt='card' className='h-auto w-80 md:w-full'/>
                            </div>
                        </MotionTransition>
                    </div>
                </div>
            </section>

            <Divider className="my-4"/>

            {/* CARDS ADOPCION */}
            <section className='adopciones' id='adopciones'>
                <div className='md:px-4 md:mx-4'>
                    <div className='relative px-6 mx-6 mn:py-2 mn:mt-2 md:py-6 md:mt-4'>
                        <div className='grid max-w-7xl mx-auto md:gris-cols-2'>
                            <h2 className='mn:text-xl md:text-4xl font-semibold'>
                                Encuentra a tu {<span className='text-greenGora'>Mejor amigo</span>}
                            </h2>
                            <div className="flex gap-4 mn:my-4 md:my-8 mn:justify-center md:justify-start">
                                <div className="group relative flex flex-col items-center mt-10">
                                    <div className="absolute bottom-12 left-0 flex justify-center items-center w-full h-full transform translate-y-full opacity-0 group-hover:-translate-y-2 group-hover:opacity-100 transition-all duration-300">
                                    <Image
                                        alt="guauButton"
                                        src="guauButton.gif"
                                        height="100"
                                        width="100"
                                    />
                                    </div>
                                    <Button
                                        onClick={(e) => setIsDog(true)}
                                        className={`bg-transparent border ${isDog ? "bg-greenGora text-pinkLightGora" : "border-greenGora text-greenGora"} hover:bg-greenGora hover:text-pinkLightGora`}
                                        radius="full"
                                        size="lg"
                                    >
                                        Guaus
                                    </Button>
                                </div>
                                <div className="group relative flex flex-col items-center mt-10">
                                    <div className="absolute bottom-12 left-0 flex justify-center items-center w-full h-full transform translate-y-full opacity-0 group-hover:-translate-y-1.5 group-hover:opacity-100 transition-all duration-300">
                                    <Image
                                        alt="guauButton"
                                        src="CatIcon.gif"
                                        height="100"
                                        width="100"
                                    />
                                    </div>
                                    <Button
                                        onClick={(e) => setIsDog(false)}
                                        className={`bg-transparent border ${!isDog ? "bg-greenGora text-pinkLightGora" : "border-greenGora text-greenGora"} hover:bg-greenGora hover:text-pinkLightGora`}
                                        radius="full"
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
                                    <ScrollShadow className="mn:w-full mn:h-[300px] md:w-full md:h-[500px] mt-6 mb-6" size={0}>
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
                                                      src={card.image}
                                                    />
                                                    <CardBody className={`${expandedCard === card.id ? 'w-full h-auto' : 'w-[170px] h-[200px] justify-around'}`}>
                                                      <div className={`${expandedCard === card.id ? 'flex items-center justify-around' : 'flex w-full flex-wrap'}`}>
                                                        <h1 className={`flex font-semibold text-purpleGora ${expandedCard === card.id ? 'justify-start text-2xl' : 'px-2 justify-end w-full mn:text-xl md:text-2xl'}`}>
                                                          {card.title.substring(0, 3)}
                                                          <span className='text-greenGora'>{card.title.substring(3)}</span>
                                                        </h1>
                                                        <h1 className={`flex font-semibold text-purpleGora ${expandedCard === card.id ? 'justify-start text-2xl hidden' : 'px-2 justify-end w-full mn:text-xl md:text-sm'}`}>
                                                          Edad: {card.old}
                                                        </h1>
                                                        {expandedCard === card.id && (
                                                          <div className='flex flex-wrap'>
                                                            <div className='flex items-center'>
                                                              <Button className='bg-greenGora border border-greenGora text-white text-sm h-7' radius="full">
                                                                Adoptame
                                                              </Button>
                                                            </div>
                                                            <div className='flex items-center'>
                                                              <Button
                                                                onClick={() => toggleExpand(card.id)}
                                                                className='bg-transparent text-greenGora text-end'
                                                                radius="full"
                                                                endContent={<i className="pi pi-arrow-circle-up" style={{ color: '#489E84', fontSize: '1.5rem' }} />}
                                                              />
                                                            </div>
                                                          </div>
                                                        )}
                                                      </div>
                                          
                                                      <p className={`font-normal text-gray ${expandedCard === card.id ? 'w-full h-auto text-[14px] px-2.5 mt-1' : 'w-full h-[58px] text-right text-[12px]'}`}>
                                                        {expandedCard === card.id ? card.longDescription : `${card.shortDescription.substring(0, 75)}...`}
                                                      </p>
                                          
                                                      {expandedCard !== card.id && (
                                                        <div className="flex justify-center">
                                                          <Button
                                                            onClick={() => toggleExpand(card.id)}
                                                            className='bg-transparent border border-greenGora text-greenGora'
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
                                                        
                                                        src={card.image}
                                                    />
                                                    <CardBody className={`${expandedCard === card.id ? 'w-full h-[200px]' : 'w-[170px] h-[200px] justify-around'}`}>
                                                        <div className={`${expandedCard === card.id ? 'flex items-center justify-around' : 'flex w-full flex-wrap'}`}>
                                                            <h1 className={`flex font-semibold text-purpleGora ${expandedCard === card.id ? 'justify-start text-2xl' : 'px-2 justify-end w-full mn:text-xl md:text-2xl'}`}>
                                                                {card.title.substring(0, 3)}<span className='text-greenGora'>{card.title.substring(3, card.title.charCodeAt(card.title)) + '\n' + card.old}</span>
                                                            </h1>
                                                            {expandedCard === card.id && (
                                                                <div className='flex flex-wrap'>
                                                                    <div className='flex items-center'>
                                                                        <Button className='bg-greenGora border border-greenGora text-white text-sm h-7' radius="full">
                                                                            Adoptame
                                                                        </Button>
                                                                    </div>
                                                                    <div className='flex items-center'>
                                                                        <Button
                                                                            onClick={() => toggleExpand(card.id)}
                                                                            className='bg-transparent text-greenGora text-end'
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
                                                                    className='bg-transparent border border-greenGora text-greenGora'
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
                        Historias {<span className='text-greenGora'>Emotivas</span>}
                    </h2>
                </div>
                <div className='max-w-7xl mx-auto'>
                    <p className='mt-4 text-xl font-normal text-blackGora sm:text-lg xl:text-xl"'>
                        Nuestro objetivo es hacer que muchos animales conozcan el 
                        {<span className='text-greenGora font-semibold'>amor</span>}, 
                        rescatándolos de las calles, rehabilitándolos y encontrando una familia adoptante para ser su compañía por el resto de sus vidas.
                    </p>
                </div>
            </div>
            <div className='px-4 py-6 mb-8'>
                <div className="flex justify-center gap-4 p-4 md:p-8 overflow-x-auto">
                    {paginatedCards.map((card : any) => (
                        <Card
                            isBlurred
                            className="border-none w-[48%] sm:w-[48%] md:w-[30%] lg:w-[22%] transition-transform duration-300 hover:scale-105 flex-shrink-0"
                            shadow="md"
                            key={card.id}
                        >
                            <div className="flex flex-col items-center">
                                <Card className="m-4 border border-greenGora">
                                    <div className="flex flex-col justify-center gap-6 md:gap-2">
                                        <CardBody>
                                            <div className="flex flex-col m-4">
                                                <h1 className="flex flex-col md:flex-row justify-center font-bold text-purpleGora text-2xl gap-2">
                                                    {card.title}
                                                    <span className="flex justify-start font-semibold text-blackGora text-xl">
                                                        y su familia
                                                    </span>
                                                </h1>
                                                {/* <p className="flex justify-center mt-4 text-md">{card.description}</p> */}
                                            </div>
                                        </CardBody>
                                        <Image
                                            alt="cover"
                                            className="object-cover"
                                            height={150}
                                            shadow="lg"
                                            src={card.image}
                                            width={300}
                                        />
                                    </div>
                                </Card>
                            </div>
                        </Card>
                    ))}
                </div>
                 
                 <div className="flex justify-center m-4">
                    <ul className="flex gap-2 items-center">
                    {range.map((page) => {
                        if (page === PaginationItemType.NEXT) {
                            return (
                                <li key={page} aria-label="next page" className="w-4 h-4">
                                    <button className="w-full h-full bg-default-200 rounded-full" onClick={onNext} >
                                        <ChevronIcon className="rotate-180" />
                                    </button>
                                </li>
                            );
                        }

                        if (page === PaginationItemType.PREV) {
                            return (
                                <li key={page} aria-label="previous page" className="w-4 h-4">
                                    <button className="w-full h-full bg-default-200 rounded-full" onClick={onPrevious}>
                                        <ChevronIcon />
                                    </button>
                                </li>
                            );
                        }

                        if (page === PaginationItemType.DOTS) {
                            return (
                                <li key={page} className="w-4 h-4">
                                ...
                                </li>
                            );
                        }

                        return (
                            <li key={page} aria-label={`page ${page}`} className="w-4 h-4">
                                <button
                                    className={`w-full h-full rounded-full 
                                    ${
                                        activePage === page ? 'bg-greenGora' : 'bg-default-300'
                                    }`}
                                    onClick={() => setPage(page)}
                                />
                            </li>
                        );
                    })}
                    </ul>
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
                        shadow="md"
                        src="BannerAdds.png"
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
                            ¡Su ayuda es {<span className='text-greenGora font-semibold'>TODO</span>} para nosotros y para ellos!
                        </p>
                    </div>
                    <div className="max-w-6xl mn:mx-10 lg:mx-auto align-items-center grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-8">
                        {/* Card 1 */}
                        <div className="bg-white text-blackGora p-2 rounded-full flex justify-center items-center space-x-4 shadow-lg border-2 border-redGora hover:border-2 hover:border-pinkGora">
                            <Image
                                className="w-24 h-24 rounded-full"
                                src="perros_criollos.jpg"
                                alt="PC"
                            />
                        <div className='flex flex-col'>
                            <p className="text-base font-bold">Perros Criollos</p>
                            <p className="text-xs font-semibold">@perros.criollos</p>
                        </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white text-blackGora p-2 rounded-full flex justify-center items-center space-x-4 shadow-lg border-2 border-redGora hover:border-2 hover:border-pinkGora">
                        <Image
                            className="w-24 h-24 rounded-full"
                            src="kanu.jpg"
                            alt="James"
                        />
                        <div className='flex flex-col'>
                            <p className="text-base font-bold">Kanu</p>
                            <p className="text-xs font-semibold">@kanumascotas</p>
                        </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white text-blackGora p-6 rounded-full flex items-center space-x-4 shadow-lg border-2 border-redGora hover:border-2 hover:border-pinkGora">
                        <Image
                            className="w-12 h-12 rounded-full"
                            src="https://cdn.rareblocks.xyz/collection/bakerstreet/images/testimonials/5/member-1.png"
                            alt="Alexa"
                        />
                        <p className="text-sm font-bold">@alexaborn</p>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-white text-blackGora p-6 rounded-full flex items-center space-x-2 shadow-lg border-2 border-redGora hover:border-2 hover:border-pinkGora">
                        <Image
                            className="w-12 h-12 rounded-full"
                            src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png"
                            alt="Cameron"
                        />
                        <p className="text-sm font-bold">@camerondi</p>
                        </div>

                        {/* Card 5 */}
                        <div className="bg-white text-blackGora p-6 rounded-full flex items-center space-x-4 shadow-lg border-2 border-redGora hover:border-2 hover:border-pinkGora lg:translate-x-8">
                        <Image
                            className="w-12 h-12 rounded-full"
                            src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female.png"
                            alt="Martina"
                        />
                        <p className="text-sm font-bold">@martina</p>
                        </div>

                        {/* Card 6 */}
                        <div className="bg-white text-blackGora p-6 rounded-full flex items-center space-x-4 shadow-lg border-2 border-redGora hover:border-2 hover:border-pinkGora lg:translate-x-8">
                        <Image
                            className="w-12 h-12 rounded-full"
                            src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png"
                            alt="Christina"
                        />
                        <p className="text-sm font-bold">@christin.jamescron</p>
                        </div>

                        {/* Card 7 */}
                        <div className="bg-white text-blackGora p-6 rounded-full flex items-center space-x-4 shadow-lg border-2 border-redGora hover:border-2 hover:border-pinkGora lg:translate-x-8">
                        <Image
                            className="w-12 h-12 rounded-full"
                            src="https://cdn.rareblocks.xyz/collection/bakerstreet/images/testimonials/5/member-3.png"
                            alt="James"
                        />
                        <p className="text-sm font-bold">@jamescron</p>
                        </div>

                        {/* Card 8 */}
                        <div className="bg-white text-blackGora p-6 rounded-full flex items-center space-x-4 shadow-lg border-2 border-redGora hover:border-2 hover:border-pinkGora lg:translate-x-8">
                        <Image
                            className="w-12 h-12 rounded-full"
                            src="https://cdn.rareblocks.xyz/collection/bakerstreet/images/testimonials/5/member-1.png"
                            alt="Alexa"
                        />
                        <p className="text-sm font-bold">@alexaborn</p>
                        </div>
                    </div>
                </section>
            </div> 

            <Divider className="my-4"/>

            {/* BANNER FINAL */}
            <div className='relative mn:px-6 mn:py-2 mn:mt-2 md:px-6 md:py-6 md:mt-8'>
                <div className='grid max-w-7xl mx-auto md:grid-cols-2'>
                    <h2 className='mn:text-xl md:text-4xl font-semibold'>
                        Adoptar es {<span className='text-greenGora'>Fácil</span>}
                    </h2>
                </div>
            </div>
            <div className='flex justify-center mt-2 mb-6 py-4'>
                <div className='relative mn:px-2 mn:py-2 md:px-6 md:py-6'>
                    <Image
                        alt="Album cover"
                        className="object-cover"
                        height={250}
                        shadow="md"
                        src="Adoptar.png"
                        width={1280}
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
    <Checkbox className='text-blackGora text-sm p-2 border-2 border-greenGora rounded-xl'>Si</Checkbox>
    <Checkbox className='text-blackGora text-sm p-2 border-2 border-greenGora rounded-xl'>No</Checkbox>
</div> */}