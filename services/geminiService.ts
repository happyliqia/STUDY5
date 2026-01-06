
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getEncouragement = async (name: string, score: number, total: number) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are Marie, the friendly teacher from Kids Box English. Give a short, encouraging feedback message (max 2 sentences) to a student named ${name} who scored ${score} out of ${total} on their English test. Use very simple Grade 1 level English. Be very positive!`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      },
    });
    return response.text || "Well done! You are a star! 🌟";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Great job, little explorer! Keep learning English! 🌟";
  }
};
