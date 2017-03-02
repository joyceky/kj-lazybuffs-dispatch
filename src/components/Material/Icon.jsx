import React from 'react';

const Icon = ({ iconName, style }) => {
  return <i className='material-icons' style={style}>{iconName}</i>
};

Icon.propTypes = {
  iconName: React.PropTypes.string.isRequired,
};

export default Icon;
