import { User } from './types';

export const CURRENT_USER_ID = 'me';

export const MY_PROFILE: User = {
  id: CURRENT_USER_ID,
  name: "Ravi",
  avatar: "https://picsum.photos/seed/alex/200/200",
  skillsOffered: ["React", "TypeScript", "Node.js"],
  skillsWanted: ["Graphic Design", "Spanish", "Guitar"],
  bio: "Full stack developer looking to expand my creative horizons and learn a new language.",
  isAI: false
};

export const MOCK_USERS: User[] = [
  {
    id: "u1",
    name: "Raju",
    avatar: "https://picsum.photos/seed/elena/200/200",
    skillsOffered: ["Spanish", "French", "Translation"],
    skillsWanted: ["React", "Web Development"],
    bio: "Language enthusiast and teacher. I want to build my own website for my students.",
    isAI: true
  },
  {
    id: "u2",
    name: "Rajesh",
    avatar: "https://picsum.photos/seed/marcus/200/200",
    skillsOffered: ["Guitar", "Music Theory", "Piano"],
    skillsWanted: ["Node.js", "Python"],
    bio: "Musician based in Seattle. Trying to automate some music production workflows with code.",
    isAI: true
  },
  {
    id: "u3",
    name: "Ramesh",
    avatar: "https://picsum.photos/seed/sarah/200/200",
    skillsOffered: ["Graphic Design", "UI/UX", "Illustration"],
    skillsWanted: ["TypeScript", "App Development"],
    bio: "Professional designer looking to move into product design by learning how to code.",
    isAI: true
  },
  {
    id: "u4",
    name: "Rahul",
    avatar: "https://picsum.photos/seed/david/200/200",
    skillsOffered: ["Cooking", "Baking", "Italian Cuisine"],
    skillsWanted: ["Fitness Training", "Yoga"],
    bio: "Chef by day. Need help getting back in shape.",
    isAI: true
  },
  {
    id: "u5",
    name: "Ramana",
    avatar: "https://picsum.photos/seed/priya/200/200",
    skillsOffered: ["Digital Marketing", "SEO"],
    skillsWanted: ["React", "E-commerce"],
    bio: "Marketing guru wanting to build a dropshipping store.",
    isAI: true
  }
];