'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderCountry = function (dados, className = '') {
  const html = `
  <article class="country ${className}">
      <img class="country__img" src="${dados.flags.png}" />
      <div class="country__data">
          <h3 class="country__name">${dados.name.common}</h3>
          <h4 class="country__region">${dados.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +dados.population / 1000000
          ).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(dados.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.keys(dados.currencies)[0]
          }</p>
      </div>
  </article>
`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// XML -> JEITO ANTIGO
// const getCountryAndNeighbour = function (country) {
//   // Ajax call 1
// const request1 = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// request.send();

//   request.addEventListener('load', function (e) {
//     const [dados] = JSON.parse(this.responseText);
//     console.log(dados);

//     renderCountry(dados);

//     // Get neighbour country
//     const neighbour = dados.borders?.[0];

//     if (!neighbour) {
//       return;
//     }

//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const [dados2] = JSON.parse(this.responseText);
//       console.log(dados2);

//       renderCountry(dados2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbour('brasil');
// getCountryAndNeighbour('usa');

///////////////////////////////////////////////////
// FETCH API

const request = fetch(`https://restcountries.com/v3.1/name/portugal`);

console.log(request);

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(dados => renderCountry(dados[0]));
};

getCountryData('usa');
