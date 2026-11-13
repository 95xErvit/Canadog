"use client";
import React, { useEffect, useState, useRef } from 'react';
import { Button, Card, CardBody, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/react";
import { Carousel } from 'primereact/carousel';
import {Pagination} from "@nextui-org/react";
import Image from 'next/image';
import { GetPets, GetProducts } from '../../Data/Data';
import { motion, useReducedMotion } from 'framer-motion';

const headerStaggerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.16,
        },
    },
};

const selectorStaggerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const animalCardVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.35, ease: 'easeOut' as const },
    },
};

const animalCardsStaggerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

// Transición de layout al expandir/cerrar una tarjeta de mascota
const layoutTransition = {
    layout: { duration: 0.45, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
    opacity: { duration: 0.35, ease: 'easeOut' as const },
};

const entranceItemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' as const },
    },
};

export default function CardsAnimals({ CardsDogs, CardsCats} : any) {
        const prefersReducedMotion = useReducedMotion();
        const headerEntranceProps = prefersReducedMotion ? {} : {
            initial: 'hidden' as const,
            whileInView: 'visible' as const,
            viewport: { once: true, amount: 0.3 },
        };
        // Solo se anima el contenido interno después de la primera interacción (no en la carga inicial)
        const hasToggled = useRef(false);
        const contentInitial = hasToggled.current && !prefersReducedMotion ? { opacity: 0 } : false;
        const {onOpen} = useDisclosure();
        //const [expand, setExpand] = useState(false);
        const [isDog, setIsDog] = useState(true);
        const [isEjecuted, setIsEjecuted] = useState(false);
        const [currentPage, setCurrentPage] = useState(1);
        const [expandedCard, setExpandedCard] = useState<number | null>(null);
        const [indiceActual, setIndiceActual] = useState<number>(0);
        const [isOpenModal, setIsOpenModal] = useState(false);
        const [selectedImage, setSelectedImage] = useState(null);
        const [Dogs, setDogs] = useState<any>(CardsDogs)
        const [Cats, setCats] = useState<any>(CardsCats)
        const itemsAdoptions = 9; // Cantidad de tarjetas para mostrar por página
        const cards = isDog ? Dogs : Cats;
        const totalPagesAdoptions = Math.ceil(cards.length / itemsAdoptions);
        const startIndex = (currentPage - 1) * itemsAdoptions;
        const endIndex = startIndex + itemsAdoptions;
        const currentCards = cards.slice(startIndex, endIndex);
        const [currentIndex, setCurrentIndex] = useState(0);
        const [cardsToShow, setCardsToShow] = useState(4); 
        const [isLoadingCards, setIsLoadingCards] = useState(true);
    
        // Función para obtener las tarjetas de historia según la página actual
        useEffect(() =>{
            const fetchData = async () => {
                try 
                {
                    //const response = await axios.get('/UserCanaDog/CMS/api/pets',{params:{Type:"HISTORY"}});
                    let arrayHistory : any = await GetPets(true,"HISTORY", "CANADOG", true);
                    console.log(arrayHistory.array)
                    let arrayDogs : any = await GetPets(true,"Dog", "CANADOG", true);
                    let cardsDogs = arrayDogs.array
                    let arrayCats: any = await GetPets(true, "Cat", "CANADOG", true);
                    let cardsCats = arrayCats.array
                    console.log(arrayDogs.array)
                    
                    //setHistory(arrayHistory.array)
                    
                    //console.log(DogsLength)
                    //let isExit = false
                    
                    const resultDogs = cardsDogs.map((pet: any) => ({
                        ...pet,
                        Image: pet.Image.filter((image: any) => image?.image != null)
                    }));
    
                    const resultCats = cardsCats.map((pet: any) => ({
                        ...pet,
                        Image: pet.Image.filter((image: any) => image?.image != null)
                    }));
    
                    setDogs(resultDogs)
                    setCats(resultCats)
                    setIsEjecuted(true)
    
                } 
                catch (error) 
                {
                    console.error('Error:', error);
                }
            };
    
            if(!isEjecuted)
            {   
                console.log("Ejecutando")
                fetchData()
            }
        }, [isEjecuted])
    
        //  Función para obtener la cantidad de tarjetas a mostrar según el tamaño de la pantalla
        useEffect(() => {
            const updateCardsToShow = () => {
                if (window.innerWidth < 640) {
                    setCardsToShow(1); 
                } else if (window.innerWidth < 1024) {
                    setCardsToShow(2);
                } else if (window.innerWidth < 1380) {
                    setCardsToShow(3); 
                } else {
                    setCardsToShow(4); 
                }
            };
            
    
            const intervalo = setInterval(() => {
                if (expandedCard !== null) {
                    const expandedDog = Dogs.find((card: any) => card.id === expandedCard);
                    if (expandedDog) {
                        setIndiceActual((index) => {
                            const nextIndex = index + 1;
                            return nextIndex >= expandedDog.Image.length ? 0 : nextIndex;
                        });
                    }
                }
            }, 6000);
    
    
            updateCardsToShow();
            window.addEventListener("resize", updateCardsToShow);
        
            return () => {
                clearInterval(intervalo);
                window.removeEventListener("resize", updateCardsToShow);
            };
        }, [Dogs, expandedCard]);
    
        // Función para manejar el cambio de página en la paginación
        const handlePageChange = (page: number) => {
            setCurrentPage(page); // Actualiza la página actual cuando cambia
        };
    
        // Funciones para manejar el desplazamiento del carrusel de historia
        const handleNext = () => {
            setCurrentIndex((prevIndex) =>
              prevIndex + cardsToShow < History.length ? prevIndex + 1 : prevIndex
            );
        };
    
        // Función para manejar el desplazamiento hacia atrás del carrusel de historia
        const handlePrevious = () => {
            setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
        };
    
        // Función para renderizar cada imagen del carrusel de adopción
        const imageCarousel = (image : any) => {
            console.log(image.image)
            return (
                <div className='w-full'>
                    <Image
                        alt="Album cover"
                        className={`shadow-md transition-all duration-100 w-full h-[220px] object-cover cursor-pointer`}
                        width={140}
                        height={200}
                        src={image.image}
                        onClick={() => {
                            setSelectedImage(image.image);
                            setIsOpenModal(true);
                        }} 
                    />
                </div>
            );
        };
    
        // Función para renderizar cada imagen del carrusel de historia
        const ImageExpand = (image : any) => {
            console.log(image.image)
            return (
                <div className='w-full'>
                    <Image
                        alt="Album cover"
                        className={`shadow-md transition-all duration-100 w-full mn:h-[350px] xl:h-[500px] object-cover cursor-pointer`}
                        width={300}
                        height={300}
                        src={image.image}
                        onClick={() => {
                            setSelectedImage(image.image);
                            setIsOpenModal(true);
                        }} 
                    />
                </div>
            );
        };
    
        // Referencia para almacenar las referencias de las tarjetas de adopción
        const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    
        // Función para alternar la expansión de una tarjeta de adopción
        const toggleExpand = (id: number) => {
            hasToggled.current = true;
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
            }, 450); // Espera a que termine la animación de layout (0.45 s)
        };

        // Simula la carga de datos (puedes reemplazar esto con tu lógica real de carga)
        // Si ya tienes un useEffect para cargar los datos, solo pon setIsLoadingCards(false) cuando terminen de cargar
        React.useEffect(() => {
            // Simulación de carga de 1 segundo
            const timer = setTimeout(() => setIsLoadingCards(false), 2000);
            return () => clearTimeout(timer);
        }, []);

    return (
        <>
            <section id='adopciones'>
                <>
                    <div className='relative mn:px-6 mn:py-2 md:p-6'>
                        <motion.div
                            {...headerEntranceProps}
                            variants={prefersReducedMotion ? undefined : headerStaggerVariants}
                            className='grid max-w-7xl mx-auto'
                        >
                            <motion.h2
                                variants={prefersReducedMotion ? undefined : entranceItemVariants}
                                className='mn:text-2xl md:text-4xl text-brown font-semibold'
                            >
                                Encuentra a tu {<span className='text-green drop-shadow-[2px_1px_0px_#ADADAD]'>mejor amigo</span>}
                            </motion.h2>
                            
                            <motion.div
                                variants={prefersReducedMotion ? undefined : selectorStaggerVariants}
                                className="flex gap-4 mn:my-4 md:my-8 mn:justify-center md:justify-start"
                            >
                                <motion.div variants={prefersReducedMotion ? undefined : entranceItemVariants} className="group relative flex flex-col items-center mn:my-4 md:mt-10">
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
                                        className={`bg-transparent shadow-md shadow-black/40 hover:border-2 hover:border-brown hover:bg-brownLight text-brown hover:text-white font-semibold rounded-lg ${isDog ? "bg-brown border-2 border-brown text-white" : "border-2 border-green text-brown"}`}
                                        size="lg"
                                    >
                                        Guaus
                                    </Button>
                                </motion.div>
                                
                                <motion.div variants={prefersReducedMotion ? undefined : entranceItemVariants} className="group relative flex flex-col items-center mn:my-4 md:mt-10">
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
                                        className={`bg-transparent shadow-md shadow-black/40 hover:border-2 hover:border-brown hover:bg-brownLight text-brown hover:text-white font-semibold rounded-lg ${!isDog ? "bg-brown border-2 border-brown text-white" : "border-2 border-green text-brown"}`}
                                        size="lg"
                                    >
                                        Miaus
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </>

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
                                    <ScrollShadow className="mn:w-full mn:h-[530px] md:w-full md:h-[500px]" size={0}>
                                        {isLoadingCards ? (
                                            <div className="flex flex-col items-center justify-center w-full mn:h-[530px] md:h-[500px]">
                                                {/* <Image src="/loading-paw.gif" alt="Cargando..." width={120} height={120} /> */}
                                                <span className="filter drop-shadow-[0_0_0.5rem_#f82e03] animate-pulse inline-block mn:m-2 md:m-0">
                                                    <Image 
                                                        alt="lovePets" 
                                                        src="/mascotas.png" 
                                                        height="50" 
                                                        width="50"
                                                    />
                                                </span> 

                                                <span className="mt-4 text-black font-semibold text-lg md:text-xl">Cargando adopciones...</span>
                                            </div>
                                        ) : (
                                            <motion.div
                                                key={currentCards.map((card: any) => card.id).join(':')}
                                                initial={prefersReducedMotion ? false : 'hidden'}
                                                animate='visible'
                                                variants={prefersReducedMotion ? undefined : animalCardsStaggerVariants}
                                                className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'
                                            >
                                                {currentCards.map((card: any) => (
                                                    <motion.div
                                                        variants={prefersReducedMotion ? undefined : animalCardVariants}
                                                        layout={!prefersReducedMotion}
                                                        transition={layoutTransition}
                                                        key={card.id}
                                                        ref={(el) => {
                                                            cardRefs.current[card.id] = el; 
                                                        }}
                                                        className={`relative m-4 
                                                            ${expandedCard === card.id ? 'row-span-2 z-50' : 'row-span-1'}
                                                            ${expandedCard === card.id ? 'h-auto' : 'h-[200px]'}
                                                        `}
                                                        
                                                    >
                                                        <Card>
                                                            <motion.div
                                                                key={expandedCard === card.id ? 'open' : 'closed'}
                                                                layout={prefersReducedMotion ? false : 'position'}
                                                                initial={contentInitial}
                                                                animate={{ opacity: 1 }}
                                                                transition={{ duration: 0.35, ease: 'easeOut' }}
                                                                className={`flex items-center ${expandedCard === card.id ? 'flex-col mn:h-[500px] md:h-[470px] lg:h-[450px]' : ''}`}
                                                            >
                                                                {expandedCard === card.id ? (
                                                                    <>
                                                                        {/* Carousel principal */}
                                                                        <Carousel 
                                                                            value={card.Image} 
                                                                            numScroll={1} 
                                                                            numVisible={1}  
                                                                            itemTemplate={imageCarousel} 
                                                                            className="bg-black/10 w-full" 
                                                                            showIndicators={false} 
                                                                        />

                                                                        {/* Modal para ver la imagen en grande */}
                                                                        <Modal
                                                                            isOpen={isOpenModal}
                                                                            onOpenChange={setIsOpenModal}
                                                                            className="flex items-center justify-center w-[90vw] md:w-[50vw] xl:w-[80vw]"
                                                                        >
                                                                            <ModalContent className="flex items-center justify-center">
                                                                                <Carousel 
                                                                                    value={card.Image} 
                                                                                    numScroll={1} 
                                                                                    numVisible={1} 
                                                                                    itemTemplate={ImageExpand} 
                                                                                    className="bg-white w-full h-full"
                                                                                    showIndicators={false} 
                                                                                />
                                                                            </ModalContent>
                                                                        </Modal>
                                                                    </>
                                                                ) : (
                                                                    <Image
                                                                        alt="Album cover"
                                                                        className={`shadow-md transition-all duration-100 bg-green object-cover aspect-[4/3] ${expandedCard === card.id ? 'w-full h-[220px]' : 'mn:w-[140px] md:w-[170px] h-[200px]'}`}
                                                                        width={140}
                                                                        height={200}
                                                                        src={card.Image[0]?.image}
                                                                    />
                                                                )}

                                                                <CardBody className={`${expandedCard === card.id ? 'w-full h-auto' : 'w-[170px] h-[200px] justify-around'}`}>
                                                                    <div className={`${expandedCard === card.id ? 'flex items-center justify-around' : 'flex w-full flex-wrap'}`}>
                                                                        <h1 className={`flex font-semibold text-black ${expandedCard === card.id ? 'justify-start mn:text-[22px] md:text-2xl' : 'px-2 justify-end w-full mn:text-xl md:text-2xl'}`}>
                                                                            {card.title.substring(0, 3)}
                                                                            <span className='text-green drop-shadow-[2px_1px_0px_#ADADAD]'>{card.title.substring(3)}</span>
                                                                        </h1>

                                                                        <h2 className={`flex font-semibold text-brownLight ${expandedCard === card.id ? 'justify-start mn:text-xl xl:text-2xl mn: hidden' : 'px-2 justify-end w-full mn:text-xs xl:text-sm'}`}>
                                                                            {card.old}
                                                                        </h2>

                                                                        {expandedCard === card.id && (
                                                                            <div className='flex flex-wrap'>
                                                                                <div className='flex items-center'>
                                                                                    <Button className='bg-brown text-white mn:text-xs md:text-base h-7 shadow-md' radius="full" onPress={onOpen}>
                                                                                        Adoptame
                                                                                    </Button>
                                                                                </div>

                                                                                <div className='flex items-center'>
                                                                                    <Button
                                                                                        onClick={() => toggleExpand(card.id)}
                                                                                        className='bg-transparent text-end mn:min-w-10 xl:min-w-20 px-0'
                                                                                        endContent={<i className="pi pi-arrow-circle-up" style={{ color: '#3F3F3F', fontSize: '1.5rem' }} />}
                                                                                        radius="full"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                        
                                                                    <p className={`font-normal text-black ${expandedCard === card.id ? 'w-full h-[200px] text-[14px] p-2' : 'w-full h-[60px] text-[12px]'}`}>
                                                                        {expandedCard === card.id ? 
                                                                            (
                                                                                card.longDescription 
                                                                            ) 
                                                                            : 
                                                                            (
                                                                                window.innerWidth >= 1024 ? card.shortDescription.substring(0, 75) + "..." : 
                                                                                window.innerWidth >= 768 ? card.shortDescription.substring(0, 58) + "..." : 
                                                                                window.innerWidth >= 640 ? card.shortDescription.substring(0, 80) + "..." : 
                                                                                card.shortDescription.substring(0, 55) + "..."
                                                                            )
                                                                        }
                                                                    </p>
                                                        
                                                                    {expandedCard !== card.id && (
                                                                        <div className="flex justify-center">
                                                                            <Button
                                                                                onClick={() => toggleExpand(card.id)}
                                                                                className='bg-transparent border-2 border-green text-brownLight text-xs shadow-md'
                                                                                endContent={<i className="pi pi-arrow-circle-down" style={{ color: '#59290C' }} />}
                                                                                radius="full"
                                                                            >
                                                                                Más sobre mi
                                                                            </Button>
                                                                        </div>
                                                                    )}
                                                                </CardBody>
                                                            </motion.div>
                                                        </Card>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        )}
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
                                        <motion.div
                                            key={currentCards.map((card: any) => card.id).join(':')}
                                            initial={prefersReducedMotion ? false : 'hidden'}
                                            animate='visible'
                                            variants={prefersReducedMotion ? undefined : animalCardsStaggerVariants}
                                            className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'
                                        >
                                            {currentCards.map((card: any) => (
                                            <motion.div
                                                variants={prefersReducedMotion ? undefined : animalCardVariants}
                                                layout={!prefersReducedMotion}
                                                transition={layoutTransition}
                                                key={card.id}
                                                ref={(el) => {
                                                    cardRefs.current[card.id] = el; 
                                                }}
                                                className={`relative m-4 
                                                    ${expandedCard === card.id ? 'row-span-2 z-50' : 'row-span-1'}
                                                    ${expandedCard === card.id ? 'h-auto' : 'h-[200px]'}
                                                `}
                                            >
                                                <Card className='transition-transform duration-100'>
                                                    <motion.div
 key={expandedCard === card.id ? 'open' : 'closed'}
 layout={prefersReducedMotion ? false : 'position'}
 initial={contentInitial}
 animate={{ opacity: 1 }}
 transition={{ duration: 0.35, ease: 'easeOut' }}
 className={`flex items-center ${expandedCard === card.id ? 'flex-col mn:h-[500px] md:h-[470px] lg:h-[450px] gap-2' : ''}`}>
                                                        {expandedCard === card.id ? (
                                                            /*<Image
                                                                alt="Album cover"
                                                                className={`shadow-md transition-all duration-100 ${expandedCard === card.id ? 'w-full h-[220px]' : 'w-[170px] h-[200px]'} bg-greenLightCanadog object-contain`}
                                                                width={140}
                                                                height={200}
                                                                src={card.image}
                                                            />*/
                                                            <>
                                                                {/* Carousel principal */}
                                                                <Carousel 
                                                                    value={card.Image} 
                                                                    numScroll={1} 
                                                                    numVisible={1}  
                                                                    itemTemplate={imageCarousel} 
                                                                    className="bg-black/10" 
                                                                    showIndicators={false} 
                                                                />

                                                                {/* Modal para ver la imagen en grande */}
                                                                <Modal
                                                                    isOpen={isOpenModal}
                                                                    onOpenChange={setIsOpenModal}
                                                                    className="flex items-center justify-center w-[90vw] md:w-[50vw] xl:w-[80vw]"
                                                                >
                                                                    <ModalContent className="flex items-center justify-center">
                                                                        <Carousel 
                                                                            value={card.Image} 
                                                                            numScroll={1} 
                                                                            numVisible={1} 
                                                                            itemTemplate={ImageExpand} 
                                                                            className="bg-black/10 w-full h-full"
                                                                            showIndicators={false} 
                                                                        />
                                                                    </ModalContent>
                                                                </Modal>
                                                            </>
                                                            ) : (
                                                            <Image
                                                                alt="Album cover"
                                                                className={`shadow-md transition-all duration-100 bg-greenLightCanadog object-cover aspect-[4/3] ${expandedCard === card.id ? 'w-full h-[220px]' : 'mn:w-[140px] md:w-[170px] h-[200px]'}`}
                                                                width={140}
                                                                height={200}
                                                                src={card.Image[0]?.image}
                                                            />
                                                        )}

                                                        <CardBody className={`${expandedCard === card.id ? 'w-full h-auto' : 'w-[170px] h-[200px] justify-around'}`}>
                                                            <div className={`${expandedCard === card.id ? 'flex items-center justify-around' : 'flex w-full flex-wrap'}`}>
                                                                <h1 className={`flex font-semibold text-blackCanadog ${expandedCard === card.id ? 'justify-start mn:text-[22px] md:text-2xl' : 'px-2 justify-end w-full mn:text-xl md:text-2xl'}`}>
                                                                    {card.title.substring(0, 3)}
                                                                    <span className='text-green drop-shadow-[2px_1px_0px_#ADADAD]'>{card.title.substring(3)}</span>
                                                                </h1>

                                                                <h1 className={`flex font-semibold text-brown ${expandedCard === card.id ? 'justify-start mn:text-xl xl:text-2xl mn: hidden' : 'px-2 justify-end w-full mn:text-xs xl:text-sm'}`}>
                                                                    {card.old}
                                                                </h1>

                                                                {expandedCard === card.id && (
                                                                    <div className='flex flex-wrap'>
                                                                        <div className='flex items-center'>
                                                                            <Button className='bg-brown text-white mn:text-xs md:text-base h-7' radius="full" onPress={onOpen}>
                                                                                Adoptame
                                                                            </Button>
                                                                        </div>

                                                                        <div className='flex items-center'>
                                                                            <Button
                                                                                onClick={() => toggleExpand(card.id)}
                                                                                className='bg-transparent text-end mn:min-w-10 xl:min-w-20 px-0'
                                                                                endContent={<i className="pi pi-arrow-circle-up" style={{ color: '#3F3F3F', fontSize: '1.5rem' }} />}
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
                                                                        card.shortDescription.substring(0, 55) + "..."
                                                                    )
                                                                }
                                                            </p>
                
                                                            {expandedCard !== card.id && (
                                                                <div className="flex justify-center">
                                                                    <Button
                                                                        onClick={() => toggleExpand(card.id)}
                                                                        className='bg-transparent border-2 border-green text-brownLight text-xs shadow-md'
                                                                        radius="full"
                                                                        endContent={<i className="pi pi-arrow-circle-down" style={{ color: '#59290C' }} />}
                                                                    >
                                                                        Más sobre mi
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </CardBody>
                                                    </motion.div>
                                                </Card>
                                            </motion.div>
                                            ))}
                                        </motion.div>
                                    </ScrollShadow>

                                    {/* Paginador */}
                                    <div className="flex justify-center mb-4">
                                        <Pagination
                                            showControls
                                            color={"success"}
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
        </>
    )
}