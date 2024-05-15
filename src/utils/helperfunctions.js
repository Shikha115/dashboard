export function getNewValues(obj1, obj2) {
  const changedValues = {};

  // Iterate over the keys of the second object
  for (let key of Object.keys(obj2)) {
    // If the key is not present in the first object or the values are different
    if (!obj1.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
      // Add the key-value pair to the changedValues object
      changedValues[key] = obj2[key];
    }
  }

  return changedValues;
}
export const getBankById = (bank, id) => {
  let val = "";
  bank?.forEach((element) => {
    if (element._id === id) {
      val = element;
      return val;
    }
  });
  //   console.log(val);
  return val;
};

export const isEmptyObject = (obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};
