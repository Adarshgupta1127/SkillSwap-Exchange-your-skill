export interface User {
  id: string;
  name: string;
  avatar: string;
  skillsOffered: string[];
  skillsWanted: string[];
  bio: string;
  isAI: boolean; // For simulation purposes
}

export interface MatchResult {
  userId: string;
  score: number; // 0-100
  reason: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: number;
}

export interface ChatSession {
  partnerId: string;
  messages: Message[];
}
