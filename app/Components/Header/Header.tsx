"use client"

import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Image} from "@nextui-org/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: "Adopciones", url: "#adopciones" },
    { name: "Tienda Gora", url: "https://gorafundacion.org" },
    { name: "Contáctanos", url: "#contactanos" },
    { name: "Ayudanos", url: "https://nibi.com.co/fundaciones/id/GORA_FUNDACI%C3%93N" },
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
                    <Link className="text-lg text-OrangeLightGora hover:text-orangeGora hover:underline hover:underline-offset-8" href="https://nibi.com.co/fundaciones/id/GORA_FUNDACI%C3%93N">
                        Ayudanos
                    </Link>
                </NavbarItem>
            </NavbarContent>
            {/* menu cel */}
            <NavbarMenu>
                {menuItems.map((item, index) => (
                <NavbarMenuItem key={`${item.name}-${index}`} className="mt-4">
                    <Link
                        className="flex justify-center py-2 w-full text-4xl text-greenGora hover:text-orangeGora"
                        href={item.url}
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