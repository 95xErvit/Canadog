"use client"

import React from "react";
import { useRouter } from 'next/navigation';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Image} from "@nextui-org/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();

  const donationNavigation = (path: string) => {
    router.push(path);
  };
    
  const menuItems = [
    { name: "Adopciones", url: "#adopciones" },
    { name: "Tienda Gora", url: "https://gorafundacion.org" },
    { name: "Contáctanos", url: "#contactanos" },
    { name: "Ayudanos", action: () => donationNavigation('/Home/Donations') }, 
    //{ name: "Ayudanos", url: "https://nibi.com.co/fundaciones/id/GORA_FUNDACI%C3%93N" },
  ];

    
  return (
    <div>
        <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-greenGora justify-between md:py-4">
            <NavbarContent>
                <NavbarBrand>
                    <Link href="/" className="flex items-center">
                        <Image src="LogoGora.png" width="140" height="40" alt="Logo Gora"/>
                    </Link>
                </NavbarBrand>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden text-OrangeLightGora"
                />
            </NavbarContent>
            {/* menu web */}
            <NavbarContent className="hidden sm:flex gap-8" justify="start">
                <NavbarItem>
                    <Link className="text-lg text-OrangeLightGora hover:text-orangeGora hover:underline hover:underline-offset-8" href="#adopciones">
                        Adopciones
                    </Link>
                </NavbarItem>
                <NavbarItem >
                    <Link className="text-lg text-OrangeLightGora hover:text-orangeGora hover:underline hover:underline-offset-8" href="https://gorafundacion.org">
                        Tienda Gora
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-lg text-OrangeLightGora hover:text-orangeGora hover:underline hover:underline-offset-8" href="#">
                        Contáctanos
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    {/* Redirección a Donations usando onClick y router */}
                    <Link className="text-lg text-OrangeLightGora hover:text-orangeGora hover:underline hover:underline-offset-8" onClick={() => router.push('/Home/Donations')} style={{ cursor: 'pointer' }}>
                        Ayudanos
                    </Link>
                </NavbarItem>
            </NavbarContent>
            {/* menu cel */}
            <NavbarMenu>
                {menuItems.map((item, index) => (
                <NavbarMenuItem key={`${item.name}-${index}`} className="mt-4">
                    {item.url ? (
                        <Link
                            className="flex justify-center py-2 w-full text-4xl text-greenGora hover:text-orangeGora"
                            href={item.url}
                        >
                            {item.name}
                        </Link>
                    ) : (
                        <Link
                            className="flex justify-center py-2 w-full text-4xl text-greenGora hover:text-orangeGora"
                            onClick={item.action}  // Usa la acción de redirección interna
                            style={{ cursor: 'pointer' }}
                        >
                            {item.name}
                        </Link>
                    )}
                 </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    </div>
  );
}
