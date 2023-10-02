// src/hooks/useSignup.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchData } from "../utils/http";

const useSignup = () => {
  const { dispatch } = useContext(AuthContext);

  const signup = async (uName, uEmail, uPassword, uType) => {
    try {
      const response = await fetchData.post("/user/register", {
        uName,
        uEmail,
        uPassword,
        uType,
      });
      // console.log()
      if (response.status === 201) {
        dispatch({ type: "REGISTER", payload: response.data });
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return { signup };
};

export default useSignup;
