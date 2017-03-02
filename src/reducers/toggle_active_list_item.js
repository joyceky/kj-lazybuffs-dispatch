export default function(state = null, action) {
  switch (action.type) {
    case 'TOGGLE_ACTIVE_LIST_ITEM':
      if (action.payload === state) return null;
      return action.payload;
    case 'CLEAR_ACTIVE_LIST_ITEM':
      return null;
      break;
    default:
      return state;
  }
}
