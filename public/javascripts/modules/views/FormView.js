import BaseView from './BaseView.js'; 
import { inputValidators } from '../helpers/validators.js'; 


class FormView extends BaseView {
  constructor() {
    super(); 
  }

  _bindInputChanged(e, isInvalid) {
    const inputElement = e.target; 
    const parent = inputElement.closest('.field');
    const errorElement = parent.querySelector('p.error');

    if (isInvalid(inputElement)) {
      inputElement.classList.remove('is-primary'); 
      errorElement.classList.remove('is-hidden');
      inputElement.classList.add('is-danger'); 
    } else {
      errorElement.classList.add('is-hidden');
      inputElement.classList.add('is-primary'); 
      inputElement.classList.remove('is-danger'); 
    }
  }

  _getAllInputElements() {
    const selector = 'input.contact-info'; 
    return [...this._getAllElements(selector)];
  }

  bindErrors() {
    const submitButton = this._getElement('.submit-button'); 
    let elements = this._getAllInputElements();

    let validityBalance = 3; 
    elements.forEach(element => {
      const isEmpty = element.value.length === 0; 
      if (element.classList.contains('custom-tag')) {
        element.classList.add('is-primary');
      } else {
        if (element.classList.contains('name-input')) {
          element.focus();
        } 
        
        if (!isEmpty) {
          element.classList.add('is-primary'); 
          validityBalance -= 1; 
        }
      }
    }); 

    if (validityBalance === 0) {
      submitButton.removeAttribute('disabled'); 
    }

    elements.forEach((element, index) => {
      element.addEventListener('input', (event) => {
        this._bindInputChanged(event, inputValidators[index]);
        
        elements = this._getAllInputElements();
        const allIsValid = elements.every(element => {
          return element.classList.contains('is-primary'); 
        });
    
        if (allIsValid) {
          submitButton.removeAttribute('disabled'); 
        } else {
          submitButton.setAttribute('disabled', ""); 
        }
      });
    });
  }

  bindFormSubmission = (handler) => {
    const form = this._getElement('#contact-form');

    form.addEventListener('click', event => {
      event.preventDefault();
      if (event.target.classList.contains('submit-button')) {
        const data = this._getFormData(form);
        handler(data);
      }
    });

    form.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    });
  }


  bindCheckboxChanged = () => {
    const form = this._getElement('#contact-form');
    form.addEventListener('click', (event) => {
      if (event.target.getAttribute('type') === 'checkbox') {
        const checkbox = event.target; 
        const span = checkbox.parentElement;

        // create new checkbox 
        const newCheckbox = this._createElement('input');
        newCheckbox.type = 'checkbox'; 
        newCheckbox.value = checkbox.value; 
        newCheckbox.name = checkbox.name;
        
        // if the checkbox is checked change the 
        if (!checkbox.hasAttribute('checked')) {
          newCheckbox.setAttribute('checked', "");
        } else {
          newCheckbox.removeAttribute('checked');
        }

        // insert new checkbox
        span.removeChild(checkbox);
        span.insertAdjacentElement("afterbegin", newCheckbox);
      }
    });
  }

  _getFormData = (form) => { 
    const elements = [...form.elements];

    const checkboxes = elements.filter(element => {
      return (element.className === 'checkbox' && element.hasAttribute('checked')) || (element.name === 'customTag' && element.value.length > 0);
    }).map(checkbox => checkbox.value);

    const inputs = elements.reduce((result, element) => {
      if (element.classList.contains('contact-info') && element.name !== 'customTag') {
        result[element.name] = element.value; 
      }
      return result; 
    }, {})
    
    return { ...inputs, tags: checkboxes };
  }

}

export default FormView; 
