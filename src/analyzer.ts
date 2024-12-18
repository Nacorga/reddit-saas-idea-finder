import nlp from 'compromise';
import { KEYWORDS } from './config';

interface AnalysisResult {
  subreddit?: string;
  postId: string;
  title: string;
  ideas: string[];
  context: {
    sentimentScore: number;
    entities: string[];
    isQuestion: boolean;
    matchedSynonyms: string[];
  };
}

const NEGATIVE_WORDS = [
  'frustrating',
  'frustrante',
  'difficult',
  'difícil',
  'hard',
  'hate',
  'odiar',
  'problem',
  'problema',
  'annoying',
  'molesto',
  'expensive',
  'caro',
  'costoso',
  'overpriced',
  'costly',
  'inasequible',
];

const POSITIVE_WORDS = [
  'easy',
  'fácil',
  'helpful',
  'útil',
  'great',
  'genial',
  'useful',
  'valioso',
  'beneficioso',
  'valuable',
];

const SYNONYMS_MAP: Record<string, string[]> = {
  expensive: [
    'costly',
    'overpriced',
    'too expensive',
    'not affordable',
    'pricey',
    'caro',
    'costoso',
    'demasiado caro',
    'inasequible',
  ],
  'need a tool for': [
    'looking for a tool',
    'is there a tool',
    'can anyone suggest a tool',
    'need software for',
    'necesito una herramienta para',
    'buscando una herramienta',
    'hay alguna herramienta',
    'alguien me puede sugerir una herramienta',
    'necesito un software para',
    'recommend a tool',
    'what tools do you use',
    'qué herramientas usan',
    'any suggestion for a tool',
    'suggest a solution',
  ],
  'personal assistant': [
    'assistant needed',
    'virtual assistant',
    'asistente personal',
    'do you ever wish you had a personal assistant',
    'quiero un asistente',
    'buscar un asistente',
    'necesito ayuda personal',
    'someone to help me with',
  ],
  'need a solution': [
    'looking for a solution',
    'buscando una solución',
    'any solution for',
    'alguna solución para',
    'cómo puedo resolver',
    'how can i solve',
    'no hay una solución para',
    'no solution for',
  ],
};

function expandKeywords(keywords: string[]): string[] {
  const expanded: string[] = [...keywords];

  for (const synonyms of Object.values(SYNONYMS_MAP)) {
    expanded.push(...synonyms);
  }

  return expanded;
}

const EXPANDED_KEYWORDS = expandKeywords(KEYWORDS);

function basicAnalyzeText(text: string): string[] {
  const lowerText = text.toLowerCase();

  return EXPANDED_KEYWORDS.filter((kw) => lowerText.includes(kw));
}

function sentimentScore(text: string): number {
  const tokens = text.toLowerCase().split(/\s+/);
  let score = 0;

  for (const t of tokens) {
    if (NEGATIVE_WORDS.includes(t)) score -= 1;
    if (POSITIVE_WORDS.includes(t)) score += 1;
  }

  return score;
}

function extractEntities(doc: any): string[] {
  return doc.nouns().toLowerCase().out('array');
}

function isQuestion(doc: any): boolean {
  const text = doc.text().toLowerCase();

  return (
    text.includes('?') || doc.match('(how|what|why|can i|is there|cómo|qué|por qué|hay|existe|necesito|buscando)').found
  );
}

function matchSynonymsFound(text: string): string[] {
  const matched: string[] = [];
  const lowerText = text.toLowerCase();

  for (const synonyms of Object.values(SYNONYMS_MAP)) {
    for (const syn of synonyms) {
      if (lowerText.includes(syn)) {
        matched.push(syn);
      }
    }
  }

  return matched;
}

export function analyzeData(
  subreddit: string | undefined,
  posts: { id: string; title: string; selftext: string; comments: string[] }[],
): AnalysisResult[] {
  return posts
    .map((post) => {
      const combinedText = [post.title, post.selftext, ...post.comments].join(' ');
      const doc = nlp(combinedText);
      const foundIdeas = basicAnalyzeText(combinedText);
      const score = sentimentScore(combinedText);
      const entities = extractEntities(doc);
      const question = isQuestion(doc);
      const foundSynonyms = matchSynonymsFound(combinedText);

      return {
        subreddit,
        postId: post.id,
        title: post.title,
        ideas: foundIdeas,
        context: {
          sentimentScore: score,
          entities,
          isQuestion: question,
          matchedSynonyms: foundSynonyms,
        },
      };
    })
    .filter((result) => result.ideas.length > 0 || result.context.matchedSynonyms.length > 0);
}
