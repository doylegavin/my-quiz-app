//src/components/GeoGebraGraph.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface GeoGebraGraphProps {
  commands: string;
  id: string;
  width?: number;
  height?: number;
  showToolbar?: boolean;
  showAlgebraInput?: boolean;
}

export default function GeoGebraGraph({
  commands,
  id,
  width = 600,
  height = 400,
  showToolbar = false,
  showAlgebraInput = false,
}: GeoGebraGraphProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const appletInitialized = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  console.log(`GeoGebraGraph rendering - ID: ${id}, Commands: ${commands}`);

  useEffect(() => {
    console.log(`GeoGebraGraph effect running - Script loaded: ${scriptLoaded}`);
    
    // If the script is loaded and the container exists, initialize the applet
    if (scriptLoaded && containerRef.current && !appletInitialized.current) {
      console.log(`Attempting to initialize GeoGebra applet for ${id}`);
      
      try {
        // Check if GGBApplet exists in window
        if (!(window as any).GGBApplet) {
          console.error("GGBApplet not found in window! Script may not have loaded correctly.");
          return;
        }
        
        // GeoGebra is already loaded as a global in window
        const ggbApp = new (window as any).GGBApplet(
          {
            appName: "graphing",
            width: width,
            height: height,
            showToolBar: showToolbar,
            showAlgebraInput: showAlgebraInput,
            showMenuBar: false,
            enableLabelDrags: false,
            enableShiftDragZoom: true,
            enableRightClick: false,
            useBrowserForJS: true,
            appletOnLoad: (api: any) => {
              console.log(`GeoGebra applet loaded for ${id}, executing commands`);
              // Execute the commands when the applet is loaded
              if (commands) {
                commands.split(';').forEach(cmd => {
                  if (cmd.trim()) {
                    console.log(`Executing command: ${cmd.trim()}`);
                    api.evalCommand(cmd.trim());
                  }
                });
              }
            },
          },
          true
        );

        // Inject the applet
        console.log(`Injecting GeoGebra applet into element with ID: ${id}`);
        ggbApp.inject(id);
        appletInitialized.current = true;
        console.log(`GeoGebra applet initialized for ${id}`);
      } catch (error) {
        console.error(`Error initializing GeoGebra applet for ${id}:`, error);
      }
    }
  }, [commands, id, scriptLoaded, width, height, showToolbar, showAlgebraInput]);

  const handleScriptLoad = () => {
    console.log("GeoGebra script loaded successfully!");
    setScriptLoaded(true);
  };

  return (
    <>
      <Script
        src="https://www.geogebra.org/apps/deployggb.js"
        onLoad={handleScriptLoad}
        strategy="afterInteractive"
      />
      <div 
        ref={containerRef} 
        id={id} 
        className="border rounded bg-gray-50" 
        style={{ width: `${width}px`, height: `${height}px`, minHeight: '200px' }}
      >
        {!scriptLoaded && <div className="flex items-center justify-center h-full">Loading graph...</div>}
      </div>
    </>
  );
}