//src/lib/gpt.ts

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure the API key is set in your environment variables
});

// Utility function to delay execution
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface OutputFormat {
  [key: string]: string | string[] | OutputFormat[] | OutputFormat;
}


export async function strict_output(
  system_prompt: string,
  user_prompt: string | string[],
  output_format: OutputFormat,
  default_category: string = "",
  output_value_only: boolean = false,
  model: string = "gpt-4o", // Default model
  temperature: number = 0.7,
  num_tries: number = 3,
  verbose: boolean = false
): Promise<{ question: string; solution: string; options?: string[] }[]> {
  for (let i = 0; i < num_tries; i++) {
    try {
      const response = await openai.chat.completions.create({
        model,
        messages: [
          {
            role: "system",
            content: `${system_prompt}\nFormat: ${JSON.stringify(output_format)}`,
          },
          {
            role: "user",
            content: Array.isArray(user_prompt) ? user_prompt.join("\n") : user_prompt,
          },
        ],
        temperature,
      });

      const content = response.choices[0]?.message?.content || "";
      const parsed = JSON.parse(content);

      // Validate parsed content structure
      if (Array.isArray(parsed)) return parsed;

      throw new Error("Invalid JSON format returned.");
    } catch (error: unknown) {
      if (verbose) {
        console.error(`Attempt ${i + 1} failed:`, error);
      }
    
      if (error instanceof SyntaxError) {
        console.error("JSON Parsing Error:", error.message);
      } else if (error instanceof Error) {
        console.error("API Error:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    
      if (i < num_tries - 1) {
        console.log(`Retrying after 2 seconds... (Attempt ${i + 2})`);
        await sleep(2000);
      }
    
      if (i === num_tries - 1) {
        throw new Error(
          "Failed to generate valid questions after multiple attempts. Please try reducing complexity or question count."
        );
      }
    }
    
  }
  return [];
}


