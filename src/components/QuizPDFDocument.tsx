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

// Register fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/@react-pdf/font/Helvetica.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/@react-pdf/font/Helvetica-Bold.ttf', fontWeight: 'bold' },
    { src: 'https://cdn.jsdelivr.net/npm/@react-pdf/font/Helvetica-Oblique.ttf', fontStyle: 'italic' },
  ]
});

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
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
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
    alignSelf: "flex-start",
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
    marginTop: 8,
    width: 500,
    height: 350,
    objectFit: "cover",
  },
  graphTitle: {
    fontSize: 11,
    marginTop: 4,
    marginBottom: 2,
    textAlign: "center",
    fontStyle: "italic",
    color: "#444",
  },
  imageContainer: {
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },
  mathText: {
    fontFamily: "Helvetica",
    fontSize: 12,
    lineHeight: 1.5,
  },
});

// Simple function to improve math formatting without external libraries
const formatMath = (text?: string): string => {
  if (!text) return "";
  
  // Basic replacements to improve readability
  return text
    // Remove HTML tags and LaTeX delimiters
    .replace(/<[^>]+>/g, "")
    .replace(/\\\(|\\\)|\$/g, "")
    
    // Format fractions - convert \frac{a}{b} to a/b
    .replace(/\\frac{([^}]*)}{([^}]*)}/g, "$1/$2")
    
    // Format subscripts and superscripts
    .replace(/([a-zA-Z])_([0-9n])/g, "$1₍$2₎")
    .replace(/\^([0-9n])/g, "^$1")
    
    // Format common math symbols
    .replace(/\\times/g, "×")
    .replace(/\\cdot/g, "·")
    
    // Format square roots
    .replace(/\\sqrt{([^}]*)}/g, "√($1)")
    
    // Clean up other LaTeX commands
    .replace(/\\[a-zA-Z]+/g, "");
};

type Props = {
  questions: any[];
  solutions: any[];
  selectedFields: string;
};

const renderGrid = (type: "short" | "long") => {
  const pageWidth = 500;
  const cellSize = 20;
  const cols = Math.floor(pageWidth / cellSize);
  const rows = type === "long" ? 14 : 7;

  return (
    <View style={[styles.grid, { width: cols * cellSize }]}>
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
  );
};

export default function QuizPDFDocument({
  questions,
  solutions,
  selectedFields,
}: Props) {
  const isLong = selectedFields.toLowerCase().includes("long");

  return (
    <Document>
      {/* Page 1 - Questions */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={{ fontSize: 16 }}>Generated Questions</Text>
          <Image src="/ExaminaiteLogo2.jpg" style={{ width: 100, height: 30 }} />
        </View>

        <Text style={{ marginBottom: 20 }}>{selectedFields}</Text>

        {questions.map((q, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.heading}>Question {index + 1}</Text>
            <Text style={styles.content}>
              {formatMath(q.question)}
            </Text>

            {/* Show graph image if available, or a grid for drawing */}
            <View style={styles.imageContainer}>
              {q.diagramImage ? (
                <Image src={q.diagramImage} style={styles.diagramImage} />
              ) : (
                renderGrid(isLong ? "long" : "short")
              )}
            </View>
          </View>
        ))}
      </Page>

      {/* Page 2 - Solutions */}
      {solutions.length > 0 && (
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={{ fontSize: 16 }}>Solutions</Text>
            <Image src="/ExaminaiteLogo2.jpg" style={{ width: 100, height: 30 }} />
          </View>

          {solutions.map((sol, idx) => (
            <View key={idx} style={styles.section}>
              <Text style={styles.heading}>
                Solution for Question {sol.questionIndex}
              </Text>

              <Text style={styles.content}>
                {formatMath(sol.solution)}
              </Text>

              {/* Show solution graph image if available */}
              {sol.diagramImage && (
                <View style={styles.imageContainer}>
                  <Text style={styles.graphTitle}>Solution Graph</Text>
                  <Image src={sol.diagramImage} style={styles.diagramImage} />
                </View>
              )}

              {sol.notes && (
                <Text style={styles.mathText}>
                  <Text style={styles.label}>Notes: </Text>
                  {formatMath(sol.notes)}
                </Text>
              )}
              {sol.markingScheme && (
                <Text style={styles.mathText}>
                  <Text style={styles.label}>Marking Scheme: </Text>
                  {formatMath(sol.markingScheme)}
                </Text>
              )}
            </View>
          ))}
        </Page>
      )}
    </Document>
  );
}