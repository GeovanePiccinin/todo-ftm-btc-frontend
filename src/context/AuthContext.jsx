import { createContext, useReducer, useContext, useEffect } from "react";
import { reducer, initialState, actions } from "../reducer/AuthReducer";
import { login, register, logout } from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    user: state.user,
    login: async (email, password) => {
      try {
        const user = await login(email, password);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: actions.SET_USER, value: user });
        return true;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
    logout: async () => {
      try {
        await logout();
        localStorage.removeItem("user");
        dispatch({ type: actions.SIGN_OUT });
      } catch (e) {
        console.log(e);
      }
    },
    register: async (email, password) => {
      try {
        await register(email, password);
        return true;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
    signout: () => {
      localStorage.removeItem("user");
      dispatch({ type: actions.SIGN_OUT });
    },
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("user", user, typeof user);
    if (user && user !== "null" && user !== "undefined") {
      console.log(user);
      dispatch({
        type: actions.SET_USER,
        value: JSON.parse(user),
      });
    }
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
