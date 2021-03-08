import "./App.css";
import axios from "axios";
import { URL_GET_USER } from "./services/Url";
import { useState, useCallback, useEffect } from "react";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import Banner from './components/Banner';

function App() {

  const [user, setUser] = useState({});
  const fetchData = useCallback(async () => {
    try {
      const result = await axios.get(`${URL_GET_USER}`);
      console.log(result)
      setUser(result.data);
    } catch (err) {
      // setRequestError(err.message);
    }
  });


  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='App'>
      <Navbar user={user}/>
      <Banner />
      <Products user={user} setUser={setUser}/>
    </div>
  );
}

export default App;
