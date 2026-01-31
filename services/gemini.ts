
import { GoogleGenAI } from "@google/genai";
import { GenerationSettings, AspectRatio } from "../types";
import { MODELS, BACKGROUNDS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateFashionImage(
  productBase64: string,
  settings: GenerationSettings
): Promise<string> {
  const model = MODELS.find(m => m.id === settings.modelId);
  const background = BACKGROUNDS.find(b => b.id === settings.backgroundId);

  if (!model || !background) {
    throw new Error("Invalid selection criteria.");
  }

  // Constructing a detailed prompt for Gemini
  const prompt = `
    TASK: Fashion Image Edit.
    IMAGE PROVIDED: A fashion product image (clothing item).
    
    ACTION:
    1. Create a highly realistic commercial fashion photograph.
    2. Place the product from the provided image ONTO the model: ${model.prompt}.
    3. The model must be wearing this EXACT clothing item naturally. 
    4. CRITICAL: Maintain the exact color, material texture, patterns, and specific details of the original product image.
    5. PLACE everything in this background: ${background.prompt}.
    6. Ensure professional lighting, high-quality focus, and a commercial aesthetic suitable for a high-end fashion brand in Vietnam.
    7. No text, logos, or watermarks in the generated image.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/png',
            data: productBase64,
          },
        },
        { text: prompt },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: settings.aspectRatio,
      }
    },
  });

  let imageUrl = '';
  if (response.candidates && response.candidates[0].content.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        imageUrl = `data:image/png;base64,${part.inlineData.data}`;
        break;
      }
    }
  }

  if (!imageUrl) {
    throw new Error("Failed to generate image data from API.");
  }

  return imageUrl;
}
