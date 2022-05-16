import BaseView from './BaseView.js';

class TagsView extends BaseView {
  _templateName = '#page-tags-template'; 
  
  constructor() {
    super()
    // move this to `View` class 
    this._registerPartial("tagsPartial", '#tags-partial')
    this._parent = this._getElement('#page-tags').firstElementChild; 
  }

  render(data) {
    if (!Array.isArray(data) || !data) return; 
    
    const context = { tags: data }
    const html = this._compileHTML(this._templateName, context);
    this._clear()
    this._insertHTML(this._parent, html)
  }
  
}

export default TagsView; 