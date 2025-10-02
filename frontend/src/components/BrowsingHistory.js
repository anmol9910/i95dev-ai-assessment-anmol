import React from 'react';

// Ye component user ki browsing history dikhayega
function BrowsingHistory({ history, products }) {
  // Agar history khaali hai, to kuch mat dikhao
  if (!history || history.length === 0) {
    return null;
  }

  // History me jo product IDs hain, unke poore details products list se nikalo
  const historyProducts = history.map(productId => 
    products.find(p => p.id === productId)
  ).filter(Boolean); // Agar koi product na mile to use hata do

  return (
    <div className="history-container">
      <h2>Your Browsing History</h2>
      <div className="history-grid">
        {historyProducts.map(product => (
          <div key={product.id} className="history-item">
            <p className="history-item-name">{product.name}</p>
            <p className="history-item-brand">{product.brand}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrowsingHistory;
