# Reddit SaaS Idea Finder

**Reddit SaaS Idea Finder** is a Node.js and TypeScript application designed to discover potential SaaS product ideas from Reddit posts. It achieves this by:

- Accessing the Reddit API using client credentials and renewable access tokens.
- Exploring multiple relevant subreddits in startup, business, and technology domains.
- Analyzing various post categories (\`new\`, \`hot\`, \`top\`, \`rising\`) within each subreddit.
- Fetching post titles, bodies, and comments for deeper insights.
- Identifying keywords (in both English and Spanish) that indicate frustrations, unmet needs, or expensive solutions.
- Performing global keyword searches on Reddit.
- Avoiding reprocessing the same posts by storing analyzed post IDs.
- Scheduling recurring analyses (e.g., every 6 hours) and adding delays to comply with Reddit API rate limits.
- Storing results in a \`data.json\` file for further examination.

## Key Features

- **Multiple Subreddits & Categories:** Broad coverage ensures a wider variety of insights.
- **Bilingual Keywords (English & Spanish):** Increases the chance of finding diverse opportunities.
- **Comprehensive Analysis:** Examines titles, bodies, and comments for richer data.
- **Global Keyword Searches:** Leverages the entire Reddit platform, not just specific subreddits.
- **Data Persistence:** Prevents re-analyzing the same posts, optimizing performance.
- **Rate Limit Compliance:** Delays requests to respect Reddit’s API constraints.
- **Automated Scheduling:** Runs analyses periodically via \`node-cron\`.

## Prerequisites

- **Node.js:** Version 14 or higher recommended.
- **npm:** For dependency management.
- **Reddit API Credentials:**  
  Create a "script" type application at [Reddit Apps](https://www.reddit.com/prefs/apps) to obtain:
  - \`REDDIT_CLIENT_ID\`
  - \`REDDIT_SECRET\`

## Installation

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/your-username/reddit-saas-idea-finder.git
   cd reddit-saas-idea-finder
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set environment variables:**
   Create a \`.env\` file in the project root:
   \`\`\`env
   REDDIT_CLIENT_ID=your_client_id
   REDDIT_SECRET=your_client_secret
   \`\`\`

4. **Optional Configurations:**
   Edit \`src/config.ts\` to modify subreddits, categories, keywords, or delay times.

## Usage

- **Compile TypeScript to JavaScript:**
  \`\`\`bash
  npx tsc
  node dist/index.js
  \`\`\`

- **Run directly with ts-node:**
  \`\`\`bash
  npx ts-node src/index.ts
  \`\`\`

## How It Works

1. **Reddit Authentication:**  
   Obtains an access token via \`client_credentials\`.

2. **Data Retrieval:**  
   Fetches posts and comments across selected subreddits and categories.

3. **Text Analysis:**  
   Searches for specific keywords signaling unmet needs, frustration, or expensive solutions.

4. **Result Storage:**  
   Saves findings in \`data.json\`, including:
   - Timestamp
   - Subreddit (if applicable)
   - Post ID
   - Post Title
   - Detected Keywords

5. **No Repeated Analysis:**  
   Records analyzed post IDs in \`analyzedIds.json\` to prevent duplicates.

6. **Keyword Searches:**  
   Performs global searches on Reddit using predefined keywords.

7. **Scheduled Runs:**  
   Uses \`node-cron\` to run analyses periodically (default: every 6 hours).

## Rate Limit Compliance

The application includes a default 2-second delay between requests, significantly reducing the number of requests per minute. If you encounter rate limit issues, increase the delay or reduce the number of subreddits and categories.

## Customization

- **Subreddits & Categories:** Update \`SUBREDDITS\` and \`CATEGORIES\` in \`config.ts\`.
- **Keywords:** Modify \`KEYWORDS\` in \`config.ts\`.
- **Cron Schedule:** Change the cron expression in \`scheduler.ts\`.
- **NLP Enhancements:** Add more advanced logic in \`analyzer.ts\` using \`compromise\` or other NLP libraries.
- **Database Integration:** Switch from file-based storage to a database if desired.

## Contributing

Contributions are welcome! Consider:
- Suggesting new subreddits or keywords.
- Improving NLP logic.
- Enhancing data storage strategies.
- Adding new features or integrations.

## License

Distributed under the [MIT License](LICENSE).

---

**Happy exploring!** This tool aims to help you uncover SaaS opportunities based on real-world discussions and problems identified on Reddit.