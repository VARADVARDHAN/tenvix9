
import { GoogleGenAI, Type } from "@google/genai";
import { MemoryData } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const memorySchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "A short, engaging paragraph summarizing the day's events.",
    },
    emotion: {
      type: Type.STRING,
      description: "The dominant emotion of the day from this list: Nostalgic, Joyful, Productive, Relaxing, Adventurous.",
    },
    colorTheme: {
        type: Type.OBJECT,
        properties: {
            from: { type: Type.STRING, description: "A Tailwind CSS 'from' color class for a gradient, e.g., 'from-blue-500'." },
            to: { type: Type.STRING, description: "A Tailwind CSS 'to' color class for a gradient, e.g., 'to-cyan-400'." }
        },
        required: ['from', 'to']
    },
    locations: {
      type: Type.ARRAY,
      description: "An array of 2-3 significant locations visited during the day.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING, description: "A brief note about what happened at this location." },
        },
        required: ["name", "description"]
      },
    },
    photos: {
      type: Type.ARRAY,
      description: "An array of 2 fictional photo descriptions from the day. These will be used to generate images.",
      items: {
        type: Type.OBJECT,
        properties: {
          description: { type: Type.STRING, description: "A detailed description for an image generation model." },
          url: { type: Type.STRING, description: "A placeholder image URL from picsum.photos, e.g. https://picsum.photos/400/300" }
        },
        required: ["description", "url"]
      }
    },
    music: {
      type: Type.ARRAY,
      description: "An array of 2-3 songs listened to that fit the day's mood.",
      items: {
        type: Type.OBJECT,
        properties: {
          song: { type: Type.STRING },
          artist: { type: Type.STRING },
        },
        required: ["song", "artist"]
      },
    },
    socialPost: {
      type: Type.OBJECT,
      description: "A short, tweet-like social media post summarizing a key moment.",
      properties: {
        platform: { type: Type.STRING, description: "e.g., Twitter, Instagram" },
        content: { type: Type.STRING },
      },
      required: ["platform", "content"]
    }
  },
  required: ["summary", "emotion", "colorTheme", "locations", "photos", "music", "socialPost"]
};

export const generateMemory = async (date: Date): Promise<MemoryData> => {
  const prompt = `You are Tenvix AI, an engine that reconstructs past days. For the date ${date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}, create a fictional yet plausible narrative of a young professional's day in a vibrant city. Based on this narrative, generate a complete data set for their 'Tenvix' experience. Your response MUST be a single, valid JSON object that strictly adheres to the provided schema. Ensure all fields are populated with creative and consistent data.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: memorySchema,
      },
    });

    const jsonString = response.text.trim();
    const parsedData = JSON.parse(jsonString);

    // Basic validation
    if (!parsedData.summary || !parsedData.photos) {
        throw new Error("Invalid data structure received from API");
    }

    return parsedData as MemoryData;

  } catch (error) {
    console.error("Error generating memory:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to reconstruct memory. Gemini API error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the memory.");
  }
};