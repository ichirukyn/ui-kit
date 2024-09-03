document.addEventListener('DOMContentLoaded', () => {
  const modals = document.querySelectorAll('[data-modal]');

  modals.forEach(modal => {
    if (modal.classList.contains('modal')) return;

    modal.addEventListener('click', (e) => {
      const attr = e.target.getAttribute('data-modal');

      document.querySelectorAll(`.modal[data-modal="${attr}"]`)
        .forEach((elem) => elem.classList.toggle('modal_active'));
    });
  });
});