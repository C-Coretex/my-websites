import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';

import './scss/main.css'
import { Card } from './components/card.js'
import Filter from './components/filter.js'
import { Header } from './components/header.js'
import { Search } from './components/search.js'



const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function getRegions(countries) {
  let regions = Object.entries(countries).map(countries => countries[1].region);

  // Get rid from duplicates
  regions = [...new Set(regions)];
  regions = regions.filter(region => region !== '')

  //Remove unused regions
  const index = regions.indexOf('Polar');
  if (index !== -1)
    regions.splice(index, 1);

  return regions;
}

export default function App() {

  const [currentRegion, setCurRegion] = useState('all')
  const [countries, setCountries] = useState('');
  const [regions, setRegions] = useState('');
  const uniqueKey = useRef(0);
  const searchText = useRef('')
  const [countriesFiltered, setFilteredCountries] = useState('');

  //Default functions
  const uniqueKeyGenerator = () => {
    return uniqueKey.current = uniqueKey.current + 1;
  }

  function filter(name) {
    setFilteredCountries(countries.filter((country) => {
      return country.name.toLowerCase().includes(name.toLowerCase())
    }))
  }


  const handleRegionChange = (region) => {
    if (region !== '')
      setCurRegion(`region/${region}`)
    else
      setCurRegion('all')
  }

  const handleSearchClick = (name) => {
    searchText.current = name;
    filter(searchText.current)
  }

  useEffect(() => {
    if (!currentRegion.includes('region/'))
      setRegions(getRegions(countriesFiltered))
  }, [countriesFiltered])

  useEffect(() => {
    (async () => {
      const response = await axios(`https://restcountries.eu/rest/v2/${currentRegion}?fields=flag;name;population;region;capital`)
      const data = await response.data
      
      if(searchText.current === '')
        setFilteredCountries(data)
    })()
  }, [currentRegion])

  //On load
  useEffect(() => {
    (async () => {
      const response = await axios(`https://restcountries.eu/rest/v2/${currentRegion}?fields=flag;name;population;region;capital`)
      const data = await response.data

      setRegions(getRegions(data))
      setFilteredCountries(data)
      setCountries(data)
    })()
  }, [])


  return (
    <div className="container">
      <header>
        <Header />
      </header>
      <main>
        <div className="filter_bar">
          <Search handleSearchClick={handleSearchClick} />
          <Filter uniqueKeyGenerator={uniqueKeyGenerator} regions={regions} handleRegionChange={handleRegionChange} />
        </div>
        <div className="card_flex">
          {Object.entries(countriesFiltered).map(curCountry => <Card key={uniqueKeyGenerator()} country={curCountry[1]} />)}
        </div>
      </main>
    </div>
  )
}