document.addEventListener('DOMContentLoaded', function() {
  let circles = document.querySelectorAll('.circle-big');

  circles.forEach((circle) => {
    let start = parseFloat(circle.getAttribute('data-start'));
    let end = parseFloat(circle.getAttribute('data-end'));
    let progress = circle.querySelector('.progress');
    let progress_radius = parseInt(window.getComputedStyle(progress)?.r) || 0;

    const PI = 3.14;
    // Длина окружности
    let total = 2 * PI * progress_radius;

    let offset;

    // Проверка на проценты или пропорции
    if (start >= 0 && start <= 1 && end > 1) {
      offset = total * (1 - end / 100);
    } else {
      offset = total * (start / end);
    }

    progress.style.strokeDasharray = `${offset}, 450`;
  });
});