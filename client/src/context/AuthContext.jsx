import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

const LOCAL_KEY = 'expense_auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem(LOCAL_KEY);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        setUser(parsed.user);
        setToken(parsed.token);
      } catch {}
    }
    setLoading(false);
  }, []);

  const login = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem(LOCAL_KEY, JSON.stringify({ user, token }));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(LOCAL_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
