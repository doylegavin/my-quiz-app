//components/PDFButton.tsx
"use client";

import { useState, RefObject, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { isGraphQuestion } from '@/app/quiz/generated/GeneratedQuizClient';
import { pdf } from '@react-pdf/renderer';
import QuizPDFDocument from './QuizPDFDocument';

interface PDFButtonProps {
  questionsArray: any[];
  solutionsArray: any[];
  selectedFields: string;
  generatedFilename: string;
  graphRefs: RefObject<(HTMLDivElement | null)[]>;
  solutionGraphRefs: RefObject<(HTMLDivElement | null)[]>;
  showSolutions: boolean;
  setShowSolutions: (show: boolean) => void;
}

// Helper function to get image as base64
const getImageAsBase64 = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error converting image to base64:", error);
    return null;
  }
};

export default function PDFButton({ 
  questionsArray, 
  solutionsArray, 
  selectedFields,
  generatedFilename,
  graphRefs,
  solutionGraphRefs,
  showSolutions,
  setShowSolutions
}: PDFButtonProps) {
  const [isPreparingPDF, setIsPreparingPDF] = useState(false);
  const [logoBase64, setLogoBase64] = useState<string | null>(null);
  
  // Load logo on component mount
  useEffect(() => {
    const loadLogo = async () => {
      const base64 = await getImageAsBase64('/ExaminaiteLogo2.jpg');
      setLogoBase64(base64);
    };
    
    loadLogo();
  }, []);
  
  // Prepare data for PDF
  const preparePDFData = async () => {
    try {
      // Debug the graph dimensions
      const debugGraphDimensions = (element: HTMLElement, index: number) => {
        console.log(`Graph ${index} dimensions:`, {
          offsetWidth: element.offsetWidth,
          offsetHeight: element.offsetHeight,
          clientWidth: element.clientWidth,
          clientHeight: element.clientHeight,
          getBoundingClientRect: element.getBoundingClientRect(),
        });
      };

      // Function to optimize SVG for capture
      const optimizeSvgForCapture = (container: HTMLElement): any => {
        // Find SVG element within the container
        const svgElement = container.querySelector('svg');
        if (!svgElement) return null;
        
        // Store original attributes to restore later
        const originalWidth = svgElement.getAttribute('width');
        const originalHeight = svgElement.getAttribute('height');
        const originalViewBox = svgElement.getAttribute('viewBox');
        const originalStyle = svgElement.getAttribute('style');
        
        // Set fixed large dimensions - increase size significantly
        const svgWidth = 800; // Much larger than the 535 we used before
        svgElement.setAttribute('width', svgWidth.toString());
        svgElement.setAttribute('height', '600');
        svgElement.setAttribute('style', `width: ${svgWidth}px; height: 600px; max-width: none;`);
        
        // Ensure scaling is preserved by adjusting viewBox if needed
        if (originalViewBox) {
          // viewBox is typically "0 0 [width] [height]"
          const parts = originalViewBox.split(' ');
          if (parts.length === 4) {
            // Keep the same origin but adjust the size to maintain aspect ratio
            const aspectRatio = parseFloat(parts[2]) / parseFloat(parts[3]);
            const newHeight = svgWidth / aspectRatio;
            svgElement.setAttribute('viewBox', `${parts[0]} ${parts[1]} ${svgWidth} ${newHeight}`);
          }
        }
        
        // Also ensure all internal elements don't have size constraints
        const allInternalElements = svgElement.querySelectorAll('*');
        allInternalElements.forEach(el => {
          if (el instanceof SVGGraphicsElement) {
            // Remove any max-width/height that might constrain rendering
            el.style.maxWidth = 'none';
            el.style.maxHeight = 'none';
            // Force larger stroke widths for better visibility
            if (el.getAttribute('stroke-width')) {
              const currentWidth = parseFloat(el.getAttribute('stroke-width') || '1');
              el.setAttribute('stroke-width', (currentWidth * 1.5).toString());
            }
          }
        });
        
        return { originalWidth, originalHeight, originalViewBox, originalStyle };
      };

      // Function to restore original SVG attributes
      const restoreSvgAttributes = (container: HTMLElement, original: any): void => {
        const svgElement = container.querySelector('svg');
        if (!svgElement || !original) return;
        
        if (original.originalWidth) {
          svgElement.setAttribute('width', original.originalWidth);
        }
        if (original.originalHeight) {
          svgElement.setAttribute('height', original.originalHeight);
        }
        if (original.originalViewBox) {
          svgElement.setAttribute('viewBox', original.originalViewBox);
        }
        if (original.originalStyle) {
          svgElement.setAttribute('style', original.originalStyle);
        }
      };

      const enrichedQuestions = await Promise.all(
        questionsArray.map(async (q: any, index: number) => {
          const ref = graphRefs.current?.[index];
          if (ref && q.question && isGraphQuestion(q.question)) {
            // Find the actual diagram element
            const diagramElement = ref.querySelector('.bg-white') as HTMLElement;
            const targetElement = diagramElement || ref;
            
            // Debug dimensions
            debugGraphDimensions(targetElement, index);
            
            // Optimize SVG for capture
            const originalAttributes = optimizeSvgForCapture(targetElement);
            
            // Force the container to be large
            const originalWidth = targetElement.style.width;
            const originalHeight = targetElement.style.height;
            targetElement.style.width = '535px';
            targetElement.style.height = 'auto';
            
            // Wait a moment for browser to update the rendering
            await new Promise(resolve => setTimeout(resolve, 50));
            
            try {
              const canvas = await html2canvas(targetElement, {
                backgroundColor: "white",
                scale: 1, // Lower scale since we're already setting very large dimensions
                logging: true,
                useCORS: true,
                allowTaint: true,
                width: 800, // Match the SVG width
                height: 600, // Match the SVG height
                imageTimeout: 0, // No timeout for image loading
                onclone: (clonedDoc, clonedElement) => {
                  // Further emphasize size in the cloned element that will be captured
                  const svg = clonedElement.querySelector('svg');
                  if (svg) {
                    svg.style.width = '800px';
                    svg.style.height = '600px';
                  }
                }
              });
              
              // Use highest quality PNG
              const imageData = canvas.toDataURL("image/png", 1.0);
              console.log(`Canvas size for graph ${index}:`, {
                width: canvas.width,
                height: canvas.height,
              });
              
              return { ...q, diagramImage: imageData };
            } finally {
              // Restore original dimensions and attributes
              targetElement.style.width = originalWidth;
              targetElement.style.height = originalHeight;
              restoreSvgAttributes(targetElement, originalAttributes);
            }
          }
          return q;
        })
      );

      const enrichedSolutions = await Promise.all(
        solutionsArray.map(async (sol: any) => {
          const questionIndex = sol.questionIndex - 1;
          const ref = solutionGraphRefs.current?.[questionIndex];
          if (ref && (sol.solution || (questionIndex >= 0 && questionsArray[questionIndex]?.question)) && 
              isGraphQuestion(sol.solution || questionsArray[questionIndex]?.question || "")) {
            
            const diagramElement = ref.querySelector('.bg-white') as HTMLElement;
            const targetElement = diagramElement || ref;
            
            // Debug dimensions
            debugGraphDimensions(targetElement, questionIndex);
            
            // Optimize SVG for capture
            const originalAttributes = optimizeSvgForCapture(targetElement);
            
            // Force the container to be large
            const originalWidth = targetElement.style.width;
            const originalHeight = targetElement.style.height;
            targetElement.style.width = '535px';
            targetElement.style.height = 'auto';
            
            // Wait a moment for browser to update the rendering
            await new Promise(resolve => setTimeout(resolve, 50));
            
            try {
              const canvas = await html2canvas(targetElement, {
                backgroundColor: "white",
                scale: 1, // Lower scale since we're already setting very large dimensions
                logging: true,
                useCORS: true,
                allowTaint: true,
                width: 800, // Match the SVG width
                height: 600, // Match the SVG height
                imageTimeout: 0, // No timeout for image loading
                onclone: (clonedDoc, clonedElement) => {
                  // Further emphasize size in the cloned element that will be captured
                  const svg = clonedElement.querySelector('svg');
                  if (svg) {
                    svg.style.width = '800px';
                    svg.style.height = '600px';
                  }
                }
              });
              
              // Use highest quality PNG
              const imageData = canvas.toDataURL("image/png", 1.0);
              console.log(`Canvas size for solution ${questionIndex}:`, {
                width: canvas.width,
                height: canvas.height,
              });
              
              return { ...sol, diagramImage: imageData };
            } finally {
              // Restore original dimensions and attributes
              targetElement.style.width = originalWidth;
              targetElement.style.height = originalHeight;
              restoreSvgAttributes(targetElement, originalAttributes);
            }
          }
          return sol;
        })
      );

      return { enrichedQuestions, enrichedSolutions };
    } catch (error) {
      console.error("Error preparing PDF data:", error);
      throw error;
    }
  };

  // Generate PDF directly in the browser
  const generatePDF = async (questions: any[], solutions: any[]) => {
    try {
      // Create the PDF document
      const pdfDoc = (
        <QuizPDFDocument
          questions={questions}
          solutions={solutions}
          selectedFields={selectedFields}
          logoBase64={logoBase64}
        />
      );
      
      // Generate the PDF blob
      const blob = await pdf(pdfDoc).toBlob();
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = generatedFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error("Error generating PDF:", error);
      return false;
    }
  };
  
  return (
    <button
      className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium shadow-md transition-colors flex items-center justify-center min-w-[150px]"
      onClick={async () => {
        if (isPreparingPDF) return;
        
        setIsPreparingPDF(true);
        try {
          // Temporarily show solutions if they're hidden
          const solutionsWereHidden = !showSolutions;
          if (solutionsWereHidden) {
            setShowSolutions(true);
            // Wait for solutions to render
            await new Promise(resolve => setTimeout(resolve, 500));
          }
          
          // Prepare the data with images
          const { enrichedQuestions, enrichedSolutions } = await preparePDFData();
          
          // Hide solutions again if they were initially hidden
          if (solutionsWereHidden) {
            setShowSolutions(false);
          }
          
          // Generate PDF directly in browser
          const success = await generatePDF(enrichedQuestions, enrichedSolutions);
          
          if (!success) {
            throw new Error('Failed to generate PDF');
          }
          
        } catch (err) {
          console.error("Error generating PDF:", err);
          alert("There was an error generating the PDF. Please try again.");
        } finally {
          setIsPreparingPDF(false);
        }
      }}
    >
      {isPreparingPDF ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Preparing PDF...
        </> 
      ) : (
        "Download PDF"
      )}
    </button>
  );
}