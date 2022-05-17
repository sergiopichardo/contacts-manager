"use strict";

import http from './model/Http.js';

export const state = {
  contact: {},
  tags: [],
  contacts: [],
};

// Helpers 
const _formatContact = contact => {
  if (!contact) return;
  
  return {
    id: contact.id, 
    email: contact.email, 
    name: contact.full_name,
    phone: contact.phone_number,
    tags: contact.tags ? contact.tags.trim().split(',') : []
  }
}

const _formatPhone = (phone) => {
  let result = "";
  result += phone.slice(0, 3) + '-';
  result += phone.slice(3, 6) + '-';
  result += phone.slice(6, 10);
  return result; 
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
  try {
    let contactsList = await http.get();   
    contactsList = contactsList.map(_formatContact)
    
    if (pattern && pattern.length > 0) {
      contactsList = contactsList.filter(contact => {
        return contact.name.toLowerCase().includes(pattern.toLowerCase())
      })
    } 
    
    state.contacts = contactsList;
    state.contactsCount = state.contacts.length;
  } catch (err) {
    throw err; 
  }
}

export const getContactsByTagName = async (tagName) => {
  try {
    await getContacts(); 
    const contactsList = state.contacts.filter(contact => {
      if (contact.tags.length > 0) {
        return contact.tags.includes(tagName);
      }
    })

    state.contacts = contactsList;
    state.contactsCount = state.contacts.length;
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
    state.contacts.unshift(state.contact);
  } catch (err) {
    throw err; 
  }
}


export const deleteContact = async id => {
  try {
    await http.delete(id); 
    
    if (state.contacts.length > 0) {
      state.contacts = state.contacts.filter(contact => {
        return contact.id !== id
      });
    } 

    state.contact = null; 
    console.log(`Successfully deleted user with id ${id}`);
  } catch (err) {
    throw err;
  }
}


export const updateContact = async contact => {
  try {
    const sendOffContact = _formatSendOffContact(contact);
    let updatedContact = await http.put(sendOffContact);

    state.contact = _formatContact(updatedContact); 

    let index = state.contacts.findIndex(contact => {
      return contact.id === state.contact.id;
    }); 

    state.contacts.splice(index, 1, state.contact);

  } catch (err) {
    throw err; 
  }
}


export const getAllTags = async () => {
  await getContacts(); 
  let tags = state.contacts.flatMap(({ tags }) => tags);
  state.tags = [...new Set(tags)]; 
}


// TODO: implement local storage class 
// const initializeStores = () => {
//   const favorites = new Store('favorites');
// }

// TODO: Implement this when favoriting contact 
// persist favorites to correct local storage e.g. Store.save('contacts');
// export const getFavoriteContacts = async () => {}


// TODO: Persist favorites when 
// export const persistFavoriteContacts = async () => {}