//src/components/QuizPDFDocuments.tsx

"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

// Use standard font that comes with react-pdf
// No need to register custom fonts that might cause issues

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    minHeight: 100,
  },
  heading: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "bold",
  },
  content: {
    marginBottom: 6,
    lineHeight: 1.4,
  },
  label: {
    fontWeight: "bold",
  },
  grid: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#bbb",
    width: 535,
  },
  row: {
    height: 20,
    flexDirection: "row",
  },
  cell: {
    width: 20,
    borderRightWidth: 0.5,
    borderRightColor: "#ddd",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  diagramImage: {
    width: "90%",
    maxWidth: 535,
    height: "auto",
    objectFit: "contain",
    marginHorizontal: "auto",
  },
  logoContainer: {
    padding: 5,
    borderRadius: 5,
  },
  logoImage: {
    width: 120,
    height: 40,
    objectFit: 'contain',
  },
  graphTitle: {
    fontSize: 12,
    marginTop: 4,
    marginBottom: 10,
    textAlign: "left",
    fontStyle: "italic",
    color: "#444",
    fontWeight: "bold",
    width: "100%",
  },
  imageContainer: {
    width: "100%",
    marginTop: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  mathText: {
    fontFamily: "Helvetica",
    fontSize: 12,
    lineHeight: 1.6,
    letterSpacing: 0.2,
  },
  functionText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    letterSpacing: 0.3,
  },
  equation: {
    fontFamily: "Helvetica-Bold",
    marginVertical: 5,
    paddingLeft: 10,
  },
  questionWrapper: {
    marginBottom: 30,
  },
});

