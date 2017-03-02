import React from 'react';

const StatusColorCircle = ({ orderStatus }) => {
  let style = {
    width: '24px',
    height: '24px',
    borderRadius: '12px',
    marginRight: '16px',
  };
  switch (orderStatus) {
    case 'unassigned':
      style.backgroundColor = 'red';
      break;
    case 'assigned':
      style.backgroundColor = 'orange';
      break;
    case 'confirmed':
      style.backgroundColor = 'green';
      break;
    case 'waiting':
      style.backgroundColor = 'yellow';
      break;
    case 'pickedUp':
      style.backgroundColor = 'lightblue';
      break;
    default:
  }
  return <span style={style}></span>
};

export default StatusColorCircle;
