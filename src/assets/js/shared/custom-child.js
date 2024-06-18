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

    newItem?.querySelector('.divider')?.classList.remove('hidden');
    newItem?.querySelector('.child__remove-button')?.classList.remove('hidden');

    const triggers = document?.querySelectorAll(triggerClass);

    refItems[refItems.length - 1].after(newItem);

    if (triggers.length === 2) newItem?.querySelector(triggerClass).classList.add('hidden');

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

const initChildDelete = () => initElementDelete('.child__remove-button', '.child_item');

const initChild = () => {
  initChildDelete();
  initElement('.child__add-button', '.child_list', '.child_item', initChildDelete);
};

initChild();
