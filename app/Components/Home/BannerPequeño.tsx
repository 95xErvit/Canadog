import { useEffect, useState } from "react";

const AdBanner = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar si la pantalla es menor a 768px (modo móvil)
    setIsMobile(window.innerWidth < 768);

    if (window.innerWidth >= 768) {
      (window as any).atOptions = {
        key: "ea9e53e963f5d33510f519f00919ab60",
        format: "iframe",
        height: 50,
        width: 320,
        params: {},
      };

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "//www.highperformanceformat.com/ea9e53e963f5d33510f519f00919ab60/invoke.js";
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
      style={{ width: 320, height: 50 }}
    />
  );
};

export default AdBanner;
