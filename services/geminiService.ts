import { GoogleGenAI } from "@google/genai";

// Safely retrieve API key handling environments where process might be undefined
const getApiKey = () => {
  try {
    if (typeof process !== 'undefined' && process.env) {
      return process.env.API_KEY || '';
    }
  } catch (e) {
    console.warn('Error accessing process.env:', e);
  }
  return '';
};

const apiKey = getApiKey();
const ai = new GoogleGenAI({ apiKey });

export const generateClauseContent = async (
  clauseTitle: string,
  agreementContext: { title: string; counterparty: string; type: string }
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `You are an expert legal AI assistant. 
    Draft a professional, concise, and legally sound text for the "${clauseTitle}" section of a "${agreementContext.type}" agreement between "LexCorp" and "${agreementContext.counterparty}". 
    The agreement title is "${agreementContext.title}".
    Return ONLY the text content of the clause, no markdown formatting headers.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "Drafting failed. Please try again.";
  } catch (error) {
    console.error("Gemini generation error:", error);
    return "AI drafting unavailable. Please check your connection or API key.";
  }
};

export const analyzeRisk = async (agreementText: string): Promise<{ level: string; reason: string }> => {
  try {
      const model = 'gemini-2.5-flash';
      const prompt = `Analyze the following agreement text summary for risk. 
      Determine if the Risk Level is 'Low', 'Medium', or 'High'. Provide a one sentence reason.
      
      Agreement Text: "${agreementText.substring(0, 1000)}..."
      
      Output format: Risk Level: [Level] | Reason: [Reason]`;

      const response = await ai.models.generateContent({
        model,
        contents: prompt
      });

      const text = response.text;
      if(text?.includes("High")) return { level: 'High', reason: text };
      if(text?.includes("Medium")) return { level: 'Medium', reason: text };
      return { level: 'Low', reason: text || "Standard agreement structure." };
  } catch (e) {
      return { level: 'Medium', reason: "AI analysis unavailable." };
  }
}