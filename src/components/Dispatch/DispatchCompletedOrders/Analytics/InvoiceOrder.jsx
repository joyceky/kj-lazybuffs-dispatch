import React, { Component } from 'react';
import { connect } from 'react-redux';

class InvoiceOrder extends Component {
render() {

    let date = `${this.props.month}/${this.props.order.date}/${this.props.year}`;

    return (
        <tr>
          {/* {this.props.order.orders > 0 ? */}
              <td style={style.tableData}>{date}</td>
              <td style={style.tableData}>
                <strong>Phone Delivery Orders</strong>
                <br></br>
                {this.props.order.orders} @ $2.50</td>
              <td style={style.tableData}>${(this.props.order.orders * 2.50).toFixed(2)}</td>
          {/* : null} */}
        </tr>
    );
  }
}

const style = {
  tableData: {
    paddingBottom: '3px'
  }
}

function mapStateToProps({ activeListItem }) {
  return { activeListItem };
}

export default connect(mapStateToProps, null)(InvoiceOrder);
