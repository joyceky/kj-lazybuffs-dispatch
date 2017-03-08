export const API_URL = 'https://lazybuffs.herokuapp.com';
import axios from 'axios';

export const stylePhone = (num) => `${num.slice(0,3)}-${num.slice(3,6)}-${num.slice(6,10)}`;

export function submitOrder(order, auth) {
  return (dispatch) => {
    axios.post(`${API_URL}/dispatch/orders/create`, { order, auth })
    .then(({ data }) => {
      // TODO: handle with UI instead refresh
      console.log(data);
      if (data.err) return;
      dispatch(loadStoreOrders(auth));
      dispatch(submitOrderSuccess(data));
    })
    .catch(err => console.log(err));
  }
}
function submitOrderSuccess(orderId) {
  return {
    type: 'POST_ORDER_SUCCESS',
    payload: orderId,
  };
}

export function toggleNewOrderForm() {
  return {
    type: 'TOGGLE_NEW_ORDER_FORM',
  };
}

export function confirmOrderDelete(order) {
  return {
    type: 'CONFIRM_ORDER_DELETE',
    payload: order,
  };
}

export function cancelOrderDelete() {
  return {
    type: 'CANCEL_ORDER_DELETE',
  };
}

export function toggleActiveListItem(orderId) {
  return {
    type: 'TOGGLE_ACTIVE_LIST_ITEM',
    payload: orderId,
  };
}

function clearActiveListItem(){
  return {
    type: 'CLEAR_ACTIVE_LIST_ITEM',
  }
}

export function toggleOrderUpdate(orderId){
  return {
    type: 'TOGGLE_ORDER_UPDATE',
    payload: orderId,
  };
}

export function loadStoreOrders (profile) {
  return (dispatch) => {
    dispatch(loadingStoreOrders());
    axios.post(`${API_URL}/store`, { profile })
    .then(({ data }) => {
      dispatch(loadStoreOrdersSuccess(data));
      dispatch(clearLoadingStoreOrders());
    })
    .catch((err) => {
      dispatch(loadStoreOrdersFailure(err));
    });
  };
}
function loadingStoreOrders() {
  return {
    type: 'LOADING_STORE_ORDERS',
  };
}
function clearLoadingStoreOrders() {
  return {
    type: 'CLEAR_LOADING_STORE_ORDERS',
  };
}
// TODO: not hooked up to anything yet
function loadStoreOrdersFailure(err) {
  return {
    type: 'LOADING_STORE_ORDERS_FAILURE',
    payload: err,
  };
}
function loadStoreOrdersSuccess(data) {
  return {
    type: 'LOAD_STORE_ORDERS_SUCCESS',
    payload: data,
  };
}

export function deleteOrder(orderId){
  return (dispatch) => {
    axios.post(`${API_URL}/orders/delete`, { orderId })
    .then(({ data }) => {
      if (data > 0) dispatch(deleteOrderSuccess(orderId));
      dispatch(loadAllActiveOrders());
      dispatch(cancelOrderDelete());
      // TODO: handle unsuccesful delete in UI
    })
    .catch((err) => {
      // TODO: handle unsuccesful delete in UI
    });
  };
}
function deleteOrderSuccess(orderId){
  return {
    type: 'DELETE_ORDER',
    payload: orderId,
  };
}

export function logout() {
  return {
    type: 'LOGOUT',
  };
}

export function login (email, password) {
  return (dispatch) => {
    dispatch(clearLoginError());
    dispatch(loginLoading());
    axios.post(`${API_URL}/login`, { email, password })
    .then(({ data }) => {
      if(data.profile) dispatch(loginSuccess(data.profile));
      console.log('clear login loading');
      dispatch(clearLoginLoading());
      if(data.err) dispatch(loginError(data.err));
    })
    .catch((err) => {
      dispatch(loginError(err));
      dispatch(clearLoginLoading());
    });
  }
}
function loginSuccess(profileWithJWT) {
  return {
    type: 'LOGIN_SUCCESS',
    payload: profileWithJWT,
  };
}
function loginError(err) {
  return {
    type: 'LOGIN_ERROR',
    payload: err,
  };
}
function clearLoginError(err) {
  return {
    type: 'CLEAR_LOGIN_ERROR',
  };
}
function loginLoading() {
  return {
    type: 'LOADING_LOGIN',
  };
}
function clearLoginLoading() {
  return {
    type: 'CLEAR_LOADING_LOGIN',
  };
}

