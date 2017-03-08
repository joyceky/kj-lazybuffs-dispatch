export default function (state = null, action) {
  switch (action.type) {
    case 'CONFIRM_ORDER_DELETE':
      return action.payload;
    case 'CANCEL_ORDER_DELETE':
      return null;
    default:
      return state;
  }
}
