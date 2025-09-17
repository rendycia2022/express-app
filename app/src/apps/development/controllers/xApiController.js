import { X_TOKEN } from '../../../config/config.js';

export async function tweets(req, res) {
    // res.status(200).json({
    //         success: true,
    //         data: "connected",
    //     });
    try {
        const hashtag = '#ferryirwandi';
        const url = `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(hashtag)}&tweet.fields=created_at,author_id&max_results=10`;
        const response = await fetchApi(url);

        // Send to frontend
        res.status(200).json({
            success: true,
            data: response,
        });
    } catch (error) {
        // Centralized error handling
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

async function fetchApi(url) {
  const response = await fetch(url, {
    headers: {
        "Authorization": `Bearer ${X_TOKEN}`
    }
  });

  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}