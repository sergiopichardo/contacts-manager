export const BASE_URI = '/api/contacts';

export const httpMethod = {
  GET: 'GET', 
  PUT: 'PUT', 
  DELETE: 'DELETE', 
  POST: 'POST'
}

export const httpStatusCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400, 
}

export const TIMEOUT_SECONDS = 1; 

export const MODAL_TEMPLATE = {
  CONFIRM_DELETE: 'CONFIRM_DELETE', 
  ADD_CONTACT: 'ADD_CONTACT',
  EDIT_CONTACT: 'EDIT_CONTACT',
}