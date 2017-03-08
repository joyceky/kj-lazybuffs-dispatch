export default function(state = 'map', action){
  switch (action.type) {
    case 'SET_ACTIVE_DISPATCH_VIEW':
      return action.payload;
    default:
      return state;
  }
}
