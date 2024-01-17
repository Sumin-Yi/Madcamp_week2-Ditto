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
    <div className="content">
  <div className="search_field">
    <form style={{ display: 'flex', maxWidth: '1000px' }}>
      <input
        type="text"
        placeholder="검색하세요"
        value={search}
        onChange={onChange}
        style={{
          padding: '0.5rem',
          margin: '10px',
          marginLeft: '20px',
          borderRadius: '0.7rem',
          border: 'none',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(0, 0, 0, 0.2)',
          width: '100%',
          height: '40px',
          fontSize: '18px'
        }}
      />
      <button className="small-button">Search</button>
    </form>
  </div>
  {search && (
    <div className="city-list-container" style={{ height: '400px', overflowY: 'scroll' }}>
      {filterCities.map((city, index) => (
        <div
          key={index}
          onClick={() => handleCityClick(city)}
          className={`city-item ${city === selectedCity ? 'selected' : ''}`}
          style={{
            display: 'flex',
            height: '15%',
            width: 'calc(100% - 30px)',
            borderRadius: '10px',
            textAlign: 'left',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
            marginBottom: '20px',
            margin: '10px'
          }}
        >
          <h1 className = "small-primary-heading" style = {{margin: '10px', flex: '1'}}>{city}</h1>
        </div>
      ))}
    </div>
  )}
</div>
  );
};

export default SearchBar;
