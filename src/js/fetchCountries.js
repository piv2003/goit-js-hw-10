import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { clearMarkUp } from './renderMarkup';
//link to main site
const BASE_URL = 'https://restcountries.com/v3.1/name/';
//generating a query filter by country
const filter =
  'fields = name, capital, population, flags, languages, timezones, borders, area, currencies, car, coatOfArms, maps';

export function fetchCountries(name) {
  //request to the site by URL and Filter
  return fetch(`${BASE_URL}${name}?${filter}`).then(response => {
    if (!response.ok) {
      //displaying a Message that by the entered Name => the Country was not found
      //generate an "error"
      throw new Error(
        clearMarkUp(),
        Notify.failure(`❌ Oops, there is no country with that name`),
        Notify.warning(`❌ Error ${response.status} - "${response.statusText}"`)        
      );
    }    
    return response.json();
  });
}
