import { SUBREDDITS, CATEGORIES, KEYWORDS } from './config';
import { fetchSubredditPosts, fetchPostComments, searchReddit } from './redditClient';
import { analyzeData } from './analyzer';
import { storeResults, getAnalyzedIds, saveAnalyzedIds } from './storage';
import { startScheduler } from './scheduler';

export async function runScrapingProcess() {
  const analyzedIds = await getAnalyzedIds();
  for (const subreddit of SUBREDDITS) {
    for (const category of CATEGORIES) {
      console.log(`Analizando r/${subreddit} en categoría ${category}...`);
      try {
        const posts = await fetchSubredditPosts(subreddit, category, 50);

        const postsWithComments = [];
        for (const p of posts) {
          if (!analyzedIds.has(p.id)) {
            const comments = await fetchPostComments(p.id);
            postsWithComments.push({
              id: p.id,
              title: p.title || '',
              selftext: p.selftext || '',
              comments,
            });
          }
        }

        const analysisResults = analyzeData(subreddit, postsWithComments);
        if (analysisResults.length > 0) {
          await storeResults(
            analysisResults.map((r) => ({
              date: new Date().toISOString(),
              subreddit: r.subreddit,
              postId: r.postId,
              title: r.title,
              ideas: r.ideas,
            })),
          );
          console.log(`Guardados ${analysisResults.length} resultados de r/${subreddit} (${category}).`);

          const newIds = analysisResults.map((r) => r.postId);
          await saveAnalyzedIds(newIds);
        } else {
          console.log(`No se encontraron ideas en r/${subreddit} (${category}) esta vez.`);
        }
      } catch (error) {
        console.error(`Error analizando r/${subreddit} (${category}):`, error);
      }
    }
  }
}

export async function runSearchProcess() {
  const analyzedIds = await getAnalyzedIds();
  console.log('Ejecutando búsquedas por palabras clave...');
  for (const keyword of KEYWORDS) {
    try {
      const searchResults = await searchReddit(keyword, 50);
      const postsWithComments = [];
      for (const p of searchResults) {
        if (!analyzedIds.has(p.id)) {
          const comments = await fetchPostComments(p.id);
          postsWithComments.push({
            id: p.id,
            title: p.title || '',
            selftext: p.selftext || '',
            comments,
          });
        }
      }

      const analysisResults = analyzeData(undefined, postsWithComments);
      if (analysisResults.length > 0) {
        await storeResults(
          analysisResults.map((r) => ({
            date: new Date().toISOString(),
            subreddit: r.subreddit,
            postId: r.postId,
            title: r.title,
            ideas: r.ideas,
          })),
        );
        console.log(`Guardados ${analysisResults.length} resultados para la keyword "${keyword}".`);

        const newIds = analysisResults.map((r) => r.postId);
        await saveAnalyzedIds(newIds);
      } else {
        console.log(`No se encontraron ideas para la keyword "${keyword}".`);
      }
    } catch (error) {
      console.error(`Error buscando con keyword "${keyword}":`, error);
    }
  }
}

(async () => {
  await runScrapingProcess();
  await runSearchProcess();

  startScheduler();
})();
