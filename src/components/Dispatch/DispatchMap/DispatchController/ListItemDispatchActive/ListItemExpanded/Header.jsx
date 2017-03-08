import React from 'react';
import ButtonPanel from './ButtonPanel';


const DateId = ({ orderId, createdAt }) => {
  return (
    <span>
      {`ID: ${new Date(parseInt(createdAt)).getMonth() + 1}${new Date(parseInt(createdAt)).getDate()}${orderId}`}
    </span>
  );
};

const Header = ({ type, order }) => {
  return (
    <section style={headerStyle}>
      <h1 style={subTitleStyle}>
        {type === 'Order' ? <DateId orderId={order.orderId} createdAt={order.orderCreatedAt} /> : 'Customer'}
      </h1>
      <ButtonPanel type={type} order={order} />
    </section>
  );
};

const headerStyle = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '8px',
};

const subTitleStyle = {
  padding: '0',
  margin: '0',
  fontSize: '18px',
};

Header.propTypes = {
  type: React.PropTypes.string.isRequired,
}

export default Header;
