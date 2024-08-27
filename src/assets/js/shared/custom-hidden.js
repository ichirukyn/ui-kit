function hideBlock() {
  // Получить все блоки для скрытия, на странице
  const hideButtons = document.querySelectorAll('.hidden-button');
  // Получить все кнопки для скрытия, на странице
  const hideBlocks = document.querySelectorAll('.hidden-block');

  // Анонимная функция, которая будет отрабатывать при срабатывании события..
  const handler = (e) => {
    // Перебрать блоки
    hideBlocks.forEach((block) => {
      // Сравнить текущий блок и "id" кнопки
      if (block.getAttribute('data-hidden') === e.target.getAttribute('data-hidden')) {
        // Если ОК, то добавить/убрать класс .hidden
        block.classList.toggle('hidden');
      }
    });
  };

  // Всем кнопкам повесить событие при клике
  hideButtons.forEach((btn) => {
    btn.addEventListener('click', handler);
  });
}

// Инициализация функции, когда страница загрузится
document.addEventListener('DOMContentLoaded', () => {
  hideBlock();
});