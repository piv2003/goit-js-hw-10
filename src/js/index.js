import '../css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { getRefs } from '../js/getRefs.js';
import { fetchCountries } from '../js/fetchCountries.js';
import {
  renderListMarkup,
  renderCardMarkup,
  clearMarkUp,
} from '../js/renderMarkup.js';

//the delay value of the request to the server
const DEBOUNCE_DELAY = 300;
const refs = getRefs();
//set the listener on the input field
refs.searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  //trimming insignificant spaces | "name"- part of the country name that the user enters
  let name = evt.target.value.trim(); //text input event in "input" field
  //if the "input" field is empty => clear the markup
  if (name === '') {
    clearMarkUp();
  } else {    
    fetchCountries(name)//request to the server for the currently entered part of the country name
    .then(fetchCheck)  //processing the received promise, if everything is "good"
    .catch(fetchError);//processing the received promise if everything is "bad"    
  }

  function fetchCheck(result) {
    if (result.length > 10) {//if more than 10 countries are found for the query
      Notify.info('Too many matches found. Please enter a more specific name.');
      clearMarkUp();
    } else if (result.length === 1) {
      clearMarkUp();
      renderCardMarkup(result);//if only one country found => own markup & filters
    } else {
      clearMarkUp();
      renderListMarkup(result);//if from 2 to 10 countries found =>country flag & country name
    }
  }

  function fetchError(error) {//processing the received promise if everything is "bad" (Catch)          
//     clearMarkUp();
    Notify.warning(`❌ Oops, something is wrong..`);
  }
}
