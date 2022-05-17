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

  handleAddContact = async () => {
    try {
      // load tags 
      await this.model.getAllTags(); 
      const tags = this.model.state.tags; 
      
      // load load add modal
      const context = { tags }
      this.view.modalWindow.load(ADD_CONTACT, context);

      // bind listners
      this.view.form.bindErrors(); 
      this.view.form.bindCheckboxChanged();
      this.view.form.bindFormSubmission(async (contact) => {
        // create element 
        await this.model.createContact(contact)
        
        // store newly created contact and get name 
        const newContact = this.model.state.contact; 
        const query = newContact.name; 

        // fetch all contacts with that contact 
        await this.model.getContacts(query); 
        const contacts = this.model.state.contacts; 

        // render page view 
        this.view.main.render(query, contacts); 
        this.view.modalWindow.close(); 
      });
    } catch (err) {
      console.error("An error occurred while adding your contact.");
    }
  }

  handleEditContact = async (id) => {
    try {
      // load tags 
      await this.model.getAllTags(); 
      const tags = this.model.state.tags; 

      // get contact 
      await this.model.getContact(id)
      const contact = this.model.state.contact; 
      
      // load load add modal
      const context = { ...contact, tags }
      this.view.modalWindow.load(EDIT_CONTACT, context);

      // bind listners
      this.view.form.bindErrors(); 
      this.view.form.bindCheckboxChanged();
      this.view.form.bindFormSubmission(async (contact) => {
        // create element 
        contact.id = id; 
        console.log('bindFormSubmission()', contact);
        await this.model.updateContact(contact)
        
        // store newly created contact and get name 
        const updatedContact = this.model.state.contact; 
        const query = updatedContact.name; 

        // fetch all contacts with that contact 
        await this.model.getContacts(query); 
        const contacts = this.model.state.contacts; 

        // render page view 
        this.view.main.render(query, contacts); 
        this.view.modalWindow.close(); 
      });

    } catch (err) {
      console.error("An error occurred while updating your contact.");
    }
  }

  handleDeleteContact = async (id) => {
    try {
      await this.model.getContact(id); 
      const contact = this.model.state.contact; 

      // load confirm modal 
      const context = { name: contact.name };
      this.view.modalWindow.load(CONFIRM_DELETE, context); 

      this.view.contact.bindConfirmDeletion(async (isConfirmed) => {
        if (isConfirmed) {
          // load contact
          await this.model.getContact(id); 
          const contact = this.model.state.contact; 

          // delete contact 
          await this.model.deleteContact(id); 
  
          // get current query 
          const query = contact.name;

          // load main view contacts 
          await this.model.getContacts(query)
          const newContacts = this.model.state.contacts; 

          // re-render contacts 
          this.view.main.render(query, newContacts)
        } 

        this.view.modalWindow.close(); 
      }); 
      
    } catch (err) {
      console.error("An error occurred while deleting your contact.");       
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
      const contacts = this.model.state.contacts; 

      this.view.main.render(tagName, contacts);
      
    } catch (err) {
      console.error("An error occurred while showing contacts by tag name.");
    }
  }

  handleQuerySearch = async (query) => {
    try {
      // load contacts
      await this.model.getContacts(query);
      const foundContacts = this.model.state.contacts;
      
      // load and render tags
      await this.model.getAllTags(); 
      this.view.pageTags.render(model.state.tags);
      
      // render main view 
      this.view.main.render(query, foundContacts); 
      
    } catch (err) {
      // log and render error 
      console.error("An error occurred while searching for a contact.");
      this.view.main.renderError(); 
    }
  }

  loadInitialData = async () => {
    try {
      // render teags
      await this.model.getAllTags(); 
      const tags = this.model.state.tags; 
      this.view.pageTags.render(tags)

    } catch (err) {
      console.error("An error occurred while adding the initial page data.");
    }
  }
}











