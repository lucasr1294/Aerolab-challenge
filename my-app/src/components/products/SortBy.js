import { render } from "@testing-library/react";
import React from "react";
import { useState } from 'react'
import "../../../src/App.css";

const SortBy = ({ currentProducts, products, setProducts }) => {

    const [lowestClicked, setLowestClicked] = useState()
    const [highestClicked, sethighestClicked] = useState()

    const lowestPrice = () => {
        let sortedProducts = products.sort((a, b) => {
            return a.cost - b.cost
        })
        setProducts([...sortedProducts])
        sethighestClicked('sort-item-clickable')
        setLowestClicked('sort-item-clicked')
    }

    const highestPrice = () => {
        let sortedProducts = products.sort((a, b) => {
            return b.cost - a.cost
        })
        setProducts([...sortedProducts])
        setLowestClicked('sort-item-clickable')
        sethighestClicked('sort-item-clicked')
    }

      return (
        <div className="sort-container">
          <div className="product-qty">
            {currentProducts.length} of {products.length} products 
          </div>
          <div className="sort-item">Sort by:</div>
          <p className="sort-item-clickable">Most Recent</p>
          <p className={lowestClicked} onClick={lowestPrice}>Lowest price</p>
          <p className={highestClicked} onClick={highestPrice}>Highest price</p>
        </div>
      );
};

export default SortBy;
