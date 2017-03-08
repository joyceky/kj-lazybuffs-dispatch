export default function (state = null, action) {
  switch (action.type) {
    case 'LOGIN_ERROR':
      return action.payload;
    case 'CLEAR_LOGIN_ERROR':
      return null;
    default:
      return state;
  }
}
