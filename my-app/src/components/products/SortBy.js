import React from "react";
import "../../../src/App.css";

const SortBy = ({ currentProducts, products, setProducts }) => {

    const lowestPrice = () => {
        let sortedProducts = products.sort((a, b) => {
            return a.cost - b.cost
        })
        setProducts([...sortedProducts])
    }

    const highestPrice = () => {
        let sortedProducts = products.sort((a, b) => {
            return b.cost - a.cost
        })
        setProducts([...sortedProducts])
    }

  return (
    <div className="sort-container">
      <p className="product-qty">
        {currentProducts.length} of {products.length} products
      </p>
      <p className="sort-item">Sort by:</p>
      <p className="sort-item-clickable" >Most Recent</p>
      <p className="sort-item-clickable" onClick={lowestPrice}>Lowest price</p>
      <p className="sort-item-clickable" onClick={highestPrice}>Highest price</p>
    </div>
  );
};

export default SortBy;
