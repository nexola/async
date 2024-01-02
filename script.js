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

  countriesContainer.style.opacity = 1;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

// const getCountryAndNeighbour = function (country) {
//   // Ajax call 1
//   const request1 = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

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

const getJson = function (url, errorMsg = 'Algo deu errado') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMsg} ${response.status}`);
    }

    return response.json();
  });
};

const getCountryData = function (country) {
  countriesContainer.innerHTML = '';

  getJson(
    `https://restcountries.com/v3.1/name/${country}`,
    'País não encontrado'
  )
    .then(dados => {
      renderCountry(dados[0]);
      const neighbour = dados[0].borders?.[0];

      if (!neighbour) throw new Error(`Nenhum país vizinho encontrado`);

      // País vizinho
      return getJson(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'País não encontrado'
      );
    })
    .then(dados2 => renderCountry(dados2[0], 'neighbour'))
    .catch(err => renderError(`Algo deu errado 😢 ${err}`))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// const getCountryData = function (country) {
//   countriesContainer.innerHTML = '';

//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok) {
//         throw new Error(`País não encontrado ${response.status}`);
//       }

//       return response.json();
//     })
//     .then(dados => {
//       renderCountry(dados[0]);
//       const neighbour = dados[0].borders?.[0];

//       if (!neighbour) return;

//       // País vizinho
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response2 => response2.json())
//     .then(dados2 => renderCountry(dados2[0], 'neighbour'))
//     .catch(err => renderError(`Algo deu errado 😢 ${err}`))
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const paises = [
  'usa',
  'brasil',
  'argentina',
  'france',
  'italy',
  'russia',
  'japan',
  'niger',
];
let contador = 0;

btn.addEventListener('click', function (e) {
  getCountryData(paises[contador]);
  contador++;
  if (contador > 7) {
    contador = 0;
  }
});

// Code challenge
// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Localização não encontrada! ${response.status}`);
//       console.log(response);

//       return response.json();
//     })
//     .then(dados => {
//       if (!dados.ok)
//         throw new Error(`Requisição lenta, localização não carregada`);

//       console.log(`Você está em ${dados.state}, ${dados.country}`);

//       getCountryData(dados.country);
//     })
//     .catch(err => console.log(`Algo deu errado! ${err}`));
// };

// whereAmI(-23.5360726, -46.3833998);
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

//////////////////////////////////////////
// Microtasks e callback queue
// console.log('Test start');

// setTimeout(() => {
//   console.log('0 sec timer');
// }, 0);

// Promise.resolve('Resolved promise 1').then(res => console.log(res));

// Promise.resolve('Resolved promise 2').then(res => {
//   for (let index = 0; index < 10; index++) {
//     console.log(res);
//   }
// });

// console.log('Test end');

///////////////////////////////////////////

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lotter draw is happening 🔮');

//   setTimeout(() => {
//     Math.random() >= 0.5
//       ? resolve('You WIN 🤑')
//       : reject(new Error('You LOSE 😢'));
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

// Promosifying setTimeout
const wait = seconds => {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

// wait(1)
//   .then(() => {
//     console.log('Esperei por 1 segundo');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('Esperei por 2 segundos');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('Esperei por 3 segundos');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('Esperei por 4 segundos');
//   });

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject('abc').catch(x => console.console.error()(x));

/////////////////////////////////////////

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;

//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Localização não encontrada! ${response.status}`);
//       console.log(response);

//       return response.json();
//     })
//     .then(dados => {
//       if (!dados.ok)
//         throw new Error(`Requisição lenta, localização não carregada`);

//       console.log(`Você está em ${dados.state}, ${dados.country}`);

//       getCountryData(dados.country);
//     })
//     .catch(err => console.log(`Algo deu errado! ${err}`));
// };

// btn.addEventListener('click', whereAmI);

// Code challenge

// const imgContainer = document.querySelector('.images');
// let img;

// const createImg = function (imgPath) {
//   return new Promise((resolve, reject) => {
//     const imgEl = document.createElement('img');
//     imgEl.src = imgPath;

//     imgEl.addEventListener('load', () => {
//       imgContainer.append(imgEl);

//       resolve(imgEl);
//     });

//     imgEl.addEventListener('error', () =>
//       reject(new Error(`Imagem não encontrada`))
//     );
//   });
// };

// createImg('./img/img-1.jpg')
//   .then(res => {
//     img = res;
//     console.log(img);

//     return wait(2);
//   })
//   .then(() => {
//     img.style.display = 'none';
//     return createImg('./img/img-2.jpg');
//   })
//   .then(res2 => {
//     img = res2;
//     return wait(2);
//   })
//   .then(() => (img.style.display = 'none'))
//   .catch(err => console.error(err));

const getPosition = () => {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
};

// Async / Await
const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat}, ${lng}?geoit=json`);

    if (!resGeo.ok) throw new Error('Problema com a geolocalização');

    const geoJson = await resGeo.json();

    // Country data
    const resCountry = await fetch(
      `https://restcountries.com/v3.1/name/${geoJson.country}`
    );

    if (!resCountry.ok) throw new Error('Problema tentando encontrar o país');

    const [countryJson] = await resCountry.json();
    renderCountry(countryJson);

    return `Você está em ${geoJson.city}, ${geoJson.country}`;
  } catch (err) {
    console.error(err);
    renderError(`😢 ${err.message}`);
    throw err;
  }
};

console.log('1: Will get location');

// const city = whereAmI();
// console.log(city);

// whereAmI()
//   .then(res => console.log(`2: ${res}`))
//   .catch(err => console.error(`2: ${err.message}`))
//   .finally(() => console.log('3: Finished getting location'));

(async function () {
  try {
    const res = await whereAmI();
    console.log(`2: ${res}`);
  } catch (err) {
    console.error(`2: ${err.message}`);
  } finally {
    console.log('3: Finished getting location');
  }
})();

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJson(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJson(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJson(`https://restcountries.com/v3.1/name/${c3}`);

    const data = await Promise.all([
      getJson(`https://restcountries.com/v3.1/name/${c1}`),
      getJson(`https://restcountries.com/v3.1/name/${c2}`),
      getJson(`https://restcountries.com/v3.1/name/${c3}`),
    ]);

    console.log(data.map(d => d[0].capital));

    // console.log([data1.capital, data2.capital, data3.capital]);
  } catch (err) {
    console.error(err.message);
  }
};

get3Countries('portugal', 'spain', 'usa');
