import { useEffect, useState } from "react";

const AdBanner = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar si es una pantalla móvil
    setIsMobile(window.innerWidth < 768);

    if (window.innerWidth >= 768) {
      (window as any).atOptions = {
        key: "ffafdebdefa1510d11608a772b4a4e47",
        format: "iframe",
        height: 90,
        width: 728,
        params: {},
      };

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "//www.highperformanceformat.com/ffafdebdefa1510d11608a772b4a4e47/invoke.js";
      script.async = true;

      // Crear un div donde se inyectará el anuncio
      const adContainer = document.getElementById("ad-container");
      if (adContainer) {
        adContainer.appendChild(script);
      }
    }
  }, []);

  // Evitar renderizar en móvil
  if (isMobile) return null;

  return <div id="ad-container" style={{ width: 728, height: 90 }} />;
};

export default AdBanner;
