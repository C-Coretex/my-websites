import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';

import './scss/main.css'
import { Card } from './components/card.js'
import Filter from './components/filter.js'
import { Header } from './components/header.js'
import { Search } from './components/search.js'

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

  const [currentRegion, setRegion] = useState('all')
  const [countries, setCountries] = useState('');
  const [regions, setRegions] = useState('');
  const uniqueKey = useRef(0);

  //Default functions
  const uniqueKeyGenerator = () => {
    return uniqueKey.current = uniqueKey.current + 1;
  }

  const handleRegionChange = (region) => {
    if (region !== '')
      setRegion(`region/${region}`)
    else
      setRegion('all')
  }

  //On load
  useEffect(() => {
    (async () => {
      const response = await axios(`https://restcountries.eu/rest/v2/${currentRegion}?fields=flag;name;population;region;capital`)
      const data = await response.data

      if (currentRegion === 'all')
        setRegions(getRegions(data))

      setCountries(data)
    })()
  }, [currentRegion])


  return (
    <div className="container">
      <header>
        <Header />
      </header>
      <main>
        <div className="filter_bar">
          <Search />
          <Filter uniqueKeyGenerator={uniqueKeyGenerator} regions={regions} handleRegionChange={handleRegionChange} />
        </div>
        <div className="card_flex">
          {Object.entries(countries).map(curCountry => <Card key={uniqueKeyGenerator()} country={curCountry[1]} />)}
        </div>
      </main>
    </div>
  )
}