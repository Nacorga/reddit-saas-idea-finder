import axios from 'axios';
import { getAccessToken } from './redditAuth';
import { delay } from './utils';

const BASE_URL = 'https://oauth.reddit.com';
const REQUEST_DELAY = 2000; // Adjust the delay according to your needs

export async function fetchSubredditPosts(subreddit: string, category: string, limit: number = 50): Promise<any[]> {
  const token = await getAccessToken();

  await delay(REQUEST_DELAY);

  const response = await axios.get(`${BASE_URL}/r/${subreddit}/${category}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { limit },
  });

  return response.data.data.children.map((child: any) => child.data);
}

export async function fetchPostComments(postId: string): Promise<string[]> {
  const token = await getAccessToken();

  await delay(REQUEST_DELAY);

  const response = await axios.get(`${BASE_URL}/comments/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { limit: 50 },
  });

  const comments = response.data[1]?.data?.children || [];

  return comments.map((c: any) => c.data.body || '').filter((c: string) => c);
}

export async function searchReddit(keyword: string, limit: number = 50): Promise<any[]> {
  const token = await getAccessToken();

  await delay(REQUEST_DELAY);

  const response = await axios.get(`${BASE_URL}/search`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: keyword,
      limit,
      sort: 'relevance',
      type: 'link',
    },
  });

  return response.data.data.children.map((child: any) => child.data);
}
