export default function (state = {}, action) {
  switch (action.type) {
    case 'UPDATED_CUSTOMER_DETAILS':
      let stateCopyCustomer = JSON.parse(JSON.stringify(state));
      stateCopyCustomer.customer = action.payload;
      return stateCopyCustomer;
    case 'UPDATED_ORDER_DETAILS':
      let stateCopyOrder = JSON.parse(JSON.stringify(state));
      stateCopyOrder.order = action.payload;
      return stateCopyOrder;
    case 'UPDATED_DELIVERY_DETAILS':
      let stateCopyDelivery = JSON.parse(JSON.stringify(state));
      stateCopyDelivery.delivery = action.payload;
      return stateCopyDelivery;
    case 'CLEAR_ACTIVE_SAVE':
      return {};
    default:
      return state;
  }
}
