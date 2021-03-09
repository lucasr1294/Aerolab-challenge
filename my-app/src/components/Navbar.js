import "../App.css";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import image from '../assets/logoAeroLab.svg';
import coin from '../assets/icons/coin.svg';

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDQ3ZDg4NTdlNzE4NzAwMjBlMzhmNGQiLCJpYXQiOjE2MTUzMjEyMjF9.7KCQnkgSGkACjXL9eJT0_MO6r7R7adCAby8gc1Id-KU";

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
            <img className="nav-coin" src={coin}/>
          </div>
      </div>
  )
}

export default Navbar;
