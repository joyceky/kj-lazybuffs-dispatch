import React from 'react';

const RaisedButton = (props) => {
  props.style.boxShadow = '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)';
  return (
    <button
      style={props.style}
      type={props.type ? props.type : 'button'}
    >
      {props.children}
    </button>
  );
}

RaisedButton.propTypes = {
  style: React.PropTypes.object.isRequired,
}

export default RaisedButton;
