"use client";
import React, { useEffect, useState, useRef } from 'react';
import { Button, Card, Input,CardBody, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, usePagination, PaginationItemType, Checkbox, Textarea, Link } from "@nextui-org/react";
import {ScrollShadow} from "@nextui-org/react";
import {Divider} from "@nextui-org/divider";
import { Carousel } from 'primereact/carousel';
import {Pagination} from "@nextui-org/react";
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
import Canadog from "@/public/BabyCanadog.jpg"
import SenIntimo from "@/public/SEN_ÍNTIMO_LOGO.jpg"
import EddieRoffing from"@/public/EDDIE_ROOFING_LOGO.jpeg"
import LogoMarilsa from "@/public/Logo-Marilsa.jpg"
import LogoVeñata from "@/public/Logo-Veñata.jpg"
import LogoFamigo from "@/public/Logo_Famigo.png"
import 'primeicons/primeicons.css';

export default function Home({cardsDogs , cardsCats, cardsHistory}: any) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    //const [expand, setExpand] = useState(false);
    const [isDog, setIsDog] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedCard, setExpandedCard] = useState<number | null>(null);
    const [indiceActual, setIndiceActual] = useState<number>(0);

    console.log(cardsDogs)
    // const toggleExpand = (id: number) => {
    //     setExpandedCard(expandedCard === id ? null : id);
    //     setIndiceActual(0)
    // };

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

        const intervalo = setInterval(() => {
            if(expandedCard !== null)
            {   console.log("hola")
                if(cardsDogs.find((card : any) => card.id === expandedCard))
                {
                    const leng = cardsDogs.find((card : any) => card.id === expandedCard).Image.length
    
                    let index = indiceActual
    
                    index++
                    console.log(index)
                    if(index >= leng){
                        index = 0
                    }
    
                    setIndiceActual(index)
                }
            }
        }, 6000);

        updateCardsToShow();
        intervalo
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

    const productTemplate = (image : any) => {
        console.log(image.image)
        return (
            <div className='w-full'>
                <Image
                    alt="Album cover"
                    className={`shadow-md transition-all duration-100 w-full h-[220px] object-contain`}
                    width={140}
                    height={200}
                    src={image.image}
                />
            </div>
        );
    };

    const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const toggleExpand = (id: number) => {
        setExpandedCard(expandedCard === id ? null : id);
        setIndiceActual(0);
    
        // Esperar a que la card se expanda antes de hacer scroll
        setTimeout(() => {
            if (cardRefs.current[id]) {
                cardRefs.current[id]?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "center"
                });
            }
        }, 100);
    };

    return(
        <div>
            {/* BANNER */}
            <section>
                <div className="relative">
                    <div className="flex justify-center items-center">
                        <Image
                            src={Canadog.src}
                            alt="card"
                            width={1512}
                            height={550}
                            className="object-cover w-full mn:h-56 md:h-80 lg:h-[400px] xl:h-[480px]"
                        />
                    </div>

                    <div className="absolute inset-0 flex flex-col justify-end text-center mn:p-4 md:p-8 bg-blackCanadog bg-opacity-20">
                        <h2 className="text-white max-w-full mn:text-base md:text-4xl xl:text-5xl font-semibold">
                            ¡Encuentra a tu compañero perfecto!
                        </h2>
                    </div>
                </div>
                <div className='flex mn:flex-col md:flex-row md:items-center md:justify-center mn:gap-4 md:gap-10 lg:gap-16 xl:gap-20 m-6 md:h-[200px] lg:h-[300px] text-blackCanadog'>
                    <div className='flex mn:flex-row md:flex-col gap-2 mn:items-center md:items-start md:w-64'>
                        <h1 className=' mn:text-lg md:text-4xl'>
                            Bienvenido a 
                        </h1>
                        <h1 className="text-greenCanadog font-bold mn:text-xl md:text-5xl">
                            CANADOG
                        </h1>
                    </div>
                    
                    <div className='flex flex-col gap-2 md:w-[400px] lg:w-[580px] xl:w-[900px] mn:text-sm md:text-[14px] lg:text-xl'>
                        <p>
                            Un destino para encontrar tu compañero peludo perfecto. 
                            <br/>En nuestro hogar de paso, conectamos a mascotas rehabilitadas con familias amorosas.
                        </p>

                        <p>
                            ¡Descubre cómo puedes hacer una diferencia en la vida de un animal y en la tuya adoptando hoy!
                        </p>

                        <p className='text-greenCanadog font-semibold'>
                            ADOPTA HOY DE MANERA RESPONSABLE Y AMOROSA
                        </p>
                    </div>
                </div>
            </section>

            <Divider className="my-4"/>

            {/* CARDS ADOPCION */}
            <section id='adopciones'>
                <div className='md:px-4 md:mx-4'>
                    <div className='relative px-6 md:mx-6 mn:py-2 mn:mt-2 md:py-6 md:mt-4'>
                        <div className='grid max-w-7xl mx-auto md:gris-cols-2'>
                            <h2 className='mn:text-2xl md:text-4xl font-semibold'>
                                Encuentra a tu {<span className='text-greenCanadog'>mejor amigo</span>}
                            </h2>
                            <div className="flex gap-4 mn:my-4 md:my-8 mn:justify-center md:justify-start">
                                <div className="group relative flex flex-col items-center mn:my-4 md:m-0">
                                    {/* <div className="absolute bottom-12 left-0 flex justify-center items-center w-full h-full transform translate-y-full opacity-0 group-hover:-translate-y-2 group-hover:opacity-100 transition-all duration-300">
                                        <Image
                                            alt="guauButton"
                                            src="/guauButton.gif"
                                            height="100"
                                            width="100"
                                        />
                                    </div> */}
                                    <Button
                                        onClick={(e) => setIsDog(true)}
                                        className={`bg-transparent border ${isDog ? "bg-greenCanadog border-2 border-mentaCanadog text-white font-semibold" : "border-2 border-greenCanadog text-greenCanadog font-semibold"} hover:bg-greenCanadog hover:text-pinkLightGora font-semibold rounded-lg`}
                                        size="lg"
                                    >
                                        Guaus
                                    </Button>
                                </div>
                                <div className="group relative flex flex-col items-center mn:my-4 md:m-0">
                                    {/* <div className="absolute bottom-12 left-0 flex justify-center items-center w-full h-full transform translate-y-full opacity-0 group-hover:-translate-y-1.5 group-hover:opacity-100 transition-all duration-300">
                                    <Image
                                        alt="catButton"
                                        src="/CatIcon.gif"
                                        height="100"
                                        width="100"
                                    />
                                    </div> */}
                                    <Button
                                        onClick={(e) => setIsDog(false)}
                                        className={`bg-transparent border ${!isDog ? "bg-greenCanadog border-2 border-mentaCanadog text-white font-medium" : "border-2 border-greenCanadog text-greenCanadog font-semibold"} hover:bg-greenCanadog hover:text-pinkLightGora font-semibold rounded-lg`}
                                        size="lg"
                                    >
                                        Miaus
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal className='mn:m-2 lg:m-0' isOpen={isOpen} onOpenChange={onOpenChange} size='3xl' backdrop='blur' placement='center'>
                    <ModalContent>
                        <>
                            <ModalHeader className="flex justify-center text-greenCanadog mn:text-xl md:text-3xl py-4 xl:py-8">
                                ¡Bienvenido {<p className='text-blackCanadog ml-1'> a tu próxima gran aventura!</p>}
                            </ModalHeader>
                            <ModalBody>
                                <p className='text-blackCanadog px-4 mn:text-sm xl:text-md'> 
                                    Nos emociona que estés considerando darle un hogar a uno de nuestros adorables peluditos. <br/> Por favor, completa este sencillo formulario para comenzar el proceso de adopción.
                                </p>
                                <h3 className='text-center mn:pt-2 xl:pt-4 text-blackCanadog mn:text-base xl:text-xl font-semibold'>
                                    Queremos conocerte un poco mejor.
                                </h3>

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
                                        <Button href='' className='bg-greenCanadog text-pinkLightGora mb-4 text-base' radius="full" size="lg" onClick={() => window.open('https://forms.gle/m9oTCTt8n1qibjFU8', '_blank')}>
                                            Formulario adopción
                                        </Button>                          
                                    </div>

                                    <Divider className="my-4"/>
                                    <div className='flex flex-col flex-wrap justify-center items-center gap-2 text-greenCanadog mn:text-xs xl:text-sm font-semibold my-4 px-4'> 
                                        <p className='text-center'>
                                            ¡Gracias por tomarte el tiempo para completar este formulario! 
                                            <br/> Nos emociona poder ayudarte a encontrar a tu nuevo mejor amigo peludo.
                                        </p>
                                    </div> 
                                </div>
                            </ModalFooter>
                        </>
                    </ModalContent>
                </Modal>
                {   
                    isDog ?
                    (
                        <div className='p-4'>
                            <div className='flex flex-wrap max-w-7xl mx-auto'>
                                <Card 
                                    isBlurred 
                                    className="border-none w-full" 
                                    shadow="md"
                                >
                                    <ScrollShadow className="mn:w-full mn:h-[530px] md:w-full md:h-[500px] mt-6 mb-6" size={0}>
                                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                                            {cardsDogs.map((card: any) => (
                                                <div
                                                    key={card.id}
                                                    ref={(el) => {
                                                        cardRefs.current[card.id] = el; 
                                                    }}
                                                    className={`relative m-4 transition-all duration-300 
                                                        ${expandedCard === card.id ? 'row-span-2 z-50' : 'row-span-1'}
                                                        ${expandedCard === card.id ? 'h-auto' : 'h-[200px]'}
                                                    `}
                                                    
                                                >
                                                    <Card>
                                                        <div className={`flex items-center ${expandedCard === card.id ? 'flex-col mn:h-[500px] md:h-[470px] lg:h-[450px] gap-2' : ''}`}>
                                                            {expandedCard === card.id ? (
                                                                /*<Image
                                                                    alt="Album cover"
                                                                    className={`shadow-md transition-all duration-100 ${expandedCard === card.id ? 'w-full h-[220px]' : 'w-[170px] h-[200px]'} bg-greenLightCanadog object-contain`}
                                                                    width={140}
                                                                    height={200}
                                                                    src={card.Image[indiceActual]?.image || card.Image[0]?.image}
                                                                />*/
                                                                <Carousel value={card.Image} numScroll={1} numVisible={1}  itemTemplate={productTemplate} className='bg-greenLightCanadog' showIndicators={false} />
                                                            ) : (
                                                                <Image
                                                                    alt="Album cover"
                                                                    className={`shadow-md transition-all duration-100 ${expandedCard === card.id ? 'w-full h-[220px]' : 'mn:w-[140px] md:w-[170px] h-[200px]'} bg-greenLightCanadog object-contain`}
                                                                    width={140}
                                                                    height={200}
                                                                    src={card.Image[0]?.image}
                                                                />
                                                            )}

                                                            <CardBody className={`${expandedCard === card.id ? 'w-full h-auto' : 'w-[170px] h-[200px] justify-around'}`}>
                                                                <div className={`${expandedCard === card.id ? 'flex items-center justify-around' : 'flex w-full flex-wrap'}`}>
                                                                    <h1 className={`flex font-semibold text-blackCanadog ${expandedCard === card.id ? 'justify-start mn:text-[22px] md:text-2xl' : 'px-2 justify-end w-full mn:text-xl md:text-2xl'}`}>
                                                                        {card.title.substring(0, 3)}
                                                                        <span className='text-greenCanadog'>{card.title.substring(3)}</span>
                                                                    </h1>
                                                                    <h2 className={`flex font-semibold text-greenCanadog ${expandedCard === card.id ? 'justify-start mn:text-xl xl:text-2xl mn: hidden' : 'px-2 justify-end w-full mn:text-xs xl:text-sm'}`}>
                                                                        {card.old}
                                                                    </h2>
                                                                    {expandedCard === card.id && (
                                                                        <div className='flex flex-wrap'>
                                                                            <div className='flex items-center'>
                                                                                <Button className='bg-greenCanadog border border-greenCanadog text-white mn:text-xs md:text-base h-7' radius="full" onPress={onOpen}>
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
                                                    
                                                                <p className={`font-normal text-gray ${expandedCard === card.id ? 'w-full h-[150px] text-[14px] px-2.5 mt-2' : 'w-full h-[60px] text-[12px]'}`}>
                                                                    {expandedCard === card.id ? 
                                                                        (
                                                                            card.longDescription 
                                                                        ) 
                                                                        : 
                                                                        (
                                                                            window.innerWidth >= 1024 ? card.shortDescription.substring(0, 80) + "..." : 
                                                                            window.innerWidth >= 768 ? card.shortDescription.substring(0, 58) + "..." : 
                                                                            window.innerWidth >= 640 ? card.shortDescription.substring(0, 80) + "..." : 
                                                                            card.shortDescription.substring(0, 45) + "..."
                                                                        )
                                                                    }
                                                                </p>
                                                    
                                                                {expandedCard !== card.id && (
                                                                    <div className="flex justify-center">
                                                                        <Button
                                                                            onClick={() => toggleExpand(card.id)}
                                                                            className='bg-transparent border border-greenCanadog text-greenCanadog text-xs'
                                                                            endContent={<i className="pi pi-arrow-circle-down" style={{ color: '#489E84' }} />}
                                                                            radius="full"
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
                    )
                    :
                    (
                        <div className='px-4 py-4'>
                            <div className='flex flex-wrap max-w-7xl mx-auto'>
                                <Card isBlurred className="border-none w-full" shadow="md">
                                    <ScrollShadow className="mn:w-full mn:h-[530px] md:w-full md:h-[500px] mt-6 mb-6" size={0}>
                                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                                            {cardsCats.map((card: any) => (
                                            <div
                                                key={card.id}
                                                ref={(el) => {
                                                    cardRefs.current[card.id] = el; 
                                                }}
                                                className={`relative m-4 transition-all duration-300 
                                                    ${expandedCard === card.id ? 'row-span-2 z-50' : 'row-span-1'}
                                                    ${expandedCard === card.id ? 'h-auto' : 'h-[200px]'}
                                                `}
                                            >
                                                <Card className='transition-transform duration-100'>
                                                    <div className={`flex items-center ${expandedCard === card.id ? 'flex-col mn:h-[500px] md:h-[470px] lg:h-[450px gap-2' : ''}`}>
                                                        {expandedCard === card.id ? (
                                                            /*<Image
                                                                alt="Album cover"
                                                                className={`shadow-md transition-all duration-100 ${expandedCard === card.id ? 'w-full h-[220px]' : 'w-[170px] h-[200px]'} bg-greenLightCanadog object-contain`}
                                                                width={140}
                                                                height={200}
                                                                src={card.image}
                                                            />*/
                                                            <Carousel value={card.Image} numScroll={1} numVisible={1}  itemTemplate={productTemplate} className='bg-greenLightCanadog' showIndicators={false} />
                                                        ) : (
                                                            <Image
                                                                alt="Album cover"
                                                                className={`shadow-md transition-all duration-100 ${expandedCard === card.id ? 'w-full h-[220px]' : 'mn:w-[140px] md:w-[170px] h-[200px]'} bg-greenLightCanadog object-contain`}
                                                                width={140}
                                                                height={200}
                                                                src={card.Image[0]?.image}
                                                            />
                                                        )}
                                                        <CardBody className={`${expandedCard === card.id ? 'w-full h-auto' : 'w-[170px] h-[200px] justify-around'}`}>
                                                            <div className={`${expandedCard === card.id ? 'flex items-center justify-around' : 'flex w-full flex-wrap'}`}>
                                                                <h1 className={`flex font-semibold text-blackCanadog ${expandedCard === card.id ? 'justify-start mn:text-[22px] md:text-2xl' : 'px-2 justify-end w-full mn:text-xl md:text-2xl'}`}>
                                                                    {card.title.substring(0, 3)}
                                                                    <span className='text-greenCanadog'>{card.title.substring(3)}</span>
                                                                </h1>
                                                                <h1 className={`flex font-semibold text-greenCanadog ${expandedCard === card.id ? 'justify-start mn:text-xl xl:text-2xl mn: hidden' : 'px-2 justify-end w-full mn:text-xs xl:text-sm'}`}>
                                                                    {card.old}
                                                                </h1>
                                                                {expandedCard === card.id && (
                                                                    <div className='flex flex-wrap'>
                                                                        <div className='flex items-center'>
                                                                            <Button className='bg-greenCanadog border border-greenCanadog text-white mn:text-xs md:text-base h-7' radius="full" onPress={onOpen}>
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
                
                                                            <p className={`font-normal text-gray ${expandedCard === card.id ? 'w-full h-[150px] text-[14px] px-2.5 mt-2' : 'w-full h-[60px] text-[12px]'}`}>
                                                                {expandedCard === card.id ? 
                                                                    (
                                                                        card.longDescription 
                                                                    ) 
                                                                    : 
                                                                    (
                                                                        window.innerWidth >= 1024 ? card.shortDescription.substring(0, 80) + "..." : 
                                                                        window.innerWidth >= 768 ? card.shortDescription.substring(0, 58) + "..." : 
                                                                        window.innerWidth >= 640 ? card.shortDescription.substring(0, 80) + "..." : 
                                                                        card.shortDescription.substring(0, 45) + "..."
                                                                    )
                                                                }
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
                }
            </section>

            <Divider className="my-4"/>

            {/* CARDS PRODUCTOS */}
            {/* <div className='relative mn:px-6 mn:py-2 mn:mt-2 md:px-6 md:py-6 md:mt-8'>
                <div className='grid max-w-7xl mx-auto md:grid-cols-2'>
                    <h2 className='mn:text-2xl md:text-4xl font-semibold'>
                        Compra nuestros {<span className='text-greenCanadog'>Productos</span>}
                    </h2>
                </div>
                <div className='max-w-7xl mx-auto'>
                    <p className='mt-4 font-normal text-blackCanadog'>
                        Con la compra de nuestros productos haras que todos los animales que rescatámos de las calles, rehabilitámos y ayudamos esten bien y puedan recibir mucho  
                        {<span className='text-greenCanadog font-semibold'> amor</span>}.
                    </p>
                </div>
            </div>

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
            </div> */}

            {/* CARDS HISTORIAS */}
            <div className='relative mn:px-6 mn:py-2 mn:mt-2 md:px-6 md:py-6 md:mt-8 text-blackCanadog'>
                <div className='grid max-w-7xl mx-auto md:grid-cols-2'>
                    <h2 className='mn:text-2xl md:text-4xl font-semibold'>
                        Historias {<span className='text-greenCanadog'>Emotivas</span>}
                    </h2>
                </div>
                <div className='max-w-7xl mx-auto'>
                    <p className='mt-4 lg:text-xl'>
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
                                className={`duration-300  transition-transform hover:scale-105 hover:shadow-md hover:shadow-greenLightCanadog 
                                    ${  isVisible ? "block" : "hidden" }`
                                }
                            >
                                <div className="flex flex-col items-center">
                                    <div className="m-2 border-2 border-mentaCanadog rounded-xl">
                                        <div className="flex flex-col justify-center gap-6 md:gap-2">
                                            <div className="m-4">
                                                <h1 className="flex flex-col justify-center font-bold text-greenCanadog text-2xl gap-2">
                                                    {card.title}
                                                    <span className="flex justify-start font-semibold text-blackCanadog text-base lg:text-xl">
                                                        y su familia
                                                    </span>
                                                </h1>
                                            </div>
                                            <div className="relative mn:w-[200px] mn:h-[300px] md:w-[250px] md:h-[400px]">
                                                <Image
                                                    src={card.image}
                                                    alt="cover"
                                                    className="object-cover rounded-b-xl"
                                                    fill
                                                />
                                            </div>
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
                        className={`p-4 py-2 bg-mentaCanadog rounded-xl shadow text-white transition 
                            ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-greenCanadog'}`}
                    >
                        ❮
                    </button>
                </div>

                <div className="absolute top-1/2 right-0 mn:right-5 lg:right-10 transform -translate-y-1/2">
                    <button
                        onClick={handleNext}
                        disabled={currentIndex + cardsToShow >= cardsHistory.length}
                        className={`p-4 py-2 bg-mentaCanadog rounded-xl shadow text-white transition 
                            ${currentIndex + cardsToShow >= cardsHistory.length ? 'opacity-50 cursor-not-allowed' : 'hover:bg-greenCanadog'}`}
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
            <section className="py-8 mb-10">
                <div className="text-center py-8 mn:max-w-xs md:max-w-[700px] lg:max-w-4xl xl:max-w-7xl mx-auto">
                    <h2 className="mb-6 text-3xl font-bold text-blackCanadog mn:text-2xl sm:text-4xl xl:text-5xl">Gracias aliados</h2>
                    <p className="mt-4 text-xl font-normal text-blackCanadog mn:text-base sm:text-lg xl:text-xl">
                        ¡Su ayuda es {<span className='text-greenCanadog font-semibold'>TODO</span>} para nosotros y para ellos!
                    </p>
                </div>

                <div className="mx-10 align-items-center gap-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 justify-center py-4">
                    {/* Card 1 */}
                    <Link 
                        href='https://www.instagram.com/makropetveterinaria/' 
                        target="_blank" 
                        className='flex justify-center items-center'
                    >
                        <div className="bg-white text-blackCanadog py-2 flex flex-col justify-center items-center gap-2 mn:w-[230px] md:w-[250px] border-2 border-greenCanadog hover:border-mentaCanadog rounded-lg">
                            <Image
                                className="w-28 h-28 rounded-full"
                                src={MakroPet.src}
                                width={100}
                                height={100}
                                alt="Makro Pet"
                            />
                            <div className='flex flex-col justify-center items-center'>
                                <p className="text-xl md:text-2xl font-bold">Makro Pet</p>
                                <p className="text-sm md:text-base font-semibold">@makropetveterinaria</p>
                            </div>
                        </div>
                    </Link>
                    
                    {/* Card 2 */}
                    <Link 
                        href='https://www.instagram.com/formadogs.escuelacanina/' 
                        target="_blank" 
                        className='flex justify-center items-center'
                    >
                        <div className="bg-white text-blackCanadog py-2 flex flex-col items-center gap-2 mn:w-[230px] md:w-[250px] border-2 border-greenCanadog hover:border-mentaCanadog rounded-lg">
                            <Image
                                className="w-28 h-28 rounded-full"
                                src={FormaDogs.src}
                                width={100}
                                height={100}
                                alt="Forma Dogs"
                            />
                            <div className='flex flex-col justify-center items-center'>
                                <p className="text-xl md:text-2xl font-bold">Formadogs</p>
                                <p className="text-sm md:text-base font-semibold">@formadogs.escuelacanina</p>
                            </div>
                        </div>
                    </Link>
                    
                    {/* Card 3 */}
                    <Link 
                        href='https://www.instagram.com/animalcliniccolina/' 
                        target="_blank" 
                        className='flex justify-center items-center'
                    >
                        <div className="bg-white text-blackCanadog py-2 flex flex-col items-center gap-2 mn:w-[230px] md:w-[250px] border-2 border-greenCanadog hover:border-mentaCanadog rounded-lg">
                            <Image
                                className="w-28 h-28 rounded-full"
                                src={AnimalClinic.src}
                                width={100}
                                height={100}
                                alt="James"
                            />
                            <div className='flex flex-col justify-center items-center'>
                                <p className="text-xl md:text-2xl font-bold">Animal Clinic</p>
                                <p className="text-sm md:text-base font-semibold">@animalcliniccolina</p>
                            </div>
                        </div>
                    </Link>
                    {/* Card 4 */}
                    {/* <Link 
                        href='https://www.instagram.com/danii.colibri/' 
                        target="_blank" 
                        className='flex justify-center items-center'
                    >
                        <div className="bg-white text-blackCanadog py-2 flex flex-col items-center gap-2 mn:w-[230px] md:w-[250px] border-2 border-greenCanadog hover:border-mentaCanadog rounded-lg">
                            <Image
                                className="w-28 h-28 rounded-full"
                                src={DaniColibri.src}
                                width={100}
                                height={100}
                                alt="James"
                            />
                            <div className='flex flex-col justify-center items-center'>
                                <p className="text-xl md:text-2xl font-bold">Dani Colibri</p>
                                <p className="text-sm md:text-base font-semibold">@danii.colibri</p>
                            </div>
                        </div>
                    </Link> */}
                    
                    {/* Card 5 */}
                    <Link 
                        href='https://www.instagram.com/makropetveterinaria/' 
                        target="_blank" 
                        className='flex justify-center items-center'
                    >
                        <div className="bg-white text-blackCanadog py-2 flex flex-col items-center gap-2 mn:w-[230px] md:w-[250px] border-2 border-greenCanadog hover:border-mentaCanadog rounded-lg">
                            <Image
                                className="w-28 h-28 rounded-full"
                                src={GoodBoy.src}
                                width={100}
                                height={100}
                                alt="James"
                            />
                            <div className='flex flex-col justify-center items-center'>
                                <p className="text-xl md:text-2xl font-bold">goodboy</p>
                                <p className="text-sm md:text-base font-semibold">@goodboy_petstudio</p>
                            </div>
                        </div>
                    </Link>

                    {/* Card 6 */}
                    <Link 
                        href='https://www.instagram.com/senintimo/' 
                        target="_blank" 
                        className='flex justify-center items-center'
                    >
                        <div className="bg-white text-blackCanadog py-2 flex flex-col items-center gap-2 mn:w-[230px] md:w-[250px] border-2 border-greenCanadog hover:border-mentaCanadog rounded-lg">
                            <Image
                                className="w-28 h-28 rounded-full"
                                src={SenIntimo.src}
                                width={100}
                                height={100}
                                alt="James"
                            />
                            <div className='flex flex-col justify-center items-center'>
                                <p className="text-2xl font-bold">Sen Intimo</p>
                                <p className="text-base font-semibold">@senintimo</p>
                            </div>
                        </div>
                    </Link>

                    {/* Card 7 */}
                    <Link 
                        href='https://www.instagram.com/eddieroofingsolutionllc/' 
                        target="_blank" 
                        className='flex justify-center items-center'
                    >
                        <div className="bg-white text-blackCanadog py-2 flex flex-col items-center gap-2 mn:w-[230px] md:w-[250px] border-2 border-greenCanadog hover:border-mentaCanadog rounded-lg">
                            <Image
                                className="w-28 h-28 rounded-full"
                                src={EddieRoffing.src}
                                width={100}
                                height={100}
                                alt="James"
                            />
                            <div className='flex flex-col justify-center items-center'>
                                <p className="text-2xl font-bold">Eddie Roofing</p>
                                <p className="text-sm font-semibold">@eddieroofingsolutionllc</p>
                            </div>
                        </div>
                    </Link>

                    {/* Card 8 */}
                    <Link 
                        href='https://www.instagram.com/marilsaoficial/' 
                        target="_blank" 
                        className='flex justify-center items-center'
                    >
                        <div className="bg-white text-blackCanadog py-2 flex flex-col items-center gap-2 mn:w-[230px] md:w-[250px] border-2 border-greenCanadog hover:border-mentaCanadog rounded-lg">
                            <Image
                                className="w-28 h-28 rounded-full"
                                src={LogoMarilsa.src}
                                width={100}
                                height={100}
                                alt="James"
                            />
                            <div className='flex flex-col justify-center items-center'>
                                <p className="text-2xl font-bold">Marilsa</p>
                                <p className="text-base font-semibold">@marilsaoficial</p>
                            </div>
                        </div>
                    </Link>

                    {/* Card 9 */}
                    <Link 
                        href='https://www.instagram.com/venatastudio/' 
                        target="_blank" 
                        className='flex justify-center items-center'
                    >
                        <div className="bg-white text-blackCanadog py-2 flex flex-col items-center gap-2 mn:w-[230px] md:w-[250px] border-2 border-greenCanadog hover:border-mentaCanadog rounded-lg">
                            <Image
                                className="w-28 h-28 rounded-full"
                                src={LogoVeñata.src}
                                width={100}
                                height={100}
                                alt="James"
                            />
                            <div className='flex flex-col justify-center items-center'>
                                <p className="text-2xl font-bold">Veñata</p>
                                <p className="text-base font-semibold">@venatastudio</p>
                            </div>
                        </div>
                    </Link>

                    {/* Card 10 */}
                    <Link 
                        href='https://www.instagram.com/famigo.official/' 
                        target="_blank" 
                        className='flex justify-center items-center'
                    >
                        <div className="bg-white text-blackCanadog py-2 flex flex-col items-center gap-2 mn:w-[230px] md:w-[250px] border-2 border-greenCanadog hover:border-mentaCanadog rounded-lg">
                            <Image
                                className="w-28 h-28 rounded-full"
                                src={LogoFamigo.src}
                                width={100}
                                height={100}
                                alt="James"
                            />
                            <div className='flex flex-col justify-center items-center'>
                                <p className="text-2xl font-bold">Famigo</p>
                                <p className="text-base font-semibold">@famigo.official</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            <Divider className="my-4"/>

            {/* BANNER FINAL */}
            <div className='relative mn:px-6 mn:py-2 mn:mt-2 md:px-6 md:py-6 md:mt-8'>
                <div className='grid mn:max-w-xs md:max-w-[700px] lg:max-w-4xl xl:max-w-7xl mx-auto'>
                    <h2 className='mn:text-2xl md:text-4xl font-semibold text-blackCanadog'>
                        Pasos para {<span className='text-greenCanadog'>adoptar</span>} a tu nuevo compañero
                    </h2>
                </div>
            </div>

            <div className="mn:max-w-[230px] md:max-w-[700px] lg:max-w-4xl xl:max-w-7xl mx-auto mt-10 mb-20 lg:gap-4 py-4 align-items-center gap-6 grid mn:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center border-2 border-mentaCanadog rounded-lg">
                {/* Card 1 */}
                <div className="bg-white text-blackCanadog flex flex-col items-center gap-2">
                    <Image
                        className="mn:w-32 mn:h-40 md:w-36 md:h-48 lg:w-40 lg:h-52 xl:w-44 xl:h-60"
                        src={Explora.src}
                        width={100}
                        height={100}
                        alt="Explora"
                    />
                </div>
                
                {/* Card 2 */}
                <div className="bg-white text-blackCanadog flex flex-col items-center gap-2">
                    <Image
                        className="mn:w-32 mn:h-40 md:w-36 md:h-48 lg:w-40 lg:h-52 xl:w-44 xl:h-60"
                        src={Aplica.src}
                        width={100}
                        height={100}
                        alt="Aplica"
                    />
                </div>
                
                {/* Card 3 */}
                <div className="bg-white text-blackCanadog flex flex-col items-center gap-2">
                    <Image
                        className="mn:w-32 mn:h-40 md:w-36 md:h-48 lg:w-40 lg:h-52 xl:w-44 xl:h-60"
                        src={Entrevista.src}
                        width={100}
                        height={100}
                        alt="Entrevista"
                    />
                </div>
                {/* Card 4 */}
                <div className="bg-white text-blackCanadog flex flex-col items-center gap-2">
                    <Image
                        className="mn:w-32 mn:h-40 md:w-36 md:h-48 lg:w-40 lg:h-52 xl:w-44 xl:h-60"
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