"use client"

import React from "react";
import { useRouter } from 'next/navigation';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Image} from "@nextui-org/react";

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
    <div>
        <Navbar 
            onMenuOpenChange={setIsMenuOpen} 
            isMenuOpen={isMenuOpen} 
            className="bg-greenGora justify-between md:py-4"
        >
            <NavbarContent>
                <NavbarBrand>
                    <Link href="/" className="flex items-center">
                    <Image src="/LogoGora.png" width="140" height="40" alt="Logo Gora" />
                    </Link>
                </NavbarBrand>

                {/* Botón hamburguesa */}
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="lg:hidden text-OrangeLightGora"
                />
            </NavbarContent>

            {/* Menú web */}
            <NavbarContent className="hidden lg:flex gap-8" justify="start">
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
            </NavbarMenu>
        </Navbar>
    </div>
  );
}
