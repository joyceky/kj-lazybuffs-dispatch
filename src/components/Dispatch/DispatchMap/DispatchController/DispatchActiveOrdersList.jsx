import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadAllActiveOrders } from '../../../../actions';
import { bindActionCreators } from 'redux';
import ListItemDispatchActive from './ListItemDispatchActive';

class DispatchActiveOrdersList extends Component {
  componentDidMount(){
    this.props.loadAllActiveOrders(this.props.auth);
  }

  mapListItems(orders) {
    return orders.map(order => {
      return <ListItemDispatchActive order={order} key={order.orderId} />
    });
  }

  render() {
    return (
      <section style={style.container}>
        {this.props.dispatchOrders.length === 0
        ? <span style={style.subContainer}>
            <h1 style={style.title}>Currently No Active Orders</h1>
          </span>
        : <ul style={style.listStyle}>
            {this.mapListItems(this.props.dispatchOrders)}
          </ul>
        }
      </section>
    );
  }
}
const style = {
  container: {
    display: 'flex',
  },
  subContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: '20px',
    margin: '16px',
    padding: '0',
  },
  listStyle: {
    listStyle: 'none',
    margin: '0',
    padding: '0',
    width: '100%',
  },
};

function mapStateToProps({ auth, dispatchOrders }) {
  return { auth, dispatchOrders };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadAllActiveOrders }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(DispatchActiveOrdersList);
