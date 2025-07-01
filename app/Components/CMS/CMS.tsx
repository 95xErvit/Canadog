"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Button, Textarea, Card, Input,CardBody, CardHeader,CardFooter , Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Pagination } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/react";
import { Toast } from 'primereact/toast';
import { FileUpload, FileUploadHeaderTemplateOptions, FileUploadSelectEvent, FileUploadUploadEvent, ItemTemplateOptions,} from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Tooltip } from 'primereact/tooltip';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import 'primeicons/primeicons.css';
import axios from 'axios';
import { GetPets, GetProducts } from '../Data/Data';
import { array, object } from 'yup';

export default function CMS({CardsDogs, CardsCats, CardsProducts, DogsLength}: any) 
{ 
    const toast = useRef<Toast>(null);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isOpenProduct, setIsOpenProduct] = useState(false);
    const [isEditProduct, setIsEditProduct] = useState(false);
    const [name, setName] = useState<string>('');
    const [cost, setCost] = useState<string>('');
    const [unity, setUnity] = useState<string>('');
    const [yearOlds, setYearosld] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [file, setFile] = useState<any>(null);
    const [file2, setFile2] = useState<any>(null);
    const [file3, setFile3] = useState<any>(null);
    const [file4, setFile4] = useState<any>(null);
    const [file5, setFile5] = useState<any>(null);
    const [files, setFiles] = useState<any>([]);
    const [isDog, setIsDog] = useState(true);
    const [isCat, setIsCat] = useState(false)
    const [isHistory, setIsHistory] = useState(false);
    const [isProduct, setIsProduct] = useState(false);
    const [enable, setEnable] = useState(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef<FileUpload>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [History, setHistory] = useState([])
    const [Dogs, setDogs] = useState(CardsDogs)
    const [Cats, setCats] = useState(CardsCats)
    const [Products, setProducts] = useState(CardsProducts)
    const [isEjecuted, setIsEjecuted] = useState(false);
    const router = useRouter()

    const onTemplateSelect = (e: FileUploadSelectEvent) => {
        console.log(e.files)
        let _totalSize = totalSize;
        let files = e.files;
        let exit = false
        console.log(!isEdit)
        if(e.files.length === 0 && !isEdit)
        {
            toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'Tienes que subir mínimo una imagen'});
        }

        if(e.files.length <= 5)
            {
                for (let i = 0; i < files.length; i++) 
                {
                    _totalSize += files[i].size || 0;
                    const ext = files[i].name.split('.')[1]

                    if((ext === "jpg") || (ext === "jpeg")||  (ext === "png"))
                    {
                        exit = false
                    }
                    else
                    {
                        exit = true
                    }

                    console.log(exit)
                }
            }else
            {
                toast.current?.show({ severity: 'error', summary: 'Error subiendo las imagenes', className:"m-2", detail: 'Solo puedes subir máximo 5 imagenes'});
                return
            }

        if(exit)
        {   
            toast.current?.show({ severity: 'error', summary: 'Error en la imagen', className:"m-2", detail: 'El formato de la imagen debe ser JPG,JPEG o PNG.'});
            return
        }

        if (e.files.length > 0) {

            /*const isValidImage = await validateImage(e.files[0]);

            if (!isValidImage) {
                
                return;
            }*/
            const reader = new FileReader();
            const reader2 = new FileReader();
            const reader3 = new FileReader();
            const reader4 = new FileReader();
            const reader5 = new FileReader();

            reader.onloadend = function (event:any) {
                const base64Text = event.target.result;
                console.log(base64Text);
                setFile(base64Text);
            }

            reader2.onloadend = function (event:any) {
                const base64Text = event.target.result;
                console.log(base64Text);
                setFile2(base64Text);
            }

            reader3.onloadend = function (event:any) {
                const base64Text = event.target.result;
                console.log(base64Text);
                setFile3(base64Text);
            }

            reader4.onloadend = function (event:any) {
                const base64Text = event.target.result;
                console.log(base64Text);
                setFile4(base64Text);
            }

            reader5.onloadend = function (event:any) {
                const base64Text = event.target.result;
                console.log(base64Text);
                setFile5(base64Text);
            }

            reader.readAsDataURL(e.files[0]);

            console.log(e.files.length)
            if(e.files.length === 2)
            {  
                reader2.readAsDataURL(e.files[1]);
            } 
            
            if(e.files.length === 3)
            {   
                console.log(e.files[2])
                console.log(e.files[1])
                reader2.readAsDataURL(e.files[1]);
                reader3.readAsDataURL(e.files[2]);
            }

            if(e.files.length === 4)
            {   
                console.log(e.files[3])
                console.log(e.files[2])
                console.log(e.files[1])
                reader2.readAsDataURL(e.files[1]);
                reader3.readAsDataURL(e.files[2]);
                reader4.readAsDataURL(e.files[3]);
            }

            if(e.files.length === 5)
            {   
                console.log(e.files[3])
                console.log(e.files[2])
                console.log(e.files[1])
                reader2.readAsDataURL(e.files[1]);
                reader3.readAsDataURL(e.files[2]);
                reader4.readAsDataURL(e.files[3]);
                reader5.readAsDataURL(e.files[4]);
            }
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
        router.push('/UserCanaDog/Login')
    }

    const onTemplateRemove = (file: File, callback: Function) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateRemoveEdit = (file: any, callback: Function) => {

        let newfile : any = files

        newfile.splice(file.index, 1)
        newfile =newfile.map((obj : any,index: any )=>{
            console.log(obj, index)
            return{
                image:obj.image,
                index:index
            }
        })
        console.log(newfile)
        setFiles(newfile)
        fileUploadRef.current?.setUploadedFiles(files)
        
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

    const itemTemplate = (inFile: any, props: ItemTemplateOptions) => {
        console.log(inFile);
        const file = inFile;
    
        return (
            <div 
                key={inFile.index} 
                className="flex justify-center gap-4 items-center p-2"
            >
                <div className="flex items-center gap-4">
                    <Image
                        alt="Album cover"
                        className="object-contain shadow-md rounded-md w-[100px] h-[100px]"
                        src={inFile.image}
                        width={140}
                        height={150}
                    />
                    <span className="text-black text-left">{file.name}</span>
                    <Button 
                        type="button" 
                        className="bg-red-500 hover:bg-red-400 text-white pi pi-times" 
                        onClick={() => onTemplateRemoveEdit(file, props.onRemove)} 
                    />
                </div>
            </div>
        );
    };
    
    const sendPets = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)
        try
        {
            const response = await axios.post("/UserCanaDog/CMS/api/pets",{
                data:{
                    User:"Administrador_CanaDog",
                    Enable: 1, 
                    Name: name, 
                    OldDate:yearOlds, 
                    Description:description, 
                    Type:isDog ? "DOG" : isCat? "CAT": "HISTORY", 
                    Images: file, 
                    Images2: file2,
                    Images3: file3,
                    Images4: file4,
                    Images5: file5, 
                    Web: "CANADOG"
                }
            })
            console.log('Contesto:', response);
        }
        catch(err){
            console.log(err)
        }
        setTimeout(()=>location.reload(), 4000)
    };

    const sendProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)
        try
        {
            const response = await axios.post("/UserCanaDog/CMS/api/products",{
                data:{
                    PRODUCTS_USER:"Administrador_CanaDog",
                    PRODUCTS_ENABLE: 1,
                    CATEGORY_ID:1, 
                    PRODUCTS_NAME: name, 
                    PRODUCTS_STOCK:unity, 
                    PRODUCTS_DESCRIPTION:description, 
                    PRODUCTS_WORTH:cost, 
                    PRODUCT_IMAGE: file, 
                    PRODUCTS_WEB: "CANADOG"
                }
            })
            console.log('Contesto:', response);
        }
        catch(err){
            console.log(err)
        }
        setTimeout(()=>location.reload(), 4000)
    };

    const reset = async () => {
        setName('')
        setCost('')
        setDescription('')
        setUnity('')
        setYearosld('')
    };

    const UpdatePets = async (e: React.FormEvent, EnablePet = 1) => {
        setIsLoading(true)
        e.preventDefault();
    
        try
        {
            const response = await axios.patch("/UserCanaDog/CMS/api/pets",{
                data:{
                    AnimaldId:id, 
                    User:"Administrador_CanaDog",
                    Enable: EnablePet, 
                    Name: name, 
                    OldDate:yearOlds, 
                    Description:description,
                    Type:isDog ? "DOG" : isCat? "CAT": "HISTORY", 
                    Images: file,
                    Images2: file2,
                    Images3: file3,
                    Images4: file4,
                    Images5: file5, 
                    Web: "CANADOG" 
                }})
            console.log('Contesto:', response);
        }
        catch(err){
            console.log(err)
        }
        setTimeout(()=>location.reload(), 4000)
    };

    const UpdateProducts = async (e: React.FormEvent, EnableProducts = 1) => {
        e.preventDefault();
        setIsLoading(true)
        try
        {   console.log(cost)
            const response = await axios.patch("/UserCanaDog/CMS/api/products",{data:{
                PRODUCTS_ID:id, 
                PRODUCTS_USER:"Administrador_CanaDog",
                PRODUCTS_ENABLE: EnableProducts,
                CATEGORY_ID:1, 
                PRODUCTS_NAME: name, 
                PRODUCTS_STOCK:unity.toString(), 
                PRODUCTS_DESCRIPTION:description, 
                PRODUCTS_WORTH:cost.toString(), 
                PRODUCT_IMAGE: file, 
                PRODUCTS_WEB: "CANADOG"}
            })

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

        useEffect(() =>{
            const fetchData = async () => {
                try 
                {
                    //const response = await axios.get('/UserCanaDog/CMS/api/pets',{params:{Type:"HISTORY"}});
                    let arrayHistory : any = await GetPets(undefined,"HISTORY", "CANADOG", true);
                    console.log(arrayHistory.array)
                    setHistory(arrayHistory.array)

                    let arrayDogs : any = await GetPets(undefined,"Dog", "CANADOG", true);
                    let cardsDogs = arrayDogs.array

                    let arrayCats: any = await GetPets(undefined, "Cat", "CANADOG", true);
                    let cardsCats = arrayCats.array
                    console.log(arrayDogs.array)
                    console.log(DogsLength)

                    const result4 : any = await GetProducts(undefined, "CANADOG", true)
                    setProducts(result4)
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

    useEffect(() => {
        if (fileUploadRef !== null) 
        {
            fileUploadRef.current?.setUploadedFiles(files)
            console.log(fileUploadRef)
        }
    },[files]);
    
    return(
        <div>
            <div className="flex mn:justify-center md:justify-start">
                <Modal className='mn:m-4 md:m-0' isOpen={isOpen} onOpenChange={onOpenChange} size='2xl' backdrop='blur' placement='center'>
                    <ModalContent>
                    {(onClose) => (
                        <>
                            {   !isProduct ?
                                <>
                                    <Toast ref={toast}></Toast>
                                    <ModalHeader className="flex justify-center text-2xl text-blackCanadog">
                                        ¡Bienvenido
                                    </ModalHeader>
                                    <ModalBody>
                                        <p className='text-greenCanadog px-4 text-xl text-center font-semibold'> 
                                            { isDog ? "Crea un nuevo Guau" : isCat ? "Crea un nuevo Miau" : isHistory ? "Crea una historia emotiva" : ""}
                                        </p>
                                        <h1 className='text-center py-4 text-blackGora font-semibold'>
                                            Ingrese la información de la mascota.
                                        </h1>
                                        <div className="flex w-full flex-col gap-4">
                                            <div className="flex mb-6 md:mb-0 gap-4">
                                                <Input required disabled={isLoading} onChange={((e)=> setName(e.target.value))} type="name" variant={'faded'} label="Nombre"/>
                                                { !isHistory && <Input required onChange={((e)=> setYearosld(e.target.value))} type="edad" variant={'faded'} label="Edad"/>}
                                            </div>
                                            <div className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                { 
                                                    isHistory === true ? 
                                                    
                                                        <></>
                                                    :   
                                                    <>
                                                        <Textarea description={"Máximo 300 caracteres"} required disabled={isLoading} value={description} maxLength={300} onChange={((e)=> setDescription(e.target.value))} type="descripcion" variant={'faded'} label="Descripcion"/>
                                                    </>
                                                }
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
                                                multiple
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
                                                <Button 
                                                onClick={(e)=>
                                                        {   
                                                            if(isHistory)
                                                            {
                                                                if(name === '')
                                                                {
                                                                    toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'El nombre es obligatorio'});
                                                                    return
                                                                }
                                                            }

                                                            if(!isHistory)
                                                            {
                                                                if(name === '')
                                                                {
                                                                    toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'El nombre es obligatorio'});
                                                                    return
                                                                }

                                                                if(yearOlds === '')
                                                                {
                                                                    toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'La edad es obligatorio'});
                                                                    return
                                                                }

                                                                if(description === '')
                                                                {
                                                                    toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'La descripcion es obligatorio'});
                                                                    return
                                                                }
                                                            }

                                                            if(file === null)
                                                            {
                                                                toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'Tienes que subir mínimo una imagen'});
                                                                return
                                                            }
                                                            
                                                            sendPets(e)
                                                            
                                                        }
                                                    } 
                                                    isLoading={isLoading} 
                                                    className='border-2 border-greenCanadog bg-mentaCanadog hover:bg-greenCanadog text-white text-lg px-6' 
                                                    radius="full" 
                                                    size="md"
                                                >
                                                    Guardar
                                                </Button>                              
                                            </div>
                                        </div>
                                    </ModalFooter>
                                </>
                                :
                                <>
                                    <Toast ref={toast}></Toast>
                                    <ModalHeader className="flex justify-center text-greenGora">
                                        ¡Bienvenido {<p className='text-blackGora ml-1'> aca podras crear los diferentes productos</p>}!
                                    </ModalHeader>
                                    <ModalBody>
                                        <p className='text-greenCanadog px-4 text-xl text-center font-semibold'> 
                                        Crea un nuevo producto
                                        </p>
                                        <h1 className='text-center py-4 text-blackGora font-semibold'>
                                            Ingrese la información del producto.
                                        </h1>
                                        <div className="flex w-full flex-col gap-4">
                                            <div className="flex mb-6 md:mb-0 gap-4">
                                                <Input required disabled={isLoading} onChange={((e)=> setName(e.target.value))} type="name" variant={'faded'} label="Nombre"/>
                                            </div>
                                            <div className="flex mb-6 md:mb-0 gap-4">
                                                <Input value={unity} required disabled={isLoading} onChange={((e)=> setUnity(e.target.value))} type="unity" variant={'faded'} label="Unidades"/>
                                                <Input value={cost} required disabled={isLoading} onChange={((e)=> setCost(e.target.value))} type="cost" variant={'faded'} label="Costo"/>
                                            </div>
                                            {/* <div className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                <Textarea required disabled={isLoading} maxLength={100} onChange={((e)=> setDescription(e.target.value))} type="descripcion" variant={'faded'} label="Descripción"/>
                                            </div> */}
                                        </div> 
                                        <h1 className='text-center py-4 text-blackGora font-semibold'>
                                            Fotos del producto
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
                                                <Button onClick={(e)=>
                                                    {

                                                        if(name === '')
                                                        {
                                                            toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'El nombre es obligatorio'});
                                                            return
                                                        }

                                                        if(unity === '')
                                                        {
                                                            toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'Las unidades son obligatorias'});
                                                            return
                                                        }

                                                        if(cost === '')
                                                        {
                                                            toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'El precio es obligatorio'});
                                                            return
                                                        }

                                                        // if(description === '')
                                                        // {
                                                        //     toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'La descripcion es obligatorio'});
                                                        //     return
                                                        // }

                                                        if(file === null)
                                                        {
                                                            toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'Tienes que subir mínimo una imagen'});
                                                            return
                                                        }

                                                        sendProduct(e)
                                                        
                                                    }
                                                }  
                                                    isLoading={isLoading} 
                                                    className='border-2 border-greenCanadog bg-mentaCanadog hover:bg-greenCanadog text-white text-lg px-6' 
                                                    radius="full" 
                                                    size="md"
                                                >
                                                    Guardar
                                                </Button>                              
                                            </div>
                                        </div>
                                    </ModalFooter>
                                </>
                            }
                        </>
                    )}
                    </ModalContent>
                </Modal>
            </div>
            <div className="flex mn:justify-center md:justify-start">
                <Modal className='mn:m-4 md:m-0' isOpen={isEdit} onOpenChange={setIsEdit} size='2xl' backdrop='blur' placement='center'>
                    <ModalContent>
                    {(onClose) => (
                        <>  
                        {   
                            !isProduct ?
                            <>
                                <Toast ref={toast}></Toast>
                                <ModalHeader className="flex justify-center text-2xl text-blackCanadog">
                                    ¡Bienvenido
                                </ModalHeader>
                                <ModalBody>
                                    <p className='text-greenCanadog px-4 text-xl text-center font-semibold'> 
                                        { isDog ? "Edita un Guau" : isCat ? "Edita un Miau" : isHistory ? "Edita la historia emotiva" : ""}
                                    </p>
                                    <h1 className='text-center py-4 text-blackGora font-semibold'>
                                        Edita la información de la mascota.
                                    </h1>
                                    <div className="flex w-full flex-col gap-4">
                                        <div className="flex mb-6 md:mb-0 gap-4">
                                            <Input 
                                                required 
                                                disabled={isLoading} 
                                                value={name} 
                                                onChange={((e)=> setName(e.target.value))} 
                                                type="name" 
                                                variant={'faded'} 
                                                label="Nombre"
                                            />
                                            { !isHistory && 
                                                <Input 
                                                    required 
                                                    disabled={isLoading} 
                                                    value={yearOlds} 
                                                    onChange={((e)=> setYearosld(e.target.value))} 
                                                    type="edad" 
                                                    variant={'faded'} 
                                                    label="Edad"
                                                />  
                                            }
                                        </div>
                                        <div className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                            { 
                                                isHistory === true ? 
                                                
                                                    <></>
                                                :   
                                                <>
                                                    <Textarea description={"Maximo 300 caracteres"} required disabled={isLoading} value={description} maxLength={300} onChange={((e)=> setDescription(e.target.value))} type="descripcion" variant={'faded'} label="Descripcion"/> 
                                                </>
                                            }
                                        </div>
                                    </div> 
                                    <h1 className='text-center py-4 text-blackGora font-semibold'>
                                        Fotos de la Mascota
                                    </h1>
                                    <div className='flex flex-row justify-center my-2 gap-2 w-full'>
                                        <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                                        <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                                        <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

                                        <FileUpload 
                                            disabled={isLoading} 
                                            ref={fileUploadRef} 
                                            name="demo[]" 
                                            url="/api/upload"  
                                            accept="image/*" 
                                            maxFileSize={1000000}
                                            onUpload={onTemplateUpload} 
                                            onSelect={onTemplateSelect} 
                                            onError={onTemplateClear} 
                                            onClear={onTemplateClear}
                                            headerTemplate={headerTemplate} 
                                            itemTemplate={itemTemplate} 
                                            chooseOptions={chooseOptions} 
                                            uploadOptions={uploadOptions} 
                                            cancelOptions={cancelOptions} 
                                            className='w-full'
                                            multiple
                                        />
                                    </div>
                                </ModalBody>
                                <ModalFooter className='flex justify-center'>
                                    <div className='flex flex-col w-full'>
                                        <div className='flex justify-center'>
                                            <Button  
                                                className='m-2 border-2 border-greenCanadog bg-mentaCanadog hover:bg-greenCanadog text-white text-lg px-6' 
                                                radius="full" 
                                                size="md"
                                                isLoading={isLoading}
                                                onClick={(e)=>
                                                    {   
                                                        if(isHistory)
                                                        {
                                                            if(name === '')
                                                            {
                                                                toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'El nombre es obligatorio'});
                                                                return
                                                            }
                                                        }

                                                        if(!isHistory)
                                                        {
                                                            if(name === '')
                                                            {
                                                                toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'El nombre es obligatorio'});
                                                                return
                                                            }

                                                            if(yearOlds === '')
                                                            {
                                                                toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'La edad es obligatorio'});
                                                                return
                                                            }

                                                            if(description === '')
                                                            {
                                                                toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'La descripcion es obligatorio'});
                                                                return
                                                            }
                                                        }
                                                        
                                                        UpdatePets(e)
                                                        
                                                    }
                                                }>
                                                Guardar
                                            </Button>
                                            <Button  
                                                className={`m-2 ${enable ? "bg-redGora" : "bg-orangeGora"} text-white text-lg px-6`}
                                                radius="full" 
                                                size="md"
                                                isLoading={isLoading}
                                                onClick={(e)=>{

                                                    if(isHistory)
                                                    {
                                                        if(name === '')
                                                        {
                                                            toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'El nombre es obligatorio'});
                                                            return
                                                        }
                                                    }

                                                    if(!isHistory)
                                                    {
                                                        if(name === '')
                                                        {
                                                            toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'El nombre es obligatorio'});
                                                            return
                                                        }

                                                        if(yearOlds === '')
                                                        {
                                                            toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'La edad es obligatorio'});
                                                            return
                                                        }

                                                        if(description === '')
                                                        {
                                                            toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'La descripcion es obligatorio'});
                                                            return
                                                        }
                                                    }

                                                    UpdatePets(e, (enable ? 0 : 1))
                                                }}>
                                                {enable? "Eliminar " : "Habilitar"}
                                            </Button>                              
                                        </div>
                                    </div>
                                </ModalFooter>
                            </>
                            :
                            
                            <>  
                                <Toast ref={toast}></Toast>
                                <ModalHeader className="flex justify-center text-greenGora">
                                    ¡Bienvenido {<p className='text-blackGora ml-1'> aqui podras editar tus productos</p>}!
                                </ModalHeader>
                                <ModalBody>
                                    <h1 className='text-center py-4 text-blackGora font-semibold'>
                                        Edita la información del producto.
                                    </h1>
                                    <div className="flex w-full flex-col gap-4">
                                    <div className="flex mb-6 md:mb-0 gap-4">
                                            <Input 
                                                value={name} 
                                                required 
                                                disabled={isLoading} 
                                                onChange={((e)=> setName(e.target.value))}
                                                type="name" 
                                                variant={'faded'} 
                                                label="Nombre"
                                            />
                                        </div>
                                        <div className="flex mb-6 md:mb-0 gap-4">
                                            <Input 
                                                value={unity} 
                                                required 
                                                disabled={isLoading} 
                                                onChange={((e)=> setUnity(e.target.value))} 
                                                type="unity" 
                                                variant={'faded'} 
                                                label="Unidades"
                                            />
                                            <Input 
                                                value={cost} 
                                                required 
                                                onChange={((e)=> setCost(e.target.value))} 
                                                type="cost" 
                                                variant={'faded'} 
                                                label="Costo"
                                            />
                                        </div>
                                        {/* <div className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                            <Textarea value={description} required disabled={isLoading} maxLength={100} onChange={((e)=> setDescription(e.target.value))} type="descripcion" variant={'faded'} label="Descripcion"/>
                                        </div> */}
                                    </div> 

                                    <h1 className='text-center py-4 text-blackGora font-semibold'>
                                        Fotos del producto
                                    </h1>

                                    <div className='flex flex-row justify-center my-2 gap-2 space-x-2'>
                                        <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                                        <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                                        <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

                                        <FileUpload 
                                            disabled={isLoading} 
                                            ref={fileUploadRef} 
                                            name="demo[]" 
                                            url="/api/upload" 
                                            accept="image/*" 
                                            maxFileSize={1000000}
                                            onUpload={onTemplateUpload} 
                                            onSelect={onTemplateSelect} 
                                            onError={onTemplateClear} 
                                            onClear={onTemplateClear}
                                            headerTemplate={headerTemplate} 
                                            itemTemplate={itemTemplate} 
                                            chooseOptions={chooseOptions} 
                                            uploadOptions={uploadOptions} 
                                            cancelOptions={cancelOptions} 
                                            multiple 
                                        />
                                    </div>
                                </ModalBody>
                                <ModalFooter className='flex justify-center'>
                                    <div className='flex flex-col w-full'>
                                        <div className='flex justify-center'>
                                            <Button  
                                                className='m-2 border-2 border-greenCanadog bg-mentaCanadog hover:bg-greenCanadog text-white text-lg px-6' 
                                                radius="full" 
                                                size="md"
                                                isLoading={isLoading}
                                                onClick={(e)=>{

                                                    if(name === '')
                                                    {
                                                        toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'El nombre es obligatorio'});
                                                        return
                                                    }

                                                    if(unity === '')
                                                    {
                                                        toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'Las unidades son obligatorias'});
                                                        return
                                                    }

                                                    if(cost === '')
                                                    {
                                                        toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'El precio es obligatorio'});
                                                        return
                                                    }

                                                    // if(description === '')
                                                    // {
                                                    //     toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'La descripcion es obligatorio'});
                                                    //     return
                                                    // }

                                                    UpdateProducts(e)
                                                }}>
                                                Guardar
                                            </Button>
                                            <Button  
                                                className={`m-2 ${enable ? "bg-redGora" : "bg-orangeGora"} text-white text-lg px-6`}
                                                radius="full" 
                                                size="md"
                                                isLoading={isLoading}
                                                onClick={(e)=>
                                                {
                                                    if(name === '')
                                                    {
                                                        toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'El nombre es obligatorio'});
                                                        return
                                                    }

                                                    if(unity === '')
                                                    {
                                                        toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'Las unidades son obligatorias'});
                                                        return
                                                    }

                                                    if(cost === '')
                                                    {
                                                        toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'El precio es obligatorio'});
                                                        return
                                                    }

                                                    if(description === '')
                                                    {
                                                        toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'La descripcion es obligatorio'});
                                                        return
                                                    }

                                                    if(file === null)
                                                    {
                                                        toast.current?.show({ severity: 'error', summary: 'Obligatorio', className:"m-2", detail: 'Tienes que subir mínimo una imagen'});
                                                        return
                                                    }

                                                    UpdateProducts(e, (enable ? 0 : 1))
                                                }}>
                                                {enable? "Eliminar " : "Habilitar"}
                                            </Button>                              
                                        </div>
                                    </div>
                                </ModalFooter>
                            </>
                        }
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
                                onClick={(e)=> [setIsProduct(false), setIsDog(true),setIsHistory(false), setIsCat(false)]} 
                                className={`bg-transparent border  ${isDog ? "bg-greenCanadog text-white" : "border-greenCanadog text-greenCanadog"} hover:bg-mentaCanadog hover:text-white mn:text-sm xl:text-xl`} 
                                radius="full" 
                            >
                                Guaus
                            </Button>
                            <Button 
                                isLoading={isLoading} 
                                onClick={(e)=> [setIsProduct(false), setIsDog(false),setIsHistory(false),setIsCat(true)]} 
                                className={`bg-transparent border  ${isCat ? "bg-greenCanadog text-white" : "border-greenCanadog text-greenCanadog"} hover:bg-mentaCanadog hover:text-white mn:text-sm xl:text-xl`} 
                                radius="full" 
                            >
                                Miaus
                            </Button>
                            <Button 
                                isLoading={isLoading} 
                                onClick={(e) => [ setIsProduct(false), setIsHistory(true),setIsDog(false),setIsCat(false) ]} 
                                className={`bg-transparent border  ${isHistory ? "bg-greenCanadog text-white" : "border-greenCanadog text-greenCanadog"} hover:bg-mentaCanadog hover:text-white mn:text-sm xl:text-xl`}
                                radius="full" 
                            >
                                Historias
                            </Button>
                            <Button 
                                isLoading={isLoading} 
                                onClick={(e) => [ setIsProduct(true), setIsHistory(false),setIsDog(false),setIsCat(false) ]} 
                                className={`bg-transparent border  ${isProduct ? "bg-greenCanadog text-white" : "border-greenCanadog text-greenCanadog"} hover:bg-mentaCanadog hover:text-white mn:text-sm xl:text-xl`}
                                radius="full" 
                            >
                                Productos
                            </Button>
                            <Button 
                                onPress={onOpen} 
                                className='bg-transparent border border-greenCanadog text-mentaCanadog mn:text-sm xl:text-xl pi pi-plus' 
                                radius="full"
                                onClick={reset}
                            />
                        </div>
                        <div>
                            <Button 
                                isLoading={isLoading} 
                                onClick={handleClick} 
                                className={`bg-transparent border border-greenCanadog text-greenCanadog hover:bg-greenCanadog hover:text-white mn:text-sm xl:text-xl`} 
                                radius="full" 
                            >
                                Cerrar sesion <i className="pi pi-sign-out mr-2" />
                            </Button>
                        </div>
                    </div>
                </div>
                {   
                    isDog ?(
                        <div className='md:p-4'>
                            <div className='flex flex-wrap max-w-7xl mx-auto'>
                                <Card
                                    isBlurred
                                    className="border-none w-full"
                                    shadow="md"
                                >
                                    <ScrollShadow className="mn:w-full mn:h-[450px] md:w-full md:h-[500px] mt-6 mb-6" size={0}>
                                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                                            {
                                                Dogs.map((card: any) => (
                                                    <div 
                                                        key={card.id} 
                                                        className='relative m-4 row-span-1 h-[200px]'
                                                    >
                                                        <Card>
                                                            <div className="flex items-center">
                                                                <Image
                                                                    alt="Album cover"
                                                                    className='object-contain shadow-md bg-greenLightCanadog rounded-none mn:w-[140px] md:w-[170px] h-[200px]'
                                                                    src={card.Image[0].image}
                                                                    width={140}
                                                                    height={200}
                                                                />
                                                                <CardBody className='justify-around w-[170px] h-[200px]'>
                                                                    <div className='flex flex-wrap w-full'>
                                                                        <h1 className='flex font-semibold text-blackCanadog px-2 justify-end w-full mn:text-xl md:text-2xl'>
                                                                            {card.title.substring(0, 3)}
                                                                            <span className='text-greenCanadog'>
                                                                                {card.title.substring(3, card.title.charCodeAt(card.title))}
                                                                            </span>
                                                                        </h1>
                                                                        <h2 className='flex font-semibold text-greenCanadog px-2 justify-end w-full mn:text-xs xl:text-sm'>
                                                                            {card.old}
                                                                        </h2>
                                                                        <p className='flex font-normal text-gray w-full h-auto text-[15px]'>
                                                                            {card.shortDescription.substring(0,50) + "..."}
                                                                        </p>
                                                                        <div className="flex w-full justify-center flex-wrap py-2">
                                                                            <Button  
                                                                                onClick={(e)=> 
                                                                                    {   
                                                                                        setId(card.id)
                                                                                        setName(card.title)
                                                                                        setDescription(card.longDescription)
                                                                                        setYearosld(card.old)
                                                                                        setEnable(card.ANIMALS_ENABLE)
                                                                                        setFile(card.Image[0].image)
                                                                                        setFiles([{image: card.Image[0].image, index: 0}])
                                                                                        if(card.Image.length === 2)
                                                                                        {   
                                                                                            setFiles([{image: card.Image[0].image, index: 0}, 
                                                                                                {image: card.Image[1].image, index: 1}])
                                                                                            setFile2(card.Image[1].image)
                                                                                        }

                                                                                        if(card.Image.length === 3)
                                                                                        {   
                                                                                            setFiles([{image: card.Image[0].image, index: 0}, 
                                                                                                {image: card.Image[1].image, index: 1}, 
                                                                                                {image: card.Image[2].image, index: 2}])
                                                                                            setFile2(card.Image[1].image)
                                                                                            setFile3(card.Image[2].image)
                                                                                        }
                                                                                        
                                                                                        if(card.Image.length === 4)
                                                                                        {   
                                                                                            setFiles([{image: card.Image[0].image, index: 0}, 
                                                                                                {image: card.Image[1].image, index: 1}, 
                                                                                                {image: card.Image[2].image, index: 2}, 
                                                                                                {image: card.Image[3].image, index: 3}])
                                                                                            setFile2(card.Image[1].image)
                                                                                            setFile3(card.Image[2].image)
                                                                                            setFile4(card.Image[3].image)
                                                                                        }

                                                                                        if(card.Image.length === 5)
                                                                                        {   
                                                                                            setFiles([{image: card.Image[0].image, index: 0}, 
                                                                                                {image: card.Image[1].image, index: 1}, 
                                                                                                {image: card.Image[2].image, index: 2}, 
                                                                                                {image: card.Image[3].image, index: 3}, 
                                                                                                {image: card.Image[4].image, index: 4}])
                                                                                            setFile2(card.Image[1].image)
                                                                                            setFile3(card.Image[2].image)
                                                                                            setFile4(card.Image[3].image)
                                                                                            setFile5(card.Image[4].image)
                                                                                        }

                                                                                        setIsEdit(true)
                                                                                    }
                                                                                } 
                                                                                className='bg-mentaCanadog border-2 border-greenCanadog text-white hover:bg-greenCanadog text-md text-center' 
                                                                                radius="lg" 
                                                                                size="sm" 
                                                                                endContent={
                                                                                    <i className="pi pi-pencil" style={{ color: '#FFFFFF' }}/>
                                                                                }
                                                                            >
                                                                                Editar
                                                                            </Button>
                                                                        </div>  
                                                                    </div>
                                                                </CardBody>
                                                            </div>
                                                        </Card>
                                                        
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </ScrollShadow> 
                                </Card>
                            </div>
                        </div>
                    ) 
                    :
                    isCat?
                    (
                        <div className='md:p-4'>
                            <div className='flex flex-wrap max-w-7xl mx-auto'>
                                <Card
                                    isBlurred
                                    className="border-none w-full"
                                    shadow="md"
                                >
                                    <ScrollShadow className="mn:w-full mn:h-[450px] md:w-full md:h-[500px] mt-6 mb-6" size={0}>
                                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                                        {
                                            Cats.map((card: any) => (
                                                <div 
                                                    key={card.id} 
                                                    className='relative m-4 row-span-1 h-[200px]'
                                                >
                                                    <Card>
                                                        <div className="flex items-center">
                                                            <Image
                                                                alt="Album cover"
                                                                className='object-contain shadow-md bg-greenLightCanadog rounded-none mn:w-[140px] md:w-[170px] h-[200px]'
                                                                src={card.Image[0].image}
                                                                width={140}
                                                                height={200}
                                                            />
                                                            <CardBody className='justify-around w-[170px] h-[200px]'>
                                                                <div className='flex flex-wrap w-full'>
                                                                    <h1 className='flex font-semibold text-blackCanadog px-2 justify-end w-full mn:text-xl md:text-2xl'>
                                                                        {card.title.substring(0, 3)}
                                                                        <span className='text-greenCanadog'>{card.title.substring(3, card.title.charCodeAt(card.title))}</span>
                                                                    </h1>
                                                                    <h2 className='flex font-semibold text-greenCanadog px-2 justify-end w-full mn:text-xs xl:text-sm'>
                                                                        {card.old}
                                                                    </h2>
                                                                    <p className='flex font-normal text-gray w-full h-auto text-[15px]'>
                                                                        {card.shortDescription.substring(0,50) + "..."}
                                                                    </p>
                                                                    <div className="flex w-full justify-center flex-wrap py-2">
                                                                        <Button  
                                                                            onClick={(e)=> 
                                                                                { 
                                                                                    setId(card.id)
                                                                                    setName(card.title)
                                                                                    setDescription(card.longDescription)
                                                                                    setYearosld(card.old)
                                                                                    setEnable(card.ANIMALS_ENABLE)
                                                                                    setIsEdit(true)
                                                                                    setFile(card.Image[0].image)
                                                                                    setFiles([{image: card.Image[0].image, index: 0}])
                                                                                        if(card.Image.length === 2)
                                                                                        {   
                                                                                            setFiles([{image: card.Image[0].image, index: 0}, 
                                                                                                {image: card.Image[1].image, index: 1}])
                                                                                            setFile2(card.Image[1].image)
                                                                                        }

                                                                                        if(card.Image.length === 3)
                                                                                        {   
                                                                                            setFiles([{image: card.Image[0].image, index: 0}, 
                                                                                                {image: card.Image[1].image, index: 1}, 
                                                                                                {image: card.Image[2].image, index: 2}])
                                                                                            setFile2(card.Image[1].image)
                                                                                            setFile3(card.Image[2].image)
                                                                                        }
                                                                                        
                                                                                        if(card.Image.length === 4)
                                                                                        {   
                                                                                            setFiles([{image: card.Image[0].image, index: 0}, 
                                                                                                {image: card.Image[1].image, index: 1}, 
                                                                                                {image: card.Image[2].image, index: 2}, 
                                                                                                {image: card.Image[3].image, index: 3}])
                                                                                            setFile2(card.Image[1].image)
                                                                                            setFile3(card.Image[2].image)
                                                                                            setFile4(card.Image[3].image)
                                                                                        }

                                                                                        if(card.Image.length === 5)
                                                                                        {   
                                                                                            setFiles([{image: card.Image[0].image, index: 0}, 
                                                                                                {image: card.Image[1].image, index: 1}, 
                                                                                                {image: card.Image[2].image, index: 2}, 
                                                                                                {image: card.Image[3].image, index: 3}, 
                                                                                                {image: card.Image[4].image, index: 4}])
                                                                                            setFile2(card.Image[1].image)
                                                                                            setFile3(card.Image[2].image)
                                                                                            setFile4(card.Image[3].image)
                                                                                            setFile5(card.Image[4].image)
                                                                                        }
                                                                                } 
                                                                            }
                                                                            className='bg-mentaCanadog border-2 border-greenCanadog text-white hover:bg-greenCanadog text-md' 
                                                                            radius="lg"
                                                                            size="sm" 
                                                                            endContent={
                                                                                <i className="pi pi-pencil" style={{ color: '#FFFFFF' }}/>
                                                                            }
                                                                        >
                                                                            Editar
                                                                        </Button>
                                                                    </div>  
                                                                </div>
                                                            </CardBody>
                                                        </div>
                                                    </Card>
                                                    
                                                </div>
                                            ))
                                        }
                                        </div>
                                    </ScrollShadow> 
                                </Card>
                            </div>
                        </div>
                    ):
                    isHistory ?
                    (
                        <div className='px-4 py-6'>
                            <div className='flex flex-wrap max-w-7xl mx-auto'>
                                <Card
                                    isBlurred
                                    className="border-none w-full"
                                    shadow="md"
                                >
                                    <ScrollShadow className="mn:w-full mn:h-[450px] md:w-full md:h-[500px] mt-6 mb-6" size={0}>
                                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                                        {
                                            History.map((card: any) => (
                                                <div 
                                                    key={card.id} 
                                                    className='relative m-4 row-span-1 h-[200px]'
                                                >
                                                    <Card>
                                                        <div className="flex items-center">
                                                            <Image
                                                                alt="Album cover"
                                                                className='object-contain shadow-md bg-greenLightCanadog rounded-none mn:w-[140px] md:w-[170px] h-[200px]'
                                                                src={card.image}
                                                                width={140}
                                                                height={200}
                                                            />
                                                            <CardBody className='justify-center w-[170px] h-[200px]'>
                                                                <div className='flex flex-col gap-8'>
                                                                    <h1 className="flex justify-center font-semibold text-greenCanadog text-2xl">
                                                                        {card.title}
                                                                    </h1>
                                                                    {/* <p className='flex ml-2 justify-center mt-2 text-[12px] text-right w-full'>
                                                                        {card.shortDescription.substring(0,50)}
                                                                    </p> */}
                                                                    <div className="flex w-full justify-center flex-wrap py-2">
                                                                        <Button  
                                                                            onClick={(e)=> {
                                                                                console.log(card)
                                                                                setId(card.id)
                                                                                setName(card.title)
                                                                                setDescription(card.longDescription)
                                                                                setYearosld(card.old)
                                                                                setEnable(card.ANIMALS_ENABLE)
                                                                                setIsEdit(true)
                                                                                setFiles([{image: card.image, index: 0}])
                                                                               
                                                                            }} 
                                                                            className='bg-mentaCanadog border-2 border-greenCanadog text-white hover:bg-greenCanadog text-md' 
                                                                            radius="lg" 
                                                                            size="sm" 
                                                                            endContent={
                                                                                <i className="pi pi-pencil" style={{ color: '#FFFFFF' }}/>
                                                                            }
                                                                        >
                                                                            Editar
                                                                        </Button>
                                                                    </div>  
                                                                </div>
                                                            </CardBody>
                                                        </div>
                                                    </Card>
                                                </div>
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
                        <div className='md:p-4'>
                            <div className='flex flex-wrap max-w-7xl mx-auto'>
                                <Card isBlurred className="border-none w-full" shadow="md">
                                    <ScrollShadow className="mn:w-full mn:h-[450px] md:w-full md:h-[500px] mt-6 mb-6" size={0}>
                                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-[360px] gap-4'>
                                            {Products.map((card: any) => (
                                            <div
                                                key={card.id}
                                                className='m-4'
                                            >
                                                <Card isFooterBlurred className="w-full h-[330px]">
                                                    <div className='flex items-center'>
                                                        <CardHeader className="absolute z-10 top-1 flex-col items-start">
                                                            <h4 className="text-white font-semibold mn:text-2xl md:text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                                                                {card.title}
                                                            </h4>
                                                        </CardHeader>
                                                        <Image
                                                            alt="Album cover"
                                                            className="z-0 w-full h-[270px] object-cover"
                                                            src={card.image}
                                                            width={100}
                                                            height={100}
                                                        />
                                                        <CardFooter className="absolute bg-greenCanadog/50 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                                                            <div className='flex flex-col'>
                                                            <p className="text-white font-medium text-sm">
                                                                    Unidades: {card.unity}
                                                                </p>
                                                                <p className="text-white font-medium text-lg">
                                                                    ${card.cost}
                                                                </p>
                                                            </div>
                                                            <Button 
                                                                onClick={(e : any)=> 
                                                                {   
                                                                    console.log(card)
                                                                    setId(card.id)
                                                                    setName(card.title)
                                                                    setCost(card.cost)
                                                                    setUnity(card.unity)
                                                                    setDescription(card.longDescription)
                                                                    setEnable(card.PRODUCTS_ENABLE)
                                                                    setIsEdit(true)
                                                                    setFiles([{image: card.image, index: 0}])
                                                                    
                                                                }} 
                                                                className="text-base text-white font-medium" 
                                                                color="success" 
                                                                radius="full" 
                                                                size="md"
                                                            >
                                                            Editar
                                                            </Button>
                                                        </CardFooter>
                                                    </div>
                                                </Card>
                                            </div>
                                            ))}
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