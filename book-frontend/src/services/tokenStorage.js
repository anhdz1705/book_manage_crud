const AUTH_STORAGE_KEY = "book_management_auth";

const emptyAuth = {
  access: "",
  refresh: "",
  username: "",
};

export const getStoredAuth = () => {
  const rawAuth = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!rawAuth) {
    return { ...emptyAuth };
  }

  try {
    return { ...emptyAuth, ...JSON.parse(rawAuth) };
  } catch (error) {
    console.error(error);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return { ...emptyAuth };
  }
};

export const saveAuth = ({ access, refresh, username }) => {
  const auth = {
    access,
    refresh,
    username,
  };

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
  return auth;
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const getAccessToken = () => getStoredAuth().access;
