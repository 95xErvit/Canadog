import { useEffect } from "react";

const AdBanner = () => {
  useEffect(() => {

    (window as any).atOptions = {
        key : '4bc5e1f4a6f39c8e26d641fc4a5865e0',
		    format : 'iframe',
		    height : 60,
		    width : 468,
		    params : {}
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
  }, []);

  return <div id="ad-container" style={{ width: 728, height: 90 }}></div>;
};

export default AdBanner;