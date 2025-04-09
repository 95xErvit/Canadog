import { useEffect, useState } from "react";

const AdBanner = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar si el ancho de pantalla es menor a 768px (móvil)
    setIsMobile(window.innerWidth < 768);

    if (window.innerWidth >= 768) {
      (window as any).atOptions = {
        key: "4bc5e1f4a6f39c8e26d641fc4a5865e0",
        format: "iframe",
        height: 60,
        width: 468,
        params: {},
      };

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "//www.highperformanceformat.com/4bc5e1f4a6f39c8e26d641fc4a5865e0/invoke.js";
      script.async = true;

      // Crear un div donde se inyectará el anuncio
      const adContainer = document.getElementById("ad-container");
      if (adContainer) {
        adContainer.appendChild(script);
      }
    }
  }, []);

  // No mostrar el anuncio si es móvil
  if (isMobile) return null;

  return (
    <div
      id="ad-container"
      style={{ width: 468, height: 60 }}
    />
  );
};

export default AdBanner;
