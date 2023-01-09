export function getRefs() {
  //getting refers to the <input>, <ul>, <div>
  return {
    searchBox: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
  };
}