import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ExternalLink } from 'lucide-react';

const Feedback: React.FC = () => {
  // Replace with your actual Google Form URL
  const googleFormUrl = "https://form.jotform.com/250648872846471";
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6 sm:p-8">
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center justify-center mb-4">
                <MessageSquare className="h-12 w-12 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">We Value Your Feedback</h1>
              <p className="mt-2 text-gray-600">
                Help us improve our news platform by sharing your thoughts and suggestions
              </p>
            </motion.div>
            
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-gray-700 mb-6">
                Your feedback is important to us. Please take a moment to fill out our feedback form. 
                We're constantly working to improve our platform and your input helps us make it better.
              </p>
              
              <div className="flex justify-center">
                <motion.a
                  href={googleFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Open Feedback Form <ExternalLink className="ml-2 h-5 w-5" />
                </motion.a>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 p-6 rounded-lg border border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-lg font-medium text-gray-900 mb-4">What kind of feedback are we looking for?</h2>
              
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-blue-500">•</span>
                  <span className="ml-2">User experience and interface suggestions</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-blue-500">•</span>
                  <span className="ml-2">News content quality and relevance</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-blue-500">•</span>
                  <span className="ml-2">News validation tool accuracy and usability</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-blue-500">•</span>
                  <span className="ml-2">Feature requests and ideas for improvement</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-blue-500">•</span>
                  <span className="ml-2">Bug reports or technical issues</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Feedback;