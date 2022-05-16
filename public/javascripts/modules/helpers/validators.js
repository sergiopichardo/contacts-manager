const validateName = element => {
  return !element.value
         || element.value.length < 3 
         || element.value.length >= 24;
}

const validateEmail = element => {
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !regex.test(element.value); 
}

const validatePhone = element => {
  let regex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/; 
  return !regex.test(element.value);

}; 


const validateTag = element => {
  const tagSize = element.value.length; 
  return (tagSize > 0 && tagSize < 3 ) || 
         (element.value.length > 24);
}

export const inputValidators = [
  validateName, 
  validateEmail, 
  validatePhone, 
  validateTag
]; 