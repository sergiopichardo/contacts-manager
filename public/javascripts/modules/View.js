import TagsView from './views/TagsView.js'; 
import MainView from './views/MainView.js';
import BaseView from './views/BaseView.js';
import SearchView from './views/SearchView.js';
import ContactView from './views/ContactView.js'; 
import ModalView from './views/ModalView.js'; 
import FormView from './views/FormView.js'


export default class View extends BaseView {
  constructor() {
    super();
    this._renderInitialPage(); 
    this.search = new SearchView(); 
    this.pageTags = new TagsView(); 
    this.main = new MainView();
    this.contact = new ContactView(); 
    this.modalWindow = new ModalView();
    this.form = new FormView();
  }

  _renderInitialPage() {
    const html = this._compileHTML('#initial-page');
    this._clear()
    this._insertHTML(this._app, html); 
  }


 
}
