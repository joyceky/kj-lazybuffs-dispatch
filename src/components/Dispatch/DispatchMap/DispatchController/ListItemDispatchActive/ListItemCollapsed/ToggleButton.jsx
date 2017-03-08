import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleActiveListItem } from '../../../../../../actions';

class ToggleButton extends Component {
  render() {
    return (
      <button
        onClick={() => this.props.toggleActiveListItem(this.props.orderId)}
        style={buttonStyle}
      >
        <i
          style={this.props.activeListItem === this.props.orderId
          ? iconActiveStyle
          : iconStyle}
          className="material-icons"
        >
        keyboard_arrow_down
        </i>
      </button>
    );
  }
}

const buttonStyle = {
  margin: '0',
  marginLeft: '16px',
  color: 'rgba(0,0,0,0.7)',
  outline: 'none',
};

const iconStyle = {
  fontSize: '32px',
};

const iconActiveStyle = {
  fontSize: '32px',
  color: '#FFD54F',
};

function mapStateToProps({ activeListItem }) {
  return { activeListItem };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleActiveListItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ToggleButton);
