import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { assignOrder } from '../../../../actions';
import Minutes from './Minutes';

const DateId = ({ orderId, createdAt }) => {
  return (
    <span>
      {`ID: ${new Date(parseInt(createdAt)).getMonth() + 1}${new Date(parseInt(createdAt)).getDate()}${orderId}`}
    </span>
  );
};

const stylePhone = (num) => {
  return `${num.slice(0,3)}-${num.slice(3,6)}-${num.slice(6,10)}`;
};

const Address = ({ address, unit }) => {
  return(
    <span>
      {unit ? `${address} ${unit}` : address}
    </span>
  );
};

class UnassignedOrders extends Component {
  constructor(props){
    super(props);
    this.state = {
      hovered: false,
    };
    this.toggleHover = this.toggleHover.bind(this);
  }

  toggleHover() {
    this.setState({ hovered: !this.state.hovered });
  }


  render() {
    return (
      <li
        style={ordersListStyle}
        onClick={this.toggleHover}
      >
        <section style={style.header}>
          <p style={style.title}>{this.props.order.storeName}</p>
          <DateId orderId={this.props.order.orderId} createdAt={this.props.order.orderCreatedAt} />
          <Minutes createdAt={this.props.order.orderCreatedAt} readyIn={this.props.order.orderReadyIn} />
        </section>
        <section style={style.footer}>
          <Address address={this.props.order.customerAddress} unit={this.props.order.customerUnit} />
          <span>{this.props.order.customerName}</span>
          <span>{stylePhone(this.props.order.customerPhone)}</span>
        </section>
        {this.state.hovered
          ? <ul>
            {this.props.dispatchDrivers.map(driver => {
              return (
                <li
                  key={`${driver.driverId}as`}
                  onClick={() => this.props.assignOrder(this.props.order.orderId, driver.driverId)}
                >
                  {driver.driverName}
                </li>
              );
            })}
          </ul>
          : null}
      </li>
    );
  }
}
const style = {
  title: {
    display: 'flex',
    alignItems: 'center',
    margin: '0',
    padding: '0',
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '16px',
  },
};

const hoveredStyle = {
  display: 'flex',
  padding: '8px',
  flexDirection: 'column',
  backgroundColor: 'lightgrey',
  cursor: 'pointer',
};

const ordersListStyle = {
  display: 'flex',
  padding: '8px',
  flexDirection: 'column',
};

function mapStateToProps({ dispatchDrivers }) {
  return { dispatchDrivers };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ assignOrder }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UnassignedOrders);
