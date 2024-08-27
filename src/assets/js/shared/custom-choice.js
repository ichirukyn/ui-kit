document.addEventListener('DOMContentLoaded', function() {
  const choiceList = document.querySelectorAll('.select');

  choiceList?.forEach((e) => {
    const search = !!e.getAttribute('data-search');
    const styleClass = e.getAttribute('data-style') || '';

    const element = new Choices(e, {
      searchEnabled: search,
      removeItems: true,
      removeItemButton: true,
      loadingText: 'Подождите...',
      noResultsText: 'Нет результатов',
      itemSelectText: 'Нажмите, чтобы выбрать',
      classNames: {
        containerOuter: `choices select ${styleClass}`,
      },
    });

    if (!!e.getAttribute('data-link')) {
      element.passedElement.element.addEventListener('change', (e) => {
        window.location.href = e.target.value;
      });
    }
  });
});