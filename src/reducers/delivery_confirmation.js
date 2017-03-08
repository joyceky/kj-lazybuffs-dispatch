export default function(state = false, action) {

  switch (action.type) {
    case 'SHOW_DELIVERY_CONFIRMATION':
      return action.orderId;
    default:
  case 'CLEAR_ORDER_CONFIRM':
      return false;
    break;
    return state
  }

}
