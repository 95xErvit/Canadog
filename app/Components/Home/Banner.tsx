import { useEffect } from "react";

const AdBanner = () => {
  useEffect(() => {

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
  }, []);

  return <div id="ad-container" style={{ width: 728, height: 90 }}></div>;
};

export default AdBanner;