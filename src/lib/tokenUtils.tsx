import { encode } from "gpt-3-encoder";

/**
 * Count the number of tokens in a given string.
 * @param input The string to calculate token count for.
 * @returns The number of tokens.
 */
export function countTokens(input: string): number {
  return encode(input).length;
}
