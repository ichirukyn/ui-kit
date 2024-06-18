const initSidebar = () => {
  const sidebar = document.querySelector('.menu');
  const sidebarOverlay = document.querySelector('.overlay');
  const sidebarOpenClassName = '.header__menu';

  const menuHandler = (e) => {
    const isSidebarTrigger =
      e.target.matches(sidebarOpenClassName) || e.target.closest(sidebarOpenClassName) || e.target.querySelector(sidebarOpenClassName);

    if (isSidebarTrigger) {
      sidebar.classList.remove('hidden');
      sidebarOverlay.classList.remove('hidden');
    } else if (e.target === sidebarOverlay) {
      sidebar.classList.add('hidden');
      sidebarOverlay.classList.add('hidden');
    }
  };

  document.removeEventListener('click', menuHandler);
  document.addEventListener('click', menuHandler);
};

initSidebar();
