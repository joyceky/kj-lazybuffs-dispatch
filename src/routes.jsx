import React from 'react';
import { Route, browserHistory, IndexRedirect } from 'react-router';
import Dispatch from './components/Dispatch';
import Login from './components/Login';
import DispatchMap from './components/Dispatch/DispatchMap';
import DispatchNewOrderForm from './components/Dispatch/DispatchNewOrderForm';
import DispatchCompletedOrders from './components/Dispatch/DispatchCompletedOrders';
import DispatchDrivers from './components/Dispatch/DispatchDrivers';
import DispatchSettings from './components/Dispatch/DispatchSettings';


export default (
  <Route history={browserHistory}>
    <Route path="/" component={Dispatch}>
      <IndexRedirect to="map" />
      <Route path='map' component={DispatchMap} />
      <Route path='new' component={DispatchNewOrderForm} />
      <Route path='completed' component={DispatchCompletedOrders} />
      <Route path='drivers' component={DispatchDrivers} />
      <Route path='settings' component={DispatchSettings} />
    </Route>

    <Route path="login" component={Login} />
  </Route>
);
