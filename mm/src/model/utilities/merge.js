// Merge two Arrays of objects which have an id property,
// a clone function and a static merge function.
export function mergeArrays(src, dst, mergeFunction) {

  src.forEach((srcItem, srcIndex) => {
    const dstItem = dst.find(dstItem => dstItem.id == srcItem.id);
    if(dstItem) {
      mergeFunction(srcItem, dstItem);
    }
    else {
      const insertIndex = Math.min(srcIndex, dst.length);
      dst.splice(insertIndex, 0, srcItem.clone());
    }
  });
}

export function removeFromArrayById(items, id) {

  const index = items.findIndex(item => item.id == id);
  if(index != -1) {
    items.splice(index, 1);
    return true;
  }
  return false;
}