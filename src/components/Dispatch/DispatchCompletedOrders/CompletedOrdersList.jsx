import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItemCompleted from './ListItemCompleted';

class CompletedOrdersList extends Component {
  render() {
    return (
      <section style={style.list}>
        {this.props.orders.map(order => {
          return <ListItemCompleted order={order} key={`compl${order.orderId}`}/>
        })}
      </section>
    );
  }
}

const listSortBy = {
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  margin: '8px',
};

const style = {
  list: {
    width: '100%',
    margin: '0',
    padding: '0',
  },
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, null)(CompletedOrdersList);
