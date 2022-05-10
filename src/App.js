import SearchBar from './components/SearchBar/SearchBar';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [searchData, setSearchData] = useState([]);

  //This useEffect will call the fetchData function after each render to performs an async callback
  //to retrieve the data from the provided endpoint and sets this data in a state variable
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/search\?q\=trui");
      setSearchData(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className='App'>
      <SearchBar data={searchData} />
    </div>
  );
}

export default App;
