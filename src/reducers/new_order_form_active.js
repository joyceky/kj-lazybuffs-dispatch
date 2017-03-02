export default function(state = false, action){
  switch (action.type) {
    case 'HIDE_NEW_ORDER_FORM':
      return false;
    case 'SHOW_NEW_ORDER_FORM':
      return true;
    case 'TOGGLE_NEW_ORDER_FORM':
      return !state;
    default:
      return state;
  }
}
