import { getRefs } from './getRefs';

const refs = getRefs();

//markup generation for 2-10 countries
function renderItemMarkup(result) {
  return result
    .map(
      ({ flags, name }) =>
        `<li style="list-style-type: none; display: flex; align-items: center;">        
            <img
            src="${flags.svg}"
            alt="${name.official}"
            width="25" 
            style="margin: 3px 0;"
            >            
            <span class="text-size" style="padding-left:10px;">${name.official}</span>
            </li>`
    )
    .join('');
}

function renderListMarkup(result) {
  refs.countryList.insertAdjacentHTML('beforeend', renderItemMarkup(result));
}

function renderInfoMarkup(result) {
  return result.map(
    ({
      capital,
      population,
      languages,
      timezones,
      borders,
      area,
      currencies,
      car,
      coatOfArms,
      maps,
    }) =>
      `<ul style="list-style-type: none;">
            <li><span style="font-weight: bold;">Capital: </span>${capital}</li>
            <li><span style="font-weight: bold;">Population: </span>${population}</li>
            <li><span style="font-weight: bold;">Languages: </span>${Object.values(
              languages
            )}</li>     
            <li><span style="font-weight: bold;">Timezones: </span>${timezones}</li>                                 
            <li><span style="font-weight: bold;">Borders: </span>${borders}</li>
            <li><span style="font-weight: bold;">Area: </span>${area}</li>              
            <li><span style="font-weight: bold;">Currencies: </span>${Object.values(
              Object.values(currencies)[0]
              )}
              </li>
            <li><span style="font-weight: bold;">Car(side): </span>${
              Object.values(car)[1]
              }</li>      
            <li><span style="font-weight: bold;">Coat of arms: </span><a href="${
              Object.values(coatOfArms)[0]
              }" target="_blank">National emblem</a></li>
            <li><span style="font-weight: bold;">Maps: </span><a href="${
              Object.values(maps)[0]
              }" target="_blank">Сountry map</a></li>
       </ul>`
  );
}

function renderCardMarkup(result) {
  renderListMarkup(result);
  refs.countryInfo.insertAdjacentHTML('beforeend', renderInfoMarkup(result));
  textSize = document.querySelector('.text-size');
  textSize.style.fontSize = '24pt';
  textSize.style.fontWeight = 'bold';
}

function clearMarkUp() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';  
}

export { renderListMarkup, renderCardMarkup, clearMarkUp };
