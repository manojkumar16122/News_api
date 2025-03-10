import React, { useState, useEffect } from 'react';
import { fetchTopHeadlines, searchNews, NewsArticle } from '../services/newsApi';
import { motion } from 'framer-motion';
import { Search, RefreshCw, ExternalLink, AlertCircle } from 'lucide-react';

const News: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const loadNews = async (query = '') => {
    try {
      setLoading(true);
      setError('');
      
      const response = query 
        ? await searchNews(query) 
        : await fetchTopHeadlines();
      
      if (response.status === 'error') {
        setError('Failed to load news. Please try again later.');
        setArticles([]);
      } else {
        setArticles(response.articles || []);
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error('Error in loadNews:', err);
      setError('Failed to load news. Please try again later.');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
    
    // Set up auto-refresh every 5 minutes
    const intervalId = setInterval(() => {
      loadNews(searchQuery);
    }, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadNews(searchQuery);
  };

  const handleRefresh = () => {
    loadNews(searchQuery);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <motion.h1 
              className="text-3xl font-bold text-gray-900 mb-4 md:mb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Latest News
            </motion.h1>
            
            <motion.div 
              className="flex items-center text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
              <motion.button
                onClick={handleRefresh}
                className="ml-2 p-1 rounded-full hover:bg-gray-200 focus:outline-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <RefreshCw className="h-4 w-4" />
              </motion.button>
            </motion.div>
          </div>
          
          <motion.form 
            onSubmit={handleSearch}
            className="mt-4 flex"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 block w-full rounded-l-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-10 border p-2"
                placeholder="Search for news..."
              />
            </div>
            <motion.button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Search
            </motion.button>
          </motion.form>
        </div>
        
        {error && (
          <motion.div 
            className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg flex items-center"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </motion.div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {articles && articles.length > 0 ? (
              articles.map((article, index) => (
                <motion.div 
                  key={`${article.title || 'news'}-${index}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  variants={item}
                >
                  {article.urlToImage && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={article.urlToImage} 
                        alt={article.title || 'News image'} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <p className="text-sm font-medium text-blue-600 mb-1">
                      {article.source?.name || 'Unknown Source'} • {new Date(article.publishedAt || Date.now()).toLocaleDateString()}
                    </p>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{article.title || 'No title available'}</h2>
                    {article.description && (
                      <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>
                    )}
                    <a 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800"
                    >
                      Read more <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No articles found. Try a different search term.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default News;