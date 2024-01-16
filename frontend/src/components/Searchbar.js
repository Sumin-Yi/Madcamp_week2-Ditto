import React, { useState } from 'react';
import './Searchbar.css';

const SearchBar = ({fun : onSelect, data : data}) => {
  const [search, setSearch] = useState('');
  const [filterCities, setFilterCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  const onChange = (e) => {
    const searchText = e.target.value;
    setSearch(searchText);

    const filteredCities = data.filter((city) => {
      return city.includes(searchText.trim());
    });

    setFilterCities(filteredCities);
  };

  const handleCityClick = (city) => {
    setSelectedCity(city);
    onSelect(city);
  }

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="검색하세요."
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
