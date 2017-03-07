import React, { Component } from 'react';
import { connect } from 'react-redux';
// import ListItemCollapsed from './ListItemCollapsed';
// import ListItemExpanded from './ListItemExpanded';

class InvoiceOrder extends Component {
render() {

    let date = new Date(parseInt(this.props.order.orderCreatedAt) - 420000);
    let dateString = `${date.getMonth()}/${date.getUTCDate()}/${date.getUTCFullYear()}`;
    console.log();

    return (

        <section style={styles}>
          <span>{dateString}</span>
        </section>
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
