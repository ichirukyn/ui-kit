const initTableAdaptive = () => {
  const panels = document.querySelectorAll('.panel');
  const panelsHandler = () => {
    console.log(window.innerWidth);
    if (window.innerWidth >= 720) {
      panels.forEach((panel) => {
        const panelTd = panel.querySelector('td');
        panelTd.setAttribute('colspan', 3);
      });
    } else {
      panels.forEach((panel) => {
        const panelTd = panel.querySelector('td');
        panelTd.setAttribute('colspan', 1);
      });
    }
  };
  panelsHandler();

  window.removeEventListener('resize', panelsHandler);
  window.addEventListener('resize', panelsHandler);
};

initTableAdaptive();

const initTableSelectRow = () => {
  const tableSelectAllCheckbox = document.querySelector('thead input[type="checkbox"]');
  const tableCheckbox = document.querySelectorAll('.table__row input[type="checkbox"]');
  const activeClass = 'tr_active';

  const selectRowHandler = (e) => {
    const checkbox = e.target;
    const parent = checkbox.closest('.table__row');

    if (checkbox.checked) parent.classList.add(activeClass);
    else parent.classList.remove(activeClass);
  };

  const toggleRows = (checkbox) => {
    const parent = checkbox.closest('.table__row');

    if (checkbox.checked) parent.classList.add(activeClass);
    else parent.classList.remove(activeClass);
  };

  tableCheckbox.forEach((checkbox) => {
    checkbox.removeEventListener('click', selectRowHandler);
    checkbox.addEventListener('click', selectRowHandler);
  });

  tableSelectAllCheckbox.addEventListener('click', (e) => {
    tableCheckbox.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
      toggleRows(checkbox);
    });
  });
};

initTableSelectRow();