export function hideLoginForm() {
  return {
    type: 'HIDE_LOGIN_FORM',
  };
}
export function showLoginForm() {
  return {
    type: 'SHOW_LOGIN_FORM',
  };
}

export function getUser(){
  return {
    type: 'GET_USER',
  };
}

// STORE

export function setActiveStoreView(view) {
  return {
    type: 'SET_ACTIVE_STORE_VIEW',
    payload: view,
  };
}

// DISPATCH ACTIONS



export function saveUpdatedCustomerDetails(state) {
  console.log('Customer state: ', state);
  return {
    type: 'UPDATED_CUSTOMER_DETAILS',
    payload: state,
  };
}
export function saveUpdatedOrderDetails(state) {
  console.log('Order state: ', state);
  return {
    type: 'UPDATED_ORDER_DETAILS',
    payload: state,
  };
}
export function saveUpdatedDeliveryDetails(state) {
  console.log('Delivery state: ', state);
  return {
    type: 'UPDATED_DELIVERY_DETAILS',
    payload: state,
  };
}
export function saveUpdatedOrder(orderId) {
  console.log('firign saveUpdatedOrder');
  return {
    type: 'SAVE_UPDATED_ORDER',
    payload: orderId,
  };
}

export function clearActiveSave() {
  return {
    type: 'CLEAR_ACTIVE_SAVE',
  };
}

export function saveUpdatedOrderToDB(updatedOrder, orderId) {
  return (dispatch) => {
    axios.post(`${API_URL}/dispatch/order/update`, { updatedOrder, orderId })
    .then(({ data }) => {
      dispatch(clearActiveSave());
      dispatch(loadAllActiveOrders());
      dispatch(loadAllUnassignedOrders());
      dispatch(clearActiveListItem());
    })
    .catch(err => console.log(err))
  }
}

export function getDispatchCompletedOrdersSortBy(sortStr, auth) {
  return (dispatch) => {
    axios.post(`${API_URL}/dispatch/orders/completed/sort`, { sortStr, auth })
    .then(({ data }) => dispatch(getDispatchCompletedOrdersSortBySuccess(data)))
    .catch(err => console.log(err));
  }
}

function getDispatchCompletedOrdersSortBySuccess(orders) {
  return {
    type: 'GET_DISPATCH_COMPLETED_ORDERS_SORT_SUCCESS',
    payload: orders,
  };
}

export function assignOrder(orderId, driverId) {
  return (dispatch) => {
    axios.post(`${API_URL}/dispatch/order/assign`, { orderId, driverId })
    .then(({ data }) => {
      // TODO: refactor to UI update instead page refresh
      console.log('succesfully assigned an order');
      dispatch(loadAllUnassignedOrders());
      dispatch(loadAllActiveOrders());
    })
    .catch((err) => {
      console.log('assignOrder() err: ', err);
      dispatch(assignOrderFailure(err)); // TODO notify UI of failure
    })
  }
}
export function assignOrderSuccess(data) {
  return {
    type: 'ASSIGN_ORDER_SUCCESS',
    payload: data,
  }
}

export function setActiveDispatchView(view) {
  return {
    type: 'SET_ACTIVE_DISPATCH_VIEW',
    payload: view,
  };
}

