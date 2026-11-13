"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// Número y mensaje inicial de WhatsApp
const WHATSAPP_NUMBER = "573104684683";
const WHATSAPP_MESSAGE = "Hola, me gustaría recibir más información sobre las adopciones.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

// Rutas internas donde el botón no debe mostrarse (login, registro y CMS)
const HIDDEN_ROUTES_PREFIX = "/UserCanaDog";

// Botón flotante: visible durante todo el recorrido y oculto cuando aparece el footer
export default function WhatsAppButton() {
    const prefersReducedMotion = useReducedMotion();
    const pathname = usePathname();
    const isHiddenRoute = pathname?.startsWith(HIDDEN_ROUTES_PREFIX) ?? false;
    const [isFooterVisible, setIsFooterVisible] = useState(false);

    // Al estar en el layout, se vuelve a observar el footer cada vez que cambia la ruta
    useEffect(() => {
        setIsFooterVisible(false);
        if (isHiddenRoute) return;

        const footer = document.getElementById("site-footer");
        if (!footer) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsFooterVisible(entry.isIntersecting),
            { threshold: 0 }
        );
        observer.observe(footer);

        return () => observer.disconnect();
    }, [pathname, isHiddenRoute]);

    const motionProps = prefersReducedMotion
        ? {}
        : {
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.9 },
              transition: { duration: 0.4, ease: "easeOut" as const },
          };

    return (
        <AnimatePresence>
            {!isHiddenRoute && !isFooterVisible && (
                <motion.a
                    key="whatsapp-float"
                    {...motionProps}
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Escríbenos por WhatsApp"
                    title="Escríbenos por WhatsApp"
                    className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition-colors duration-300 hover:bg-[#1ebe5b] md:bottom-8 md:right-8 md:h-16 md:w-16"
                >
                    <FaWhatsapp size={32} />
                </motion.a>
            )}
        </AnimatePresence>
    );
}
