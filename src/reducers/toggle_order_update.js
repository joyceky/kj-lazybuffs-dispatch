export default function(state = null, action) {
  switch (action.type) {
    case 'TOGGLE_ORDER_UPDATE':
      if (action.payload === state) return null;
      return action.payload;
    default:
      return state;
  }
}
