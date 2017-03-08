import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { assignOrder, loadDrivers, loadAllActiveOrders, loadAllUnassignedOrders } from '../../../../actions';
import UnassignedOrders from './UnassignedOrders';
import ActiveOrders from './ActiveOrders';
import DispatchActiveOrdersList from './DispatchActiveOrdersList';

const msAge = (ms) => Date.now() - parseInt(ms);
const msToMins = (ms) => Math.floor(ms / 60000);
const msAgeInMins = (ms) => msToMins(msAge(ms));

class DriversList extends Component {
  componentDidMount(){
    this.props.loadDrivers();
    this.props.loadAllActiveOrders();
    this.props.loadAllUnassignedOrders();
  }

  activeOrders() {
    return this.props.dispatchOrders.filter((order) => {
      if (order.orderStatus !== 'unassigned') return true;
      else return false;
    });
  }

  mapUnassigned() {
    return this.props.dispatchUnassignedOrders.map((order) => {
      return <UnassignedOrders order={order} key={order.orderId} />;
    });
  }

  mapActive(acceptedArr) {
    return acceptedArr.map((order) => {
      return <ActiveOrders order={order} key={order.orderId} />;
    });
  }

  render() {
    return (
      <div style={container}>
        <section>
          <h1 style={title.unassigned}>Unassigned Orders: {this.props.dispatchUnassignedOrders.length}</h1>
          <ul style={listStyle}>{this.mapUnassigned()}</ul>
        </section>

        <section>
          <h1 style={title.assigned}>Active Orders: {this.activeOrders().length}</h1>
          <DispatchActiveOrdersList />
        </section>
      </div>
    );
  }
}

const container = {
  flex: '4',
  display: 'flex',
  flexDirection: 'column',
  padding: '0',
  overflow: 'scroll',
}

const title = {
  available: {
    display: 'flex',
    justifyContent: 'center',
    margin: '0',
    padding: '8px',
    fontSize: '16px',
    backgroundColor: '#81C784',
  },
  unassigned: {
    display: 'flex',
    justifyContent: 'center',
    margin: '0',
    padding: '8px',
    fontSize: '16px',
    backgroundColor: '#FFB74D',
  },
  assigned: {
    display: 'flex',
    justifyContent: 'center',
    margin: '0',
    padding: '8px',
    fontSize: '16px',
    backgroundColor: '#7986CB',
    color: 'white',
  },

}

const listStyle = {
  listStyle: 'none',
  width: '100%',
  margin: '0',
  padding: '0',
};

function mapStateToProps({ dispatchDrivers, dispatchOrders, dispatchUnassignedOrders }) {
  return { dispatchDrivers, dispatchOrders, dispatchUnassignedOrders };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ assignOrder, loadDrivers, loadAllActiveOrders, loadAllUnassignedOrders }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(DriversList);
