import React, { Component } from 'react';
import { connect } from 'react-redux';
class OrderDetailsList extends Component {
  render(){
    const order = this.props.order;
    const match = this.props.activeOrderUpdateId === order.orderId;
    if (match) return <UpdateOrderDetailsList order={order} />;
    else {
      return (
        <ul style={style.list}>
          <li style={listItem}>
            <span style={style.totals}>SubTotal:</span>
            <span style={style.totals}>${order.orderSubTotal}</span>
          </li>
          <li style={listItem}>
            <span style={style.totals}>Tax:</span>
            <span style={style.totals}>${order.orderTax}</span>
          </li>
          <li style={listItem}>
            <span style={style.totals}>Fee:</span>
            <span style={style.totals}>${order.orderFee}</span>
          </li>
          <li style={listItem}>
            <span style={style.totals}>Tip:</span>
            <span style={style.totals}>${order.orderTip}</span>
          </li>
          <li style={listItem}>
            <span style={style.totals}>Total:</span>
            <span style={style.totals}>${order.orderTotal}</span>
          </li>
          <li style={listItem}>
            <span style={style.totals}>Payment Type:</span>
            <span style={style.totals}>{order.orderPaymentType}</span>
          </li>
        </ul>
      );
    }
  }
};

const style = {
  storeName: {
    fontSize: '20px',
  },
  totals: {
    fontSize: '16px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    margin: '0',
    padding: '0',
    width: '280px',
  },
};


const listItem = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
};

function mapStateToProps({ activeOrderUpdateId }) {
  return { activeOrderUpdateId };
}

export default connect(mapStateToProps, null)(OrderDetailsList);
