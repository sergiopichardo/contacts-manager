export default class BaseView {
  
  constructor() {
    this._parent = {}; 
    this._app = this._getElement('#app');
  }

  _clear() {
    this._parent.innerHTML = ''; 
  }  

  _getElement(selector) {
    if (selector) {
      return document.querySelector(selector);
    }
  }

  _getAllElements(selector) {
    if (selector) {
      return document.querySelectorAll(selector);
    }
  }

  _createElement(tag) {
    if (tag) {
      return document.createElement(tag);
    }
  }

  _getHTML(selector) {
    return this._getElement(selector).innerHTML; 
  }

  _compileHTML(selector, context=null) {
    const source = this._getHTML(selector); 
    const script = Handlebars.compile(source);
    return script(context); 
  }

  // Handlebars
  _insertHTML(parent, html, location="afterbegin") { 
    parent.insertAdjacentHTML(location, html); 
  }

  _registerPartial(name, selector) {
    if (!Handlebars.partials[name]) {
      const template = this._getHTML(selector)
      Handlebars.registerPartial(name, template); 
    }
  }

  renderSpinner() {}
}