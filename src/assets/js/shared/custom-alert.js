let alertCloseButtons = document.querySelectorAll('.alert .alert__close');

alertCloseButtons.forEach((button) => {
  const parent = button.closest('.alert');

  button.addEventListener('click', (e) => parent.remove());
});