// load all orders that havent been delivered
export function loadAllActiveOrders(profile) {
  return (dispatch) => {
    // dispatch(loadingAllActiveOrders());
    axios.post(`${API_URL}/dispatch/orders/active`, { profile })
    .then(({ data }) => {
      console.log(data);
      dispatch(loadAllActiveOrdersSuccess(data));
      dispatch(clearLoadingAllActiveOrders());
    })
    .catch((err) => {
      dispatch(loadAllActiveOrdersFailure(err));
    });
  };
}
function loadAllActiveOrdersSuccess(data) {
  return {
    type: 'LOAD_ALL_ACTIVE_ORDERS_SUCCESS',
    payload: data,
  };
}
// TODO: not hooked up to anything yet
function loadAllActiveOrdersFailure(err) {
  return {
    type: 'LOAD_ALL_ACTIVE_ORDERS_FAILURE',
    payload: err,
  };
}

// loading icon
function loadingAllActiveOrders() {
  return {
    type: 'LOADING_ALL_ACTIVE_ORDERS',
  };
}
function clearLoadingAllActiveOrders() {
  return {
    type: 'CLEAR_LOADING_ALL_ACTIVE_ORDERS',
  };
}

export function loadAllUnassignedOrders(profile) {
  return (dispatch) => {
    axios.post(`${API_URL}/dispatch/orders/unassigned`, { profile })
    .then(({ data }) => {
      console.log(data);
      dispatch(loadAllUnassignedOrdersSuccess(data));
    })
    .catch((err) => {
      console.log(err);
    });
  };
}
function loadAllUnassignedOrdersSuccess(data) {
  return {
    type: 'LOAD_ALL_UNASSIGNED_ORDERS_SUCCESS',
    payload: data,
  };
}

export function loadStores (auth) {
  return (dispatch) => {
    dispatch(loadingStores());
    axios.post(`${API_URL}/dispatch/stores`, { auth })
    .then(({ data }) => {
      console.log(data);
      dispatch(loadStoresSuccess(data));
      dispatch(clearLoadingStores());
    })
    .catch((err) => {
      dispatch(loadStoresFailure(err));
    });
  };
}
function loadStoresSuccess(data) {
  return {
    type: 'LOAD_STORES_SUCCESS',
    payload: data,
  };
}
// TODO: not hooked up to anything yet
function loadStoresFailure(err) {
  return {
    type: 'LOADING_STORES_FAILURE',
    payload: err,
  };
}
function loadingStores() {
  return {
    type: 'LOADING_STORES',
  };
}
function clearLoadingStores() {
  return {
    type: 'CLEAR_LOADING_STORES',
  };
}

export function loadDrivers (profile) {
  return (dispatch) => {
    dispatch(loadingDrivers());
    axios.post(`${API_URL}/dispatch/drivers`, { profile })
    .then(({ data }) => {
      dispatch(loadDriversSuccess(data));
      dispatch(clearLoadingDrivers());
    })
    .catch((err) => {
      dispatch(loadDriversFailure(err));
    });
  };
}
function loadDriversSuccess(data) {
  return {
    type: 'LOAD_DRIVERS_SUCCESS',
    payload: data,
  };
}
// TODO: not hooked up to anything yet
function loadDriversFailure(err) {
  return {
    type: 'LOADING_DRIVERS_FAILURE',
    payload: err,
  };
}
function loadingDrivers() {
  return {
    type: 'LOADING_DRIVERS',
  };
}
function clearLoadingDrivers() {
  return {
    type: 'CLEAR_LOADING_DRIVERS',
  };
}

