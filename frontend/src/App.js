import React, { useState, useEffect } from 'react';
import { fetchProducts, getAiRecommendations } from './services/api';
import Catalog from './components/Catalog';
import UserPreferences from './components/UserPreferences';
import Recommendations from './components/Recommendations';
import BrowsingHistory from './components/BrowsingHistory'; // Naya component import karein
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // 1. History ke liye naya state banayein
  const [browsingHistory, setBrowsingHistory] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
    };
    loadProducts();
  }, []);

  // 2. Product par click handle karne ke liye naya function
  const handleProductClick = (productId) => {
    // Agar product pehle se history me nahi hai, tabhi add karo
    if (!browsingHistory.includes(productId)) {
      setBrowsingHistory(prevHistory => [...prevHistory, productId]);
    }
  };

  const handleGetRecommendations = async (userText) => {
    setIsLoading(true);
    setRecommendations(null); 

    // 3. History ko bhi API call me bhejein
    const userData = {
      preferences: userText,
      history: browsingHistory // Yahan history ka data bhejein
    };
    
    const recommendationsData = await getAiRecommendations(userData);
    setRecommendations(recommendationsData);
    setIsLoading(false);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>AI Product Recommendation Engine</h1>
      </header>
      <main className="main-content">
        <div className="layout-grid">
          <div className="left-panel">
            <UserPreferences
              onGetRecommendations={handleGetRecommendations}
              isLoading={isLoading}
            />
            {/* 4. History component ko yahan display karein */}
            <BrowsingHistory 
              history={browsingHistory}
              products={products}
            />
            <Recommendations
              recommendations={recommendations}
              products={products}
            />
          </div>
          <div className="right-panel">
            {/* 5. Click handler ko Catalog me pass karein */}
            <Catalog 
              products={products} 
              onProductClick={handleProductClick} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;