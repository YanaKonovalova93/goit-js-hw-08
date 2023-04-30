
import throttle from 'lodash.throttle';


const formEl = document.querySelector('.feedback-form');

const FORM_KEY = 'feedback-form-state';

let dataForm = {};

formEl.addEventListener('input', throttle(onFormInput, 500));

formEl.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  const { name, value } = event.target;
  dataForm[name] = value.trim();

  try {
    const stringifyEl = JSON.stringify(dataForm);

    localStorage.setItem(FORM_KEY, stringifyEl);
  } catch (error) {
    console.error(error);
  }
};

onDataLocalStor();

function onDataLocalStor() {
  const dataSave = localStorage.getItem(FORM_KEY);

  if (!dataSave) {
    return;
  }

  try {
    const dataParse = JSON.parse(dataSave);

    Object.entries(dataParse).forEach(([key, value]) => {
      formEl.elements[key].value = value;
    });
  } catch (error) {
    console.error(error);
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  console.log(dataForm);
  localStorage.removeItem(FORM_KEY);
  formEl.reset();
}