export function getCompletedOrders (auth) {
  return (dispatch) => {
    dispatch(loadingCompletedOrders());
    axios.post(`${API_URL}/dispatch/orders/completed`, { auth })
    .then(({ data }) => {
      console.log(data);
      dispatch(getCompletedOrdersSuccess(data));
      dispatch(clearLoadingCompletedOrders());
    })
    .catch((err) => {
      dispatch(getCompletedOrdersFailure(err));
    });
  };
}
function getCompletedOrdersSuccess(data) {
  return {
    type: 'GET_DISPATCH_COMPLETED_ORDERS_SUCCESS',
    payload: data,
  };
}
// TODO: not hooked up to anything yet
function getCompletedOrdersFailure(err) {
  return {
    type: 'GET_COMPLETED_ORDERS_FAILURE',
    payload: err,
  };
}
function loadingCompletedOrders() {
  return {
    type: 'LOADING_COMPLETED_ORDERS',
  };
}
function clearLoadingCompletedOrders() {
  return {
    type: 'CLEAR_LOADING_COMPLETED_ORDERS',
  };
}


// <DRIVER />

export function setActiveDriverView(view) {
  return {
    type: 'SET_ACTIVE_DRIVER_VIEW',
    payload: view,
  };
}

export function getDriverOrders(driverId){
  return (dispatch) => {
    axios.post(`${API_URL}/driver/orders`, { driverId })
    .then(({ data }) => dispatch(getDriverOrdersSuccess(data)))
    .catch(err => console.log(err));
  }
}

function getDriverOrdersSuccess(orders){
  return {
    type: 'GET_DRIVER_ORDERS_SUCCSS',
    payload: orders,
  };
}

export function getDriverActiveOrders(auth) {
  return (dispatch) => {
    axios.post(`${API_URL}/driver/orders/active`, { auth })
    .then(({ data }) => {
      dispatch(getDriverActiveOrdersSuccess(data));
    })
    .catch(err => console.log(err));
  };
}
function getDriverActiveOrdersSuccess(data) {
  return {
    type: 'GET_DRIVER_ACTIVE_ORDERS_SUCCESS',
    payload: data,
  };
}

export function getDriverCompletedOrders(auth) {
  return (dispatch) => {
    axios.post(`${API_URL}/driver/orders/completed`, { auth })
    .then(({ data }) => {
      dispatch(getDriverCompletedOrdersSuccess(data));
    })
    .catch(err => console.log(err));
  };
}
function getDriverCompletedOrdersSuccess(data) {
  return {
    type: 'GET_DRIVER_COMPLETED_ORDERS_SUCCESS',
    payload: data,
  };
}
export function getDriverCompletedOrdersSortBy(sortStr, auth) {
  return (dispatch) => {
    axios.post(`${API_URL}/driver/orders/completed/sort`, { sortStr, auth })
    .then(({ data }) => dispatch(getDriverCompletedOrdersSortBySuccess(data)))
    .catch(err => console.log(err));
  };
}
function getDriverCompletedOrdersSortBySuccess(orders) {
  return {
    type: 'GET_DRIVER_COMPLETED_ORDERS_SUCCESS',
    payload: orders,
  };
}

export function getDirections(fullAddress, lat, lng) {
  console.log(fullAddress);
  return (dispatch) => {
    // axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&key=AIzaSyC737F9xNzyVwPkURfUQPjwl8qP_moBfbs`)
    axios.post(`https://maps.googleapis.com/maps/api/directions/json?origin=${lat},${lng}&destination=${fullAddress}&key=AIzaSyC_C0DR4gGpMyFwATiPQro2nZqWzhkTfkc`)
    .then(directions => {
      console.log(directions);
    })
    .catch(err => console.log(err));
  }
}


// < Store />

export function getStoreActiveOrders(auth) {
  return (dispatch) => {
    axios.post(`${API_URL}/store/orders/active`, { auth })
    .then(({ data }) => {
      dispatch(getStoreActiveOrdersSuccess(data));
    })
    .catch(err => console.log(err));
  };
}
function getStoreActiveOrdersSuccess(data) {
  return {
    type: 'GET_STORE_ACTIVE_ORDERS_SUCCESS',
    payload: data,
  };
}

