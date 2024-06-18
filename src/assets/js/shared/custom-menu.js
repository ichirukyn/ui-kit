const initMenu = () => {
  let isOpen = false;
  const menu = document.querySelector('.action_menu');

  const menuHandler = (e) => {
    if ((e.target.matches('.action_menu__open') || e.target.closest('.action_menu__open')) && !isOpen) {
      menu.classList.add('action_menu__active');
      isOpen = !isOpen;
    } else {
      menu?.classList.remove('action_menu__active');
      isOpen = !isOpen;
    }
  };

  document.removeEventListener('click', menuHandler);
  document.addEventListener('click', menuHandler);
};

initMenu();
