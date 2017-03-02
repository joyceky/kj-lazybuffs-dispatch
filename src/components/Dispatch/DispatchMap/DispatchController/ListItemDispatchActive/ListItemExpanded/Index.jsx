import React, { Component } from 'react';
import Header from './Header';
import OrderDetailsList from './OrderDetailsList';
import CustomerDetailsList from './CustomerDetailsList';
import DeliveryDetails from './DeliveryDetails';

const stylePhone = (num) => `${num.slice(0,3)}-${num.slice(3,6)}-${num.slice(6,10)}`;

class ListItemExpanded extends Component {
  render() {
    return (
      <section style={listItemExpandedStyle}>
        <Header type='Customer' order={this.props.order} save={this.saveUpdatedOrder} />
        <CustomerDetailsList order={this.props.order} />
        <Header type='Order' order={this.props.order} />
        <OrderDetailsList order={this.props.order} />
        {this.props.order.orderNote
        ? <h2 style={orderNotesTitle}>Notes</h2>
        : null}
        <span>{this.props.order.orderNote}</span>
        <DeliveryDetails order={this.props.order} />
      </section>
    );
  }
}

const storeName = {
  fontSize: '18px',
  margin: '0',
  marginBottom: '8px',
};

const listItemExpandedStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  backgroundColor: '#ECEFF1',
};

const orderNotesTitle = {
  margin: '0',
  padding: '0',
  marginTop: '16px',
  marginBottom: '8px',
  fontSize: '18px',
};

export default ListItemExpanded;
