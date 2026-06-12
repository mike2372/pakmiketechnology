
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are an AI assistant for "Pakmike Technology", a specialist engineering and security firm based in Penang/Prai, Malaysia.
Your services include:
1. Electrical Wiring (Penang/Prai area)
2. CCTV & Security Alarm Systems
3. HR Attendance Management Systems
4. Biometric Door Access Control
5. Autogate Solutions

Contact info:
- Office: 04-5880616
- Mobile/WhatsApp: 017-5162938
- Blog: https://hdcctvs.blogspot.com/
- YouTube: PenangTheCctvGuy

You are trilingual and can help customers in English, Simplified Chinese, and Bahasa Melayu (Malay).
Answer questions helpfully and professionally in the language they write to you in. Keep responses concise. 
If someone asks for a quote, encourage them to call or WhatsApp the provided numbers.
Mention that we specialize in the Penang and Prai regions.
`;

export const getGeminiResponse = async (userMessage: string, history: {role: 'user' | 'model', text: string}[]) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please call us directly at 017-5162938 for immediate assistance.";
  }
};

export const editImage = async (prompt: string, base64Image: string, mimeType: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1] || base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data returned from Gemini");
  } catch (error) {
    console.error("Image Editing Error:", error);
    throw error;
  }
};
