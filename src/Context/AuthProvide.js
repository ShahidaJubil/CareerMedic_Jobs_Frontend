import React, { useState, useContext } from "react";
import SignIn from "../Pages/SignIn/SignIn";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  var u_name = "User";
  var u_token = "";
  var u_role = "";
  var u_email = "";
  if (sessionStorage.getItem("username") && sessionStorage.getItem("token")) {
    u_name = sessionStorage.getItem("username");
    u_token = sessionStorage.getItem("token");
    u_role = sessionStorage.getItem("role");
    u_email = sessionStorage.getItem("email");
  }
  const [userToken, setUserToken] = useState(u_token);
  const [userName, setUserName] = useState(u_name);
  const [userRole ,setuserRole] = useState(u_role);
  const [userMail ,setuserMail] = useState(u_email);


  function updateContext(newToken, newName ) {
    setUserToken(newToken);
    setUserName(newName);
    // setuserRole(newRole);
  }

  return (
    <AuthContext.Provider value={{ userToken, userName, updateContext , userRole , userMail }}>
      {children}
    </AuthContext.Provider>
  );
};
