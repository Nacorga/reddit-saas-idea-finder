import axios from 'axios';
import qs from 'qs';

const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID!;
const REDDIT_SECRET = process.env.REDDIT_SECRET!;

let accessToken: string | null = null;
let tokenExpiry: number | null = null;

async function fetchAccessToken(): Promise<string> {
  const tokenResponse = await axios.post(
    'https://www.reddit.com/api/v1/access_token',
    qs.stringify({ grant_type: 'client_credentials' }),
    {
      auth: {
        username: REDDIT_CLIENT_ID,
        password: REDDIT_SECRET,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  const { access_token, expires_in } = tokenResponse.data;

  accessToken = access_token;
  tokenExpiry = Date.now() + expires_in * 1000;

  return accessToken as string;
}

export async function getAccessToken(): Promise<string> {
  if (!accessToken || (tokenExpiry && Date.now() > tokenExpiry)) {
    return await fetchAccessToken();
  }

  return accessToken;
}
