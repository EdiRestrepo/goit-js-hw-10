import './css/styles.css';

/**
 * Escriba la función fetchCountries(name) a cual hace una petición HTTP a ресурс name y devuelve promise
 * con el array de los países, el resultado de la consulta. Colóquelo en un archivo separado fetchCountries.js y haga una exportación con nombre.
 */
import { fetchCountries } from './fetchCountries';
/**
 * Debe aplicar un truco Debounce en el manejador de eventos y hacer una petición HTTP `300ms
 * después de que el usuario haya dejado de escribir. Use el paquete lodash.debounce.
 */
let debounce = require('lodash.debounce');
/**
 * Para las notificaciones use la biblioteca notiflix
 */
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const DEBOUNCE_DELAY = 300;
/**
 * Selector para el campo donde se va a introducior el nombre del país a buscar por el usuario
 */
const inputSearch = document.querySelector('#search-box');
/**
 * Selector para mostrar una lista de los países encontrados
 */
const countryList = document.querySelector('.country-list');
/**
 * Selector para mostrar una diseño de tarjeta con los datos del pais encontrado
 */
const countryInfo = document.querySelector('.country-info');


const searchCountry = debounce((event) =>{
  let country = event.target.value.trim();
  if(country!==""){
    console.log(fetchCountries(country));
    fetchCountries(country)
    .then((country)=>{
      renderListOrCard(country);
    })
    .catch((error)=>Notify.failure("Oops, there is no country with that name"))
  }
},DEBOUNCE_DELAY);


const renderListOrCard = (country) =>{
  countryInfo.innerHTML = '';
  countryList.innerHTML =  '';
  if(country.length>10){
    Notify.info("Too many matches found. Please enter a more specific name.");
  }
  if(country.length>=2 && country.length<=10){
    renderListCountry(country);
    console.log(country)
  }

  if(country.length<2){
    renderCardCountry(country);
  }

}

const renderListCountry = (country) =>{
    const markup = country
    .map(({name,flags})=>{
     return `<li>
     <img src="${flags.svg}" alt="Flag of ${name.official}" width = 30px height = 30px>
     <h3>${name.official}</h3>
     </li>`
    })
    .join("")
    countryList.insertAdjacentHTML("beforeend", markup);
  }

  const renderCardCountry = (country) =>{
    const markup = country
    .map(({name,capital,population,flags,languages})=>{
     return `
     <img src="${flags.svg}" alt="Flag of ${name.official}" width = 30px height = 30px>
     <h3>${name.official}</h3>
     <p>Capital: ${capital}</p>
     <p>Population: ${population}</p>
     <p>Languages: ${Object.values(languages)}</p>
     `
    })
    .join("")
    countryInfo.insertAdjacentHTML("beforeend", markup);
  }

/**
 * Captura el evento input para realizar la busqueda del pais/paises
 */
inputSearch.addEventListener('input',searchCountry);






