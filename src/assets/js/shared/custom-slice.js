const initSlice = (slice) => {
  const control = slice.querySelector('.slice__control');
  const beforeImage = slice.querySelector('.slice__image_before');
  const afterImage = slice.querySelector('.slice__image_after');

  let isDragging = false;
  let offset = parseInt(getComputedStyle(slice).getPropertyValue('--control-width') || 1);

  if (beforeImage.getAttribute('data-img')) {
    beforeImage.style.backgroundImage = `url(${beforeImage.getAttribute('data-img')})`;
  }
  if (afterImage.getAttribute('data-img')) {
    afterImage.style.backgroundImage = `url(${afterImage.getAttribute('data-img')})`;
  }

  const sliceMove = (e) => {
    if (!isDragging) return;

    let rect = slice.getBoundingClientRect();
    let position;
    let percentage;

    if (slice.classList.contains('slice_horizontal')) {
      let y = e.clientY - rect.top;
      position = Math.max(offset / 2, Math.min(y, rect.height - offset)); // Ограничение сверху и снизу
      percentage = (position / rect.height) * 100;
      afterImage.style.clipPath = `inset(${percentage}% 0 0 0)`;
      control.style.top = `${position}px`;
    } else {
      let x = e.clientX - rect.left;
      position = Math.max(offset / 2, Math.min(x, rect.width - offset)); // Ограничение слева и справа
      percentage = (position / rect.width) * 100;
      afterImage.style.clipPath = `inset(0 0 0 ${percentage}%)`;
      control.style.left = `${position}px`;
    }
  };

  control.addEventListener('mousedown', () => {
    isDragging = true;
    document.body.classList.add('no-select');
  });

  document.addEventListener('mousemove', (e) => sliceMove(e));

  document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.classList.remove('no-select');
  });

  control.addEventListener('touchstart', () => {
    isDragging = true;
    document.body.classList.add('no-select');
  });

  document.addEventListener('touchmove', (e) => sliceMove(e));

  document.addEventListener('touchend', () => {
    isDragging = false;
    document.body.classList.remove('no-select');
  });
};

document.addEventListener('DOMContentLoaded', function() {
  const slices = document.querySelectorAll('.slice');
  slices?.forEach((slice) => initSlice(slice));
});
