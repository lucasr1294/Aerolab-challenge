import "../App.css";
import axios from "axios";
import { URL_GET_PRODUCTS, URL_POST_POINTS } from "../services/Url";
import { useState, useEffect } from "react";
import shopImg from "../assets/icons/buy-blue.svg";
import shopImgWhite from "../assets/icons/buy-white.svg"
import Pagination from "../components/Pagination";
import SortBy from "./products/SortBy";
import coin from '../assets/icons/coin.svg'

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDQyODM2OTdlNzE4NzAwMjBlMzhmNDMiLCJpYXQiOjE2MTQ5NzE3NTN9.r2C18Y7_ykN0tCQUmedRro0ZObQOsX4Q1BBgzD238BM";

axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function Products({ user, setUser }) {
  const [products, setProducts] = useState([]);
  const [originalPage, setOriginalPage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(16);
  const [getPoints, setGetPoints] = useState()
  const [requestError] = useState();
  
  const fetchData = async () => {
    setLoading(true);
    const response = await axios.get(`${URL_GET_PRODUCTS}`);
    setProducts(response.data);
    setLoading(false);
  };

  const redeemPoints = async (product, user) => {
    if ((product.cost - user.points) <= 1000){
      const res = await axios.post(`${URL_POST_POINTS}`, {amount: 1000});
      setUser({
        ...user,
        points: res.data['New Points']
      })
    }
  }



  useEffect(() => {
    fetchData();
  }, []);

  // 

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstPorduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstPorduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const purchase = (product) => {
    if (product.cost < user.points) {
      setUser({ ...user, points: user.points - product.cost });
    } else {
      return alert(
        `you need ${
          product.cost - user.points
        } more points to claim this product`
      );
    }
  };

  return (
    <div>
      <SortBy
        currentProducts={currentProducts}
        products={products}
        setProducts={setProducts}
      />
      <div className="container">
        <div className="products-container">
          {products.map((product) => {
            if (product.cost < user.points) {
              return (
                <div className="product-box-overlap-og">
                  <div className="item1-og">
                    <img
                        onClick={() => purchase(product)}
                        className="shop-img"
                        src={shopImg}
                      />
                      <div className='hide'>
                        <p className="cost">{product.cost}</p>
                        <img className='coin' src={coin}></img>
                      </div>
                      <div className="redeem-hide">
                        <h2 onClick={() => purchase(product)}>Redeem now!</h2>
                      </div>
                      <div className="buy-img-hide">
                        <h4 ></h4>
                      </div>   
                  </div>
                  <div className="item2-og">
                    <img src={product.img.url} />
                    <hr></hr>
                    <p>{product.category}</p>
                    <h4>{product.name}</h4>
                  </div>
                </div>
                
              );
            } else {
              return (
                <div className="product-box-overlap">
                  <div className="item1">
                    <p>{`This product costs ${product.cost}`}</p>
                    <h5>{`You need ${product.cost - user.points}`}<img src={coin}/></h5>
                    <h6 onClick={() => redeemPoints(product, user)}>Get more points!</h6>
                  </div>
                  <div className="item2">
                    <img src={product.img.url} />
                    <hr></hr>
                    <p>{product.category}</p>
                    <h4>{product.name}</h4>
                  </div>
                </div>
              );
            }
          })}
          {requestError && <p className="error">{requestError}</p>}
        </div>
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={products.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default Products;
