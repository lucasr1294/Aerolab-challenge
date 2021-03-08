import "../App.css";
import axios from "axios";
import { URL_GET_USER, URL_GET_PRODUCTS } from "../services/Url";
import { useState, useCallback, useEffect } from "react";
import image from '../assets/logoAeroLab.svg'
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

const Navbar = ({user}) => {
  
  return (
      <div className='nav-container'>
          <img className='logo' src={image} />
          <div className='nav-info'>
            <p><strong>{user?.name}</strong></p>
            <p>{user?.points}</p>
            <img src={coin}/>
          </div>
      </div>
  )
}

export default Navbar;
