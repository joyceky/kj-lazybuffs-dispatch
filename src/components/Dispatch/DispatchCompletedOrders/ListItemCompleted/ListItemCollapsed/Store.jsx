import React from 'react';

const Store = ({ name }) => {
  return(
    <p style={storeStyle}>
      {name}
    </p>
  );
}

const storeStyle = {
  fontSize: '1em',
  padding: '0',
  margin: '0',
};

Store.propTypes = {
  name: React.PropTypes.string.isRequired,
};

export default Store;
