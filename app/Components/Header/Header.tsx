
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Image } from "@nextui-org/react";
import PerritoBlanco from "@/public/PerritoBlanco.jpeg";
import MotionTransition from "../MotionTransition/MotionTransition";

export default function Header() {
  const router = useRouter();                           // Hook para navegar entre rutas
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // Estado para controlar el menu de navegación
  const [isScrolled, setIsScrolled] = useState(false);  // Estado para controlar el fondo del header

  // Detectar el scroll para aplicar el fondo del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Opciones compartidas para escritorio y móvil
  const menuItems = [
    { name: "¿Quiénes somos?", path: "/Home/AboutUs" },
    { name: "Adopciones", path: "/#adopciones" },
    { name: "Casos", path: "/Home" },
    { name: "Tienda de beneficios", path: "/Store" },
    { name: "Ayúdanos", path: "/Home/Donations" },
  ];

  // Función para navegar entre rutas
  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    router.push(path);
  };

  // Estilos para el menu de navegación
  const linkStyles =
    "text-base xl:text-lg font-semibold text-brown " +
    "hover:text-brownLight relative " +
    "after:absolute after:-bottom-1 after:left-0 " +
    "after:h-[2px] after:w-0 after:bg-green " +
    "after:transition-all after:duration-300 " +
    "hover:after:w-full whitespace-nowrap";

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 py-4 ${
        isScrolled ? "bg-white/95 shadow-sm backdrop-blur-md" : "bg-white"
      }`}
    >
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="full"
        className="w-full bg-transparent px-4 sm:px-6 lg:px-10"
        classNames={{ wrapper: "max-w-none w-full h-20", menu: "gap-4 pt-6", }}
      >
        {/* Logo: izquierda en móvil y escritorio */}
        <NavbarContent justify="start" className="flex flex-1 lg:flex-none">
          <NavbarItem>
            <Link href="/" aria-label="ComeDog - Inicio" className="flex items-center">
              <Image
                src="/LogoHeader.png"
                width={80}
                height={80}
                alt="Logo ComeDog"
                className="w-16 sm:w-20"
              />
            </Link>
          </NavbarItem>
        </NavbarContent>

        {/* Navegación de escritorio: alineada a la derecha */}
        <NavbarContent justify="end" className="hidden flex-1 items-center gap-5 lg:flex xl:gap-8">
          {menuItems.map((item) => (
            <NavbarItem key={item.name}>
              <Link href={item.path} className={linkStyles}>
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Botón hamburguesa: solo móvil y tablet */}
        <NavbarContent justify="end" className="flex flex-none lg:hidden">
          <NavbarMenuToggle aria-label={ isMenuOpen ? "Cerrar menú" : "Abrir menú"} className="text-brown"/>
        </NavbarContent>

        {/* Menú desplegable */}
        <NavbarMenu className="top-20 gap-4 bg-white/95 px-6 pb-8 backdrop-blur-md">
          {menuItems.map((item) => (
            <NavbarMenuItem key={item.name}>
              <Link
                href={item.path}
                onPress={() => setIsMenuOpen(false)}
                className="flex w-full justify-center py-3 text-center text-xl font-medium text-brown hover:text-brownLight"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}

          {/* Imagen decorativa del menú móvil */}
          <NavbarMenuItem>
            <MotionTransition>
              <div className="flex justify-center px-4 pt-4">
                <Image
                  src={PerritoBlanco.src}
                  width={280}
                  height={320}
                  alt="Perrito rescatado"
                  className="max-h-64 w-auto object-contain"
                />
              </div>
            </MotionTransition>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </header>
  );
}
