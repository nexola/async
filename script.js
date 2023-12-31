'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  let dados;

  request.addEventListener('load', function (e) {
    [dados] = JSON.parse(this.responseText);
    console.log(dados);

    const html = `
    <article class="country">
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

    console.log(html);

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('brasil');
getCountryData('france');
getCountryData('argentina');
