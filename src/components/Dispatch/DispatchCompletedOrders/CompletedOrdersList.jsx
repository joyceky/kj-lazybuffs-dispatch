import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCompletedOrders, getDispatchCompletedOrdersSortBy } from '../../../actions';
import ListItemCompleted from './ListItemCompleted';


class CompletedOrdersList extends Component {
  handleSortBy(sortStr){
    this.props.getDispatchCompletedOrdersSortBy(sortStr, this.props.auth);
  }

  render() {
    return (
      <section style={style.list}>
        <section style={listSortBy}>
          <button onClick={() => this.handleSortBy('day')}>Today</button>
          <button onClick={() => this.handleSortBy('month')}>Month</button>
          <button onClick={() => this.handleSortBy('year')}>Year</button>
        </section>
        {this.props.dispatchCompletedOrders.map(order => {
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

function mapStateToProps({ auth, dispatchCompletedOrders }) {
  return { auth, dispatchCompletedOrders };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCompletedOrders, getDispatchCompletedOrdersSortBy }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletedOrdersList);
