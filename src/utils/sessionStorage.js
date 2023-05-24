export const setSessionStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionStorage = name => {
  try {
    return JSON.parse(sessionStorage.getItem(name));
  } catch (e) {
    console.error(e);
    return '';
  }
};

export const removeSessionStorage = key => {
  sessionStorage.removeItem(key);
};

export const clearSessionStorage = () => {
  sessionStorage.clear();
};
