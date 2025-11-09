import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

// I used the module 6 StackBlitz example as a starting point
const Custom = () => {
  const [langData, setLangData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    async function fetchLanguageData() {
      try {
        // Only South America with the fields we need
        const url =
          'https://restcountries.com/v3.1/subregion/South%20America?fields=name,languages,population';
        const response = await axios.get(url);
        const countries = Array.isArray(response.data) ? response.data : [];

        // Sum population by language name
        var totals = {};
        countries.forEach(function (country) {
          var pop = 0;
          if (country && typeof country.population === 'number') {
            pop = country.population;
          }
          var langs =
            country && country.languages
              ? Object.values(country.languages)
              : [];
          langs.forEach(function (langName) {
            if (!totals[langName]) totals[langName] = 0;
            totals[langName] += pop;
          });
        });

        // Top 6 languages by summed population
        // Used Google AI overview when I searched to display only top 6 stats
        var entries = Object.entries(totals)
          .sort(function (a, b) {
            return b[1] - a[1];
          })
          .slice(0, 6); // given by Google AI overview

        // Store as [{ name, population }]
        var result = entries.map(function (item) {
          return { name: item[0], population: item[1] };
        });

        setLangData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLangData([]); // keep it simple if it fails
      } finally {
        setLoading(false);
      }
    }

    fetchLanguageData();
  }, []);

  // Chart.js data object
  const data = {
    labels: langData.map(function (x) {
      return x.name;
    }),
    datasets: [
      {
        label: 'Population by language',
        data: langData.map(function (x) {
          return x.population;
        }),
        // simple colors; you can remove these and let Chart.js pick defaults
        backgroundColor: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'],
        borderWidth: 1,
      },
    ],
  };

  // Chart.js options object
  const options = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Most Spoken Languages (South America)' },
      legend: { position: 'bottom' },
      tooltip: { enabled: true },
    },
  };

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <h1>Language Distribution</h1>
          <br />
          <Pie data={data} options={options} />
        </>
      )}
    </div>
  );
};

export default Custom;
