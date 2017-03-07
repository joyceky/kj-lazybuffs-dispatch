import React, { Component } from 'react';
import { connect } from 'react-redux';

class OrderCommissionRow extends Component {
render() {

    let date = `${this.props.month}/${this.props.order.date}/${this.props.year}`;

    return (
        <tr>
          <td style={style.tableData}>{date}</td>
          <td style={style.tableData}>
            <span style={style.commission}>Phone Delivery Orders: Phone Order Commission</span>
            <br></br>
              {this.props.order.total} @ 5%
          </td>
          <td style={style.tableData}>${(this.props.order.total * 0.05).toFixed(2)}</td>
        </tr>
    );
  }
}

const style = {
  tableData: {
    paddingBottom: '5px'
  },
  commission: {
    fontWeight: '500'
  }
}

function mapStateToProps({ activeListItem }) {
  return { activeListItem };
}

export default connect(mapStateToProps, null)(OrderCommissionRow);
