export const initialState = {
  user: null,
};

export const actions = {
  SET_USER: "SET_USER",
  SIGN_OUT: "SIGN_OUT",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_USER: {
      const user = {
        email: action.value.email,
      };
      return { user };
    }
    case actions.SIGN_OUT: {
      return { user: null };
    }
    default:
      throw Error("Unknown action: " + action.type);
  }
};