// Enhanced math formatting function with improved function notation
const formatMath = (text?: string): string => {
  if (!text) return "";
  
  try {
    // Pre-processing for specific math patterns
    let preProcessed = text;
    
    // Special handling for f(x) = 1/x type functions
    if (preProcessed.includes("f(x)") && preProcessed.includes("1/x")) {
      preProcessed = preProcessed.replace(/f\s*\(\s*x\s*\)\s*=\s*1\s*\/\s*x/g, "f(x) = 1/x");
    }
    
    // Special handling for sin(x) functions
    if (preProcessed.includes("sin(x)")) {
      preProcessed = preProcessed.replace(/f\s*\(\s*x\s*\)\s*=\s*sin\s*\(\s*x\s*\)/g, "f(x) = sin(x)");
      preProcessed = preProcessed.replace(/Graph\s+f\s*\(\s*x\s*\)\s*=\s*sin\s*\(\s*x\s*\)/g, "Graph f(x) = sin(x)");
    }
    
    // Special handling for interval notations [a, b] and domain references
    if (preProcessed.includes("[") && preProcessed.includes("]")) {
      preProcessed = preProcessed.replace(/for\s+x\s+\in\s+\[\s*([^,]+)\s*,\s*([^\]]+)\s*\]/g, "for x ∈ [$1, $2]");
      preProcessed = preProcessed.replace(/for\s+x\s+in\s+\[\s*([^,]+)\s*,\s*([^\]]+)\s*\]/g, "for x ∈ [$1, $2]");
    }
    
    // Make "for x > 0" more readable
    if (preProcessed.includes("for x")) {
      preProcessed = preProcessed.replace(/for\s+x\s+>\s+0/g, "for x > 0");
      preProcessed = preProcessed.replace(/for\s+x\s+<\s+0/g, "for x < 0");
    }

    // Handle "Sketch the graph of f(x) = 1/x for x > 0"
    if (preProcessed.includes("Sketch") && preProcessed.includes("graph")) {
      preProcessed = preProcessed.replace(
        /Sketch\s+the\s+graph\s+of\s+f\s*\(\s*x\s*\)\s*=\s*1\s*\/\s*x\s+for\s+x\s+>\s+0/g, 
        "Sketch the graph of f(x) = 1/x for x > 0"
      );
    }

    // Check if this is a point inside circle question
    if (preProcessed.includes("point") && preProcessed.includes("circle")) {
      preProcessed = preProcessed.replace(
        /Check\s+if\s+the\s+point\s+\(([^,]+),\s*([^\)]+)\)\s+is\s+on\s+the\s+circle\s+\(x\s*-\s*([^)]+)\)²\s*\+\s*\(y\s*-\s*([^)]+)\)²\s*=\s*([^.]+)/g,
        "Check if the point ($1, $2) is on the circle (x - $3)² + (y - $4)² = $5"
      );
    }

    // Enhanced replacements for better math readability
    let formatted = preProcessed
      // Remove HTML tags 
      .replace(/<[^>]+>/g, "")
      
      // Keep LaTeX delimiters for proper parsing
      .replace(/\\\(/g, " ")
      .replace(/\\\)/g, " ")
      .replace(/\$/g, " ")
      
      // Format fractions better
      .replace(/\\frac{([^}]*)}{([^}]*)}/g, "($1)/($2)")
      
      // Improve exponents
      .replace(/\^{([^}]*)}/g, "^($1)")
      .replace(/\^([0-9])/g, "^$1")
      
      // Format subscripts better
      .replace(/_([0-9])/g, "₍$1₎")
      .replace(/_n/g, "ₙ")
      .replace(/_x/g, "ₓ")
      .replace(/_y/g, "ᵧ")
      
      // Format common math symbols
      .replace(/\\times/g, "×")
      .replace(/\\cdot/g, "·")
      .replace(/\\ldots/g, "...")
      .replace(/\\sqrt{([^}]*)}/g, "√($1)")
      .replace(/\\pm/g, "±")
      .replace(/\\leq/g, "≤")
      .replace(/\\geq/g, "≥")
      .replace(/\\neq/g, "≠")
      .replace(/\\approx/g, "≈")
      .replace(/\\pi/g, "π")
      .replace(/\\theta/g, "θ")
      .replace(/\\alpha/g, "α")
      .replace(/\\beta/g, "β")
      .replace(/\\gamma/g, "γ")
      .replace(/\\delta/g, "δ")
      .replace(/\\infty/g, "∞")
      
      // Improve superscripts for squares and cubes
      .replace(/\^2/g, "²")
      .replace(/\^3/g, "³")
      
      // Properly format equations 
      .replace(/\\left\(/g, "(")
      .replace(/\\right\)/g, ")")
      .replace(/\\left\[/g, "[")
      .replace(/\\right\]/g, "]")
      
      // Clean up remaining LaTeX commands
      .replace(/\\[a-zA-Z]+/g, "");
    
    // Special handling for common equation patterns
    formatted = formatted
      // Circle equation pattern (x - h)² + (y - k)² = r²
      .replace(/\(x\s*-\s*([0-9]+)\)²\s*\+\s*\(y\s*-\s*([0-9]+)\)²\s*=\s*([0-9]+)/g, 
               "(x - $1)² + (y - $2)² = $3")
      
      // Function notation f(x) = ...
      .replace(/f\s*\(\s*x\s*\)\s*=/g, "f(x) = ")
      .replace(/f\(x\)/g, "f(x)")
      
      // Sin/cos/tan/log functions
      .replace(/sin\s*\(\s*x\s*\)/g, "sin(x)")
      .replace(/cos\s*\(\s*x\s*\)/g, "cos(x)")
      .replace(/tan\s*\(\s*x\s*\)/g, "tan(x)")
      .replace(/log\s*\(\s*x\s*\)/g, "log(x)")
      .replace(/ln\s*\(\s*x\s*\)/g, "ln(x)")
      
      // Interval notation
      .replace(/\[\s*([^,]+)\s*,\s*([^\]]+)\s*\]/g, "[$1, $2]")
      .replace(/\(\s*([^,]+)\s*,\s*([^\)]+)\s*\)/g, "($1, $2)")
      
      // Improve numeric fractions
      .replace(/1\/x/g, "1/x")
      .replace(/\(1\)\/\(x\)/g, "1/x")
      
      // Common inequality patterns
      .replace(/x\s*>\s*0/g, "x > 0")
      .replace(/x\s*<\s*0/g, "x < 0")
      
      // Quadratic equation pattern
      .replace(/ax²\s*\+\s*bx\s*\+\s*c\s*=\s*0/g, "ax² + bx + c = 0");
    
    // Improved fraction formatting specifically for functions
    formatted = formatted
      .replace(/f\(x\)\s*=\s*1\/x/g, "f(x) = 1/x")
      .replace(/f\(x\)\s*=\s*\(1\)\/\(x\)/g, "f(x) = 1/x")
      
    // Improve π (pi) display
    formatted = formatted
      .replace(/2π/g, "2π")
      .replace(/\[0,\s*2π\]/g, "[0, 2π]")
      
    // Final specific replacements for circle equations and function notation
    formatted = formatted
      .replace(/\(7,\s*1\)/g, "(7, 1)")
      .replace(/\(x\s*-\s*5\)²\s*\+\s*\(y\s*-\s*2\)²\s*=\s*10/g, "(x - 5)² + (y - 2)² = 10")
      .replace(/Substitute/g, "Substitute");
    
    return formatted;
  } catch (error) {
    console.error('Error formatting math text:', error);
    return text || "";
  }
};

