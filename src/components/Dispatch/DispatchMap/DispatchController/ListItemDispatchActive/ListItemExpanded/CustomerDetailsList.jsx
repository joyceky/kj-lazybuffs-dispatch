import React, { Component } from 'react';
import UpdateCustomerDetailsList from './UpdateCustomerDetailsList';
import { connect } from 'react-redux';

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

class CustomerDetailsList extends Component {
  render() {
    const match = this.props.activeOrderUpdateId === this.props.order.orderId;
    if (match) return <UpdateCustomerDetailsList order={this.props.order} />;
    return (
      <ul style={{listStyle: 'none', margin: '0', marginBottom: '16px', padding: '0', width: '100%'}}>
        <li style={{fontSize: '16px'}}>
        {this.props.order.customerName}
        </li>
        <li style={{fontSize: '16px'}}>
        <Address address={this.props.order.customerAddress} unit={this.props.order.customerUnit} />
        </li>
        <li style={{fontSize: '16px'}}>{stylePhone(this.props.order.customerPhone)}</li>
      </ul>
    );
  }
};

function mapStateToProps({ activeOrderUpdateId }) {
  return { activeOrderUpdateId };
}

export default connect(mapStateToProps, null)(CustomerDetailsList);
