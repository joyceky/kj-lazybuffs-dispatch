import React, { Component } from 'react';
import { connect } from 'react-redux';
// import ListItemCollapsed from './ListItemCollapsed';
// import ListItemExpanded from './ListItemExpanded';

class InvoiceOrder extends Component {
  render() {
    let style = {
      width: '100%',
      borderBottom: '1px solid lightgrey',
      pading: '0',
      margin: '0',
    };
    return (
      <div>
        <section style={style}>
          <span>{this.props.order.customerAddress}</span>
        </section>
      </div>
    );
  }
}

function mapStateToProps({ activeListItem }) {
  return { activeListItem };
}

export default connect(mapStateToProps, null)(InvoiceOrder);
