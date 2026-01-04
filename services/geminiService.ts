
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // API key must be used directly from process.env.API_KEY without fallback per instructions
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async getGrowthStrategy(niche: string, platform: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Provide a 3-step social media growth strategy for a ${niche} account on ${platform}. 
                  Keep it concise and professional. Suggest which SMM services would help most.`,
        config: {
          temperature: 0.7,
        }
      });
      // Correct usage of .text property
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Unable to generate strategy at this time. Please try again later.";
    }
  }

  async analyzeProfile(description: string) {
     try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze this social media profile description and suggest improvements for better conversion and brand identity: "${description}"`,
        config: {
          temperature: 0.8,
        }
      });
      // Correct usage of .text property
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Profile analysis is currently unavailable.";
    }
  }
}

export const gemini = new GeminiService();
