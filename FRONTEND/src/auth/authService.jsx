import { jwtDecode } from 'jwt-decode'
export const getToken = () => localStorage.getItem('access');

export const decodeToken = () => {
  const token = getToken();
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

export const isAuthenticated = () => !!getToken();

export const logout = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
};
