"use client"
import React from "react";
import { useRouter } from 'next/navigation';
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
    { name: "Tienda Gora", action: () => window.open("https://gorafundacion.org", "_blank") },
    { name: "Contáctanos", action: () => donationNavigation('#contactanos') },
    { name: "Ayudanos", action: () => donationNavigation('/Home/Donations') }, 
  ];

  return (
    <div className="flex justify-around bg-greenGora md:py-4 items-center">
        {/* Logo Gora al inicio */}
        <div>
            <Link href="/" className="flex items-center">
                <Image src="/LogoGora.png" width="150" height="50" alt="Logo Gora"/>
            </Link>
        </div>

        <div>
            <Navbar 
                onMenuOpenChange={setIsMenuOpen} 
                isMenuOpen={isMenuOpen} 
                className="bg-greenGora md:py-4"
            >
                <NavbarContent className="flex justify-center items-center" justify="center">
                    {/* Menú web */}
                    <NavbarContent className="hidden lg:flex gap-8" justify="center">
                        <NavbarItem>
                            <Link 
                                className="text-lg text-pinkLightGora hover:text-orangeGora hover:underline hover:underline-offset-8 cursor-pointer"
                                onClick={() => router.push('/#adopciones')}
                            >
                                Adopciones
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link 
                                className="text-lg text-pinkLightGora hover:text-orangeGora hover:underline hover:underline-offset-8 cursor-pointer" 
                                href="https://gorafundacion.org" 
                                target="_blank"
                            >
                                Tienda Gora
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link 
                                className="text-lg text-pinkLightGora hover:text-orangeGora hover:underline hover:underline-offset-8 cursor-pointer" 
                                href="#"
                            >
                                Contáctanos
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link 
                                className="text-lg text-pinkLightGora hover:text-orangeGora hover:underline hover:underline-offset-8 cursor-pointer" 
                                onClick={() => router.push('/Home/Donations')}
                            >
                                Ayúdanos
                            </Link>
                        </NavbarItem>
                    </NavbarContent>

                    {/* Botón hamburguesa */}
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="lg:hidden text-pinkLightGora font-bold"
                    />
                </NavbarContent>
                
                {/* Menú móvil */}
                <NavbarMenu>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item.name}-${index}`} className="mt-4">
                            <Link
                                className="flex justify-center py-2 w-full text-4xl text-greenGora hover:text-orangeGora cursor-pointer"
                                onClick={() => handleMenuItemClick(item.action)}
                            >
                                {item.name}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                    {/* Iconos Gora solo visible en pantallas moviles */}
                    <div className="flex justify-center mt-8">
                        <div className="flex justify-center items-center m-4">
                            <Image src="/dogGora.png" width="60" height="40" alt="Logo Gora"/>
                        </div>
                        <div className="flex justify-center items-center m-4">
                            <Image src="/catGora.png" width="60" height="40" alt="Logo Gora"/>
                        </div>
                        <div className="flex justify-center items-center m-4">
                            <Image src="/dog2Gora.png" width="70" height="40" alt="Logo Gora"/>
                        </div>
                    </div>
                </NavbarMenu>
            </Navbar>
        </div>

        {/* Logo dogGora solo visible en pantallas pantallas mayores a xl */}
        <div className="hidden xl:flex xl:justify-end items-center">
            <Image src="/dogGora.png" width="60" height="40" alt="Logo Gora"/>
        </div>
    </div>
  );
}
