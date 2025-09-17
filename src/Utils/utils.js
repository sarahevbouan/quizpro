export const toSentenceCase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const setStorageItem = (storage, key, item) => {
  storage.setItem(key, JSON.stringify(item));
};

export const getStorageItem = (storage, key) => {
  const retreievedItem = storage.getItem(key);
  return retreievedItem ? JSON.parse(retreievedItem) : null;
};

export const removeStorageItem = (storage, key) => {
  storage.removeItem(key);
};
