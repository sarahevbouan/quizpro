export const toSentenceCase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const setLocalStorageItem = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item));
};

export const getLocalStorageItem = (key) => {
  const retreievedItem = localStorage.getItem(key);
  return retreievedItem ? JSON.parse(retreievedItem) : null;
};

export const removeLocalStorageItem = (key) => {
  localStorage.removeItem(key);
};

export const setSessionStorageItem = (key, item) => {
  sessionStorage.setItem(key, JSON.stringify(item));
};

export const getSessionStorageItem = (key) => {
  const retreievedItem = sessionStorage.getItem(key);
  return retreievedItem ? JSON.parse(retreievedItem) : null;
};

export const removeSessionStorageItem = (key) => {
  sessionStorage.removeItem(key);
};
