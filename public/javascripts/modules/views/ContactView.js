import BaseView from './BaseView.js'; 


class ContactView extends BaseView {
  constructor() {
    super()
    this._parent = this._getElement('#main'); 
    this._navbar = this._getElement('#contacts-navbar');
  }

  bindConfirmDeletion(handler) {
    const modal = this._getElement('.modal'); 
    modal.addEventListener('click', event => {
      event.preventDefault();
      const classList = event.target.classList; 
      const isCancelButton = classList.contains('no-button');
      const isOKButton = classList.contains('yes-button');

      if (isCancelButton) {
        handler(false)
      } else if (isOKButton) {
        handler(true);
      }
    }); 
  }

  bindDeleteContact(handler) {
    this._parent.addEventListener('click', event => {
      if (event.target.classList.contains('delete-contact')) {
        const contact = event.target.closest('.contact'); 
        const id = contact.dataset.id;
        handler(id); 
      } 
    }); 
  }


  bindAddContact(handler){
    this._app.addEventListener('click', event => {
      if (event.target.classList.contains('add-contact')) {
        event.preventDefault(); 
        handler(); 
      }
    });    
  }

  bindEditContact(handler) {
    this._app.addEventListener('click', event => {
      if (event.target.classList.contains('edit-contact')) {
        event.preventDefault(); 
        const parent = event.target.closest('.contact')
        const id = parent.dataset.id;
        handler(id);
      }
    });    
  }
  
  bindLoadContactsByTagName(handler) {
    this._app.addEventListener('click', event => {
      event.preventDefault();
      if(event.target.classList.contains('contact-tag')) {
        const tagName = event.target.textContent; 
        handler(tagName);
      }
    })
  }
}

export default ContactView;