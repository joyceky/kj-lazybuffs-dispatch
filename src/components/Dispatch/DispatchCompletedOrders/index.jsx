import React, { Component } from 'react';
import { connect } from 'react-redux';
import CompletedOrdersList from './CompletedOrdersList';
import BarChartComponent from './Graphs/BarChart';
import axios from 'axios';
import { API_URL } from '../../../actions';

class CompletedOrders extends Component {
  constructor() {
    super();

    const today = new Date(Date.now());

    this.state = {
      orders: [],
      month: today.getMonth(),
      year: today.getFullYear(),
      storeId: 0,
      stores: [],
      orderType: "all"
    };

    this.getStores = this.getStores.bind(this);
    this.getOrdersForMonth = this.getOrdersForMonth.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.selectYear = this.selectYear.bind(this);
    this.onStoreChange = this.onStoreChange.bind(this);
    this.onOrderTypeChange = this.onOrderTypeChange.bind(this);
    this.formatData = this.formatData.bind(this);
  }

  componentDidMount() {
    this.getStores();
    this.getOrdersForMonth(this.state.month, this.state.storeId);
  }

  getStores() {
    axios.get(`${API_URL}/stores`)
    .then(({ data }) => {
      let storesData = data.map((store) => {
        return {"storeName": store.storeName, "storeId": store.storeId};
      });
      this.setState({ stores: storesData });
      console.log("storeData ", storesData);
    })
  }

  getOrdersForMonth(month, storeId) {
    if (storeId > 0) {
      console.log("month", month, "storeId", storeId);
      console.log(`${API_URL}/dispatch/stores/orders`, { auth: this.props.auth, storeId, month });
      axios.post(`${API_URL}/dispatch/stores/orders`, { auth: this.props.auth, storeId, month })
        .then(({ data }) => {
          console.log("SPECIFIC STORE DATA: ", data);
          this.setState({ orders: data, month: parseInt(month), storeId });
        })
        .catch((err) => {
          console.log("Error: ", err);
        })
    }
    else {
      axios.post(`${API_URL}/dispatch/orders/completed/month`, { auth: this.props.auth, month })
      .then(({ data }) => {
        // console.log(data);
        this.setState({ orders: data, month, storeId });
      })
      .catch((err) => {
        console.log("Error: ", err);
      })
    }
  }

  formatData(orders) {
    // console.log("The Month: ", this.state.month);
    const daysNum = new Date(this.state.year, this.state.month, 0).getDate();
    const days = [];
    // console.log("daysNum Array: ", daysNum);

    for (var i = 1; i <= daysNum; i++) { days.push(i) };

    const cleanData = days.map((day) => {
      const daysOrders = orders.filter((order) => {
        if ( new Date(parseInt(order.orderCreatedAt)).getDate() === day) return true;
      });

      const total = daysOrders.reduce((curr, nextOrder) => {
         return curr + parseFloat(nextOrder.orderSubTotal) ;
      }, 0);

      return { date: day, total, orders: daysOrders.length };
    });

    return cleanData;
  }

  onMonthChange(event) {
    this.getOrdersForMonth(event.target.value, this.state.storeId);
  }

  selectYear(event){
    // this.setState({ year: parseInt(e.target.value) });
    this.getOrderData(this.state.month, e.target.value);
  }
  onStoreChange(event) {
    let storeId = event.target.value;
    this.getOrdersForMonth(this.state.month, storeId);
  }

  onOrderTypeChange(event) {
    let orderType = event.target.value;
    this.getOrdersForMonth(this.state.month, orderType);
  }

  render() {
    return (
      <div>
        <section style={style.container}>

          <select onChange={this.onOrderTypeChange} >
            <option value="all">All</option>
            <option value="multi">Multi</option>
            <option value="single">Single</option>
          </select>

          <select onChange={this.onMonthChange} value={this.state.month}>
            <option value={1}>January</option>
            <option value={2}>February</option>
            <option value={3}>March</option>
            <option value={4}>April</option>
            <option value={5}>May</option>
            <option value={6}>June</option>
            <option value={7}>July</option>
            <option value={8}>August</option>
            <option value={9}>September</option>
            <option value={10}>October</option>
            <option value={11}>November</option>
            <option value={12}>December</option>
          </select>

          <select style={style.select} onChange={this.selectYear} value={this.state.year}>
          {
            [2014,2015,2016,2017]
            .map((year) => {
              return <option value={year}>{year}</option>
            })
          }
          </select>

          <select onChange={this.onStoreChange} value={this.state.store}>
            <option key={0} value={0}>All Stores</option>

            {this.state.stores.map(store => {
              return <option key={store.storeId} value={store.storeId}>{store.storeName}</option>
            })}

          </select>

          <BarChartComponent orders={this.formatData(this.state.orders)} dataKey="orders" color="#7830ee" />
          <BarChartComponent orders={this.formatData(this.state.orders)} dataKey="total" color="#29cb56" />

          {this.state.orders.length === 0
          ? <span style={subContainer}>
              <h1 style={title}>No Completed Orders Today</h1>
            </span>
          : <CompletedOrdersList orders={this.state.orders} /> }
        </section>
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
