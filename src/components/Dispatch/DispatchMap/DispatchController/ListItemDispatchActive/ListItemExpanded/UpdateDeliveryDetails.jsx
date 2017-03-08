import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveUpdatedDeliveryDetails } from '../../../../../../actions';

const stylePhone = (num) => `${num.slice(0,3)}-${num.slice(3,6)}-${num.slice(6,10)}`;

class UpdateDeliveryDetails extends Component {
  constructor(props){
    super(props);
    console.log(this.props.order);
    this.state = {
      status: this.props.order.orderStatus,
      driverId: this.props.order.driverId,
    };
    this.handleDriverChange = this.handleDriverChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.saveUpdatedOrderId === this.props.order.orderId) {
      this.props.saveUpdatedDeliveryDetails(this.state);
    }
  }

  handleStatusChange(e){
    this.setState({ status: e.target.value });
  }

  handleDriverChange(e){
    this.setState({ driverId: e.target.value });
  }

  render() {
    return (
      <article>
        <h1 style={style.title}>Delivery</h1>

        <section style={style.row}>
          <span>Status</span>

          <select value={this.state.status} onChange={this.handleStatusChange}>
            <option value='unassigned'>Unassigned</option>
            <option value='assigned'>Assigned</option>
            <option value='confirmed'>Confirmed</option>
            <option value='waiting'>Waiting</option>
            <option value='pickedUp'>Picked Up</option>
            <option value='completed'>Completed</option>
          </select>

        </section>

        <section style={style.row}>
          <span>Driver</span>

          <select value={this.state.driverId} onChange={this.handleDriverChange}>
            {this.props.drivers.map(driver => {
              return <option key={`sd${driver.driverId}`} value={driver.driverId}>{`${driver.driverName} (${driver.driverPhone})`}</option>
            })}
          </select>
        </section>
      </article>
    );
  }
}
// TODO: possible bug with multiple names

const style = {
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    margin: '16px 0px 8px 0px',
    padding: '0',
    fontSize: '18px',
  },
}
function mapStateToProps({ saveUpdatedOrderId }) {
  return { saveUpdatedOrderId };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveUpdatedDeliveryDetails }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDeliveryDetails);
