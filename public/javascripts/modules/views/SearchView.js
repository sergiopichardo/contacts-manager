import BaseView from './BaseView.js'; 

class SearchView extends BaseView {
  constructor() {
    super();
    this._searchInput = this._getElement('#search-input');
  }

  getQuery() {
    const query = this._searchInput.value; 
    return query; 
  }

  bindSearchEvent(handler) {
    this._searchInput.addEventListener('input', (event) => {
      handler(event.target.value); 
    })
  }

  clearSearchInput() {
    this._searchInput.value = ''; 
  }
}

export default SearchView; 