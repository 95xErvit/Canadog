"use client"
import React from "react";
import { useRouter } from 'next/navigation';
import PerritoBlanco from "@/public/PerritoBlanco.jpeg"
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
    { name: "Tienda Canadog", action: () => window.open("/") },
    { name: "¿Quiénes somos?", action: () => donationNavigation('#contactanos') },
    { name: "Ayudanos", action: () => donationNavigation('/Home/Donations') }, 
  ];

  return (
    <div className="flex justify-between items-center bg-white m-4">
    {/* Logo (visible en móviles) */}
    <div className="flex lg:hidden items-center">
      <Link href="/" className="flex items-center">
        <Image src="/LogoCanadog.jpg" width={100} height={100} alt="Canadog" />
      </Link>
    </div>
    {/* Navbar principal */}
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className="bg-white md:py-10 w-full"
    >
      <NavbarContent className="flex items-center w-full">
        {/* Menú web */}
        <NavbarContent className="hidden lg:flex justify-center items-center w-full gap-10">
          <NavbarItem>
            <Link
              className="text-xl font-semibold text-greenCanadog hover:text-mentaCanadog relative before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-greenCanadog before:transition-all before:duration-300 hover:before:w-full cursor-pointer"
              onClick={() => router.push('/#adopciones')}
            >
              Adopciones
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="text-xl font-semibold text-greenCanadog hover:text-mentaCanadog relative before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-greenCanadog before:transition-all before:duration-300 hover:before:w-full cursor-pointer"
              href="/"
            >
              Tienda Canadog
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/">
              <Image
                src="/LogoCanadog.jpg"
                width="180"
                height="100"
                alt="Canadog"
              />
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="text-xl font-semibold text-greenCanadog hover:text-mentaCanadog relative before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-greenCanadog before:transition-all before:duration-300 hover:before:w-full cursor-pointer"
              href="#"
            >
              ¿Quiénes somos?
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="text-xl font-semibold text-greenCanadog hover:text-mentaCanadog relative before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-greenCanadog before:transition-all before:duration-300 hover:before:w-full cursor-pointer"
              onClick={() => router.push('/Home/Donations')}
            >
              Ayúdanos
            </Link>
          </NavbarItem>
        </NavbarContent>
  
        {/* Botón hamburguesa al final */}
        <div className="lg:hidden ml-auto">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="text-greenCanadog hover:text-mentaCanadog font-bold"
          />
        </div>
      </NavbarContent>
  
      {/* Menú móvil */}
      <NavbarMenu className="top-24">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className="flex justify-center py-2 w-full text-3xl text-greenCanadog hover:text-mentaCanadog cursor-pointer"
              onClick={() => handleMenuItemClick(item.action)}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        {/* Iconos Gora solo visible en pantallas móviles */}
          <div className="flex justify-center items-center m-4">
            <Image src={PerritoBlanco.src} width="350" height="450" alt="Logo Gora" />
          </div>
      </NavbarMenu>
    </Navbar>
  </div>
    );
}
