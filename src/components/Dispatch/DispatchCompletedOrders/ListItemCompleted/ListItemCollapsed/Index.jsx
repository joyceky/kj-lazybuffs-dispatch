import React from 'react';
import Date from './Date';
import Minutes from './Minutes';
import ToggleButton from './ToggleButton';

const ListItemCollapsed = ({ order }) => {
  return (
    <section style={collapsedStyle}>
      <ToggleButton orderId={order.orderId} />
      <span>{order.customerAddress}</span>
      <span style={nameStyle}>ID {order.orderId}</span>
    </section>
  );
};

const nameStyle = {
  marginRight: '16px',
}

const collapsedStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  height:'50px',
  width: '100%',
};

// const storeAddressStyle = {
//   height: '50px',
//   display: 'flex',
//   flexDirection: 'column',
//   paddingRight: '20px',
// };

ListItemCollapsed.propTypes = {
  order: React.PropTypes.object.isRequired,
}

export default ListItemCollapsed;
