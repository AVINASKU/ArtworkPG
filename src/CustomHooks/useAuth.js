//  not used yet planned use in future 
import React, { useState } from "react";

function useAuth({ isAuth }) {
  const [auth, setAuth] = useState(isAuth);

  const setLogin = () => {
    setAuth(true);
  };
  const setLogout = () => {
    setAuth(false);
  };

  return [auth, setLogin, setLogout];
}

export default useAuth;
