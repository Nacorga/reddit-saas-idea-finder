// src/analyzer.ts
import nlp from 'compromise';
import { KEYWORDS } from './config';

interface AnalysisResult {
  subreddit?: string;
  postId: string;
  title: string;
  ideas: string[];
}

export function basicAnalyzeText(text: string): string[] {
  const lowerText = text.toLowerCase();

  return KEYWORDS.filter((kw) => lowerText.includes(kw));
}

export function advancedAnalyzeText(text: string): string[] {
  const doc = nlp(text);
  // Aquí podrías implementar análisis más complejo con NLP.
  // Por ahora, nos quedamos con las keywords detectadas.
  return basicAnalyzeText(text);
}

export function analyzeData(
  subreddit: string | undefined,
  posts: { id: string; title: string; selftext: string; comments: string[] }[],
): AnalysisResult[] {
  return posts
    .map((post) => {
      const combinedText = [post.title, post.selftext, ...post.comments].join(' ');
      const foundIdeas = advancedAnalyzeText(combinedText);

      return {
        subreddit,
        postId: post.id,
        title: post.title,
        ideas: foundIdeas,
      };
    })
    .filter((result) => result.ideas.length > 0);
}
