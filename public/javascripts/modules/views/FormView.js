import BaseView from './BaseView.js'; 
import { inputValidators } from '../helpers/validators.js'; 


class FormView extends BaseView {

  _bindInputChanged = (e, validation) => {
    const inputElement = e.target; 
    const parent = inputElement.closest('.field');
    const errorElement = parent.querySelector('p.error');

    if (validation(inputElement)) {
      inputElement.classList.remove('is-primary'); 
      errorElement.classList.remove('is-hidden');
      inputElement.classList.add('is-danger'); 
    } else {
      errorElement.classList.add('is-hidden');
      inputElement.classList.add('is-primary'); 
      inputElement.classList.remove('is-danger'); 
    }
  }

  bindErrors = () => {
    const selector = 'input.contact-info'; 
    let elements = [...this._getAllElements(selector)]; 
    const submitButton = this._getElement('.submit-button'); 


    elements.forEach((element, index) => {
      element.addEventListener('input', (event) => {
        this._bindInputChanged(event, inputValidators[index])
        
        const updatedElements = [...this._getAllElements(selector)];
        const isEverythingValid = updatedElements.every(element => {
          return element.classList.contains('is-primary'); 
        });
    
        if (isEverythingValid) {
          submitButton.removeAttribute('disabled'); 
        } else {
          submitButton.setAttribute('disabled', ""); 
        }
      });
    });
  }

  bindFormSubmission = (handler) => {
    const form = this._getElement('#contact-form'); 

    form.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    })

    form.addEventListener('submit', event => {
      event.preventDefault();
      // this._bindCheckboxChanged(); 
      const data = this._getFormData(form);

      // console.log('Form data:', new FormData(form));
      handler(data)
    });
  }

  // TODO: this doesn' work for some reason 
  // I binded it in the `handleAddContact` method in the controller
  bindCheckboxChanged = () => {
    const form = this._getElement('#contact-form');
    form.addEventListener('change', (event) => {}); 
  }

  _getFormData = (form) => { 
    const elements = [...form.elements];
    let dataStructure = { tags: [] };
    
    return elements.reduce((data, element) => {
      if (element.classList.contains('input')) {
        if (element.name === 'customTag') {
          data.tags.push(element.value)
        } else {
          data[element.name] = element.value; 
        }
      } else if (element.classList.contains('checkbox')) {
        if (element.checked) {
          data.tags.push(element.value); 
        }
      }
      return data; 
    }, dataStructure);
  }

}

export default FormView; 
