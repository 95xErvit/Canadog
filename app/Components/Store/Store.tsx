"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, usePagination, PaginationItemType, Checkbox, CheckboxGroup, Textarea, Link } from "@nextui-org/react";
import {ScrollShadow} from "@nextui-org/react";
import  Banner from "../Home/Banner"
import  AdBanner from "../Home/BannerMenor"
import  AdBannerP from "../Home/BannerPequeño"
import Image from 'next/image';
import {Divider} from "@nextui-org/divider";
import {Pagination} from "@nextui-org/react";
import CanadogStore from "@/public/CanadogCompra.jpg"
import { GetProducts } from '../Data/Data';
import axios from 'axios';

// Normaliza texto para buscar sin importar mayúsculas ni tildes
const normalize = (value: string) =>
    value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

// Datos para filtrar. El backend aún no envía comercio, categoría ni ciudad:
// cuando existan, basta con que lleguen con alguno de estos nombres (o ajustar aquí).
const getCommerce = (p: any): string => String(p?.commerce ?? p?.COMMERCE_NAME ?? p?.comercio ?? '').trim();
const getCategory = (p: any): string => String(p?.category ?? p?.CATEGORY_NAME ?? p?.categoria ?? '').trim();
const getCity = (p: any): string => String(p?.city ?? p?.CITY_NAME ?? p?.ciudad ?? '').trim();

// Valores únicos, ordenados de la A a la Z
const uniqueSorted = (values: string[]) =>
    Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));

