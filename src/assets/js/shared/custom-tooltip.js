const TooltipContents = [
  { id: 'phone_tooltip', content: 'Подсказка!' },
];

TooltipContents.map(({ id, content }) => {
  let element = document.getElementById(id);
  if (!element) return;

  tippy(`#${id}`, {
    content: content,
    arrow: false,
    theme: 'light',
  });
});

const tooltips = document.querySelectorAll('.tooltip__wrapper');

tooltips.forEach((e) => {
  let text = e.querySelector('.tooltip__text')?.textContent?.trim() || '';
  let content = e.querySelector('.tooltip__content')?.innerHTML;

  let arrow = e.getAttribute('data-arrow');
  let trigger = e.getAttribute('data-trigger') || undefined;
  let placement = e.getAttribute('data-placement') || 'top';

  tippy(`#${e.id}`, {
    theme: 'light',
    content: content ? content : text,
    arrow: arrow ? Boolean(arrow) : false,
    trigger: trigger,
    placement: placement,
    allowHTML: true,
    interactive: true,
  });
});