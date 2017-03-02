export default function (state = [], action) {
  switch (action.type) {
    case 'LOAD_ALL_ACTIVE_ORDERS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
}
