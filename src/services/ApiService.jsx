import React, { useEffect } from 'react';
import axios from 'axios';

function ApiService({ responseData }) {
  /* This useEffect hook will call the fetchData function once after each render of the component to perform 
  an async callback that retrieves the data from the provided endpoint and sets the response to the parent
  state variable */
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/search");
      responseData(response.data);
    };
    fetchData();
  }, [responseData]);

  return (
    <div></div>
  )
}

export default ApiService