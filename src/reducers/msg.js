export default function (state = null, action) {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
    return 'signup success';
    case 'CLEAR_MESSAGE':
    return null;
    default:
    return state;
  }
}
