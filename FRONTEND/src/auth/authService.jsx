import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
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



export const logout = (navigation) => {
  
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  navigation("/")
  
};
