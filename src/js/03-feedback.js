import throttle from 'lodash.throttle'; // Імпорт бібліотеки lodash.throttle

const feedbackForm = document.querySelector('.feedback-form'); // Знаходимо форму
const emailInput = feedbackForm.querySelector('input[name="email"]'); // Знаходимо поле Email
const messageTextarea = feedbackForm.querySelector('textarea[name="message"]'); // Знаходимо поле Message

const storageKey = 'feedback-form-state'; // Ключ для сховища

// Функція для збереження даних у локальному сховищі
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
}, 500); // Оновлювати не частіше ніж раз на 500 мілісекунд

// Відстеження події input на полях форми
emailInput.addEventListener('input', saveFormStateToStorage);
messageTextarea.addEventListener('input', saveFormStateToStorage);

// Функція для заповнення полів форми даними з локального сховища
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
  
  // Заповнення полів форми при завантаженні сторінки
  window.addEventListener('DOMContentLoaded', populateFormFieldsFromStorage);

  feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const formData = {
      email: emailInput.value,
      message: messageTextarea.value,
    };
  
    // Очищення сховища та полів форми
    localStorage.removeItem(storageKey);
    emailInput.value = '';
    messageTextarea.value = '';
  
    // Виведення даних у консоль
    console.log('Form data submitted:', formData);
  }); 
