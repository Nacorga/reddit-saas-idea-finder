import { promises as fs } from 'fs';
import { join } from 'path';

const DATA_FILE = join(__dirname, '..', 'data.json');
const ANALYZED_IDS_FILE = join(__dirname, '..', 'analyzedIds.json');

interface IdeaRecord {
  date: string;
  subreddit?: string;
  postId: string;
  title: string;
  ideas: string[];
}

export async function storeResults(results: IdeaRecord[]): Promise<void> {
  let existing: IdeaRecord[] = [];
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    existing = JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.log(`Archivo ${DATA_FILE} no encontrado. Creando uno nuevo...`);
    } else {
      throw error;
    }
  }

  const existingIds = new Set(existing.map((r) => r.postId));
  const filteredResults = results.filter((r) => !existingIds.has(r.postId));

  if (filteredResults.length > 0) {
    existing.push(...filteredResults);
    await fs.writeFile(DATA_FILE, JSON.stringify(existing, null, 2), 'utf8');
  }
}

export async function getAnalyzedIds(): Promise<Set<string>> {
  try {
    const data = await fs.readFile(ANALYZED_IDS_FILE, 'utf8');

    return new Set(JSON.parse(data));
  } catch {
    return new Set();
  }
}

export async function saveAnalyzedIds(ids: string[]): Promise<void> {
  const existingIds = await getAnalyzedIds();

  ids.forEach((id) => existingIds.add(id));
  await fs.writeFile(ANALYZED_IDS_FILE, JSON.stringify([...existingIds]), 'utf8');
}
