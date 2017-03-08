import React from 'react';

const Header = ({ type, order }) => {
  return (
    <section style={headerStyle}>
      <span style={subTitleStyle}>{type}</span>
    </section>
  );
};

const headerStyle = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '16px',
  marginBottom: '16px',
};

const subTitleStyle = {
  textDecoration: 'underline',
  fontSize: '16px',
};

Header.propTypes = {
  type: React.PropTypes.string.isRequired,
}

export default Header;
