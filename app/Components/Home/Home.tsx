"use client";
import React, { useState } from 'react';
import { Button, Card, Input,CardBody, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, cn } from "@nextui-org/react";
import {ScrollShadow} from "@nextui-org/react";
import {Divider} from "@nextui-org/divider";
import MotionTransition from '../MotionTransition/MotionTransition';
import 'primeicons/primeicons.css';

export default function Home({Dogs, Cats}: any) {
    console.log(Dogs, Cats)
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    // const [expand, setExpand] = useState(false);
    const [isDog, setIsDog] = useState(true);
    const [expandedCard, setExpandedCard] = useState<number | null>(null);

    const toggleExpand = (id: number) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    //     {
    //         id: 1,
    //         image: 'Guau1.png',
    //         title: 'Doggi',
    //         shortDescription: 'Encantador cachorro de ojos brillantes y cola siempre en movimiento.',
    //         longDescription: 'Conoce a Doggi, un encantador cachorro de ojos brillantes y cola siempre en movimiento. Su pelaje suave y sus orejas caídas hacen que sea imposible resistirse a darle un abrazo. ¡Con Max a tu lado, cada día estará lleno de alegría y aventuras compartidas.',
    //     },
    //     {
    //         id: 2,
    //         image: 'Guau2.png',
    //         title: 'Doggi',
    //         shortDescription: 'Encantador cachorro de ojos brillantes y cola siempre en movimiento.',
    //         longDescription: 'Conoce a Doggi, un encantador cachorro de ojos brillantes y cola siempre en movimiento. Su pelaje suave y sus orejas caídas hacen que sea imposible resistirse a darle un abrazo. ¡Con Max a tu lado, cada día estará lleno de alegría y aventuras compartidas.',
    //     },
    //     {
    //         id: 3,
    //         image: 'Guau3.png',
    //         title: 'Doggi',
    //         shortDescription: 'Encantador cachorro de ojos brillantes y cola siempre en movimiento.',
    //         longDescription: 'Conoce a Doggi, un encantador cachorro de ojos brillantes y cola siempre en movimiento. Su pelaje suave y sus orejas caídas hacen que sea imposible resistirse a darle un abrazo. ¡Con Max a tu lado, cada día estará lleno de alegría y aventuras compartidas.',
    //     },
    //     {
    //         id: 4,
    //         image: 'Guau4.png',
    //         title: 'Doggi',
    //         shortDescription: 'Encantador cachorro de ojos brillantes y cola siempre en movimiento.',
    //         longDescription: 'Conoce a Doggi, un encantador cachorro de ojos brillantes y cola siempre en movimiento. Su pelaje suave y sus orejas caídas hacen que sea imposible resistirse a darle un abrazo. ¡Con Max a tu lado, cada día estará lleno de alegría y aventuras compartidas.',
    //     },
    //     {
    //         id: 5,
    //         image: 'Guau1.png',
    //         title: 'Doggi',
    //         shortDescription: 'Encantador cachorro de ojos brillantes y cola siempre en movimiento.',
    //         longDescription: 'Conoce a Doggi, un encantador cachorro de ojos brillantes y cola siempre en movimiento. Su pelaje suave y sus orejas caídas hacen que sea imposible resistirse a darle un abrazo. ¡Con Max a tu lado, cada día estará lleno de alegría y aventuras compartidas.',
    //     },
    //     {
    //         id: 6,
    //         image: 'Guau2.png',
    //         title: 'Doggi',
    //         shortDescription: 'Encantador cachorro de ojos brillantes y cola siempre en movimiento.',
    //         longDescription: 'Conoce a Doggi, un encantador cachorro de ojos brillantes y cola siempre en movimiento. Su pelaje suave y sus orejas caídas hacen que sea imposible resistirse a darle un abrazo. ¡Con Max a tu lado, cada día estará lleno de alegría y aventuras compartidas.',
    //     },
    //     {
    //         id: 7,
    //         image: 'Guau1.png',
    //         title: 'Doggi',
    //         shortDescription: 'Encantador cachorro de ojos brillantes y cola siempre en movimiento.',
    //         longDescription: 'Conoce a Doggi, un encantador cachorro de ojos brillantes y cola siempre en movimiento. Su pelaje suave y sus orejas caídas hacen que sea imposible resistirse a darle un abrazo. ¡Con Max a tu lado, cada día estará lleno de alegría y aventuras compartidas.',
    //     },
    //     {
    //         id: 8,
    //         image: 'Guau3.png',
    //         title: 'Doggi',
    //         shortDescription: 'Encantador cachorro de ojos brillantes y cola siempre en movimiento.',
    //         longDescription: 'Conoce a Doggi, un encantador cachorro de ojos brillantes y cola siempre en movimiento. Su pelaje suave y sus orejas caídas hacen que sea imposible resistirse a darle un abrazo. ¡Con Max a tu lado, cada día estará lleno de alegría y aventuras compartidas.',
    //     },
    //     {
    //         id: 8,
    //         image: 'Guau4.png',
    //         title: 'Doggi',
    //         shortDescription: 'Encantador cachorro de ojos brillantes y cola siempre en movimiento.',
    //         longDescription: 'Conoce a Doggi, un encantador cachorro de ojos brillantes y cola siempre en movimiento. Su pelaje suave y sus orejas caídas hacen que sea imposible resistirse a darle un abrazo. ¡Con Max a tu lado, cada día estará lleno de alegría y aventuras compartidas.',
    //     },
    // ];

    // 
    return(
        <div>
            {/* BANNER */}
            <section>
                <div className='relative p-6 md:py-24'>
                    <div className='grid md:max-w-7xl mx-auto md:grid-cols-2'>
                        <div className='mn:order-last mn:mt-8 md:ml-8 md:px-6 md:order-first '>
                            <h1 className='mn:ml-2 md:ml-0 mn:text-3xl md:text-4xl font-semibold text-purpleGora'>
                                ¡Encuentra {<span className='text-greenGora'>a tu compañero </span>}
                                <span className=' text-greenGora'>perfecto</span>!
                            </h1>
                            <p className='mn:ml-4 md:ml-0 mn:max-w-md md:max-w-lg mn:mt-4 md:mt-10'>
                                Bienvenido a GORA, tu destino para encontrar tu compañero peludo perfecto. En nuestra plataforma, 
                                conectamos a mascotas necesitadas con familias amorosas.<br/> 
                                ¡Descubre cómo puedes hacer una diferencia en la vida de un animal y en la tuya propia adoptando hoy!
                            </p>
                            <div className="flex mn:my-8 mn:justify-center md:justify-start">
                                <Button  className='bg-greenGora text-OrangeLightGora' radius="full" size="lg" onPress={onOpen}>
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
                                                <h1 className='text-center py-4 text-blackGora text-xl font-semibold'>
                                                    Queremos conocerte un poco mejor.
                                                </h1>
                                                <div className="flex w-full flex-col gap-4">
                                                    <div className="flex mb-6 md:mb-0 gap-4">
                                                        <Input type="name" variant={'faded'} label="Nombre y Apellidos"/>
                                                    </div>
                                                    <div className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                        <Input type="email" variant={'faded'} label="Correo electrónico"/>
                                                        <Input type="Phone" variant={'faded'} label="Celular" />
                                                    </div>
                                                </div> 
                                            </ModalBody>
                                            <ModalFooter className='flex justify-center'>
                                                <div className='flex flex-col w-full'>
                                                    <div className='flex justify-evenly'>
                                                        <Button  className='bg-greenGora text-OrangeLightGora px-6' radius="full" size="md" onPress={onClose}>
                                                            Enviar
                                                        </Button>
                                                        <Button className='bg-greenGora text-OrangeLightGora px-6' radius="full" size="md" onPress={onClose}>
                                                            Completar Formulario
                                                        </Button>                               
                                                    </div>
                                                    <Divider className="my-4"/>
                                                    <div className='text-greenGora text-sm text-center font-semibold my-4 px-4'> 
                                                        <p>¡Gracias por tomarte el tiempo para completar este formulario! <br/> Nos emociona poder ayudarte a encontrar a tu nuevo mejor amigo peludo. <br/>¡Pronto nos pondremos en contacto contigo para continuar con el proceso de adopción!</p>
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
                                <Button  onClick={(e)=> [setIsDog(true)]} className={`bg-transparent border  ${isDog ? "bg-greenGora text-OrangeLightGora" : "border-greenGora text-greenGora"} hover:bg-greenGora hover:text-OrangeLightGora`} radius="full" size="lg">
                                    Guaus
                                </Button>
                                <Button onClick={(e)=> setIsDog(false)} className={`bg-transparent border ${!isDog ? "bg-greenGora text-OrangeLightGora" : "border-greenGora text-greenGora"} hover:bg-greenGora hover:text-OrangeLightGora`} radius="full" size="lg">
                                    Miaus
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                {   
                    isDog ?
                    (
                    <div className='px-4 py-4'>
                        <div className='flex max-w-7xl mx-auto'>
                            <Card
                                isBlurred
                                className="border-none w-full"
                                shadow="md"
                            >
                                <ScrollShadow className="mn:w-[360px] mn:h-[600px] md:w-[1280px] md:h-[600px] mt-6 mb-6" size={0}>
                                    <div className='flex flex-wrap justify-evenly'>
                                        {Dogs.map((card: any) => (
                                            
                                            <Card key={card.id} className={`m-4 w-96 transition-all duration-300 ${expandedCard === card.id ? 'h-full' : 'h-50'}`}>
                                                <>{console.log(card)}</>
                                                <div className={`flex items-center ${expandedCard === card.id ? 'flex flex-col gap-2' : ''}`}>
                                                    <Image
                                                        alt="Album cover"
                                                        className={`object-cover shadow-md transition-all duration-300 ${expandedCard === card.id ? 'w-96 h-60' : ''}`}
                                                        src={card.image}
                                                        height={250}
                                                        width={500}
                                                    />
                                                    <CardBody className={`${expandedCard === card.id ? 'mt-2' : ''}`}>
                                                        <div className='flex flex-col'>
                                                            <div className={` ${expandedCard === card.id ? 'flex justify-around' : ''}`}>
                                                                <h1 className={`flex font-semibold text-purpleGora ${expandedCard === card.id ? 'justify-start text-3xl' : 'justify-end text-2xl'}`}>
                                                                    {`${card.title} Edad:${card.old}`}
                                                                </h1>
                                                                {expandedCard === card.id && (
                                                                    <div className='flex flex-cols'>
                                                                        <div className='ml-4'>
                                                                            <Button className='bg-greenGora border border-greenGora text-white px-6' radius="full" size="md">Adoptame</Button>
                                                                        </div>
                                                                        <div className='flex justify-center items-center ml-4'>
                                                                            <Button onClick={() => toggleExpand(card.id)} className='bg-transparent border border-greenGora text-greenGora' radius="full" size="md" endContent={<i className="pi pi-arrow-circle-up" style={{ color: '#489E84' }} />} />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <p className={`flex text-md ${expandedCard === card.id ? 'w-full py-4 px-2' : 'w-full mt-2'}`}>
                                                                {expandedCard === card.id ? card.longDescription : card.shortDescription}
                                                            </p>
                                                            {expandedCard !== card.id && (
                                                                <div className="mt-4">
                                                                    <Button onClick={() => toggleExpand(card.id)} className='bg-transparent border border-greenGora text-greenGora' radius="full" size="md" endContent={<i className="pi pi-arrow-circle-down" style={{ color: '#489E84' }} />}>
                                                                        Más sobre mi
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </CardBody>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </ScrollShadow> 
                            </Card>
                        </div>
                    </div>
                    )
                    :
                    (
                    <div className='px-4 py-4'>
                        <div className='flex max-w-7xl mx-auto'>
                            <Card
                                isBlurred
                                className="border-none w-full"
                                shadow="md"
                            >
                                <ScrollShadow className="mn:w-[360px] mn:h-[600px] md:w-[1280px] md:h-[600px] mt-4 mb-4" size={0}>
                                    <div className='flex flex-wrap justify-evenly'>
                                        {Cats.map((card: any) => (
                                            <Card key={card.id} className={`m-4 w-96 transition-all duration-300 ${expandedCard === card.id ? 'h-full' : 'h-50'}`}>
                                                <div className={`flex items-center ${expandedCard === card.id ? 'flex flex-col gap-2' : ''}`}>
                                                    <Image
                                                        alt="Album cover"
                                                        className={`object-cover shadow-md transition-all duration-300 ${expandedCard === card.id ? 'w-96 h-60' : ''}`}
                                                        src={card.image}
                                                        height={250}
                                                        width={500}
                                                    />
                                                    <CardBody className={`${expandedCard === card.id ? 'mt-2' : ''}`}>
                                                        <div className='flex flex-col'>
                                                            <div className={` ${expandedCard === card.id ? 'flex justify-around' : ''}`}>
                                                                <h1 className={`flex font-semibold text-purpleGora ${expandedCard === card.id ? 'justify-start text-3xl' : 'justify-end text-2xl'}`}>
                                                                    {`${card.title} Edad:${card.old}`}
                                                                </h1>
                                                                {expandedCard === card.id && (
                                                                    <div className='flex flex-cols'>
                                                                        <div className='ml-4'>
                                                                            <Button className='bg-greenGora border border-greenGora text-white px-6' radius="full" size="md">Adoptame</Button>
                                                                        </div>
                                                                        <div className='flex justify-center items-center ml-4'>
                                                                            <Button onClick={() => toggleExpand(card.id)} className='bg-transparent border border-greenGora text-greenGora' radius="full" size="md" endContent={<i className="pi pi-arrow-circle-up" style={{ color: '#489E84' }} />} />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <p className={`flex text-md ${expandedCard === card.id ? 'w-full py-4 px-2' : 'w-full mt-2'}`}>
                                                                {expandedCard === card.id ? card.longDescription : card.shortDescription}
                                                            </p>
                                                            {expandedCard !== card.id && (
                                                                <div className="mt-4">
                                                                    <Button onClick={() => toggleExpand(card.id)} className='bg-transparent border border-greenGora text-greenGora' radius="full" size="md" endContent={<i className="pi pi-arrow-circle-down" style={{ color: '#489E84' }} />}>
                                                                        Más sobre mi
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </CardBody>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </ScrollShadow> 
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
                    <h2 className='mn:text-xl md:text-4xl font-semibold'>
                        Historias {<span className='text-greenGora'>Emotivas</span>}
                    </h2>
                </div>
            </div>
            <div className='px-4 py-6 mb-8'>
                <div className='flex max-w-7xl mx-auto'>
                    <Card
                        isBlurred
                        className="border-none w-full"
                        shadow="md"
                    >
                        <div className='md:flex md:flex-col-2 m-4'>
                            <Card className='m-4 border border-greenGora'>
                                <div className="flex justify-center gap-6 md:gap-2">
                                    <CardBody>
                                        <div className='flex flex-col m-4'>
                                            <h1 className="flex justify-start font-bold text-purpleGora text-2xl">
                                                Doggi
                                            </h1>
                                            <h2 className="flex justify-start font-semibold text-blackGora text-xl">
                                                y su familia
                                            </h2>
                                            <p className='flex justify-center mt-4 text-md'>
                                                Encantador cachorro de ojos brillantes y cola siempre en movimiento. 
                                            </p>
                                        </div>
                                    </CardBody>
                                    <Image
                                        alt="Album cover"
                                        className="object-cover"
                                        height={150}
                                        shadow="md"
                                        src="Adop1.png"
                                        width={400}
                                        isZoomed
                                    />
                                </div>
                            </Card>
                            <Card className='m-4 border border-greenGora'>
                                <div className="flex gap-6 md:gap-2">
                                    <CardBody>
                                        <div className='flex flex-col m-4'>
                                            <h1 className="flex justify-start font-bold text-purpleGora text-2xl">
                                                Doggi
                                            </h1>
                                            <h2 className="flex justify-start font-semibold text-blackGora text-xl">
                                                y su familia
                                            </h2>
                                            <p className='flex justify-center mt-4 text-md'>
                                                Encantador cachorro de ojos brillantes y cola siempre en movimiento. 
                                            </p>
                                        </div>
                                    </CardBody>
                                    <Image
                                        alt="Album cover"
                                        className="object-cover"
                                        height={150}
                                        shadow="md"
                                        src="Adop2.png"
                                        width={400}
                                        isZoomed
                                    />
                                </div>
                            </Card>
                        </div>
                        <div className='md:flex md:flex-col-2 m-4'>
                            <Card className='m-4 border border-greenGora'>
                                <div className="flex gap-6 md:gap-2">
                                    <CardBody>
                                        <div className='flex flex-col m-4'>
                                            <h1 className="flex justify-start font-bold text-purpleGora text-2xl">
                                                Doggi
                                            </h1>
                                            <h2 className="flex justify-start font-semibold text-blackGora text-xl">
                                                y su familia
                                            </h2>
                                            <p className='flex justify-center mt-4 text-md'>
                                                Encantador cachorro de ojos brillantes y cola siempre en movimiento. 
                                            </p>
                                        </div>
                                    </CardBody>
                                    <Image
                                        alt="Album cover"
                                        className="object-cover"
                                        height={250}
                                        shadow="md"
                                        src="Adop3.png"
                                        width={400}
                                        isZoomed
                                    />
                                </div>
                            </Card>
                            <Card className='m-4 border border-greenGora'>
                                <div className="flex gap-6 md:gap-2">
                                    <CardBody>
                                        <div className='flex flex-col m-4'>
                                            <h1 className="flex justify-start font-bold text-purpleGora text-2xl">
                                                Doggi
                                            </h1>
                                            <h2 className="flex justify-start font-semibold text-blackGora text-xl">
                                                y su familia
                                            </h2>
                                            <p className='flex justify-center mt-4 text-md'>
                                                Encantador cachorro de ojos brillantes y cola siempre en movimiento. 
                                            </p>
                                        </div>
                                    </CardBody>
                                    <Image
                                        alt="Album cover"
                                        className="object-cover"
                                        height={250}
                                        shadow="md"
                                        src="Adop4.png"
                                        width={400}
                                        isZoomed
                                    />
                                </div>
                            </Card>
                        </div>
                    </Card>
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
            {/* BANNER FINAL */}
            <div className='relative mn:px-6 mn:py-2 mn:mt-2 md:px-6 md:py-6 md:mt-8'>
                <div className='grid max-w-7xl mx-auto md:grid-cols-2'>
                    <h2 className='mn:text-xl md:text-4xl font-semibold'>
                        Adoptar es {<span className='text-greenGora'>Facil</span>}
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