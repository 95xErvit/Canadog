"use client";
import React, { useEffect, useState, useRef } from 'react';
import { Button, Card, Input,CardBody, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, usePagination, PaginationItemType, Checkbox, Textarea, Link } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/react";
import {Divider} from "@nextui-org/divider";
import { Dialog } from "primereact/dialog";
import { Carousel } from 'primereact/carousel';
import {Pagination} from "@nextui-org/react";
import  Banner from "./Banner"
import  AdBanner from "./BannerMenor"
import  AdBannerP from "./BannerPequeño"
import Image from 'next/image';
import MakroPet from "@/public/Makropet.jpg"
import FormaDogs from "@/public/Formadogs.jpg"
import AnimalClinic from "@/public/AnimalClinic.jpeg"

import GoodBoy from "@/public/goodboy.jpg"
import SenIntimo from "@/public/SEN_ÍNTIMO_LOGO.jpg"
import EddieRoffing from"@/public/EDDIE_ROOFING_LOGO.jpeg"
import LogoMarilsa from "@/public/Logo-Marilsa.jpg"
import LogoVeñata from "@/public/Logo-Veñata.jpg"
import LogoFamigo from "@/public/Logo_Famigo.png"
import { GetPets, GetProducts } from '../Data/Data';
import axios from 'axios';
import Hero from './Components/Hero';
import CardsAnimals from './Components/CardsAnimals';

export default function Home({ CardsDogs, CardsCats, CardsHistory, DogsLength }: any) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    //const [expand, setExpand] = useState(false);
    const [isDog, setIsDog] = useState(true);
    const [isEjecuted, setIsEjecuted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedCard, setExpandedCard] = useState<number | null>(null);
    const [indiceActual, setIndiceActual] = useState<number>(0);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [HistoryCards, setHistoryCards] = useState(CardsHistory)
    const [Dogs, setDogs] = useState<any>(CardsDogs)
    const [Cats, setCats] = useState<any>(CardsCats)
    
    // const toggleExpand = (id: number) => {
    //     setExpandedCard(expandedCard === id ? null : id);
    //     setIndiceActual(0)
    // };

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
                
                setHistory(arrayHistory.array)
                
                console.log(DogsLength)
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
    }, [])

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
            if(expandedCard !== null)
            {   console.log("hola")
                if(Dogs.find((card : any) => card.id === expandedCard))
                {
                    const leng = Dogs.find((card : any) => card.id === expandedCard).Image.length
    
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

    // Función para manejar el cambio de página en la paginación
    const handlePageChange = (page: number) => {
        setCurrentPage(page); // Actualiza la página actual cuando cambia
    };

    //

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

    // Json datos de aliados 
    const allies = [
        { 
            name: "Makro Pet", 
            username: "@makropetveterinaria", 
            url: "https://www.instagram.com/makropetveterinaria/", 
            image: MakroPet.src 
        },
        { 
            name: "Formadogs", 
            username: "@formadogs.escuelacanina", 
            url: "https://www.instagram.com/formadogs.escuelacanina/", 
            image: FormaDogs.src 
        },
        { 
            name: "Animal Clinic", 
            username: "@animalcliniccolina", 
            url: "https://www.instagram.com/animalcliniccolina/", 
            image: AnimalClinic.src 
        },
        { 
            name: "goodboy", 
            username: "@goodboy_petstudio", 
            url: "https://www.instagram.com/goodboy_petstudio/", 
            image: GoodBoy.src 
        },
        { 
            name: "Sen Intimo", 
            username: "@senintimo", 
            url: "https://www.instagram.com/senintimo/", 
            image: SenIntimo.src 
        },
        { 
            name: "Eddie Roofing", 
            username: "@eddieroofingsolutionllc", 
            url: "https://www.instagram.com/eddieroofingsolutionllc/", 
            image: EddieRoffing.src 
        },
        { 
            name: "Marilsa", 
            username: "@marilsaoficial", 
            url: "https://www.instagram.com/marilsaoficial/", 
            image: LogoMarilsa.src 
        },
        { 
            name: "Veñata", 
            username: "@venatastudio", 
            url: "https://www.instagram.com/venatastudio/", 
            image: LogoVeñata.src 
        },
        { 
            name: "Famigo", 
            username: "@famigo.official", 
            url: "https://www.instagram.com/famigo.official/", 
            image: LogoFamigo.src 
        }
    ];
    
    // Simula la carga de datos (puedes reemplazar esto con tu lógica real de carga)
    // Si ya tienes un useEffect para cargar los datos, solo pon setIsLoadingCards(false) cuando terminen de cargar
    React.useEffect(() => {
        // Simulación de carga de 1 segundo
        const timer = setTimeout(() => setIsLoadingCards(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return(
        <div>
            {/* SECCIÓN INICIAL*/}
            <Hero/>

            <Divider className="my-4"/>

            {/* CARDS ADOPCION */}
            <CardsAnimals CardsDogs={Dogs} CardsCats={Cats} />

            <Divider className="my-4"/>

            <div className="relative px-4">
                <div className="flex justify-center mn:gap-4 md:gap-10 p-4 md:p-8 overflow-x-auto">
                    {HistoryCards.map((card: any, index: any) => {
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
                                    <div className="m-2 border-2 border-green rounded-xl">
                                        <div className="flex flex-col justify-center gap-6 md:gap-4">
                                            <div className="m-4">
                                                <h1 className="flex flex-col justify-center font-bold text-green drop-shadow-[2px_1px_0px_#ADADAD] text-2xl gap-2">
                                                    {card.ANIMALS_NAME}
                                                    <span className="flex justify-start font-semibold text-black text-base lg:text-xl drop-shadow-none">
                                                        y su familia
                                                    </span>
                                                </h1>
                                            </div>

                                            <div className="relative mn:w-[200px] mn:h-[300px] md:w-[250px] md:h-[400px]">
                                                <Image
                                                    src={card.ANIMALS_IMAGE_1}
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
                        className={`p-3 py-2 bg-green rounded-xl shadow text-white transition 
                            ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-mentaCanadog'}`}
                    >
                        <i className="pi pi-angle-left" style={{ fontSize: '1rem' }}/>
                    </button>
                </div>

                <div className="absolute top-1/2 right-0 mn:right-5 lg:right-10 transform -translate-y-1/2">
                    <button
                        onClick={handleNext}
                        disabled={currentIndex + cardsToShow >= History.length}
                        className={`p-3 py-2 bg-green rounded-xl shadow text-white transition 
                            ${currentIndex + cardsToShow >= History.length ? 'opacity-50 cursor-not-allowed' : 'hover:bg-mentaCanadog'}`}
                    >
                        <i className="pi pi-angle-right" style={{ fontSize: '1rem' }}/>
                    </button>
                </div>
            </div>

            <Divider className="my-4"/>

            

            <Divider className="my-4"/>

            

            <Divider className="my-4"/>
        </div>
    )
}
