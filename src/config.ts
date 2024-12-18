import dotenv from 'dotenv';
dotenv.config();

export const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID;
export const REDDIT_SECRET = process.env.REDDIT_SECRET;

export const CATEGORIES = ['new', 'hot', 'top', 'rising'];

export const SUBREDDITS = [
  'startups',
  'SaaS',
  'Entrepreneur',
  'webdev',
  'smallbusiness',
  'freelance',
  'sysadmin',
  'remotework',
  'marketing',
  'growthhacking',
  'devops',
  'programming',
  'learnprogramming',
  'productivity',
  'business',
  'dataisbeautiful',
  'machinelearning',
  'artificial',
  'AI',
  'productmanagement',
];

export const KEYWORDS = [
  'necesito una herramienta para',
  'frustrante',
  '¿cómo puedo resolver',
  'no hay una solución para',
  'alternativa a',
  'herramienta muy cara',
  'need a tool for',
  'frustrating',
  'how can i solve',
  'no solution for',
  'alternative to',
  'too expensive',
  'looking for a tool',
  'is there a tool',
];
