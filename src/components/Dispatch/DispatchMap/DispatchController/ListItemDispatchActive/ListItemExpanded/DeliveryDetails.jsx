import React, { Component } from 'react';
import { connect } from 'react-redux';
import UpdateDeliveryDetails from './UpdateDeliveryDetails';

const stylePhone = (num) => `${num.slice(0,3)}-${num.slice(3,6)}-${num.slice(6,10)}`;

class DeliveryDetails extends Component {
  render() {
    const match = this.props.activeOrderUpdateId === this.props.order.orderId;
    if (match) return <UpdateDeliveryDetails order={this.props.order} drivers={this.props.dispatchDrivers} />;
    return (
      <article>
        <h1 style={style.title}>Delivery</h1>

        <section style={style.row}>
          <span>Status</span>
          <span>{this.props.order.orderStatus.toUpperCase()}</span>
        </section>

        <section style={style.row}>
          <span>Driver</span>
          <span>{this.props.order.driverId
            ? `${this.props.order.driverName} (${stylePhone(this.props.order.driverPhone)})`
            : `UNASSIGNED`}
          </span>
        </section>


      </article>
    );
  }
}

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
};

function mapStateToProps({ activeOrderUpdateId, dispatchDrivers }) {
  return { activeOrderUpdateId, dispatchDrivers };
}

export default connect(mapStateToProps, null)(DeliveryDetails);
