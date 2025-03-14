//src/components/GeoGebraIframe.tsx

"use client";

interface GeoGebraIframeProps {
  commands: string;
  width?: number;
  height?: number;
}

export default function GeoGebraIframe({
  commands,
  width = 600,
  height = 400,
}: GeoGebraIframeProps) {
  // Process the commands to build the URL
  const processCommands = () => {
    let material = "";
    let limits = "";

    if (commands.includes(";")) {
      // Handle cases with function + zoom
      const parts = commands.split(";");
      if (parts[0].includes("=")) {
        // It's a function
        material = `&material=${encodeURIComponent(parts[0])}`;
      }
      
      // Process ZoomIn command
      if (parts[1].startsWith("ZoomIn")) {
        const zoomParams = parts[1].replace("ZoomIn(", "").replace(")", "").split(",");
        if (zoomParams.length === 4) {
          const [xmin, xmax, ymin, ymax] = zoomParams;
          limits = `&boundingbox=${xmin},${xmax},${ymin},${ymax}`;
        }
      }
    } else if (commands.startsWith("ZoomIn")) {
      // Only zoom limits for questions
      const zoomParams = commands.replace("ZoomIn(", "").replace(")", "").split(",");
      if (zoomParams.length === 4) {
        const [xmin, xmax, ymin, ymax] = zoomParams;
        limits = `&boundingbox=${xmin},${xmax},${ymin},${ymax}`;
      }
    } else if (commands.includes("=")) {
      // Just a function for solutions
      material = `&material=${encodeURIComponent(commands)}`;
    }

    return `https://www.geogebra.org/calculator/kw5hbmdz?embed=true${material}${limits}&width=${width}&height=${height}&ggbBase64=true&showToolBar=false&showAlgebraInput=false&showMenuBar=false`;
  };

  const iframeUrl = processCommands();

  return (
    <div className="border rounded overflow-hidden">
      <iframe 
        src={iframeUrl}
        width={width} 
        height={height}
        style={{border: "none"}}
        allowFullScreen
        title="GeoGebra Graph" 
      />
    </div>
  );
}