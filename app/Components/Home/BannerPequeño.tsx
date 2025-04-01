import { useEffect } from "react";

const AdBanner = () => {
  useEffect(() => {

    (window as any).atOptions = {
        key : 'ea9e53e963f5d33510f519f00919ab60',
		    format : 'iframe',
		    height : 50,
		    width : 320,
		    params : {}
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
  }, []);

  return <div id="ad-container" style={{ width: 728, height: 90 }}></div>;
};

export default AdBanner;