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
  regions = regions.filter(region => region!=='')
  
  //Remove unused regions
  const index = regions.indexOf('Polar');
  if(index !== -1)
    regions.splice(index, 1);
  
  return regions;
}

export default function App() {

  const [countries, setCountry] = useState('');
  const uniqueKey = useRef(0);

  const uniqueKeyGenerator = () => {
    return uniqueKey.current = uniqueKey.current + 1;
  }

  useEffect(() => {
    (async () => {
      const response = await axios("https://restcountries.eu/rest/v2/all")
      const data = await response.data

      setCountry(data)
      // console.log(data)
    })()
  }, [])

  return (
    <div className="container">
      <header>
        <Header />
      </header>
      <main>
        <div className="filter_bar">
          <Search />
          {countries ? <Filter uniqueKeyGenerator={uniqueKeyGenerator} regions={getRegions(countries)} /> : <Filter regions={''}/>}
        </div>
        <div className="card_flex">
          {Object.entries(countries).map(value => <Card key={uniqueKeyGenerator()} />)}
        </div>
      </main>
    </div>
  )
}