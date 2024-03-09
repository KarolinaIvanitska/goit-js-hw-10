import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const delay = +e.currentTarget.elements.delay.value;
  const radioBtn = e.currentTarget.elements.state.value;

  createPromise(radioBtn, delay)
    .then(res => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });

  e.currentTarget.reset();
}

function createPromise(btn, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (btn === 'fulfilled') {
        resolve({ delay });
      } else {
        reject({ delay });
      }
    }, delay);
  });
}
