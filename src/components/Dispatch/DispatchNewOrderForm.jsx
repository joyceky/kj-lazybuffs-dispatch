import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { submitOrder, API_URL, loadStores } from '../../actions';
import { bindActionCreators } from 'redux';
import MaterialInput from '../Material/MaterialInput';

class DispatchNewOrderForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      storeSelectId: 1,
      phone: '',
      name: '',
      address: '',
      unit: '',
      zip: '',
      name: '',
      subTotal: 0,
      tax: 0,
      tip: 0,
      fee: 2.00,
      total: 0,
      paymentType: 'credit',
      readyIn: 20,
      ageRestricted: false,
      licenseNum: '',
      licenseAddress: '',
      licenseDOB: '',
      licenseExp: '',
      note: '',
      repeatCustomerId: null,
      confirmRepeatCustomer: false,
    };
    this.onAgeRestrictedOffChange = this.onAgeRestrictedOffChange.bind(this);
    this.onAgeRestrictedOnChange = this.onAgeRestrictedOnChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
    this.handleSubTotalChange = this.handleSubTotalChange.bind(this);
    this.handleTaxChange = this.handleTaxChange.bind(this);
    this.handleFeeChange = this.handleFeeChange.bind(this);
    this.handleTipChange = this.handleTipChange.bind(this);
    this.handlePaymentType = this.handlePaymentType.bind(this);
    this.handleReadyIn = this.handleReadyIn.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.calcTotal = this.calcTotal.bind(this);
    this.handleLicenseNum = this.handleLicenseNum.bind(this);
    this.handleLicenseAddress = this.handleLicenseAddress.bind(this);
    this.handleLicenseDOB = this.handleLicenseDOB.bind(this);
    this.handleLicenseExp = this.handleLicenseExp.bind(this);
    this.handleStoreSelect = this.handleStoreSelect.bind(this);
  }
  componentDidMount(){
    this.props.loadStores(this.props.auth);
  }

  onAgeRestrictedOffChange(e){
    this.setState({ ageRestricted: false });
  }
  onAgeRestrictedOnChange(e){
    this.setState({ ageRestricted: true });
  }
  handleLicenseNum(e){
    this.setState({ licenseNum: e.target.value });
  }
  handleLicenseAddress(e){
    this.setState({ licenseAddress: e.target.value });
  }
  handleLicenseDOB(e){
    this.setState({ licenseDOB: e.target.value });
  }
  handleLicenseExp(e){
    this.setState({ licenseExp: e.target.value });
  }

  handlePhoneChange(e){
    this.setState({ phone: e.target.value });
    if (e.target.value.length >= 10){
      let str = e.target.value.replace(/[\s-()]/g,'' );
      if(str.length === 10) this.customerLookupByPhone(str);
    }
  }

  customerLookupByPhone(num){
    axios.post(`${API_URL}/customer/num`, { num })
    .then(({ data }) => {
      if (data.err) return;
      if(data.customerName) this.setState({ name: data.customerName });
      if(data.customerAddress) this.setState({ address: data.customerAddress });
      if(data.customerUnit) this.setState({ unit: data.customerUnit });
      if(data.customerZip) this.setState({ zip: data.customerZip });
      if(data.customerNotes) this.setState({ note: data.customerNotes });
      const num = data.customerPhone.slice(0,3) + '-' + data.customerPhone.slice(3,6) + '-' + data.customerPhone.slice(6,10);
      this.setState({ phone: num, repeatCustomerId: data.customerId });
    })
    .catch(err => console.log(err));
  }

  handlePaymentType(e){
    this.setState({ paymentType: e.target.value });
  }

  handleStoreSelect(e) {
    this.setState({ storeSelectId: e.target.value });
  }
  handleReadyIn(e){
    this.setState({ readyIn: e.target.value });
  }
  handleNameChange(e){
    this.setState({ name: e.target.value });
  }
  handleAddressChange(e){
    this.setState({ address: e.target.value });
  }
  handleUnitChange(e){
    this.setState({ unit: e.target.value });
  }
  handleZipChange(e){
    this.setState({ zip: e.target.value });
  }
  handleSubTotalChange(e){
    this.setState({
      subTotal: e.target.value,
    });
    setTimeout(this.calcTotal, 500);
  }
  handleTaxChange(e){
    this.setState({
      tax: e.target.value,
    });
    setTimeout(this.calcTotal, 500);
  }
  handleFeeChange(e){
    this.setState({
      fee: e.target.value,
    });
    setTimeout(this.calcTotal, 500);
  }
  handleTipChange(e){
    this.setState({
      tip: e.target.value,
    });
    setTimeout(this.calcTotal, 500);
  }
  calcTotal(){
    let subTotal = parseFloat(this.state.subTotal);
    let tax = parseFloat(this.state.tax);
    let fee = parseFloat(this.state.fee);
    let tip = parseFloat(this.state.tip);
    // handle empty spaces
    if (subTotal !== subTotal) subTotal = 0;
    if (tax !== tax) tax = 0;
    if (fee !== fee) fee = 0;
    if (tip !== tip) tip = 0;
    let total = subTotal + tax + tip + fee;
    this.setState({ total: total.toFixed(2) });
  }

  handleNoteChange(e){
    this.setState({
      note: e.target.value,
    });
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.submitOrder(this.state, this.props.auth);
  }

  render() {
    return (
      <section style={style.container}>
        <form onSubmit={this.handleSubmit} style={style.form}>
        <section style={style.storeSelect}>
          <span>Store: </span>
          <select onChange={this.handleStoreSelect}>
            {this.props.dispatchStores.map((store) => {
              return (
                <option
                key={store.storeId}
                value={store.storeId}>
                  {store.storeName}
                </option>
              );
            })}
          </select>
        </section>
        <MaterialInput
          onChange={this.handlePhoneChange}
          value={this.state.phone}
          label='Phone'
          type='tel'
        />
        <MaterialInput
          onChange={this.handleNameChange}
          value={this.state.name}
          label='Name'
        />
        <MaterialInput
          onChange={this.handleAddressChange}
          value={this.state.address}
          label='Address'
        />
        <MaterialInput
          onChange={this.handleUnitChange}
          value={this.state.unit}
          label='Unit'
        />
        <MaterialInput
          onChange={this.handleZipChange}
          value={this.state.zip}
          label='Zip'
        />
        <section style={style.section}>
          <span>Payment Type: </span>
          <select onChange={this.handlePaymentType}>
            <option value="cash">Cash</option>
            <option value="credit" default>Credit</option>
            <option value="flatiron">Flat Iron</option>
            <option value="prepaid">Prepaid</option>
          </select>
        </section>

        <section style={style.section}>
          <span> Ready In: </span>
          <select onChange={this.handleReadyIn}>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20" default>20</option>
            <option value="25">25</option>
            <option value="30">30</option>
          </select>
        </section>


        <section style={style.section}>
          <span>Age Restricted: </span>
          <label> No
          <input type="radio" checked={!this.state.ageRestricted} onChange={this.onAgeRestrictedOffChange} />
          </label>
          <label> Yes
          <input type="radio" checked={this.state.ageRestricted} onChange={this.onAgeRestrictedOnChange} />
          </label>
        </section>

        {this.state.ageRestricted
          ? <section style={style.section}>
              <span style={style.ageRestrictedWarning}>Drivers License Must Match Exactly</span>
              <MaterialInput
                onChange={this.handleLicenseNum}
                value={this.state.licenseNum}
                label='License Number'
              />
              <MaterialInput
                onChange={this.handleLicenseAddress}
                value={this.state.licenseAddress}
                label='License Address'
              />
              <MaterialInput
                onChange={this.handleLicenseDOB}
                value={this.state.licenseDOB}
                label='License Date Of Birth'
              />
              <MaterialInput
                onChange={this.handleLicenseExp}
                value={this.state.licenseExp}
                label='License Expiration Date'
              />
            </section>
          : null}

        <section>
          <MaterialInput
            onChange={this.handleSubTotalChange}
            value={this.state.subTotal}
            label='Sub Total'
            type='integer'
          />
          <MaterialInput
            onChange={this.handleTaxChange}
            value={this.state.tax}
            label='Tax'
            type='integer'
          />
          <MaterialInput
            onChange={this.handleTipChange}
            value={this.state.tip}
            label='Tip'
            type='integer'
          />
          <MaterialInput
            onChange={this.handleFeeChange}
            value={this.state.fee}
            label='Fee'
            type='integer'
          />
          <p>Total: {this.state.total}</p>
        </section>

        <textarea
          style={style.textarea}
          placeholder="Notes"
          cols='8'
          rows='4'
          onChange={this.handleNoteChange}
          value={this.state.note}
        />

        <button type='submit' style={style.submitButton} onClick={this.handleSubmit}>Submit</button>
      </form>
      </section>
    );
  }
}

const style = {
  container: {
    position: 'fixed',
    top: '50px',
    left: '0',
    display: 'flex',
    width: '100%',
    height: 'calc(100% - 50px)',
    overflow: 'scroll',
  },
  storeSelect: {
    width: '100%',
  },
  ageRestrictedWarning: {
    color: '#E57373',
  },
  form: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'scroll',
  },
  textarea: {
    width: '100%',
    minHeight: '32px',
    border: '1px solid grey',
    marginBottom: '16px',
  },
  section: {
    marginBottom: '16px',
  },
  submitButton: {
    borderRadius: '4px',
    backgroundColor: '#43A047',
    color: 'white',
    width: '100%',
    fontSize: '32px',
  },
  confirmModal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'fixed',
    top: '50px',
    left: '0px',
    width: '100%',
    height: '40vh',
  },
};

function mapStateToProps({ auth, dispatchStores }){
  return { auth, dispatchStores };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ submitOrder, loadStores }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DispatchNewOrderForm);
