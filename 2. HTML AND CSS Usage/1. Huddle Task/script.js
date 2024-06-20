const input = document.querySelector('#input');
const errorMessage = document.querySelector('#error-message');

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

input.addEventListener('input', () => {
  if (!validateEmail(input.value)) {
    input.classList.add('input-error');
    errorMessage.style.display = 'block';
  } else {
    input.classList.remove('input-error');
    errorMessage.style.display = 'none';
  }
});