// Math text component with better styling for equations
const MathText = ({ children, style }: { children: string, style?: any }) => {
  // Extract function notations like f(x) = ... for special formatting
  const formattedText = formatMath(children);
  
  // Format function notation with special styling
  if (typeof formattedText === 'string' && 
      (formattedText.includes('f(x) =') || 
       formattedText.includes('Plot') || 
       formattedText.includes('Graph') || 
       formattedText.includes('Sketch'))) {
    
    // For function definitions, use special formatting
    const parts = formattedText.split(/(?=f\(x\)|Plot|Graph|Sketch)/);
    
    return (
      <Text style={[styles.mathText, style]}>
        {parts.map((part, i) => {
          if (part.startsWith('f(x)') || 
              part.startsWith('Plot') || 
              part.startsWith('Graph') || 
              part.startsWith('Sketch')) {
            return <Text key={i} style={styles.functionText}>{part}</Text>;
          }
          return <Text key={i}>{part}</Text>;
        })}
      </Text>
    );
  }
  
  // Otherwise use normal formatting
  return (
    <Text style={[styles.mathText, style]}>
      {formattedText}
    </Text>
  );
};

// Function to convert image URL to base64
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

type Props = {
  questions: any[];
  solutions: any[];
  selectedFields: string;
  logoBase64?: string | null;
};

// Create an image-based logo component
const LogoComponent = ({ logoBase64 }: { logoBase64?: string | null }) => {
  // If we have a base64 image, use it, otherwise fall back to text
  if (logoBase64) {
    return (
      <View style={styles.logoContainer}>
        <Image src={logoBase64} style={styles.logoImage} />
      </View>
    );
  }
  
  // Fallback to text if image loading fails
  return (
    <View style={{
      padding: 5,
      borderWidth: 2,
      borderColor: "#FF69B4",
      borderRadius: 5,
    }}>
      <Text style={{
        color: "#FF69B4",
        fontSize: 18,
        fontFamily: "Helvetica-Bold",
        fontWeight: "bold",
        letterSpacing: 1,
      }}>Examinaite</Text>
    </View>
  );
};

// Function to safely handle image data
const createSafeImage = (imgData?: string, isSolution: boolean = false) => {
  if (!imgData) return null;
  
  try {
    // Check if it's a valid data URL
    if (imgData && imgData.startsWith('data:image')) {
      return (
        <View style={{ width: "100%", alignItems: "center" }}>
          {isSolution && <Text style={styles.graphTitle}>Solution Graph</Text>}
          <Image 
            src={imgData} 
            style={styles.diagramImage}
            cache={false}
          />
        </View>
      );
    }
    return null;
  } catch (error) {
    console.error("Error rendering image in PDF:", error);
    return null;
  }
};