//{Dogs, Cats}: any
export default function Store({ CardsProducts }: any) {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    //const [expand, setExpand] = useState(false);
    const [isDog, setIsDog] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedCard, setExpandedCard] = useState<number | null>(null);
    // GetProducts devuelve el objeto de error (no lanza) si la API falla: solo se aceptan arreglos
    const initialProducts = Array.isArray(CardsProducts) ? CardsProducts : []
    const [Products, setProducts] = useState<any[]>(initialProducts)
    const toggleExpand = (id: number) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    const itemsAdoptions = 9; // Cantidad de tarjetas para mostrar por página

    // Filtros tipo ecommerce
    const [commerceQuery, setCommerceQuery] = useState('');
    const [selectedCommerces, setSelectedCommerces] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [sortAZ, setSortAZ] = useState(true);          // true: A–Z, false: Z–A
    const [showFilters, setShowFilters] = useState(false); // Panel de filtros en móvil

    const commerceOptions = useMemo(() => uniqueSorted(Products.map(getCommerce)), [Products]);
    const categoryOptions = useMemo(() => uniqueSorted(Products.map(getCategory)), [Products]);
    const cityOptions = useMemo(() => uniqueSorted(Products.map(getCity)), [Products]);

    // Los comercios de la lista se acotan con lo que se escribe en el buscador
    const visibleCommerceOptions = commerceOptions.filter((name) => normalize(name).includes(normalize(commerceQuery)));

    const filteredProducts = useMemo(() => {
        const query = normalize(commerceQuery);
        const list = Products.filter((p) => {
            const commerce = getCommerce(p);
            return (
                (!query || normalize(commerce).includes(query)) &&
                (selectedCommerces.length === 0 || selectedCommerces.includes(commerce)) &&
                (selectedCategories.length === 0 || selectedCategories.includes(getCategory(p))) &&
                (selectedCities.length === 0 || selectedCities.includes(getCity(p)))
            );
        });

        // Orden alfabético por comercio (y por nombre del producto si no tiene comercio)
        return [...list].sort((a, b) => {
            const keyA = getCommerce(a) || String(a?.title ?? '');
            const keyB = getCommerce(b) || String(b?.title ?? '');
            const result = keyA.localeCompare(keyB, 'es', { sensitivity: 'base' });
            return sortAZ ? result : -result;
        });
    }, [Products, commerceQuery, selectedCommerces, selectedCategories, selectedCities, sortAZ]);

    const totalPagesAdoptions = Math.max(1, Math.ceil(filteredProducts.length / itemsAdoptions));
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsAdoptions, currentPage * itemsAdoptions);

    const activeFiltersCount =
        selectedCommerces.length + selectedCategories.length + selectedCities.length + (commerceQuery.trim() ? 1 : 0);

    const clearFilters = () => {
        setCommerceQuery('');
        setSelectedCommerces([]);
        setSelectedCategories([]);
        setSelectedCities([]);
        setSortAZ(true);
    };

    // Al cambiar cualquier filtro se vuelve a la primera página
    useEffect(() => {
        setCurrentPage(1);
    }, [commerceQuery, selectedCommerces, selectedCategories, selectedCities, sortAZ]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page); // Actualiza la página actual cuando cambia
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(4); 

    useEffect(() => {

        const fetchData = async () => {
            try 
            {
                const result4 : any = await GetProducts(undefined, "CANADOG", true)
                if (Array.isArray(result4)) {
                    setProducts(result4)
                }
            } 
            catch (error) 
            {
                console.error('Error:', error);
            }
        };
        fetchData()
    }, []);

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
          prevIndex + cardsToShow < Products.length ? prevIndex + 1 : prevIndex
        );
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    };

    // ------------------------------------------------------------------
    // TARJETA ANTERIOR DE PRODUCTO (comentada para uso futuro).
    // Para reutilizarla: descomenta este bloque dentro del `Products.map(...)`
    // en lugar de la tarjeta nueva.
    // ------------------------------------------------------------------
    // <div
    //     key={card.id}
    //     className='m-4'
    // >
    //     <Card isFooterBlurred className="w-full h-[300px]">
    //         <div className='flex justify-center items-center'>
    //             <CardHeader className="absolute z-10 top-1 flex-col items-start">
    //                 <h2 className="text-white font-semibold mn:text-2xl md:text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
    //                     {card.title}
    //                 </h2>
    //             </CardHeader>
    //             {
    //            //<Carousel value={card.Image} numScroll={1} numVisible={1}  itemTemplate={productTemplate} />
    //             }
    //             <Image
    //                 alt="Album cover"
    //                 className="z-0 w-full h-60 object-cover"
    //                 src={card.PRODUCT_IMAGE}
    //                 width={100}
    //                 height={100}
    //             />
    //             <CardFooter className="absolute bg-greenCanadog/50 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
    //                 <div className='flex flex-col'>
    //                     <p className="text-white font-medium text-sm">
    //                         Unidades: {card.unity}
    //                     </p>
    //                     {/* <p className='text-white font-medium text-sm'>
    //                         Color: 
    //                     </p> */}
    //                     <p className="text-white font-medium text-lg">
    //                         ${card.cost}
    //                     </p>
    //                 </div>
    //                 <div className='flex flex-col gap-2'>
    //                     {/* <p className='text-white text-base text-center cursor-pointer'>
    //                         ver más
    //                         <i className="pi pi-window-maximize ml-2" style={{ color: 'white' }}></i>
    //                     </p> */}
    //                     <Button 
    //                         onClick={()=> window.open('https://api.whatsapp.com/send?phone=+573104684683&text=Hola%20quiero%20saber%20mas%20sobre%20este%20producto%20' + card.title, '_blank')} 
    //                         className="text-base text-white font-medium" 
    //                         color="success"
    //                         radius="full" 
    //                         size="md"
    //                     >
    //                         <i className="pi pi-whatsapp" style={{ color: 'white' }}></i>
    //                         Comprar
    //                     </Button>
    //                 </div>
    //             </CardFooter>
    //         </div>
    //     </Card>
    // </div>
    // ------------------------------------------------------------------

    return(
        <div>
            {/* BANNER */}
            <section>
                <div className="relative">
                    <div className="flex justify-center">
                        <Image
                            src={CanadogStore.src}
                            alt="card"
                            width={1512}
                            height={550}
                            className="w-full mn:h-40 md:h-60 lg:h-80 xl:h-[450px] object-cover"
                        />
                    </div>
                </div>

                <div className='flex mn:flex-col md:flex-row md:items-center md:justify-center mn:gap-4 md:gap-10 lg:gap-16 xl:gap-20 m-6 md:h-[200px] lg:h-[300px] text-blackCanadog'>
                    <div className='flex mn:flex-row md:flex-col gap-2 mn:items-center md:items-start md:w-64'>
                        <p className='mn:text-xl md:text-4xl'>
                            Bienvenido a la tienda de <span className="text-greenCanadog font-bold mn:text-xl md:text-5xl">CANADOG</span>
                        </p>
                    </div>
                    
                    <div className='flex flex-col gap-2 md:w-[400px] lg:w-[580px] xl:w-[680px] lg:text-xl'>
                        <p className='mn:text-lg lg:text-2xl font-semibold'>
                            ¡Adquiere hoy nuestros productos Nuevos y Usados! 
                        </p>
                        <p>
                            Cada venta tiene como propósito ayudar a cubrir gastos y deudas del hogar de paso. si tienes alguna duda no olvides conectarnos.
                        </p>
                        <p>
                            Envíos en Medellín, área metropolitana y a nivel nacional 🛒🚚📦
                        </p>
                    </div>
                </div>
            </section>

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
                
                <div className='px-4 pt-6 pb-16 md:pt-8 md:pb-24'>
                    <div className='flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto'>
                        {/* FILTROS (tarjeta vertical) */}
                        <aside className='lg:w-72 lg:shrink-0'>
                            <Button
                                className='lg:hidden w-full mb-4'
                                variant='bordered'
                                onPress={() => setShowFilters((open) => !open)}
                                startContent={<i className='pi pi-filter' />}
                            >
                                Filtros{activeFiltersCount > 0 ? ` (${activeFiltersCount})` : ''}
                            </Button>

                            <Card className={`${showFilters ? 'block' : 'hidden'} lg:block lg:sticky lg:top-32`} shadow='md'>
                                <CardBody className='flex flex-col gap-6 p-5'>
                                    <div className='flex items-center justify-between'>
                                        <h3 className='text-xl font-semibold text-brown'>Filtros</h3>
                                        <button
                                            type='button'
                                            onClick={clearFilters}
                                            disabled={activeFiltersCount === 0 && sortAZ}
                                            className='text-sm font-medium text-brownLight underline disabled:opacity-40 disabled:no-underline'
                                        >
                                            Limpiar
                                        </button>
                                    </div>

                                    {/* Orden alfabético */}
                                    <div className='flex flex-col gap-2'>
                                        <p className='text-sm font-semibold text-blackCanadog'>Ordenar por comercio</p>
                                        <div className='flex gap-2'>
                                            <Button
                                                size='sm'
                                                radius='full'
                                                color={sortAZ ? 'success' : 'default'}
                                                className={sortAZ ? 'text-white' : ''}
                                                onPress={() => setSortAZ(true)}
                                            >
                                                A – Z
                                            </Button>
                                            <Button
                                                size='sm'
                                                radius='full'
                                                color={!sortAZ ? 'success' : 'default'}
                                                className={!sortAZ ? 'text-white' : ''}
                                                onPress={() => setSortAZ(false)}
                                            >
                                                Z – A
                                            </Button>
                                        </div>
                                    </div>

                                    <Divider />

                                    {/* Comercio */}
                                    <div className='flex flex-col gap-2'>
                                        <p className='text-sm font-semibold text-blackCanadog'>Comercio</p>
                                        <Input
                                            size='sm'
                                            variant='bordered'
                                            placeholder='Buscar comercio'
                                            value={commerceQuery}
                                            onValueChange={setCommerceQuery}
                                            isClearable
                                            onClear={() => setCommerceQuery('')}
                                            startContent={<i className='pi pi-search text-sm' />}
                                        />
                                        {commerceOptions.length === 0 ? (
                                            <p className='text-sm text-gray'>Aún no hay comercios registrados.</p>
                                        ) : (
                                            <div className='max-h-48 overflow-y-auto pr-1'>
                                                <CheckboxGroup
                                                    aria-label='Comercios'
                                                    value={selectedCommerces}
                                                    onValueChange={setSelectedCommerces}
                                                    size='sm'
                                                    color='success'
                                                >
                                                    {visibleCommerceOptions.map((name) => (
                                                        <Checkbox key={name} value={name}>{name}</Checkbox>
                                                    ))}
                                                </CheckboxGroup>
                                            </div>
                                        )}
                                    </div>

                                    <Divider />

                                    {/* Categoría */}
                                    <div className='flex flex-col gap-2'>
                                        <p className='text-sm font-semibold text-blackCanadog'>Categoría</p>
                                        {categoryOptions.length === 0 ? (
                                            <p className='text-sm text-gray'>Aún no hay categorías registradas.</p>
                                        ) : (
                                            <div className='max-h-48 overflow-y-auto pr-1'>
                                                <CheckboxGroup
                                                    aria-label='Categorías'
                                                    value={selectedCategories}
                                                    onValueChange={setSelectedCategories}
                                                    size='sm'
                                                    color='success'
                                                >
                                                    {categoryOptions.map((name) => (
                                                        <Checkbox key={name} value={name}>{name}</Checkbox>
                                                    ))}
                                                </CheckboxGroup>
                                            </div>
                                        )}
                                    </div>

                                    <Divider />

                                    {/* Ciudad */}
                                    <div className='flex flex-col gap-2'>
                                        <p className='text-sm font-semibold text-blackCanadog'>Ciudad</p>
                                        {cityOptions.length === 0 ? (
                                            <p className='text-sm text-gray'>Aún no hay ciudades registradas.</p>
                                        ) : (
                                            <div className='max-h-48 overflow-y-auto pr-1'>
                                                <CheckboxGroup
                                                    aria-label='Ciudades'
                                                    value={selectedCities}
                                                    onValueChange={setSelectedCities}
                                                    size='sm'
                                                    color='success'
                                                >
                                                    {cityOptions.map((name) => (
                                                        <Checkbox key={name} value={name}>{name}</Checkbox>
                                                    ))}
                                                </CheckboxGroup>
                                            </div>
                                        )}
                                    </div>
                                </CardBody>
                            </Card>
                        </aside>

                        {/* PRODUCTOS */}
                        <div className='flex-1 min-w-0'>
                            <p className='mb-4 text-sm text-gray'>
                                {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
                            </p>

                            {filteredProducts.length === 0 ? (
                                <div className='flex flex-col items-center justify-center gap-2 py-16 text-center'>
                                    <i className='pi pi-search text-3xl text-gray' />
                                    <p className='text-lg font-semibold text-blackCanadog'>No encontramos productos con estos filtros</p>
                                    <button type='button' onClick={clearFilters} className='text-brownLight underline'>
                                        Limpiar filtros
                                    </button>
                                </div>
                            ) : (
                                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
                                    {paginatedProducts.map((card: any) => (
                                        <div key={card.id}>
                                            <Card className='w-full h-full overflow-hidden' shadow='md'>
                                                <Image
                                                    alt={card.title}
                                                    className='w-full h-48 object-cover'
                                                    src={card.PRODUCT_IMAGE}
                                                    width={400}
                                                    height={300}
                                                />

                                                <CardBody className='flex flex-col gap-2 p-4'>
                                                    <h2 className='text-brown font-semibold mn:text-xl md:text-2xl'>
                                                        {card.title}
                                                    </h2>

                                                    {(getCommerce(card) || getCity(card)) && (
                                                        <p className='text-xs font-medium text-gray'>
                                                            {[getCommerce(card), getCity(card)].filter(Boolean).join(' · ')}
                                                        </p>
                                                    )}

                                                    <p className='text-greenCanadog font-semibold text-lg'>
                                                        ${card.cost}
                                                    </p>

                                                    {/* Una sola descripción por producto */}
                                                    {(card.longDescription ?? card.shortDescription ?? card.PRODUCTS_DESCRIPTION) && (
                                                        <p className='text-sm text-blackCanadog line-clamp-3'>
                                                            {card.longDescription ?? card.shortDescription ?? card.PRODUCTS_DESCRIPTION}
                                                        </p>
                                                    )}
                                                </CardBody>

                                                <CardFooter className='p-4 pt-0'>
                                                    <Button
                                                        onClick={() => window.open('https://api.whatsapp.com/send?phone=+573104684683&text=' + encodeURIComponent('Hola quiero saber mas sobre este producto ' + card.title), '_blank')}
                                                        className='text-base text-white font-medium'
                                                        color='success'
                                                        radius='full'
                                                        size='md'
                                                        fullWidth
                                                    >
                                                        <i className='pi pi-whatsapp' style={{ color: 'white' }}></i>
                                                        Comprar
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Paginador */}
                            {totalPagesAdoptions > 1 && (
                                <div className='flex justify-center mt-8'>
                                    <Pagination
                                        showControls
                                        color={'success'}
                                        total={totalPagesAdoptions}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        showShadow
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}