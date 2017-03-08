import React from 'react';

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

const CustomerDetailsList = ({ order }) => {
    return (
      <ul style={{listStyle: 'none', margin: '0', padding: '0' }}>
      <li style={{fontSize: '16px'}}>{order.customerName}</li>
      <li style={{fontSize: '16px'}}>
      <Address address={order.customerAddress} unit={order.customerUnit} />
      </li>
      <li style={{fontSize: '16px'}}>{stylePhone(order.customerPhone)}</li>
      </ul>
    );
};

export default CustomerDetailsList;
