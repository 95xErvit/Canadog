"use client";
import React, { useState, useRef } from 'react';
import { Button, Textarea, Card, Input,CardBody, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Pagination } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/react";
import { Toast } from 'primereact/toast';
import { FileUpload, FileUploadHeaderTemplateOptions, FileUploadSelectEvent, FileUploadUploadEvent, ItemTemplateOptions,} from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Tooltip } from 'primereact/tooltip';
import { useRouter } from 'next/navigation'
import 'primeicons/primeicons.css';
import axios from 'axios';

export default function CMS({Dogs, Cats, History}: any) 
{   
    console.log(Dogs)
    const toast = useRef<Toast>(null);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isEdit, setIsEdit] = useState(false);
    const [name, setName] = useState<string>('');
    const [yearOlds, setYearosld] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [file, setFile] = useState<any>();
    const [isDog, setIsDog] = useState(true);
    const [isCat, setIsCat] = useState(false)
    const [isHistory, setIsHistory] = useState(false);
    const [enable, setEnable] = useState(true);
    const [history, setHistory] = useState<any[]>([]); 
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef<FileUpload>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter()
    

    const onTemplateSelect = (e: FileUploadSelectEvent) => {
        console.log(e.files)
        let _totalSize = totalSize;
        let files = e.files;
        let exit = false

        for (let i = 0; i < files.length; i++) 
        {
            _totalSize += files[i].size || 0;
            const ext = files[i].name.split('.')[1]

            if((ext === "jpg") || (ext === "jpeg")||  (ext === "png") || (ext === "webp"))
            {
                exit = false
            }
            else
            {
                exit = true
            }

            console.log(exit)
        }

        if(exit)
        {   
            toast.current?.show({ severity: 'error', summary: 'Error en la imagen', className:"m-2", detail: 'No se permite la extencion que se subio'});
            return
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

                setHistory(prev => [
                    ...prev, 
                    {
                        id: Date.now(), 
                        image: base64Text, 
                        title: "Nuevo Elemento", 
                        shortDescription: "Descripción corta"
                    }
                ]);
            }

            reader.readAsDataURL(e.files[0]);
            
        }
      
        toast.current?.show({ severity: 'info', summary: 'CARGA EXITOSA', className:"m-2", detail: 'Imagen cargada exitosamente'});
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

    const handleClick = (e: any) => {
        setIsLoading(true)
        e.preventDefault()
        router.push('/UserGora/Login')
    }

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

    const sendPets = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)
        try
        {
            const response = await axios.post("/UserGora/CMS/api/pets",{data:{User:"Adminitrador",Enable: 1, Name: name, OldDate:yearOlds, Description:description, Type:isDog ? "DOG" : isCat? "CAT": "HISTORY", Images: file}})
            console.log('Contesto:', response);
        }
        catch(err){
            console.log(err)
        }
        setTimeout(()=>location.reload(), 4000)
    };

    const UpdatePets = async (e: React.FormEvent, EnablePet = 1) => {
        setIsLoading(true)
        e.preventDefault();
    
        try
        {
            const response = await axios.patch("/UserGora/CMS/api/pets",{data:{AnimaldId:id, User:"Adminitrador",Enable: EnablePet, Name: name, OldDate:yearOlds, Description:description, Type:isDog ? "DOG" : isCat? "CAT": "HISTORY", Images: file }})
            console.log('Contesto:', response);
        }
        catch(err){
            console.log(err)
        }
        setTimeout(()=>location.reload(), 4000)
    };

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

    //Paginador
    const itemsPerPage = 6;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItemsDogs = Dogs.slice(indexOfFirstItem, indexOfLastItem);
    const currentItemsCats = Cats.slice(indexOfFirstItem, indexOfLastItem);
    const currentItemsHistory = History.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };

    return(
        <div>
            <div className="flex mn:justify-center md:justify-start">
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='xl'>
                    <ModalContent>
                    {(onClose) => (
                        <>
                            <Toast ref={toast}></Toast>
                            <ModalHeader className="flex justify-center text-greenGora">
                                ¡Bienvenido {<p className='text-blackGora ml-1'> a tu próxima gran aventura</p>}!
                            </ModalHeader>
                            <ModalBody>
                                <p className='text-purpleGora px-4 text-xl text-center font-semibold'> 
                                    { isDog ? "Crea un nuevo Guau" : isCat ? "Crea un nuevo Miau" : isHistory ? "Crea una historia Emotiva" : ""}
                                </p>
                                <h1 className='text-center py-4 text-blackGora font-semibold'>
                                    Ingrese la informacion de la mascota.
                                </h1>
                                <div className="flex w-full flex-col gap-4">
                                    <div className="flex mb-6 md:mb-0 gap-4">
                                        <Input required disabled={isLoading} onChange={((e)=> setName(e.target.value))} type="name" variant={'faded'} label="Nombre"/>
                                        { !isHistory && <Input required onChange={((e)=> setYearosld(e.target.value))} type="edad" variant={'faded'} label="Edad"/>}
                                    </div>
                                    <div className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                        <Textarea required disabled={isLoading} maxLength={100} onChange={((e)=> setDescription(e.target.value))} type="descripcion" variant={'faded'} label="Descripcion"/>
                                    </div>
                                </div> 
                                <h1 className='text-center py-4 text-blackGora font-semibold'>
                                    Fotos de la Mascota
                                </h1>
                                <div className='flex flex-row justify-center my-2 gap-2 space-x-2'>
                                    

                                    <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                                    <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                                    <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

                                    <FileUpload
                                        ref={fileUploadRef} 
                                        name="demo[]"
                                        disabled={isLoading}
                                        accept="image/*"
                                        maxFileSize={1000000}
                                        onUpload={onTemplateUpload} 
                                        onSelect={onTemplateSelect} 
                                        onError={onTemplateClear} 
                                        onClear={onTemplateClear}
                                        headerTemplate={headerTemplate} 
                                        uploadHandler={(event) => [onTemplateUpload(event)]}
                                        chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} 
                                        customUpload/>
                                </div>
                            </ModalBody>
                            <ModalFooter className='flex justify-center'>
                                <div className='flex flex-col w-full'>
                                    <div className='flex justify-center'>
                                        <Button onClick={sendPets}  isLoading={isLoading} className='bg-greenGora text-pinkLightGora px-6' radius="full" size="md">
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
            <div className="flex mn:justify-center md:justify-start">
                <Modal isOpen={isEdit}  onOpenChange={setIsEdit} size='xl'>
                    <ModalContent>
                    {(onClose) => (
                        <>  
                            <Toast ref={toast}></Toast>
                            <ModalHeader className="flex justify-center text-greenGora">
                                ¡Bienvenido {<p className='text-blackGora ml-1'> a tu próxima gran aventura</p>}!
                            </ModalHeader>
                            <ModalBody>
                                <p className='text-blackGora px-4 text-xl'> 
                                    { isDog ? "Edita un Guau" : isCat ? "Edita un Miau" : isHistory ? "Edita la historia emotiva" : ""}
                                </p>
                                <h1 className='text-center py-4 text-blackGora font-semibold'>
                                    Edita la informacion de la mascota.
                                </h1>
                                <div className="flex w-full flex-col gap-4">
                                    <div className="flex mb-6 md:mb-0 gap-4">
                                        <Input required disabled={isLoading} value={name} onChange={((e)=> setName(e.target.value))} type="name" variant={'faded'} label="Nombre"/>
                                        { !isHistory && <Input required disabled={isLoading} value={yearOlds} onChange={((e)=> setYearosld(e.target.value))} type="edad" variant={'faded'} label="Edad"/> }
                                    </div>
                                    <div className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                        <Textarea required disabled={isLoading} value={description} maxLength={100} onChange={((e)=> setDescription(e.target.value))} type="descripcion" variant={'faded'} label="Descripcion"/>
                                    </div>
                                </div> 
                                <h1 className='text-center py-4 text-blackGora font-semibold'>
                                    Fotos de la Mascota
                                </h1>
                                <div className='flex flex-row justify-center my-2 gap-2 space-x-2'>
                                    

                                    <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                                    <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                                    <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

                                    <FileUpload disabled={isLoading} ref={fileUploadRef} name="demo[]" url="/api/upload" multiple accept="image/*" maxFileSize={1000000}
                                        onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                                        headerTemplate={headerTemplate}
                                        chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                                </div>
                            </ModalBody>
                            <ModalFooter className='flex justify-center'>
                                <div className='flex flex-col w-full'>
                                    <div className='flex justify-center'>
                                        <Button  
                                            className='m-2 bg-greenGora text-OrangeLightGora px-6' 
                                            radius="full" 
                                            size="md"
                                            isLoading={isLoading}
                                            onClick={(e)=>{
                                                UpdatePets(e)
                                            }}>
                                            Guardar
                                        </Button>
                                        <Button  
                                            className={`m-2 ${enable ? "bg-redGora" : "bg-orangeGora"} text-OrangeLightGora px-6`}
                                            radius="full" 
                                            size="md"
                                            isLoading={isLoading}
                                            onClick={(e)=>{
                                                UpdatePets(e, (enable ? 0 : 1))
                                            }}>
                                            {enable? "Eliminar " : "Habilitar"}
                                        </Button>                              
                                    </div>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                    </ModalContent>
                </Modal>
            </div>
            <div className='mn:px-6 mn:py-6 mn:pb-0 md:px-6 xl:py-8'>
                <div className='grid max-w-7xl mx-auto md:gris-cols-2'>
                    <h2 className='mn:text-2xl md:text-4xl font-semibold'>
                        Agrega una nueva {<span className='text-greenGora'>Mascota</span>}
                    </h2>
                    <div className="flex flex-wrap gap-4 mn:my-6 md:my-8 mn:justify-center xl:justify-between">
                        <div className='flex flex-wrap mn:justify-center xl:justify-start gap-4 mn:gap-2'>
                            <Button 
                                isLoading={isLoading} 
                                onClick={(e)=> [setIsDog(true),setIsHistory(false), setIsCat(false)]} 
                                className={`bg-transparent border  ${isDog ? "bg-greenGora text-pinkLightGora" : "border-greenGora text-greenGora"} hover:bg-greenGora hover:text-pinkLightGora mn:text-sm xl:text-xl`} 
                                radius="full" 
                            >
                                Guaus
                            </Button>
                            <Button 
                                isLoading={isLoading} 
                                onClick={(e)=> [setIsDog(false),setIsHistory(false),setIsCat(true)]} 
                                className={`bg-transparent border ${isCat ? "bg-greenGora text-pinkLightGora" : "border-greenGora text-greenGora"} hover:bg-greenGora hover:text-pinkLightGora mn:text-sm xl:text-xl`} 
                                radius="full" 
                            >
                                Miaus
                            </Button>
                            <Button 
                                isLoading={isLoading} 
                                onClick={(e) => [ setIsHistory(true),setIsDog(false),setIsCat(false) ]} 
                                className={`bg-transparent border ${isHistory ? "bg-greenGora text-pinkLightGora" : "border-greenGora text-greenGora"} hover:bg-greenGora hover:text-pinkLightGora mn:text-sm xl:text-xl`} 
                                radius="full" 
                            >
                                Historias
                            </Button>
                            <Button 
                                onPress={onOpen} 
                                className='bg-transparent border border-redGora text-redGora mn:text-sm xl:text-xl pi pi-plus' 
                                radius="full" 
                            />
                        </div>
                        <div>
                            <Button 
                                isLoading={isLoading} 
                                onClick={handleClick} 
                                className={`bg-transparent border border-greenGora text-greenGora hover:bg-greenGora hover:text-pinkLightGora mn:text-sm xl:text-xl`} 
                                radius="full" 
                            >
                                Cerrar sesion <i className="pi pi-sign-out mr-2" />
                            </Button>
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
                                                                    <h1 className={'flex font-semibold text-purpleGora px-2 justify-end w-full mn:text-xl md:text-2xl'}>
                                                                        {card.title.substring(0, 3)}<span className='text-greenGora'>{card.title.substring(3, card.title.charCodeAt(card.title))}</span>
                                                                    </h1>
                                                                    <h1 className={'flex font-semibold text-purpleGora px-2 justify-end w-full mn:text-xl md:text-sm'}>
                                                                        Edad: {card.old}
                                                                    </h1>
                                                                    <p className={'flex font-normal text-gray w-full h-[58px] text-right text-[12px]'}>
                                                                        {card.shortDescription.substring(0,75) + "..."}
                                                                    </p>
                                                                    <div className="flex mn:my-2 justify-center">
                                                                        <Button  
                                                                            onClick={(e)=> 
                                                                                {   
                                                                                    setId(card.id)
                                                                                    setName(card.title)
                                                                                    setDescription(card.longDescription)
                                                                                    setYearosld(card.old)
                                                                                    setEnable(card.ANIMALS_ENABLE)
                                                                                    setIsEdit(true)
                                                                                }
                                                                            } 
                                                                            className='bg-transparent border border-greenGora text-greenGora' radius="full" size="sm" endContent={<i className="pi pi-pencil" style={{ color: '#489E84' }}/>}>
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
                    ) // duplicar
                    :
                    isCat?
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
                                                            className={`object-cover shadow-md transition-all duration-300 rounded-none w-full h-[200px]`}
                                                            src={card.image}
                                                        />
                                                        <CardBody>
                                                            <div className='flex flex-col'>
                                                                <h1 className={'flex font-semibold text-purpleGora px-2 justify-end w-full mn:text-xl md:text-2xl'}>
                                                                    {card.title.substring(0, 3)}<span className='text-greenGora'>{card.title.substring(3, card.title.charCodeAt(card.title))}</span>
                                                                </h1>
                                                                <h1 className={'flex font-semibold text-purpleGora px-2 justify-end w-full mn:text-xl md:text-sm'}>
                                                                    Edad: {card.old}
                                                                </h1>
                                                                <p className={'flex font-normal text-gray w-full h-[58px] text-right text-[12px]'}>
                                                                    {card.shortDescription.substring(0,75) + "..."}
                                                                </p>
                                                                <div className="flex mn:my-2 justify-center">
                                                                    <Button  
                                                                        onClick={(e)=>{ 
                                                                            setId(card.id)
                                                                            setName(card.title)
                                                                            setDescription(card.longDescription)
                                                                            setYearosld(card.old)
                                                                            setIsEdit(true)} 
                                                                        }
                                                                        className='bg-transparent border border-greenGora text-greenGora' 
                                                                        radius="full" 
                                                                        size="sm" 
                                                                        endContent={<i className="pi pi-pencil" style={{ color: '#489E84' }}/>}
                                                                    >
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
                                            History.map((card: any) => (
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
                                                                    <Button  
                                                                        onClick={(e)=> {
                                                                            setId(card.id)
                                                                            setName(card.title)
                                                                            setDescription(card.longDescription)
                                                                            setYearosld(card.old)
                                                                            setIsEdit(true)
                                                                        }} 
                                                                        className='bg-transparent border border-greenGora text-greenGora' radius="full" size="sm" endContent={<i className="pi pi-pencil" style={{ color: '#489E84' }}/>}>
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
        </div>
    )
}