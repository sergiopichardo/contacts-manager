import BaseView from './BaseView.js';
import { MODAL_TEMPLATE } from '../config/constants.js';

const { 
  CONFIRM_DELETE, 
  ADD_CONTACT, 
  EDIT_CONTACT 
} = MODAL_TEMPLATE; 

class ModalView extends BaseView {
  _selectorsMap = {
    CONFIRM_DELETE: '#confirm-modal-template',
    CONTACT_FORM: '#contact-form-template'
  }

  constructor() {
    super();
    this._parent = this._getElement('#modal-wrapper');
    this._bindCloseModal();
  }

  _hasValidCssClass(event, cssClasses) {
    return cssClasses.some(cssClass => {
      return event.target.classList.contains(cssClass)
    })
  }

  _bindCloseModal() {
    this._parent.addEventListener('click', event => {
      const validClasses = [
        'delete', 
        'no-button', 
        'modal-background'
      ];

      if (this._hasValidCssClass(event, validClasses)) {
        this.close(); 
      }
    })
  }

  load(templateName, context) {
    let selector = null; 

    console.log('context', context)

    switch(templateName) {
      case CONFIRM_DELETE: 
        context = {
          ...context,
          title: "Delete Contact",
          message: `Are you sure you want to delete "${context.name}"?`
        }
        selector = this._selectorsMap[templateName]
        break; 
      case ADD_CONTACT:
        context = {
          ...context, 
          title: "Add contact"
        }
        selector = this._selectorsMap.CONTACT_FORM;
        break;
      case EDIT_CONTACT:
        context = {
          ...context, 
          title: "Edit contact"
        }
        selector = this._selectorsMap.CONTACT_FORM;
        break;
    }

    const html = this._compileHTML(selector, context);
    this._parent.innerHTML = '';
    this._insertHTML(this._parent, html);
    this.open();
  }

  open() {
    this._modal = this._parent.querySelector('.modal')
    this._modal.classList.add('is-active')
  }
  
  close() {
    this._modal = this._parent.querySelector('.modal')
    this._modal.classList.remove('is-active');
  }
}

export default ModalView; 
