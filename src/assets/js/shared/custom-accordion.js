const getAccordionPanel = (accordion, target = undefined) => {
  // Предпологаем, что панель это следующий элемент
  let panel = accordion.nextElementSibling;

  // Проверка что data-acc следующего элемента === data-acc аккордиона (при инициализации) или Таргету (при нажатии)
  const checkPanel = !target && (accordion.getAttribute('data-acc') === panel?.getAttribute('data-acc')) ||
    !!target && (target?.getAttribute('data-acc') === panel?.getAttribute('data-acc'));


  // Проверка что панелька, это панелька..
  if (!checkPanel) {

    // Ищем все подходящие панели внутри
    let panels = accordion.querySelectorAll('.accordion__panel');

    panels.forEach((item) => {

      // Ищем подходящую панель
      if (accordion.getAttribute('data-acc') === item.getAttribute('data-acc')) {
        // Если есть target панелька подходит
        if (target && item.getAttribute('data-acc') === target?.getAttribute('data-acc')) {
          return panel = item;
        }
        // Если нет target панелька подходит если совпадают атрибуты
        else if (!target && item.getAttribute('data-acc') === accordion?.getAttribute('data-acc')) {
          return panel = item;
        }
      }
    });

    if (!panels.length) return undefined;
  }

  return panel;
};

// Базовая скорость анимации (500px=0.5s, 1000px=0.65s)
const animationSpeed = 100000;

const initAccordions = () => {
  const accordions = document.querySelectorAll('.accordion');
  const accordionButtons = document.querySelectorAll('.accordion__open');
  const accordionOverlays = document.querySelectorAll('.accordion__overlay');

  // Инициализация
  accordions.forEach((accordion) => {
    const panel = getAccordionPanel(accordion);
    if (!panel) return;


    // Расчет времени анимации с использованием логарифмической функции
    const animationTime = Math.log(panel.scrollHeight) / Math.log(animationSpeed);
    panel.style.transition = `max-height ${animationTime}s ease-in-out !important`;

    if (panel.className.includes('active')) {
      panel.style.transition = 'none';
      console.log('panel_height', panel.scrollHeight);
      panel.style.maxHeight = panel.scrollHeight + 'px';
      panel.style.maxHeight = panel.scrollHeight + 'px';

    } else {
      if (panel.className.includes('fade')) panel.style.display = 'none';

      panel.style.maxHeight = null;
    }

  });

  const accordionButtonHandler = (e) => {
    accordions.forEach((accordion) => {
      e.stopPropagation();
      const panel = getAccordionPanel(accordion, e.target);

      if (!panel) return;

      let accordionOpen = accordion.querySelector('.accordion__open');

      if (accordion.className.includes('accordion__open')) {
        accordionOpen = accordion;
      }

      // Расчет времени анимации с использованием логарифмической функции
      const animationTime = Math.log(panel.scrollHeight) / Math.log(animationSpeed);
      panel.style.transition = `max-height ${animationTime}s ease-in-out !important`;


      if (panel.className.includes('active')) {
        if (panel.className.includes('fade')) {
          setTimeout(() => panel.style.display = 'none', 250);
        }

        accordionOpen.classList.remove('active');
        panel.classList.remove('active');
        panel.style.maxHeight = null;
      } else {
        if (panel.className.includes('fade')) {
          panel.style.display = 'flex';
        }

        accordionOpen.classList.add('active');
        panel.classList.add('active');
        const paddingBottom = Number(window.getComputedStyle(panel).paddingBottom.split('px')[0] || '0');
        panel.style.maxHeight = panel.scrollHeight + paddingBottom + 'px';
      }
    });
  };

  accordionButtons.forEach((button) => {
    button.removeEventListener('click', accordionButtonHandler);
    button.addEventListener('click', accordionButtonHandler);
  });

  accordionOverlays.forEach((button) => {
    button.removeEventListener('click', accordionButtonHandler);
    button.addEventListener('click', accordionButtonHandler);
  });
};

initAccordions();
