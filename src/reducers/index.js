import { combineReducers } from 'redux';
import auth from './auth';
import confirmation from './confirmation';
import errors from './errors';
import loading from './loading';
import loginFormActive from './login_form_active';
import newOrderFormActive from './new_order_form_active';
import activeListItem from './toggle_active_list_item';
import activeOrderUpdateId from './toggle_order_update';

import activeDispatchView from './active_dispatch_view';

import dispatchOrders from './dispatch_orders';
import dispatchCompletedOrders from './dispatch_completed_orders';
import dispatchUnassignedOrders from './dispatch_unassigned_orders';
import dispatchDrivers from './dispatch_drivers';
import dispatchStores from './dispatch_stores';
import saveUpdatedOrderId from './save_updated_order';
import saveUpdatedState from './save_updated_state';

const rootReducer = combineReducers({
  errors,
  activeDispatchView,
  activeListItem,
  activeOrderUpdateId,
  auth,
  confirmation,
  dispatchCompletedOrders,
  dispatchUnassignedOrders,
  dispatchDrivers,
  dispatchOrders,
  dispatchStores,
  loading,
  loginFormActive,
  newOrderFormActive,
  saveUpdatedOrderId,
  saveUpdatedState,
});
export default rootReducer;
