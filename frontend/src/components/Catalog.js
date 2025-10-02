import React from 'react';

// 'onProductClick' naam ka ek naya prop receive karein
function Catalog({ products, onProductClick }) {
  return (
    <div className="catalog-container">
      <h2>Product Catalog</h2>
      <div className="product-grid">
        {products.map(product => (
          // Har card par ek onClick event lagayein
          <div 
            key={product.id} 
            className="product-card" 
            onClick={() => onProductClick(product.id)}
          >
            <h3 className="product-name">{product.name}</h3>
            <p className="product-brand">{product.brand}</p>
            <p className="product-price">${product.price}</p>
            <p className="product-desc">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalog;