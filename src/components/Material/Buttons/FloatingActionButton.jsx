import React, { Component } from 'react';
import Icon from '../Icon';

const FloatingActionButton = ({ iconName, onClick, style }) => {
  return (
    <button
      onClick={onClick}
      style={style.button}
    >
      <Icon iconName={iconName} style={style.icon} />
    </button>
  );
}

export default FloatingActionButton;
