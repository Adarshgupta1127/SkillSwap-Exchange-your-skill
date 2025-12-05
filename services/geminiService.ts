import { GoogleGenAI, Type } from "@google/genai";
import { User, MatchResult, Message } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using Flash for speed in interactive elements
const MODEL_NAME = "gemini-2.5-flash"; 

export const calculateMatches = async (currentUser: User, candidates: User[]): Promise<MatchResult[]> => {
  try {
    const prompt = `
      I need to find the best skill swap matches for a user.
      
      Current User: ${JSON.stringify({
        skillsOffered: currentUser.skillsOffered,
        skillsWanted: currentUser.skillsWanted,
        bio: currentUser.bio
      })}

      Candidates: ${JSON.stringify(candidates.map(c => ({
        id: c.id,
        name: c.name,
        skillsOffered: c.skillsOffered,
        skillsWanted: c.skillsWanted,
        bio: c.bio
      })))}

      Analyze the compatibility based on:
      1. Direct Skill Match: Does a candidate offer what the user wants AND want what the user offers? (Highest weight)
      2. Indirect Interest: Is there a logical connection even if not exact?
      
      Return a JSON array of objects with 'userId', 'score' (0-100), and a short 'reason' (max 1 sentence).
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              userId: { type: Type.STRING },
              score: { type: Type.NUMBER },
              reason: { type: Type.STRING }
            },
            required: ["userId", "score", "reason"]
          }
        }
      }
    });

    const jsonText = response.text || "[]";
    return JSON.parse(jsonText) as MatchResult[];

  } catch (error) {
    console.error("Error calculating matches:", error);
    // Fallback: simple text match if AI fails
    return candidates.map(c => ({
      userId: c.id,
      score: 50,
      reason: "Basic compatibility check (AI unavailable)."
    }));
  }
};

export const generateChatReply = async (
  currentUser: User,
  partner: User,
  history: Message[]
): Promise<string> => {
  try {
    const conversation = history.map(m => 
      `${m.senderId === currentUser.id ? 'User' : partner.name}: ${m.content}`
    ).join('\n');

    const prompt = `
      Act as ${partner.name} on a skill swap platform.
      
      Your Profile:
      - Skills Offered: ${partner.skillsOffered.join(', ')}
      - Skills Wanted: ${partner.skillsWanted.join(', ')}
      - Bio: ${partner.bio}

      You are chatting with ${currentUser.name} who offers: ${currentUser.skillsOffered.join(', ')}.

      Conversation History:
      ${conversation}

      Respond naturally to the last message. Be helpful, friendly, and interested in setting up a skill exchange. Keep it concise (under 50 words).
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text || "...";

  } catch (error) {
    console.error("Chat generation error:", error);
    return "Sorry, I'm having trouble connecting right now.";
  }
};
