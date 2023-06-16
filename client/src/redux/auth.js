const init = {
  email: "",
  password: "",
};

function userReducer(state = init, action) {
  if (action.type == "login") {
    return {
      ...state,
      id: action.payload.id,
      email: action.payload.email,
      fullName: action.payload.fullName,
      userName: action.payload.userName,
      avatar_url: action.payload.avatar_url,
    };
  } else if (action.type == "logout") {
    return init;
  }

  return state;
}

export default userReducer;
