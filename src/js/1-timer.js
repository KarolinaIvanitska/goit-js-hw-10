import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('input#datetime-picker');
const display = document.querySelector('.timer');
const startBtn = document.querySelector('[data-start]');

startBtn.addEventListener('click', onClick);

let userDate;

function onClick(e) {
  userDate = new Date(input.value).getTime();
  const intervalId = setInterval(() => {
    const currentDate = Date.now();
    const diff = userDate - currentDate;
    const { days, hours, minutes, seconds } = convertMs(diff);
    addLeadingZero(days, hours, minutes, seconds);
    if (diff <= 1000) {
      clearInterval(intervalId);
    }
  }, 1000);
}

function addLeadingZero(days, hours, minutes, seconds) {
  display.querySelector('[data-days]').textContent = String(days).padStart(
    2,
    '0'
  );
  display.querySelector('[data-hours]').textContent = String(hours).padStart(
    2,
    '0'
  );
  display.querySelector('[data-minutes]').textContent = String(
    minutes
  ).padStart(2, '0');
  display.querySelector('[data-seconds]').textContent = String(
    seconds
  ).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      return alert('Please choose a date in the future');
    }
    userSelectedDate = selectedDates[0];
    console.log(selectedDates[0]);
  },
};

flatpickr(input, options);
