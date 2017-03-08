import React, { Component } from 'react';
import { connect } from 'react-redux';

class OrderCommissionRow extends Component {
render() {

    let date = `${this.props.month}/${this.props.order.date}/${this.props.year}`;

    return (
        <tr>
          <td style={style.tableData}>{date}</td>
          <td style={style.tableData}>
            <span style={{fontWeight: 'bold', fontSize: '16px'}}>Phone Delivery Orders: Phone Order Commission</span>
            <br></br>
              ${this.props.order.total} @ 5%
          </td>
          <td style={style.tableData}>${(this.props.order.total * 0.05).toFixed(2)}</td>
        </tr>
    );
  }
}

const style = {
  tableData: {
    padding: '2px 5px 5px 2px'
  },
  commission: {
    fontWeight: 'bold'
  }
}

function mapStateToProps({ activeListItem }) {
  return { activeListItem };
}

export default connect(mapStateToProps, null)(OrderCommissionRow);
