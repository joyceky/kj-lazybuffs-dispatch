import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { confirmOrderDelete } from '../../../../../../actions';

class DeleteOrderButton extends Component {


  render() {
    return(
      <button
        style={buttonStyle}
        onClick={() => this.props.confirmOrderDelete(this.props.orderId)}
      >
        <i
          style={iconStyle}
          className="material-icons"
        >
          delete_forever
        </i>
      </button>
    );
  }
}
const buttonStyle = {
  width: '50px',
  backgroundColor: '#FF5722',
  borderRadius: '4px',
  color: 'white',
};

const iconStyle = {
  fontSize: '24px',
};

// function mapStateToProps({ confirm }) {
//   return { confirm };
// }
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ confirmOrderDelete }, dispatch);
}

export default connect(null, mapDispatchToProps)(DeleteOrderButton);
