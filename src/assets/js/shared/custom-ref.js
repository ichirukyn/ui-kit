const initElement = (triggerClass, parentClass, refClass, deleteCallback) => {
  const triggers = document?.querySelectorAll(triggerClass);

  const init = (e) => {
    const parent = e.target.closest(parentClass);
    const refItems = parent.querySelectorAll(refClass);
    const newItem = refItems[refItems.length - 1].cloneNode(true);
    const addButton = newItem?.querySelector(triggerClass);
    const fields = newItem.querySelectorAll('input');

    if (fields) fields.forEach((item) => (item.value = ''));

    addButton?.addEventListener('click', init);

    newItem?.querySelector('.invite_item .add')?.classList.add('hidden');
    newItem?.querySelector('.invite_item .remove')?.classList.remove('hidden');

    refItems[refItems.length - 1].after(newItem);

    deleteCallback();
  };

  if (triggers) {
    triggers?.forEach((item) => {
      item?.addEventListener('click', init);
    });
  }
};

const initElementDelete = (triggerClass, parentClass) => {
  const deleteButtons = document?.querySelectorAll(triggerClass);

  if (deleteButtons) {
    deleteButtons?.forEach((item) => item.addEventListener('click', () => item.closest(parentClass).remove()));
  }
};

const initRefDelete = () => initElementDelete('.invite_item .remove', '.invite_item');

const initRef = () => {
  initRefDelete();
  initElement('.invite_item .add', '.invite_list', '.invite_item', initRefDelete);
};

initRef();
