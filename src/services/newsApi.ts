const API_KEY = 'f2f183a02fdc43f8b1f5edd844921507';
const BASE_URL = 'https://newsapi.org/v2';

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export const fetchTopHeadlines = async (country = 'us', category = 'general', pageSize = 20): Promise<NewsResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Ensure articles is always an array
    if (!data.articles || !Array.isArray(data.articles)) {
      return {
        status: data.status || 'error',
        totalResults: 0,
        articles: []
      };
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    // Return a valid response structure even on error
    return {
      status: 'error',
      totalResults: 0,
      articles: []
    };
  }
};

export const searchNews = async (query: string, pageSize = 20): Promise<NewsResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/everything?q=${encodeURIComponent(query)}&pageSize=${pageSize}&apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to search news: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Ensure articles is always an array
    if (!data.articles || !Array.isArray(data.articles)) {
      return {
        status: data.status || 'error',
        totalResults: 0,
        articles: []
      };
    }
    
    return data;
  } catch (error) {
    console.error('Error searching news:', error);
    // Return a valid response structure even on error
    return {
      status: 'error',
      totalResults: 0,
      articles: []
    };
  }
};