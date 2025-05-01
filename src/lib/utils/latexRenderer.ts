import katex from 'katex';

/**
 * Renders LaTeX expressions in an HTML element.
 * This function looks for LaTeX patterns (between $ signs for inline math or $$ for display math)
 * and replaces them with properly rendered KaTeX output.
 * 
 * @param element The DOM element to process for LaTeX expressions
 */
export const renderLatexInElement = (element: HTMLElement | null) => {
  if (!element) return;
  
  // Process the HTML content looking for LaTeX patterns
  const html = element.innerHTML;
  
  // Function to replace inline LaTeX ($...$) with rendered output
  const processInlineMath = (html: string) => {
    // Regular expression to match inline LaTeX: $...$
    // We use negative lookahead/lookbehind to avoid matching $$ display math
    return html.replace(/(?<!\$)\$(?!\$)(.+?)(?<!\$)\$(?!\$)/g, (match, latex) => {
      try {
        return katex.renderToString(latex, { 
          throwOnError: false,
          displayMode: false 
        });
      } catch (error) {
        console.error('Error rendering inline LaTeX:', error);
        return match; // Return the original string on error
      }
    });
  };
  
  // Function to replace display LaTeX ($$...$$) with rendered output
  const processDisplayMath = (html: string) => {
    return html.replace(/\$\$([\s\S]*?)\$\$/g, (match, latex) => {
      try {
        return katex.renderToString(latex, { 
          throwOnError: false,
          displayMode: true 
        });
      } catch (error) {
        console.error('Error rendering display LaTeX:', error);
        return match; // Return the original string on error
      }
    });
  };
  
  // First process display math ($$...$$) then inline math ($...$)
  let processedHTML = processDisplayMath(html);
  processedHTML = processInlineMath(processedHTML);
  
  // Set the processed HTML back to the element
  if (processedHTML !== html) {
    element.innerHTML = processedHTML;
  }
};

/**
 * Safely process text with LaTeX without needing a DOM element.
 * Useful for server-side rendering or preparing text before inserting into DOM.
 * 
 * @param text The text containing LaTeX expressions
 * @returns Processed HTML string with rendered LaTeX
 */
export const processLatexText = (text: string): string => {
  if (!text) return '';
  
  // Function to replace inline LaTeX ($...$) with rendered output
  const processInlineMath = (html: string) => {
    return html.replace(/(?<!\$)\$(?!\$)(.+?)(?<!\$)\$(?!\$)/g, (match, latex) => {
      try {
        return katex.renderToString(latex, { 
          throwOnError: false,
          displayMode: false 
        });
      } catch (error) {
        console.error('Error rendering inline LaTeX:', error);
        return match; // Return the original string on error
      }
    });
  };
  
  // Function to replace display LaTeX ($$...$$) with rendered output
  const processDisplayMath = (html: string) => {
    return html.replace(/\$\$([\s\S]*?)\$\$/g, (match, latex) => {
      try {
        return katex.renderToString(latex, { 
          throwOnError: false,
          displayMode: true 
        });
      } catch (error) {
        console.error('Error rendering display LaTeX:', error);
        return match; // Return the original string on error
      }
    });
  };
  
  // First process display math ($$...$$) then inline math ($...$)
  let processedHTML = processDisplayMath(text);
  processedHTML = processInlineMath(processedHTML);
  
  return processedHTML;
}; 