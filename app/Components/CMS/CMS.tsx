"use client";
import React, { useState, useRef } from 'react';
import { Button, Textarea, Card, Input,CardBody, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import {ScrollShadow} from "@nextui-org/react";
import { Toast } from 'primereact/toast';
import { FileUpload, FileUploadHeaderTemplateOptions, FileUploadSelectEvent, FileUploadUploadEvent, ItemTemplateOptions,} from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Tooltip } from 'primereact/tooltip';
import 'primeicons/primeicons.css';
import axios from 'axios';

export default function CMS({Dogs, Cats}: any) 
{   
    const toast = useRef<Toast>(null);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isEdit, setIsEdit] = useState(false);
    const [name, setName] = useState<string>('');
    const [yearOlds, setYearosld] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [file, setFile] = useState<any>();
    const [isDog, setIsDog] = useState(true);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef<FileUpload>(null);

    const onTemplateSelect = (e: FileUploadSelectEvent) => {
        console.log("Hola subiendo")
        let _totalSize = totalSize;
        let files = e.files;

        for (let i = 0; i < files.length; i++) {
            _totalSize += files[i].size || 0;
        }

        if (e.files.length > 0) {

            /*const isValidImage = await validateImage(e.files[0]);

            if (!isValidImage) {
                
                return;
            }*/
            const reader = new FileReader();
            
            reader.onloadend = function (event:any) {
                const base64Text = event.target.result;
                console.log(base64Text);
                setFile(base64Text);
            }

            reader.readAsDataURL(e.files[0]);
            
        }
      
        toast.current?.show({ severity: 'info', summary: 'CARGA EXITOSA', detail: 'Imagen cargada exitosamente'});
        setTotalSize(_totalSize);
    };

    const onTemplateUpload = async (e : any) => {
        console.log("Hola subiendo")
        console.log(e.files[0])
        let _totalSize = 0;

        e.files.forEach((file: any) => {
          _totalSize += file.size || 0;
        });
      
        setTotalSize(_totalSize);

        
      };


    const onTemplateRemove = (file: File, callback: Function) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
        const file = inFile as File;
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <Image alt={file.name} role="presentation" width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Button type="button" className="pi pi-times p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Arrastre y suelte la imagen aqui!.
                </span>
            </div>
        );
    };

    const sendPets = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try
        {
            const emailReponse = await axios.post("/UserGora/CMS/api/pets",{data:{User:"Adminitrador",Enable: 1, Name: name, OldDate:yearOlds, Description:description, Type:isDog ? "DOG" : "CAT", Images: file}})
            console.log('Contesto:', emailReponse);
        }
        catch(err){
            console.log(err)
        }
    };

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

    return(
        <div> 
            <div className="flex mn:my-8 mn:justify-center md:justify-start">
            
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='5xl'>
                    <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex justify-center text-greenGora">
                                ¡Bienvenido {<p className='text-blackGora ml-1'> a tu próxima gran aventura</p>}!
                            </ModalHeader>
                            <ModalBody>
                                <p className='text-blackGora px-4 text-xl'> 
                                    { isDog ? "Crea un nuevo Guau" : "Crea un nuevo Miau"}
                                </p>
                                <h1 className='text-center py-4 text-blackGora font-semibold'>
                                    Ingrese la informacion de la mascota.
                                </h1>
                                <div className="flex w-full flex-col gap-4">
                                    <div className="flex mb-6 md:mb-0 gap-4">
                                        <Input onChange={((e)=> setName(e.target.value))} type="name" variant={'faded'} label="Nombre"/>
                                        <Input onChange={((e)=> setYearosld(e.target.value))} type="edad" variant={'faded'} label="Edad"/>
                                    </div>
                                    <div className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                        <Textarea max={100} onChange={((e)=> setDescription(e.target.value))} type="descripcion" variant={'faded'} label="Descripcion"/>
                                    </div>
                                </div> 
                                <h1 className='text-center py-4 text-blackGora font-semibold'>
                                    Fotos de la Mascota
                                </h1>
                                <div className='flex flex-row justify-center my-2 gap-2 space-x-2'>
                                    <Toast ref={toast}></Toast>

                                    <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                                    <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                                    <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

                                    <FileUpload 
                                         ref={fileUploadRef} 
                                         name="demo[]" 
                                         multiple accept="image/*"
                                         maxFileSize={1000000}
                                         onUpload={onTemplateUpload} 
                                         onSelect={onTemplateSelect} 
                                         onError={onTemplateClear} 
                                         onClear={onTemplateClear}
                                         headerTemplate={headerTemplate} 
                                         itemTemplate={itemTemplate} 
                                         emptyTemplate={emptyTemplate}
                                         uploadHandler={(event) => [onTemplateUpload(event)]}
                                         chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} 
                                         customUpload/>
                                </div>
                            </ModalBody>
                            <ModalFooter className='flex justify-center'>
                                <div className='flex flex-col w-full'>
                                    <div className='flex justify-center'>
                                        <Button onClick={sendPets} className='bg-greenGora text-OrangeLightGora px-6' radius="full" size="md" onPress={onClose}>
                                            Guardar
                                        </Button>                              
                                    </div>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                    </ModalContent>
                </Modal>
            </div>
            <div className="flex mn:my-8 mn:justify-center md:justify-start">
                <Modal isOpen={isEdit} size='5xl'>
                    <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex justify-center text-greenGora">
                                ¡Bienvenido {<p className='text-blackGora ml-1'> a tu próxima gran aventura</p>}!
                            </ModalHeader>
                            <ModalBody>
                                <p className='text-blackGora px-4 text-xl'> 
                                    { isDog ? "Edita un Guau" : "Edita un Miau"}
                                </p>
                                <h1 className='text-center py-4 text-blackGora font-semibold'>
                                    Edita la informacion de la mascota.
                                </h1>
                                <div className="flex w-full flex-col gap-4">
                                    <div className="flex mb-6 md:mb-0 gap-4">
                                        <Input type="name" variant={'faded'} label="Nombre"/>
                                        <Input type="edad" variant={'faded'} label="Edad"/>
                                    </div>
                                    <div className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                        <Textarea  type="descripcion" variant={'faded'} label="Descripcion"/>
                                    </div>
                                </div> 
                                <h1 className='text-center py-4 text-blackGora font-semibold'>
                                    Fotos de la Mascota
                                </h1>
                                <div className='flex flex-row justify-center my-2 gap-2 space-x-2'>
                                    <Toast ref={toast}></Toast>

                                    <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                                    <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                                    <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

                                    <FileUpload ref={fileUploadRef} name="demo[]" url="/api/upload" multiple accept="image/*" maxFileSize={1000000}
                                        onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                                        headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                                        chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                                </div>
                            </ModalBody>
                            <ModalFooter className='flex justify-center'>
                                <div className='flex flex-col w-full'>
                                    <div className='flex justify-center'>
                                        <Button  className='bg-greenGora text-OrangeLightGora px-6' radius="full" size="md" onClick={(e)=> setIsEdit(false)}>
                                            Guardar
                                        </Button>                              
                                    </div>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                    </ModalContent>
                </Modal>
            </div>
             <div className='relative mn:px-6 mn:py-2 mn:mt-2 md:px-6 md:py-6 md:mt-4'>
                    <div className='grid max-w-7xl mx-auto md:gris-cols-2'>
                        <h2 className='mn:text-xl md:text-4xl font-semibold'>
                            Agrega una nueva {<span className='text-greenGora'>Mascota</span>}
                        </h2>
                        <div className="flex gap-4 mn:my-4 md:my-8 mn:justify-center md:justify-start">
                            <Button  onClick={(e)=> [setIsDog(true)]} className={`bg-transparent border  ${isDog ? "bg-greenGora text-OrangeLightGora" : "border-greenGora text-greenGora"} hover:bg-greenGora hover:text-OrangeLightGora`} radius="full" size="lg">
                                Guaus
                            </Button>
                            <Button onClick={(e)=> setIsDog(false)} className={`bg-transparent border ${!isDog ? "bg-greenGora text-OrangeLightGora" : "border-greenGora text-greenGora"} hover:bg-greenGora hover:text-OrangeLightGora`} radius="full" size="lg">
                                Miaus
                            </Button>
                            <Button onPress={onOpen} className='bg-transparent border border-greenGor pi pi-plus' radius="full" size="lg" />
                        </div>
                    </div>
                </div>
                {   
                    isDog ?(
                        <div className='px-4 py-6'>
                            <div className='flex max-w-7xl mx-auto'>
                                <Card
                                    isBlurred
                                    className="border-none w-full"
                                    shadow="md"
                                >
                                    <ScrollShadow className="mn:w-[360px] mn:h-[600px] md:w-[1280px] md:h-[600px] mt-4 mb-4" size={0}>
                                        <div className='flex flex-wrap justify-evenly'>
                                            {
                                                Dogs.map((card: any) => (
                                                    <Card key={card.id} className='m-4 w-96'>
                                                        <div className="flex gap-6 md:gap-2">
                                                            <Image
                                                                alt="Album cover"
                                                                className={`object-cover shadow-md transition-all duration-300 rounded-none w-full h-[200px]`}
                                                                src={card.image}
                                                            />
                                                            <CardBody>
                                                                <div className='flex flex-col'>
                                                                    <h1 className="flex justify-end font-semibold text-purpleGora text-2xl">
                                                                        {card.title.substring(0, 3)}<span className='text-greenGora'>{card.title.substring(3, card.title.charCodeAt(card.title))}</span>
                                                                    </h1>
                                                                    <p className='flex ml-2 justify-center mt-2 text-md w-36'>
                                                                     {card.shortDescription.substring(0,50)}
                                                                    </p>
                                                                    <div className="flex mn:my-2 justify-center">
                                                                        <Button  onClick={(e)=> setIsEdit(true)} className='bg-transparent border border-greenGora text-greenGora' radius="full" size="sm" endContent={<i className="pi pi-pencil" style={{ color: '#489E84' }}/>}>
                                                                            Editar
                                                                        </Button>
                                                                    </div>  
                                                                </div>
                                                            </CardBody>
                                                        </div>
                                                    </Card>
                                                ))
                                            }
                                        </div>
                                    </ScrollShadow> 
                                </Card>
                            </div>
                        </div>
                    ) 
                    :
                    (
                        <div className='px-4 py-6'>
                            <div className='flex max-w-7xl mx-auto'>
                                <Card
                                    isBlurred
                                    className="border-none w-full"
                                    shadow="md"
                                >
                                    <ScrollShadow className="mn:w-[360px] mn:h-[600px] md:w-[1280px] md:h-[600px] mt-4 mb-4" size={0}>
                                        <div className='flex flex-wrap justify-evenly'>
                                        {
                                            Cats.map((card: any) => (
                                                <Card key={card.id} className='m-4 w-96'>
                                                    <div className="flex gap-6 md:gap-2">
                                                        <Image
                                                            alt="Album cover"
                                                            className="object-cover"
                                                            shadow="md"
                                                            src={card.image}
                                                            height={250}
                                                            width={500}
                                                        />
                                                        <CardBody>
                                                            <div className='flex flex-col'>
                                                                <h1 className="flex justify-end font-semibold text-purpleGora text-2xl">
                                                                    {card.title.substring(0, 3)}<span className='text-greenGora'>{card.title.substring(3, card.title.charCodeAt(card.title))}</span>
                                                                </h1>
                                                                <p className='flex ml-2 justify-center mt-2 text-[12px] text-right w-full'>
                                                                    {card.shortDescription.substring(0,50)}
                                                                </p>
                                                                <div className="flex mn:my-2 justify-center">
                                                                    <Button  onClick={(e)=> setIsEdit(true)} className='bg-transparent border border-greenGora text-greenGora' radius="full" size="sm" endContent={<i className="pi pi-pencil" style={{ color: '#489E84' }}/>}>
                                                                        Editar
                                                                    </Button>
                                                                </div>  
                                                            </div>
                                                        </CardBody>
                                                    </div>
                                                </Card>
                                            ))
                                        }
                                        </div>
                                    </ScrollShadow> 
                                </Card>
                            </div>
                        </div>
                    )
                }
        </div>
    )
}