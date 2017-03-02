import React, { Component } from 'react';
import Minutes from './Minutes';

const msAge = (ms) => Date.now() - parseInt(ms);
const msToMins = (ms) => Math.floor(ms / 60000);
const msAgeInMins = (ms) => msToMins(msAge(ms));


const stylePhone = (num) => {
  return `${num.slice(0,3)}-${num.slice(3,6)}-${num.slice(6,10)}`;
}

const Address = ({ address, unit }) => {
  return(
    <span>
      {unit ? `${address} ${unit}` : address}
    </span>
  );
}

export default class ActiveOrders extends Component {
  render() {
    return (
      <li key={this.props.order.driverId + this.props.order.orderId} style={acceptedListStyle} >

        <span>{stylePhone(this.props.order.customerPhone)}</span>
        <Address address={this.props.order.customerAddress} unit={this.props.order.customerUnit} />

        <Minutes createdAt={this.props.order.orderCreatedAt} readyIn={this.props.order.orderReadyIn} />
        <span>{this.props.order.driverName}</span>
      </li>
    );
  }
}

const acceptedListStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px',
  alignItems: 'center',
};
