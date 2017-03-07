import React, { Component } from 'react';
import { connect } from 'react-redux';

class InvoiceOrder extends Component {
render() {

    let date = `${this.props.month}/${this.props.order.date}/${this.props.year}`;

    return (
        <tr>
              <td style={style.tableData}>{date}</td>
              <td style={style.tableData}>
                <span style={{fontWeight: 'bold', fontSize: '18px'}}>Phone Delivery Orders</span>
                <br></br>
                {this.props.order.orders} @ $2.50</td>
              <td style={style.tableData}>${(this.props.order.orders * 2.50).toFixed(2)}</td>
        </tr>
    );
  }
}

const style = {
  tableData: {
    padding: '2px 5px 5px 2px'
  }
}

function mapStateToProps({ activeListItem }) {
  return { activeListItem };
}

export default connect(mapStateToProps, null)(InvoiceOrder);
