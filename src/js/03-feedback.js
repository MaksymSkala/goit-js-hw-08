import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageTextarea = feedbackForm.querySelector('textarea[name="message"]');

const storageKey = 'feedback-form-state';

const saveFormStateToStorage = throttle(() => {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  try {
    localStorage.setItem(storageKey, JSON.stringify(formData));
  } catch (error) {
    console.error('Error saving form state to localStorage:', error);
  }
}, 500);

emailInput.addEventListener('input', saveFormStateToStorage);
messageTextarea.addEventListener('input', saveFormStateToStorage);

const populateFormFieldsFromStorage = () => {
    try {
      const formData = JSON.parse(localStorage.getItem(storageKey));
      if (formData) {
        emailInput.value = formData.email || '';
        messageTextarea.value = formData.message || '';
      }
    } catch (error) {
      console.error('Error populating form fields from localStorage:', error);
    }
};  
  
  window.addEventListener('DOMContentLoaded', populateFormFieldsFromStorage);

  feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const formData = {
      email: emailInput.value,
      message: messageTextarea.value,
    };  
    
    localStorage.removeItem(storageKey);
    emailInput.value = '';
    messageTextarea.value = '';  
    
    console.log('Form data submitted:', formData);
}); 
