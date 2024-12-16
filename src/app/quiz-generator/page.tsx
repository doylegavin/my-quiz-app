"use client";

import { useState } from "react";

export default function QuizGenerator() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("");
  const [questionCount, setQuestionCount] = useState(5);
  const [questions, setQuestions] = useState<{ question: string; solution: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("/api/generate-questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, topic, level, questionCount }),
    });

    if (response.ok) {
      const data = await response.json();
      setQuestions(data.questions); // Set the fetched questions
    } else {
      console.error("Failed to fetch questions");
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Generate Questions</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border p-2 w-full"
            placeholder="e.g., Mathematics"
          />
        </div>
        <div>
          <label>Topic:</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="border p-2 w-full"
            placeholder="e.g., Calculus"
          />
        </div>
        <div>
          <label>Level:</label>
          <input
            type="text"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="border p-2 w-full"
            placeholder="e.g., Higher"
          />
        </div>
        <div>
          <label>Number of Questions:</label>
          <input
            type="number"
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            className="border p-2 w-full"
            min="1"
            max="10"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {loading ? "Generating..." : "Generate Questions"}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-bold">Generated Questions</h2>
        {questions.length > 0 ? (
          <ul className="space-y-4 mt-4">
            {questions.map((q, index) => (
              <li key={index} className="border p-4 rounded">
                <p>
                  <strong>Question {index + 1}:</strong> {q.question}
                </p>
                <p>
                  <strong>Solution:</strong> {q.solution}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No questions generated yet.</p>
        )}
      </div>
    </div>
  );
}
