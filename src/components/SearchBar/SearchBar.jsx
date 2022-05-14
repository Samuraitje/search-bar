import React, { useState } from 'react';
import searchIcon from '../../assets/images/magnifying_glass.svg';
import cancelIcon from '../../assets/images/cancel.svg';
import './SearchBar.css';

function SearchBar({ data }) {
   const [filteredData, setFilteredData] = useState([]);
   const [userInput, setUserInput] = useState("");
   const [onFocus, setOnFocus] = useState(false);

   /*    Handles the search query from onChange events 
      Uses the searchFilter method to retrieve the filtered data
      Sets filteredData state variable when search query is equal or longer than 2 characters
      When the search query is shorter or equal to 1 character, sets an empty array to the state variable */
   const handleFilter = (event) => {
      const searchQuery = event.target.value;
      setUserInput(searchQuery);
      const searchResult = searchFilter(searchQuery);
      if (searchQuery.length >= 2) {
         setFilteredData(searchResult);
      } else if (searchQuery.length <= 1) {
         setFilteredData([]);
      }
   }

   /*    Filters the data dynamically according to the user's search input
      Lower case the data and search query to avoid mismatches */
   const searchFilter = (searchQuery) => {
      return data.suggestions.filter(value => value.searchterm.toLowerCase().includes(searchQuery.toLowerCase()))
   }

   /*    Empties the filtered data and user input state variables
      Focus on the search input field after cancel button click */
   const clearInput = () => {
      setFilteredData([]);
      setUserInput("");
      document.querySelector(".searchField").focus();
   }

   /*    Allows the user to only enter alphabetic characters and spaces in the search input */
   const handleInputValidation = (event) => {
      const regex = /[A-Za-z ]/;
      if (!regex.test(event.key)) {
         event.preventDefault();
      }
   }

   return (
      <div data-testid="searchBar" className="container">
         <form data-testid="form" action="/search" className="searchForm" method="GET">
            <input
               data-testid="input"
               className={`searchField ${onFocus ? "searchField-focus" : ""}`}
               type="text"
               placeholder="Zoeken"
               autoComplete="off"
               value={userInput}
               onChange={handleFilter}
               aria-required="true"
               onFocus={() => setOnFocus(true)}
               onBlur={() => setOnFocus(false)}
               onKeyDown={handleInputValidation}
            />
            <input data-testid="input-submit" type="submit" hidden disabled={!userInput} />

            {/* Cancel buttons appears after 1 user input*/}
            {userInput.length > 0 &&
               <button data-testid="cancelButton" className="cancelButton" onClick={clearInput}>
                  <img className="cancelIcon" alt="cancel-icon" src={cancelIcon} />
               </button>
            }
            <button data-testid="searchButton" className="searchButton" type="submit" disabled={!userInput}>
               <img className="searchIcon" alt="search-icon" src={searchIcon} />
            </button>
         </form>

         {/*Search dropdown appears when there is at least 1 valid search result and maps the filtered data in a list*/}
         {filteredData.length !== 0 &&
            <div data-testid="searchResult" className="searchResult">
               {filteredData.map((value, index) => (
                  <li key={index} className="searchItem"><strong>{value.searchterm}</strong> ({value.nrResults})</li>
               ))}
            </div>
         }
      </div>
   )
}

export default SearchBar;