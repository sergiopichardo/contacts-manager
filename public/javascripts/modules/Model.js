"use strict";

import http from './model/Http.js';
// TODO: import `Store` class (local storage)

export const state = {
  contact: {},
  favorites: [],
  tags: [],
  search: {
    query: '', 
    contacts: [],
    contactsCount: 34
  },
  pagination: {
    contactsPerPage: 10, 
    page: 1
  }
};

const _formatPhone = (phone) => {
  let result = "";
  result += phone.slice(0, 3) + '-';
  result += phone.slice(3, 6) + '-';
  result += phone.slice(6, 10);
  return result; 
}


// Helpers 
const _formatContact = contact => {
  if (!contact) return;
  
  return {
    id: contact.id, 
    email: contact.email, 
    name: contact.full_name,
    phone: _formatPhone(contact.phone_number),
    tags: contact.tags ? contact.tags.trim().split(',') : []
  }
}


const _formatSendOffContact = contact => {
  if (!contact) return; 

  return {
    full_name: contact.name,
    email: contact.email,
    phone_number: contact.phone.split('-').join(''),
    tags: contact.tags.join(','),
    ...(contact.id && { id: contact.id })
  }
}


// Business Logic 
export const getContacts = async (pattern=null) => {
  // throw new Error('Ooops, something terrible just happened!');
  try {
    let contactsList = await http.get();   
    contactsList = contactsList.map(_formatContact)
    
    if (pattern && pattern.length > 0) {
      contactsList = contactsList.filter(contact => {
        return contact.name.toLowerCase().includes(pattern.toLowerCase())
      })
    } 
    
    state.search.contacts = contactsList;
    state.search.contactsCount = state.search.contacts.length;
  } catch (err) {
    throw err; 
  }
}

export const getContactsByTagName = async (tagName) => {
  try {
    await getContacts(); 
    const contactsList = state.search.contacts.filter(contact => {
      if (contact.tags.length > 0) {
        return contact.tags.includes(tagName);
      }
    })

    state.search.contacts = contactsList;
    state.search.contactsCount = state.search.contacts.length;
  } catch (err) {
    throw err; 
  }
}


export const getContact = async id => {
  try {
    let contactObject = await http.get(id); 
    state.contact = _formatContact(contactObject);
  } catch (err) {
    throw err; 
  }
}


export const createContact = async contact => {
  try {
    const sendOffContact = _formatSendOffContact(contact);
    const data = await http.post(sendOffContact); 
    state.contact = _formatContact(data);
    state.search.contacts.unshift(state.contact);
  } catch (err) {
    throw err; 
  }
}


export const deleteContact = async id => {
  try {
    await http.delete(id); 
    
    if (state.search.contactsCount > 0) {
      state.search.contacts = state.search.contacts.filter(contact => {
        return contact.id !== id
      });
    } 

    state.contact = null; 
  } catch (err) {
    throw err;
  }
}


export const updateContact = async contact => {
  try {
    const sendOffContact = _formatSendOffContact(contact);
    let updatedContact = await http.put(sendOffContact);

    state.contact = _formatContact(updatedContact); 

    let index = state.search.contacts.findIndex(contact => {
      return contact.id === state.contact.id;
    }); 

    state.search.contacts.splice(index, 1, state.contact);

  } catch (err) {
    throw err; 
  }
}


export const getAllTags = async () => {
  await getContacts(); 
  let tags = state.search.contacts.flatMap(({ tags }) => tags);
  state.tags = [...new Set(tags)]; 
  // persists tags to the correct local storage e.g. Store.save('tags);
  // update state 
}


// TODO: implement local storage class 
// const initializeStores = () => {
//   const favorites = new Store('favorites');
// }


// TODO: Implement this when favoriting contact 
// persist favorites to correct local storage e.g. Store.save('contacts');
export const getFavoriteContacts = async () => {}


// TODO: Persist favorites when 
export const persistFavoriteContacts = async () => {}


(async () => {
  // 1) get all contacts
  // await getContacts()
  // console.log('contacts:', state.search.contacts);


  // await getContacts('vi')
  // console.log("contacts with 'vi'", state.search.contacts);

  // 2) get single contact
  // const contact = await getContact(1)
  // console.log('Contact By Id:', contact);
  // console.log(state); 

  // 3) get all tags 
  // await getAllTags(); 
  // console.log(state);

  
  // 4) delete a contact 
  // await deleteContact(100);
  // console.log('contacts after deleting:', state.contacts)
  // console.log('deleted contact:', state.contact)


  // 5) create a new contact 
  // console.log('creating new contact:'); 
  // const contact = {
  //   name: "Sergio Pichardo",
  //   email: "sergio@pichardo.com",
  //   phone: "12345678901",
  //   tags: ["work", "friend", "entrepreneur", "software engineer"]
  // }; 
  
  // await createContact(contact);
  // await createContact(contact);
  // console.log('\n\n\n')
  // console.log('New Contact:', state.contact);

  // 6) update a contact 
  // console.log('before updating a contact:', state.contacts, state.contactsCount)
  // console.log(state.contact)
  // const updatedContact = {
  //   id: 9,
  //   name: "Sergio J. Pichardo",
  //   email: "sergiojpichardo@email.com",
  //   phone: "12345678901",
  //   tags: ["friend", "entrepreneur", "software engineer"]
  // }; 
  
  // await updateContact(updatedContact)
  // console.log(state.contact)
  // console.log('after updating a contact:', state.contacts, state.contactsCount)
  

})();