import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [state, setstate] = useState({
    isAuth: false,
    token: null,
  });

  function handleLogin(token) {
    setstate({
      ...state,
      isAuth: true,
      token: token,
    });
  }

  function handleLogout() {
    setstate({
      ...state,
      isAuth: false,
      token: null,
    });
  }

  return <AuthContext.Provider  value={{state,handleLogin,handleLogout}}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
