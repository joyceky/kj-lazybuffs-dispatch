export default function (state = null, action) {
  switch (action.type) {
    case 'SAVE_UPDATED_ORDER':
      const orderId = action.payload;
      return orderId;
    case 'CLEAR_ACTIVE_SAVE':
      return null;
      break;
    default:
      return state;
  }
}
