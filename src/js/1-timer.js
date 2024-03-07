import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('input#datetime-picker');
const display = document.querySelector('.timer');

input.addEventListener('input', onInput);

function onInput(e) {
  console.log(e.target);
}
