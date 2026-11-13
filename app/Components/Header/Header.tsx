"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Navbar, NavbarContent, NavbarItem, Link, Image } from "@nextui-org/react";
import PerritoBlanco from "@/public/PerritoBlanco.jpeg";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { buildPawPattern } from "@/app/utils/pawPattern";

// Huellitas grises muy sutiles, como marca de agua del menú móvil
const pawWatermark = buildPawPattern("%239CA3AF", 0.18);

// Duraciones compartidas entre el panel y el ícono para que vayan sincronizados
const MENU_OPEN_DURATION = 0.3;
const MENU_CLOSE_DURATION = 0.2;

// Barra superior: solo fade in, sin desplazamiento
const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
  // Cuando el footer entra en pantalla, el header se desvanece suavemente
  footerVisible: {
    opacity: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

// Elementos del header: fade + leve subida, escalonados por índice (custom)
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
      delay: 0.25 + index * 0.1,
    },
  }),
};

// Opciones del menú móvil: aparecen escalonadas al abrir (al cerrar desaparecen junto con el panel)
const mobileItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
      delay: 0.12 + index * 0.06,
    },
  }),
};

// Barras del ícono hamburguesa: se transforman en una X
const barTransition = { duration: MENU_OPEN_DURATION, ease: "easeInOut" as const };

export default function Header() {
  const router = useRouter();                           // Hook para navegar entre rutas
  const pathname = usePathname();                       // Para cerrar el menú al cambiar de ruta
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // Estado para controlar el menu de navegación
  const [isScrolled, setIsScrolled] = useState(false);  // Estado para controlar el fondo del header
  const [isFooterVisible, setIsFooterVisible] = useState(false);  // Estado: el footer está en pantalla
  const prefersReducedMotion = useReducedMotion();

  // Si el usuario prefiere menos movimiento, no se aplican animaciones
  const entranceProps = prefersReducedMotion
    ? {}
    : { initial: "hidden" as const, animate: "visible" as const };

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

  // Ocultar el header cuando el footer aparece en pantalla
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  // Cerrar el menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Con el menú abierto: bloquear el scroll del fondo y permitir cerrar con Escape
  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    // Si la pantalla pasa a escritorio, el menú móvil se cierra
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const handleDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMenuOpen(false);
    };
    desktopQuery.addEventListener("change", handleDesktop);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      desktopQuery.removeEventListener("change", handleDesktop);
    };
  }, [isMenuOpen]);

  // Opciones compartidas para escritorio y móvil
  const menuItems = [
    { name: "Inicio", path: "/" },
    { name: "¿Quiénes somos?", path: "/Home/AboutUs" },
    { name: "Adopciones", path: "/#adopciones" },
    { name: "Casos", path: "/Home" },
    { name: "Tienda de beneficios", path: "/Store" },
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

  const barMotion = prefersReducedMotion ? { duration: 0 } : barTransition;

  return (
    <>
      <motion.header
        {...entranceProps}
        {...(!prefersReducedMotion && isFooterVisible ? { animate: "footerVisible" as const } : {})}
        variants={headerVariants}
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 py-4 ${
          isFooterVisible ? "pointer-events-none" : ""
        } ${
          prefersReducedMotion && isFooterVisible ? "opacity-0" : ""
        } ${
          isScrolled || isMenuOpen ? "bg-white/95 shadow-sm backdrop-blur-md" : "bg-white"
        }`}
      >
        <Navbar
          maxWidth="full"
          className="w-full bg-transparent px-4 sm:px-6 lg:px-10"
          classNames={{ wrapper: "max-w-none w-full h-20" }}
        >
          {/* Logo: izquierda en móvil y escritorio */}
          <NavbarContent justify="start" className="flex flex-1 lg:flex-none">
            <NavbarItem>
              <motion.div {...entranceProps} variants={itemVariants} custom={0}>
                <Link href="/" aria-label="ComeDog - Inicio" className="flex items-center">
                  <Image
                    src="/LogoHeader.png"
                    width={80}
                    height={80}
                    alt="Logo ComeDog"
                    className="w-16 sm:w-20"
                  />
                </Link>
              </motion.div>
            </NavbarItem>
          </NavbarContent>

          {/* Navegación de escritorio: alineada a la derecha */}
          <NavbarContent justify="end" className="hidden flex-1 items-center gap-5 lg:flex xl:gap-8">
            {menuItems.map((item, index) => (
              <NavbarItem key={item.name}>
                <motion.div {...entranceProps} variants={itemVariants} custom={index + 1}>
                  <Link href={item.path} className={linkStyles}>
                    {item.name}
                  </Link>
                </motion.div>
              </NavbarItem>
            ))}
          </NavbarContent>

          {/* Botón hamburguesa propio: solo móvil y tablet */}
          <NavbarContent justify="end" className="flex flex-none lg:hidden">
            <motion.div {...entranceProps} variants={itemVariants} custom={1} className="flex h-full items-center">
              <button
                type="button"
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                onClick={() => setIsMenuOpen((open) => !open)}
                className="relative flex h-12 w-12 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brown/40"
              >
                <span className="relative block h-[14px] w-6">
                  <motion.span
                    initial={false}
                    animate={isMenuOpen ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
                    transition={barMotion}
                    className="absolute left-0 top-0 block h-[2px] w-6 rounded bg-brown"
                  />
                  <motion.span
                    initial={false}
                    animate={isMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                    transition={barMotion}
                    className="absolute left-0 top-[6px] block h-[2px] w-6 rounded bg-brown"
                  />
                  <motion.span
                    initial={false}
                    animate={isMenuOpen ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
                    transition={barMotion}
                    className="absolute left-0 top-[12px] block h-[2px] w-6 rounded bg-brown"
                  />
                </span>
              </button>
            </motion.div>
          </NavbarContent>
        </Navbar>
      </motion.header>

      {/* Menú móvil a pantalla completa (fuera del header para que su posición fija no dependa de él) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Menú principal"
            initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: prefersReducedMotion ? 0 : MENU_OPEN_DURATION, ease: "easeOut" },
            }}
            exit={{
              opacity: 0,
              transition: { duration: prefersReducedMotion ? 0 : MENU_CLOSE_DURATION, ease: "easeIn" },
            }}
            className="fixed inset-0 z-[45] flex flex-col items-center overflow-y-auto bg-white px-6 pb-10 pt-32 lg:hidden"
            style={{ backgroundImage: pawWatermark }}
          >
            <ul className="flex w-full max-w-sm flex-col items-center gap-2">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={prefersReducedMotion ? false : "hidden"}
                  animate="visible"
                  variants={mobileItemVariants}
                  custom={index}
                  className="w-full"
                >
                  <Link
                    href={item.path}
                    onPress={() => setIsMenuOpen(false)}
                    className="flex w-full justify-center py-3 text-center text-xl font-medium text-brown hover:text-brownLight"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Imagen decorativa */}
            <motion.div
              initial={prefersReducedMotion ? false : "hidden"}
              animate="visible"
              variants={mobileItemVariants}
              custom={menuItems.length}
              className="flex justify-center px-4 pt-8"
            >
              <Image
                src={PerritoBlanco.src}
                width={280}
                height={320}
                alt="Perrito rescatado"
                className="max-h-64 w-auto object-contain"
              />
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
