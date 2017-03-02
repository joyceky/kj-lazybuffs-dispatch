import React, { Component } from 'react';
import { connect } from 'react-redux';
import CompletedOrdersList from './CompletedOrdersList';
import BarChartComponent from './Graphs/BarChart';
import axios from 'axios';
import { API_URL } from '../../../actions';



class CompletedOrders extends Component {
  constructor() {
    super();

    let today = new Date(Date.now());

    this.state = {
      orders: [],
      month: today.getMonth()
    };

    this.getOrdersForMonth = this.getOrdersForMonth.bind(this);
    // this.onMonthChange = this.onMonthChange.bind(this);
    this.formatData = this.formatData.bind(this);
  }

  componentDidMount() {
  //  this.props.getCompletedOrders(this.props.auth, 'today');
   this.getOrdersForMonth(this.state.month);
  }

  getOrdersForMonth(month) {
    axios.post(`${API_URL}/dispatch/orders/completed/month`, { auth: this.props.auth, month })
    .then(({ data }) => {
      console.log(data);
      this.setState({ orders: data, month: parseInt(month) });
    })
  }

  formatData(orders) {
    const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

    const cleanData = days.map((day) => {
      const daysOrders = orders.filter((order) => {
        if ( new Date(parseInt(order.orderCreatedAt)).getDate() === day) return true;
      });

      const total = daysOrders.reduce((curr, nextOrder) => {
         return curr + parseFloat(nextOrder.orderSubTotal);
      }, 0);

      return { date: day, total, orders: daysOrders.length };
    });
    console.log("CLEANDATA", cleanData);
    return cleanData;
  }
  //
  // onMonthChange(event) {
  //   // console.log("event target val", event.target.value);
  //   this.getOrdersForMonth(event.target.value);
  // }

  render() {
    return (
      <div>
        <section style={style.container}>
          {/* {this.state.orders.length === 0
          ? <span style={subContainer}>
              <h1 style={title}>No Completed Orders Today</h1>
            </span>
          : <CompletedOrdersList orders={this.state.orders} /> } */}
        </section>
        <BarChartComponent orders={this.formatData(this.state.orders)} dataKey="orders" color="#7830ee" />
        <BarChartComponent orders={this.formatData(this.state.orders)} dataKey="total" color="#29cb56" />
      </div>
    );
  }
}

const subContainer = {
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'center',
};
const title = {
  fontSize: '20px',
  margin: '16px',
  padding: '0',
};


const style = {
  container: {
    position: 'fixed',
    top: '50px',
    left: '0',
    height: 'calc(100% - 50px)',
    width: '100%',
    overflow: 'scroll',
  },
  title: {
    margin: '0',
    marginTop: '8px',
    padding: '0',
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, null)(CompletedOrders);
