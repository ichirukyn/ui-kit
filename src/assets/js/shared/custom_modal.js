const openModal = (e) => {
  if (e.target.closest('#modal__open')) {
    const parent = e.target.closest('.modal__wrapper');
    parent.classList.add('modal__active');
  }
};

const closeModal = (e) => {
  if (e.target.matches('.modal__active') || e.target.matches('#modal__close')) {
    const parent = e.target.closest('.modal__wrapper');
    parent.classList.remove('modal__active');
  }
};

document.addEventListener('load', () => {
  document.addEventListener('click', closeModal);
  document.addEventListener('click', openModal);
});
