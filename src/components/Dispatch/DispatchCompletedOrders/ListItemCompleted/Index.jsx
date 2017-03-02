import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItemCollapsed from './ListItemCollapsed';
import ListItemExpanded from './ListItemExpanded';

class ListItemCompleted extends Component {
  render() {
    let style = {
      width: '100%',
      borderBottom: '1px solid lightgrey',
      pading: '0',
      margin: '0',
    };
    return (
      <section style={style}>
        <ListItemCollapsed order={this.props.order} />

        {this.props.activeListItem === this.props.order.orderId
          ? <ListItemExpanded order={this.props.order} />
          : null
        }
      </section>
    );
  }
}

function mapStateToProps({ activeListItem }) {
  return { activeListItem };
}

export default connect(mapStateToProps, null)(ListItemCompleted);
