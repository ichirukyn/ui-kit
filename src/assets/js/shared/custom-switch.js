document.addEventListener('DOMContentLoaded', () => {
  const switchList = document.querySelectorAll('.switch');

  switchList?.forEach((switch_) => {
    switch_.addEventListener('click', (e) => {
      if (e.target.classList.contains('disabled')) return;

      const input = e.target.querySelector('input');

      if (e.target.classList.contains('active')) {
        e.target.classList.remove('active');
        input.checked = false;

        return;
      } else {
        e.target.classList.add('active');
        input.checked = true;
      }

      if (input.type !== 'radio') return;

      switchList.forEach((item) => {
        if (item === switch_) return;

        const itemInput = item.querySelector('input');

        if (itemInput?.name === input?.name) {
          itemInput.checked = false;
          item.classList.remove('active');
        }
      });

    });
  });
});
