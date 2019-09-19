
// Remove an item in an array of objects which have an id property.
export const removeItemFromArray = (items, itemId) => {
  const index = items.findIndex(item => item.id == itemId);
  if(index != -1) {
    items.splice(index, 1);
  }
}

// Replace an item in an array of objects which have an id property.
export const replaceItemInArray = (items, item) => {
  const index = items.findIndex(arrayItem => arrayItem.id == item.id);
  if(index != -1) {
    items.splice(index, 1, item);
  }

}