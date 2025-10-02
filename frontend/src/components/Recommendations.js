import React from 'react';

function Recommendations({ recommendations, products }) {
  // Ye function product ID se poore product ki details dhoondhta hai
  const getProductDetails = (productId) => {
    return products.find(p => p.id === productId);
  };

  // Agar abhi tak koi recommendation nahi hai, to kuch na dikhayein
  if (!recommendations) {
    return null;
  }

  // Agar API se error aaya hai, to error message dikhayein
  if (recommendations.error) {
     return <div className="recommendations-container error-message"><p>Maaf kijiye, kuch gadbad ho gayi: {recommendations.error}</p></div>;
  }
  
  // Agar recommendation array khali hai, to message dikhayein
  if (recommendations.length === 0) {
    return <div className="recommendations-container"><p>Abhi tak koi recommendation nahi hai. Apni pasand batayein!</p></div>;
  }

  return (
    <div className="recommendations-container">
      <h2>✨ Aapke Liye AI-Powered Recommendations</h2>
      <div className="recommendations-grid">
        {recommendations.map((rec, index) => {
          const product = getProductDetails(rec.product_id);
          // Agar kisi wajah se product na mile, to use chhod dein
          if (!product) {
            return null;
          }
          return (
            <div key={index} className="recommendation-card">
              {/* Product ki details dikhayein */}
              <div className="product-card">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-brand">{product.brand}</p>
                <p className="product-price">${product.price}</p>
              </div>
              {/* AI ka reason dikhayein ki ye product kyun aacha hai */}
              <div className="recommendation-reason">
                <p><strong>Ye aapke liye kyun aacha hai:</strong> {rec.reason}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Recommendations;
