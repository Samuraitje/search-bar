import APIService from './services/ApiService.jsx'
import SearchBar from './components/SearchBar/SearchBar';
import { useState } from 'react';

function App() {
  const [searchData, setSearchData] = useState([]);

  return (
    <div className='App'>
      <APIService responseData={setSearchData}/>
      <SearchBar data={searchData}/>
    </div>
  );
}

export default App;
