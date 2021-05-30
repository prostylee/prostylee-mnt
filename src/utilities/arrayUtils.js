export const containAny = (arr1, arr2) => {
  return arr1 && arr1.some(r => arr2.indexOf(r) >= 0);
};
