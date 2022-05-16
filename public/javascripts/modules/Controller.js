import { MODAL_TEMPLATE } from './config/constants.js';
import * as model from './Model.js'; 
import View from './View.js';

const { 
  CONFIRM_DELETE, 
  ADD_CONTACT, 
  EDIT_CONTACT
} = MODAL_TEMPLATE;

export default class Controller {
  constructor() {
    this.model = model; 
    this.view = new View(); 

    // bind events 
    this.view.search.bindSearchEvent(this.handleQuerySearch);
    this.view.contact.bindDeleteContact(this.handleDeleteContact);
    this.view.contact.bindAddContact(this.handleAddContact);    
    this.view.contact.bindEditContact(this.handleEditContact);    
    this.view.contact.bindLoadContactsByTagName(this.handleShowContactsByTagName);
    this.loadInitialData(); 
  }


  handleQuerySearch = async (query) => {
    try {
      // load contacts
      await this.model.getContacts(query);
      const foundContacts = this.model.state.search.contacts;
      
      // load and render tags
      await this.model.getAllTags(); 
      this.view.pageTags.render(model.state.tags);
      
      // render main view 
      this.view.main.render(query, foundContacts); 
      
    } catch (err) {
      // log and render error 
      console.error(err);
      this.view.main.renderError(); 
    }
  }

  
  handleDeleteContact = async (id) => {
    try {

      // console.log(`Delete contact with id ${id}`); 
      // PSEUDOCODE 
      await this.model.getContact(id); 
      const contact = this.model.state.contact; 

      // load confirm modal 
      const context = { name: contact.name };
      this.view.modalWindow.load(CONFIRM_DELETE, context); 

      this.view.contact.bindConfirmDeletion(async (isConfirmed) => {
        if (isConfirmed) {
          // delete contact 
          await this.model.deleteContact(id); 
  
          // get current query 
          const query = this.view.search.getQuery(); 

          // load main view contacts 
          await this.model.getContacts(query)
          const newContacts = this.model.state.search.contacts; 

          // re-render contacts 
          this.view.main.render(query, newContacts)
        } 

        this.view.modalWindow.close(); 
      }); 
      
    } catch (err) {
      console.error(err);       
      // TODO: Add custom error message
      // this.view.contact.renderError('deleteContactError'); 
    }
  }

  handleAddContact = async () => {
    try {
      // load tags 
      await this.model.getAllTags(); 
      const tags = this.model.state.tags; 
      
      // load load add modal
      const context = { tags }
      this.view.modalWindow.load(ADD_CONTACT, context);
      this.view.form.bindCheckboxChanged();
      
      
      this.view.form.bindErrors(); 
      this.view.form.bindFormSubmission(async (contact) => {
        if (contact) {
          // add contact to database 
          await this.model.createContact(contact);

          // fetch page tags 
          await this.model.getAllTags(); 
          const tags = this.model.state.tags; 

          // render page tags 
          this.view.pageTags.render(tags)

          // fetch new contacts with contact.name 
          const query = contact.name;
          await this.model.getContacts(query);
          const contacts = this.model.state.search.contacts; 

          // render new contacts through main window 
          this.view.main.render(query, contacts);
        }

        // close modal window 
        this.view.modalWindow.close();
      });

    } catch (err) {
      console.error(err);
      // TODO: something bad occurred
    }
  }

  handleEditContact = async (id) => {
    try {
      // load tags 
      await this.model.getAllTags(); 
      const tags = this.model.state.tags; 

      // fetch contact by id 
      await this.model.getContact(id); 
      const contact = this.model.state.contact; 

      // load load add modal
      const context = { ...contact, tags };
      this.view.modalWindow.load(EDIT_CONTACT, context);

      // bind form errors b/c we need the modal to be loaded first
      // bind form submission b/c we need a contact to submit
      this.view.form.bindErrors(); 
      this.view.form.bindFormSubmission(async (contact) => {
        if (contact) {
          contact.id = id; 
          console.log('CONTACT:', contact)
          // add contact to database 
          await this.model.updateContact(contact);

          // fetch page tags 
          await this.model.getAllTags(); 
          const tags = this.model.state.tags; 

          // render page tags 
          this.view.pageTags.render(tags)

          // fetch new contacts with contact.name 
          const query = contact.name;
          await this.model.getContacts(query);
          const contacts = this.model.state.search.contacts; 

          // render new contacts through main window 
          this.view.main.render(query, contacts);
        }

        // close modal window 
        this.view.modalWindow.close();
      });
    } catch (err) {
      console.error(err);
      // TODO: Render error 
    }
  }

  handleShowContactsByTagName = async (tagName) => {
    try {
      await this.model.getAllTags(); 
      const tags = this.model.state.tags; 

      // render page tags 
      this.view.pageTags.render(tags)

      // fetch contact 
      await this.model.getContactsByTagName(tagName); 
      const contacts = this.model.state.search.contacts; 

      this.view.main.render(tagName, contacts);
      
    } catch (err) {
      console.error(err);
      // TODO: render contact
    }
  }


  handleShowContactDetails = async () => {}




  loadInitialData = async () => {
    try {
      // render teags
      await this.model.getAllTags(); 
      const tags = this.model.state.tags; 
      this.view.pageTags.render(tags)

    } catch (err) {
      console.error(err)
    }
  }
}











