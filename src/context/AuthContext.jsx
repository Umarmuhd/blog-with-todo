import { useReducer, createContext, useEffect } from "react";

// initial state
const initialState = {
  user: null,
  loading: true,
};

// create context
const Context = createContext();

// root reducer
const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "STOP_LOAD":
      return { ...state, loading: false };
    default:
      return state;
  }
};

// context provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(window.localStorage.getItem("user")),
    });
    dispatch({
      type: "STOP_LOAD",
    });
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {!state.loading && children}
    </Context.Provider>
  );
};

export { Context, Provider };
