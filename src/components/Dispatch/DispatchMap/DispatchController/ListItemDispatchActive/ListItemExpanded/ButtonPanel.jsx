import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveUpdatedOrder, saveUpdatedOrderToDB, clearActiveSave } from '../../../../../../actions';
import EditOrderButton from './EditOrderButton';
import DeleteOrderButton from './DeleteOrderButton';

class ButtonPanel extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.activeOrderUpdateId === this.props.order.orderId && this.props.type !== 'Customer') {

      if (Object.keys(nextProps.saveUpdatedState).length === 3) {
        this.props.saveUpdatedOrderToDB(nextProps.saveUpdatedState, this.props.activeOrderUpdateId);
        this.props.clearActiveSave();
      }
    }
  }

  render() {
    if (this.props.type !== 'Customer') return <section></section>;
    else {
      return (
        <section>
        {this.props.activeOrderUpdateId === this.props.order.orderId
        ? (
            <button
              onClick={() => this.props.saveUpdatedOrder(this.props.order.orderId)}
              style={buttonStyle}
            >
              <i style={iconStyle} className='material-icons'>save</i>
            </button>
          )
        : null}
        <EditOrderButton order={this.props.order} />
        <DeleteOrderButton orderId={this.props.order.orderId} />
        </section>
      );
    }
  }
};

const buttonStyle = {
  width: '50px',
  marginRight: '16px',
  backgroundColor: '#009688',
  color: 'white',
  borderRadius: '4px',
  outline: 'none',
};

const iconStyle = {
  fontSize: '24px',
};

ButtonPanel.propTypes = {
  type: React.PropTypes.string.isRequired,
}

function mapStateToProps({ activeOrderUpdateId, saveUpdatedState }) {
  return { activeOrderUpdateId, saveUpdatedState };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveUpdatedOrder, saveUpdatedOrderToDB, clearActiveSave }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonPanel);
