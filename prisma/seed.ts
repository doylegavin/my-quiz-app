import { prisma } from "@/lib/db"

async function main() {
  // Seeding the Exam Structure
  await prisma.examStructure.create({
    data: {
      subject: "mathematics",
      papers: {
        create: [
          {
            name: "Paper 1",
            sections: ["Short Questions", "Long Questions"],
            topics: [
              "Algebra",
              "Complex Numbers",
              "Sequences and Series",
              "Functions",
              "Calculus",
              "Financial Maths",
              "Proof by Induction",
            ],
          },
          {
            name: "Paper 2",
            sections: ["Short Questions", "Long Questions"],
            topics: [
              "Geometry",
              "Trigonometry",
              "Coordinate Geometry The Line",
              "Coordinate Geometry The Circle",
              "Probability",
              "Statistics",
              "Constructions",
            ],
          },
        ],
      },
      difficulty: ["Easy", "Medium", "Hard"],
      levels: ["Higher Level", "Ordinary Level", "Foundation Level"],
    },
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
