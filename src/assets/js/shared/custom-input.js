const initUploadFiles = () => {
  const inputs = document.querySelectorAll('.input_file');

  inputs.forEach((input) => {
    const label = input.parentElement.querySelector('label');
    const labelValue = label.innerHTML;

    input.addEventListener('change', function (e) {
      const clearButton = e.target.parentElement.querySelector('.clear');
      console.log(e.target.value);
      let fileName = '';

      if (this.files && this.files.length > 1) {
        fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
      } else fileName = e.target.value.split('\\').pop();

      if (fileName) {
        label.querySelector('span').innerHTML = fileName;
        clearButton.classList.remove('hidden');
        console.log(clearButton.classList.contains('hidden'));
      } else {
        console.log('fileName', fileName);
        clearButton.classList.add('hidden');
        label.innerHTML = labelValue;
      }

      const clearButtonHandler = (e) => {
        e.preventDefault();

        console.log(input.value);
        input.value = '';
        input.dispatchEvent(new Event('change'));
      };

      clearButton.removeEventListener('click', clearButtonHandler);
      clearButton.addEventListener('click', clearButtonHandler);
    });

    input.addEventListener('focus', () => input.classList.add('has-focus'));
    input.addEventListener('blur', () => input.classList.remove('has-focus'));
  });
};

const initSecretInputs = () => {
  const secretToggleButtons = document.querySelectorAll('.password');
  const secretToggleHandler = (e) => {
    const target = e.target;
    const parent = target.parentNode;
    const input = parent.querySelector('input');

    if (input.getAttribute('type') === 'password') {
      target.classList.add('view');
      input.setAttribute('type', 'text');
    } else {
      target.classList.remove('view');
      input.setAttribute('type', 'password');
    }
  };

  secretToggleButtons.forEach((button) => {
    button.removeEventListener('click', secretToggleHandler);
    button.addEventListener('click', secretToggleHandler);
  });
};

initUploadFiles();
initSecretInputs();
