# Reddit SaaS Idea Finder

**Reddit SaaS Idea Finder** is a Node.js and TypeScript application designed to discover potential SaaS product ideas from Reddit posts. It achieves this by:

- Accessing the Reddit API using client credentials and renewable access tokens.
- Exploring multiple relevant subreddits in startup, business, and technology domains.
- Analyzing various post categories (`new`, `hot`, `top`, `rising`) within each subreddit.
- Fetching post titles, bodies, and comments to gain deeper insights.
- Identifying keywords (in both English and Spanish) that indicate frustrations, unmet needs, or expensive solutions.
- Performing global keyword searches on Reddit.
- Avoiding reprocessing of the same posts by storing analyzed post IDs.
- Scheduling recurring analyses (e.g., every 6 hours) and adding delays to comply with the Reddit API rate limits.
- Storing results in a `data.json` file for further examination.

## Key Features

- **Multiple Subreddits & Categories:**  
  Broad coverage ensures you find a wide variety of pain points and needs.

- **Bilingual Keywords (English & Spanish):**  
  Increases the likelihood of discovering diverse opportunities.

- **Comprehensive Analysis:**  
  Examines titles, bodies, and comments of each post for richer insights.

- **Global Keyword Searches:**  
  Searches beyond specific subreddits to leverage the entire Reddit platform.

- **Data Persistence:**  
  Prevents re-analyzing the same posts, saving resources and time.

- **Rate Limit Compliance:**  
  Introduces delays between requests to respect Reddit’s API constraints.

- **Automated Scheduling:**  
  Uses `node-cron` to run the analysis periodically.

## Prerequisites

- **Node.js:** Version 14 or above is recommended.
- **npm:** For dependency management.
- **Reddit API Credentials:**  
  Create a "script" type application at [Reddit Apps](https://www.reddit.com/prefs/apps) to obtain `REDDIT_CLIENT_ID` and `REDDIT_SECRET`.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/reddit-saas-idea-finder.git
   cd reddit-saas-idea-finder