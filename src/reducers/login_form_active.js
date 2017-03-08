export default function(state = false, action){
  switch (action.type) {
    case 'HIDE_LOGIN_FORM':
      return false;
    case 'SHOW_LOGIN_FORM':
      return true;
    case 'TOGGLE_LOGIN_FORM':
      return !state;
    default:
      return state;
  }
}
