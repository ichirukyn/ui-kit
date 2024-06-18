const selects = document.querySelectorAll('.form-control');

selects.forEach((i)=> {
  document.addEventListener('DOMContentLoaded', function() {
    new Choices(i, {
      allowHTML: true,
      searchEnabled: false,
      itemSelectText: '',
    });
  });
})