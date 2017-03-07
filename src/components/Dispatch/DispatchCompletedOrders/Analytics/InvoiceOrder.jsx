import React, { Component } from 'react';
import { connect } from 'react-redux';
// import ListItemCollapsed from './ListItemCollapsed';
// import ListItemExpanded from './ListItemExpanded';

class InvoiceOrder extends Component {
render() {

    let date = `${this.props.month}/${this.props.order.date}/${this.props.year}`;

    return (
        <tr>
          {this.props.order.orders > 0 ?
            <div>
              <td>{date}</td>
              <td>{this.props.order.orders} at $2.50</td>
              <td>Fee Total: {(this.props.order.orders * 2.50).toFixed(2)}</td>
              <td>Percentage Total: {(this.props.order.total * 0.05).toFixed(2)}</td>
            </div>
          : null}
        </tr>
    );

    const styles = {
      width: '100%',
      borderBottom: '1px solid lightgrey',
      pading: '0',
      margin: '0',
    };
  }
}

function mapStateToProps({ activeListItem }) {
  return { activeListItem };
}

export default connect(mapStateToProps, null)(InvoiceOrder);
