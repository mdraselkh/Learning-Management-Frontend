
export const getAccessFromStorage = (key) => {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const setAccessToStorage = (key, data) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
};

export const clearAccessStorage = () => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("access_")) {
      localStorage.removeItem(key);
    }
  });
};
