"use client"
import React from "react";
import { useRouter } from 'next/navigation';
import dogGora from "@/public/DogGora.png"
import catGora from "@/public/catGora.png"
import dog2Gora from "@/public/dog2Gora.png"
import {Navbar, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Image} from "@nextui-org/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();

  const donationNavigation = (path: string) => {
    console.log(window.location.href)
    router.push(path);
  };

  const handleMenuItemClick = (action: () => void) => {
    action();            // Ejecuta la acción del item
    setIsMenuOpen(false); // Cierra el menú
  };
    
  const menuItems = [
    { name: "Adopciones", action: () => donationNavigation('/#adopciones') },
    { name: "Tienda Canadog", action: () => window.open("https://gorafundacion.org", "_blank") },
    { name: "Contáctanos", action: () => donationNavigation('#contactanos') },
    { name: "Ayudanos", action: () => donationNavigation('/Home/Donations') }, 
  ];

  return (
    <div className="flex justify-center bg-white md:p-4 items-center">
            <div className="flex lg:hidden justify-center items-center py-2">
                <Link href="/" className="flex items-center relative">
                    <Image src="/LogoCanadog.jpg" width={120} height={100} alt="Canadog" />
                </Link>
            </div>
            <Navbar 
                onMenuOpenChange={setIsMenuOpen} 
                isMenuOpen={isMenuOpen} 
                className="bg-white md:py-10"
            >
                <NavbarContent className="flex justify-center items-center w-full">
                    {/* Menú web */}
                    <NavbarContent className="hidden lg:flex gap-10 w-full" justify="center">
                        <NavbarItem className="w-full text-center transition ease-in-out delay-180 hover:scale-110 duration-180">
                            <Link 
                                className="text-xl font-semibold text-greenCanadog hover:text-mentaCanadog relative before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-greenCanadog before:transition-all before:duration-300 hover:before:w-full cursor-pointer"
                                onClick={() => router.push('/#adopciones')}
                            >
                                Adopciones
                            </Link>
                        </NavbarItem>
                        <NavbarItem className="w-full text-center transition ease-in-out delay-180 hover:scale-110 duration-180">
                            <Link 
                                className="text-xl font-semibold text-greenCanadog hover:text-mentaCanadog relative before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-greenCanadog before:transition-all before:duration-300 hover:before:w-full cursor-pointer" 
                                href="https://gorafundacion.org" 
                                target="_blank"
                            >
                                Tienda Canadog
                            </Link>
                        </NavbarItem>
                        <NavbarItem className="w-full text-center">
                            <Link href="/">
                                <Image src="/LogoCanadog.jpg" width="180" height="100" alt="Canadog"/>
                            </Link>
                        </NavbarItem>
                        <NavbarItem className="w-full text-center transition ease-in-out delay-180 hover:scale-110 duration-180">
                            <Link 
                                className="text-xl font-semibold text-greenCanadog hover:text-mentaCanadog relative before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-greenCanadog before:transition-all before:duration-300 hover:before:w-full cursor-pointer" 
                                href="#"
                            >
                                Contáctanos
                            </Link>
                        </NavbarItem>
                        <NavbarItem className="w-full text-center transition ease-in-out delay-180 hover:scale-110 duration-180">
                            <Link 
                                className="text-xl font-semibold text-greenCanadog hover:text-mentaCanadog relative before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-greenCanadog before:transition-all before:duration-300 hover:before:w-full cursor-pointer" 
                                onClick={() => router.push('/Home/Donations')}
                            >
                                Ayúdanos
                            </Link>
                        </NavbarItem>
                    </NavbarContent>

                    {/* Botón hamburguesa */}
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="lg:hidden text-greenCanadog hover:text-mentaCanadog font-bold"
                    />
                </NavbarContent>
                
                {/* Menú móvil */}
                <NavbarMenu>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item.name}-${index}`} className="mt-4">
                            <Link
                                className="flex justify-center py-2 w-full text-4xl text-greenCanadog hover:text-mentaCanadog cursor-pointer"
                                onClick={() => handleMenuItemClick(item.action)}
                            >
                                {item.name}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                    {/* Iconos Gora solo visible en pantallas moviles */}
                    <div className="flex justify-center mt-8">
                        <div className="flex justify-center items-center m-4">
                            <Image src={dogGora.src} width="60" height="40" alt="Logo Gora"/>
                        </div>
                        <div className="flex justify-center items-center m-4">
                            <Image src={catGora.src} width="60" height="40" alt="Logo Gora"/>
                        </div>
                        <div className="flex justify-center items-center m-4">
                            <Image src={dog2Gora.src} width="70" height="40" alt="Logo Gora"/>
                        </div>
                    </div>
                </NavbarMenu>
            </Navbar>
        </div>
  );
}