// Update the grid rendering to match
const renderGrid = (type: "short" | "long") => {
  // Use a consistent width for the grid (matching the page width)
  const gridWidth = 500; // Slightly smaller than the page width to account for padding
  const cellSize = 20;
  const cols = Math.floor(gridWidth / cellSize);
  const rows = type === "long" ? 14 : 7;

  return (
    <View style={{
      width: "100%",
      display: "flex",
      alignItems: "center"
    }}>
      <View style={{
        marginTop: 8,
        borderWidth: 1,
        borderColor: "#bbb",
        width: gridWidth,
      }}>
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <View key={rowIdx} style={styles.row}>
            {Array.from({ length: cols }).map((_, colIdx) => (
              <View
                key={colIdx}
                style={[styles.cell, { width: cellSize, height: cellSize }]}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

// Create a component that wraps content and ensures it doesn't break across pages
const KeepTogether = ({ children }: { children: React.ReactNode }) => (
  <View style={{ display: 'flex', flexDirection: 'column' }} break>
    <View>{children}</View>
  </View>
);

export default function QuizPDFDocument({
  questions,
  solutions,
  selectedFields,
  logoBase64,
}: Props) {
  const isLongFormat = selectedFields.toLowerCase().includes("long");

  // Function to determine if a question is "long" based on content
  const isLongQuestion = (question: any) => {
    // Check if question text is long
    const questionLength = question.question ? question.question.length : 0;
    const hasImage = question.diagramImage ? true : false;
    
    // Consider a question long if:
    // 1. It's in a "long" format quiz
    // 2. Its text is more than 300 characters
    // 3. It has a diagram image (diagrams take up more space)
    return isLongFormat || questionLength > 300 || hasImage;
  };

  // Group questions: long ones get their own page, short ones can be grouped
  const groupedQuestions = questions.reduce((groups: any[], q, index) => {
    if (isLongQuestion(q)) {
      // Long questions get their own group
      groups.push([{ question: q, index }]);
    } else {
      // For short questions, check if we can add to the last group
      const lastGroup = groups[groups.length - 1];
      
      if (lastGroup && lastGroup.length < 2 && !isLongQuestion(lastGroup[0].question)) {
        // Add to existing group if it has fewer than 2 questions and first one is short
        lastGroup.push({ question: q, index });
      } else {
        // Start a new group
        groups.push([{ question: q, index }]);
      }
    }
    return groups;
  }, []);

  // Similar approach for solutions
  const groupedSolutions = solutions.reduce((groups: any[], s, index) => {
    const solutionLength = s.solution ? s.solution.length : 0;
    const hasImage = s.diagramImage ? true : false;
    const isLongSolution = isLongFormat || solutionLength > 300 || hasImage;
    
    if (isLongSolution) {
      groups.push([{ solution: s, index }]);
    } else {
      const lastGroup = groups[groups.length - 1];
      
      if (lastGroup && lastGroup.length < 2 && !lastGroup[0].solution.diagramImage) {
        lastGroup.push({ solution: s, index });
      } else {
        groups.push([{ solution: s, index }]);
      }
    }
    return groups;
  }, []);

  return (
    <Document>
      {/* Questions pages */}
      {groupedQuestions.map((group, groupIndex) => (
        <Page key={`questions-page-${groupIndex}`} size="A4" style={styles.page}>
          {groupIndex === 0 && (
            <>
              <View style={styles.header}>
                <Text style={{ fontSize: 16 }}>Generated Questions</Text>
                <LogoComponent logoBase64={logoBase64} />
              </View>
              <Text style={{ marginBottom: 20 }}>{selectedFields}</Text>
            </>
          )}
          
          {groupIndex > 0 && (
            <View style={styles.header} fixed>
              <Text style={{ fontSize: 16 }}>Generated Questions</Text>
              <LogoComponent logoBase64={logoBase64} />
            </View>
          )}
          
          {group.map(({ question, index }: { question: any, index: number }) => (
            <View key={`question-${index}`} style={styles.section} wrap={false}>
              <Text style={styles.heading}>Question {index + 1}</Text>
              <MathText>
                {question.question}
              </MathText>

              {/* Show graph image if available, or a grid for drawing */}
              <View style={styles.imageContainer}>
                {question.diagramImage ? 
                  createSafeImage(question.diagramImage, false) : 
                  renderGrid(isLongFormat ? "long" : "short")
                }
              </View>
            </View>
          ))}
        </Page>
      ))}

      {/* Solutions pages */}
      {groupedSolutions.map((group, groupIndex) => (
        <Page key={`solutions-page-${groupIndex}`} size="A4" style={styles.page}>
          <View style={styles.header} fixed>
            <Text style={{ fontSize: 16 }}>Solutions</Text>
            <LogoComponent logoBase64={logoBase64} />
          </View>
          
          {group.map(({ solution, index }: { solution: any, index: number }) => (
            <View key={`solution-${index}`} style={styles.section} wrap={false}>
              <Text style={styles.heading}>
                Solution for Question {solution.questionIndex}
              </Text>

              <MathText>
                {solution.solution}
              </MathText>

              {/* Show solution graph image if available */}
              {solution.diagramImage && (
                <View style={styles.imageContainer}>
                  {createSafeImage(solution.diagramImage, true)}
                </View>
              )}

              {solution.notes && (
                <View style={{marginTop: 8}}>
                  <Text style={styles.label}>Notes: </Text>
                  <MathText>{solution.notes}</MathText>
                </View>
              )}
              {solution.markingScheme && (
                <View style={{marginTop: 8}}>
                  <Text style={styles.label}>Marking Scheme: </Text>
                  <MathText>{solution.markingScheme}</MathText>
                </View>
              )}
            </View>
          ))}
        </Page>
      ))}
    </Document>
  );
}