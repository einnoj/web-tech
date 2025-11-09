import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// I used the  module 6 stackblitz example as a starting point
const Population = () => {
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    async function fetchCountryData() {
      try {
        const url =
          'https://restcountries.com/v3.1/subregion/South%20America?fields=name,population';
        const response = await axios.get(url);
        let countries = [];
        if (Array.isArray(response.data)) {
          countries = response.data;
        }

        const countryPopulationData = countries.map(function (country) {
          var population = 0;
          if (country && typeof country.population === 'number') {
            population = country.population;
          }

          var name = 'N/A';
          if (country && country.name && country.name.common) {
            name = country.name.common;
          }

          return { name: name, population: population };
        });

        setCountryData(countryPopulationData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCountryData();
  }, []);

  const data = {
    labels: countryData.map(function (c) {
      return c.name;
    }),
    datasets: [
      {
        label: 'Population',
        data: countryData.map(function (c) {
          return c.population;
        }),
        backgroundColor: '#2F6FB3',
        borderColor: '#1E88E5',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Population per Country in South America' },
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        title: { display: true, text: 'Countries' },
        ticks: { autoSkip: true, maxRotation: 0 },
      },
      // could not figure out how to make the tick steps even
      // skips from 150M to 225M
      // wanted to change Y_MAX to 225M to make it easier to see
      y: {
        beginAtZero: true,
        //max: 225000000,
        title: { display: true, text: 'Population' },
      },
    },
  };

  //Used the template in the module 6 stackblitz example
  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <h1>Population Data</h1>
          <br />
          <Bar data={data} options={options} />
        </>
      )}
    </div>
  );
};

export default Population;
