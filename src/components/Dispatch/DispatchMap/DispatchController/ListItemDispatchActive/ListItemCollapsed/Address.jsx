import React from 'react';

const Address = ({ address, unit }) => {
  return(
    <span>
      {unit ? `${address} ${unit}` : address}
    </span>
  );
}

Address.propTypes = {
  address: React.PropTypes.string.isRequired,
};

export default Address;
