export default function(state = [], action) {
  switch (action.type) {
    case 'LOAD_DRIVERS_SUCCESS':
      return action.payload;
      break;
    default:
      return state;
  }
}