export function getStoreCompletedOrders(auth) {
  return (dispatch) => {
    axios.post(`${API_URL}/store/orders/completed`, { auth })
    .then(({ data }) => {
      console.log('res from API: ', data);
      dispatch(getStoreCompletedOrdersSuccess(data));
    })
    .catch(err => console.log(err));
  };
}
function getStoreCompletedOrdersSuccess(data) {
  return {
    type: 'GET_STORE_COMPLETED_ORDERS_SUCCESS',
    payload: data,
  };
}

export function getStoreCompletedOrdersSortBy(sortStr, auth) {
  return (dispatch) => {
    axios.post(`${API_URL}/store/orders/completed/sort`, { sortStr, auth })
    .then(({ data }) => dispatch(getStoreCompletedOrdersSortBySuccess(data)))
    .catch(err => console.log(err));
  }
}

function getStoreCompletedOrdersSortBySuccess(orders) {
  return {
    type: 'GET_STORE_COMPLETED_ORDERS_SORT_SUCCESS',
    payload: orders,
  };
}

// Order Lifecycle Methods
export function showDeliveryConfirmation(orderId) {
  return {
    type: 'SHOW_DELIVERY_CONFIRMATION',
    orderId,
  }
}


export function confirmOrder(orderId, auth) {
  return (dispatch) => {
    axios.post(`${API_URL}/driver/order/confirm`, { orderId, auth })
    .then(({ data }) => {
      console.log('succes: ', data);
      dispatch(getDriverActiveOrders(auth));
      // TODO: refactor to UI update instead page refresh
    })
    .catch(err => console.log(err)); // TODO notify UI of failure
  }
}

export function waitOnOrder(orderId, auth) {
  return (dispatch) => {
    axios.post(`${API_URL}/driver/order/wait`, { orderId, auth })
    .then(({ data }) => {
      console.log('succes: ', data);
      dispatch(getDriverActiveOrders(auth));
      // TODO: refactor to UI update instead page refresh
    })
    .catch(err => console.log(err)); // TODO notify UI of failure
  }
}

export function pickUpOrder(orderId, auth) {
  return (dispatch) => {
    axios.post(`${API_URL}/driver/order/pickup`, { orderId, auth })
    .then(({ data }) => {
      console.log('succes: ', data);
      dispatch(getDriverActiveOrders(auth));
      // TODO: refactor to UI update instead page refresh
    })
    .catch(err => console.log(err)); // TODO notify UI of failure
  }
}

export function completeOrder(order, auth) {
  return (dispatch) => {
    axios.post(`${API_URL}/driver/order/complete`, { order, auth })
    .then(({ data }) => {
      console.log('succes: ', data);
      dispatch(clearOrderConfirm());
      dispatch(getDriverActiveOrders(auth));
      // TODO: refactor to UI update instead page refresh
    })
    .catch(err => dispatch(completeOrderFailure(err))); // TODO notify UI of failure
  }
}
export function clearOrderConfirm(){
  return {
    type: 'CLEAR_ORDER_CONFIRM',
  };
}

// LOGIN
export function signupDriver(email, password, name, phone) {
  return (dispatch) => {
    axios.post(`${API_URL}/auth/signup/driver`, { email, password, name, phone })
    .then(({ data }) => {
      // TODO: notify UI

    })
    .catch(err => console.log(err))
  };
}

export function signupStore(email, password, name, phone, address, zip) {
  return (dispatch) => {
    axios.post(`${API_URL}/auth/signup/store`, { email, password, name, phone, address, zip })
    .then(({ data }) => {
      // TODO: notify UI


    })
    .catch(err => console.log(err))
  };
}

export function signupDispatch(email, password) {
  return (dispatch) => {
    axios.post(`${API_URL}/auth/signup/dispatch`, { email, password })
    .then(({ data }) => {
      // TODO: notify UI
    })
    .catch(err => console.log(err))
  };
}

export function signupAdmin(email, password) {
  return (dispatch) => {
    axios.post(`${API_URL}/auth/signup/admin`, { email, password })
    .then(({ data }) => {
      // TODO: notify UI
    })
    .catch(err => console.log(err))
  };
}
