import { useState, useContext, createContext, useEffect } from "react";
import { fetchLogout, fetchMe } from "../api";
const AuthContext = createContext();
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("loggedIn")) || false // ✅ Sayfayı yenileyince durumu korur
  );
  useEffect(() => {
    (async () => {
      try {
        const me = await fetchMe();
        setUser(me);
      } catch (e) {}
    })();
  }, []);
  const login = (data) => {
    setUser(data.user);

    setLoggedIn(true);

    localStorage.setItem("loggedIn", JSON.stringify(true));
    localStorage.setItem("access-token", data.accessToken);
    localStorage.setItem("refresh-token", data.refreshToken);
  };
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);
  const logout = async () => {
    setUser(null);
    setLoggedIn(false);
    await fetchLogout();
    localStorage.removeItem("refresh-token");
    localStorage.removeItem("access-token");
    localStorage.removeItem("user");

    localStorage.setItem("loggedIn", JSON.stringify(false));
  };
  const values = {
    user,
    loggedIn,
    login,
    logout,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
