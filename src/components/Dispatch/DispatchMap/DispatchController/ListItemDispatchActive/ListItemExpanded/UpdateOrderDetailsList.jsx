import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveUpdatedOrderDetails } from '../../../../../../actions';
import MaterialInput from './MaterialInput';

class UpdateOrderDetailsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subTotal: parseFloat(this.props.order.orderSubTotal),
      tax: parseFloat(this.props.order.orderTax),
      fee: parseFloat(this.props.order.orderFee),
      tip: parseFloat(this.props.order.orderTip),
      total: parseFloat(this.props.order.orderTotal),
      paymentType: this.props.order.orderPaymentType,
    };
    this.handleSubTotalChange = this.handleSubTotalChange.bind(this);
    this.handleTaxChange = this.handleTaxChange.bind(this);
    this.handleFeeChange = this.handleFeeChange.bind(this);
    this.handleTipChange = this.handleTipChange.bind(this);
    this.handleTotalChange = this.handleTotalChange.bind(this);
    this.handlePaymentType = this.handlePaymentType.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.saveUpdatedOrderId === this.props.order.orderId) {
      this.props.saveUpdatedOrderDetails(this.state);
    }
  }

  handleSubTotalChange(e){
    this.setState({ subTotal: e.target.value });
  }
  handleTaxChange(e){
    this.setState({ tax: e.target.value });
  }
  handleFeeChange(e){
    this.setState({ fee: e.target.value });
  }
  handleTipChange(e){
    this.setState({ tip: e.target.value });
  }
  handleTotalChange(e){
    this.setState({ total: e.target.value });
  }
  handlePaymentType(e){
    this.setState({ paymentType: e.target.value });
  }


  render(){
    const order = this.props.order;
    return (
      <ul style={style.list}>
        <li>
          <MaterialInput
            type='integer'
            value={this.state.subTotal}
            onChange={this.handleSubTotalChange}
            label='Sub Total'
          />
        </li>
        <li>
          <MaterialInput
            type='integer'
            value={this.state.tax}
            onChange={this.handleTaxChange}
            label='Tax'
          />
        </li>
        <li>
          <MaterialInput
            type='integer'
            value={this.state.fee}
            onChange={this.handleFeeChange}
            label='Fee'
          />
        </li>
        <li>
          <MaterialInput
            type='integer'
            value={this.state.tip}
            onChange={this.handleTipChange}
            label='Tip'
          />
        </li>
        <li>
          <MaterialInput
            type='integer'
            value={this.state.total}
            onChange={this.handleTotalChange}
            label='Total'
          />
        </li>
        <li style={style.listItem}>
          <h1 style={style.totals}>Payment Type: </h1>
          <select onChange={this.handlePaymentType}>
            <option value="cash">Cash</option>
            <option value="credit">Credit</option>
            <option value="flatiron">Flat Iron</option>
            <option value="prepaid">Prepaid</option>
          </select>
        </li>
        <li style={style.listItem}>
          <h1 style={style.totals}>Age Restricted?</h1>
          <span style={style.totals}>{this.props.order.orderAgeRestricted ? this.props.order.orderAgeRestricted : 'no'}</span>
        </li>
      </ul>
    );
  }
};

const style = {
  list: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    listStyle: 'none',
    margin: '0',
    padding: '0',
  },
  storeName: {
    fontSize: '20px',
  },
  totals: {
    fontSize: '16px',
    padding: '0',
    margin: '0',
  },
  paymentSelect: {
    margin: '16px 0',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

function mapStateToProps({ auth, saveUpdatedOrderId }) {
  return { auth, saveUpdatedOrderId };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveUpdatedOrderDetails }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateOrderDetailsList);
