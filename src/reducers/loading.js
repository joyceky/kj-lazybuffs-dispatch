export default function(state = false, action) {
  switch (action.type) {
    case 'LOADING_LOGIN':
      return 'LOGIN';
    case 'CLEAR_LOADING_LOGIN':
      return false;
    case 'LOADING_STORE_ORDERS':
      return 'STORE_ORDERS';
    case 'CLEAR_LOADING_STORE_ORDERS':
      return false;
    case 'LOADING_ALL_ACTIVE_ORDERS':
      return true;
    case 'CLEAR_LOADING_ALL_ACTIVE_ORDERS':
      return false;
    default:
      return state;
  }
}
