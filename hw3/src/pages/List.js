import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function List() {
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url =
      'https://restcountries.com/v3.1/subregion/South%20America?fields=name,flags,population,languages';

    // used code sample from Ch 9 slides pg 14
    axios
      .get(url)
      .then((response) => {
        console.log('Request successful:', response);

        const data = response.data;

        const cleaned = data.map((country) => {
          // If the country has no name just display N/A
          let name = 'N/A';
          if (country && country.name && country.name.common) {
            name = country.name.common;
          }

          // If the country has no flag, leave it empty
          // otherwise grab the flag image from the data
          let flag = '';
          if (country && country.flags) {
            if (country.flags.png) {
              flag = country.flags.png;
            }
          }

          // Population will be 0 by default
          let population = 0;
          if (country && typeof country.population === 'number') {
            population = country.population;
          }

          // Display all languages
          // was trying to display most popular language but unsuccesful
          let languages = 'N/A';
          if (country && country.languages) {
            languages = Object.values(country.languages).join(', ');
          }

          return { name, flag, population, languages };
        });

        setCountryData(cleaned);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Request failed:', error);
        setCountryData([]);
        setLoading(false);
      });
  }, []);

  //Used the template in the module 6 stackblitz example
  // changed most lines to work on the countries API
  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <h1>South American Countries</h1>
          <ul>
            {countryData.map((country) => (
              <li key={country.name}>
                <strong>{country.name}</strong>
                <br />
                Population: {country.population.toLocaleString()}
                <br />
                Languages: {country.languages}
                <br />
                {country.flag && (
                  <img
                    src={country.flag}
                    alt={country.name + ' flag'}
                    width={200}
                  />
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
