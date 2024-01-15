import React, { useState } from 'react';
import Cities from '../lib/Cities';
import './Searchbar.css';

const SearchBar = ({onCitySelect}) => {
  const [search, setSearch] = useState('');
  const [filterCities, setFilterCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  const onChange = (e) => {
    const searchText = e.target.value;
    setSearch(searchText);

    const filteredCities = Cities.filter((city) => {
      return city.includes(searchText.trim());
    });

    setFilterCities(filteredCities);
  };

  const handleCityClick = (city) => {
    setSelectedCity(city);
    onCitySelect(city);
  }

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="지역을 검색하세요."
          value={search}
          onChange={onChange}
        />
        <button type="submit">Search</button>
      </form>
      {search && (
        <div>
          {filterCities.map((city, index) => (
            <div key={index}
                onClick = {() => handleCityClick(city)}
                className={`city-item ${city === selectedCity ? 'selected' : ''}`}
            >
              <span>{city}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
