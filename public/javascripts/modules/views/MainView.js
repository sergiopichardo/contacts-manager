import BaseView from './BaseView.js'; 

class MainView extends BaseView {
  
  #noContactsTemplate = '#no-contacts-template'; 
  #noContactsWithQueryTemplate = '#no-contacts-with-query-template'; 
  #contactsListTemplate = '#contacts-list-template'; 
  #errorTemplate = '#error-template'
  #errorMessage = "Something went wrong while fetching your contacts!"
  
  constructor() {
    super(); 
    this._parent = this._getElement('#main').firstElementChild;
  }

  render(query, data) {
    let mainHTML = null; 

    const haveData = data && data.length > 0;
    const haveQuery = query.length > 0; 
    let context = null; 

    if (haveData && haveQuery || query.toLowerCase() === null) {
      context = { contacts: data }
      mainHTML = this._compileHTML(this.#contactsListTemplate, context); 
    } else if (!haveData && haveQuery) {
      context = { query: query }; 
      mainHTML = this._compileHTML(this.#noContactsWithQueryTemplate, context);
    } else {
      mainHTML = this._compileHTML(this.#noContactsTemplate, context);
    }

    this._clear(); 
    this._insertHTML(this._parent, mainHTML); 
  }

  renderError() {
    const context = { errorMessage: this.#errorMessage };
    const errorHTML = this._compileHTML(this.#errorTemplate, context); 
    this._clear(); 
    this._insertHTML(this._parent, errorHTML)
  }
}

export default MainView; 