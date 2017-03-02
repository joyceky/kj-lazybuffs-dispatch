import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveUpdatedCustomerDetails } from '../../../../../../actions';
import MaterialInput from './MaterialInput';

const stylePhone = (num) => {
  return `${num.slice(0,3)}-${num.slice(3,6)}-${num.slice(6,10)}`;
}

const Address = ({ address, unit }) => {
  return(
    <span>
      {unit ? `${address} ${unit}` : address}
    </span>
  );
}

class CustomerDetailsList extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.order.customerName,
      address: this.props.order.customerAddress,
      phone: this.props.order.customerPhone,
      unit: this.props.order.customerUnit,
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.saveUpdatedOrderId === this.props.order.orderId) {
      this.props.saveUpdatedCustomerDetails(this.state);
    }
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleAddressChange(e) {
    this.setState({ address: e.target.value });
  }

  handlePhoneChange(e) {
    this.setState({ phone: e.target.value });
  }

  handleUnitChange(e) {
    this.setState({ unit: e.target.value });
  }

  render() {
    return (
      <ul style={{listStyle: 'none', margin: '0', marginBottom: '16px', padding: '0', width: '100%'}}>
        <li style={{fontSize: '16px'}}>
          <MaterialInput value={this.state.name} label='Name' onChange={this.handleNameChange} />
        </li>
        <li style={{fontSize: '16px'}}>
          <MaterialInput value={this.state.address} label='Address' onChange={this.handleAddressChange} />
        </li>
        <li style={{fontSize: '16px'}}>
          <MaterialInput value={this.state.unit} label='Unit' onChange={this.handleUnitChange} />
        </li>
        <li style={{fontSize: '16px'}}>
          <MaterialInput value={this.state.phone} label='Phone' onChange={this.handlePhoneChange} />
        </li>
      </ul>
    );
  }
};
function mapStateToProps({ saveUpdatedOrderId }) {
  return { saveUpdatedOrderId };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveUpdatedCustomerDetails }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailsList);
