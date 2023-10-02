// src/hooks/useLogin.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchData } from "../utils/http";

const useLogin = () => {
  const { dispatch } = useContext(AuthContext);

  const login = async (uEmail, uPassword) => {
    try {
      const response = await fetchData.post("/user/login", {
        uEmail,
        uPassword,
      });
      // console.log(response);
      if (response.status === 200) {
        dispatch({ type: "LOGIN", payload: response.data });
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return { login };
};

export default useLogin;
