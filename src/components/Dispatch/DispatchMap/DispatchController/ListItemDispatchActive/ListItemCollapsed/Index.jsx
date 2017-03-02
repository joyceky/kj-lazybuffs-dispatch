import React from 'react';
import Minutes from './Minutes';
import ToggleButton from './ToggleButton';
import StatusColorCircle from './StatusColorCircle';

const ListItemCollapsed = ({ order }) => {
  return (
    <section style={collapsedStyle}>
      <ToggleButton orderId={order.orderId} />
      <span>{order.storeName}</span>
      <Minutes createdAt={order.orderCreatedAt} readyIn={order.orderReadyIn} />
      <StatusColorCircle orderStatus={order.orderStatus} />
    </section>
  );
};

const collapsedStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
  height: '50px',
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
