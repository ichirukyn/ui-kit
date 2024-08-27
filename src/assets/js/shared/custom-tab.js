const initTabs = () => {
  const activeTabClass = 'tab_active';
  const tabs = document?.querySelectorAll('.tab');
  const tabsTitle = document?.querySelectorAll('.tab__title');

  tabsTitle?.forEach((tabTitle) => {
    tabTitle.addEventListener('click', (e) => {
      tabs.forEach((tab) => {
        if (tab.getAttribute('data-tab-title') === e.target.getAttribute('data-tab-title')) {
          tabs.forEach((item) => item.classList.remove(activeTabClass));
          tabsTitle.forEach((item) => item.classList.remove(activeTabClass));
          e.target.classList.add(activeTabClass);
          tab.classList.add(activeTabClass);
          window.location.hash = tab.getAttribute('data-tab-title');
        }
      });
    });

    const url = window.location?.hash.replace('#', '');
    if (url) {
      tabs.forEach((tab) => {
        if (tab.getAttribute('data-tab-title') === url) {
          tabs.forEach((item) =>
            item.getAttribute('data-tab-title') !== url ? item.classList.remove(activeTabClass) : item.classList.add(activeTabClass),
          );
          tabsTitle.forEach((item) =>
            item.getAttribute('data-tab-title') !== url ? item.classList.remove(activeTabClass) : item.classList.add(activeTabClass),
          );
        }
      });
    }
  });
};


document.addEventListener('DOMContentLoaded', () => {
  initTabs();
});