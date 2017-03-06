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
    const adjustedToday = today.getTimezoneOffset();
    console.log("offset", adjustedToday);

    this.state = {
      orders: [],
      month: today.getMonth(),
      year: today.getFullYear(),
      storeId: 0,
      stores: [],
      orderType: "all",
      loading: false
    };

    this.getStores = this.getStores.bind(this);
    this.getOrderData = this.getOrderData.bind(this);
    this.selectMonth = this.selectMonth.bind(this);
    this.selectYear = this.selectYear.bind(this);
    this.onStoreChange = this.onStoreChange.bind(this);
    this.onOrderTypeChange = this.onOrderTypeChange.bind(this);
    this.formatData = this.formatData.bind(this);
  }

  componentDidMount() {
    this.getStores();
    this.getOrderData(this.state.month, this.state.year, this.state.storeId);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("next state", nextState, "this state", this.state);

    if (this.state.orders.length > 0) {
      if (this.state.orders.length !== nextState.orders.length) {
        return true;
      }
      else {
        if (this.state.month !== nextState.month) {
          return false;
        }
        if (this.state.year !== nextState.year) {
          return false;
        }
        if (this.state.storeId !== nextState.storeId) {
          return false;
        }
      }
    }
    return true;

  }

  getStores() {
    axios.get(`${API_URL}/stores`)
    .then(({ data }) => {
      let storesData = data.map((store) => {
        return {"storeName": store.storeName, "storeId": store.storeId};
      });
      this.setState({ stores: storesData });
      // console.log("storeData ", storesData);
    })
  }

  getOrderData(month, year, storeId) {
    this.setState({ loading: true });
    console.log("month", month, "storeId", storeId);

    if (parseInt(storeId) > 0) {
      console.log(`${API_URL}/dispatch/stores/orders`, { auth: this.props.auth, storeId, month, year});
      axios.post(`${API_URL}/dispatch/stores/orders`, { auth: this.props.auth, storeId, month, year })
        .then(({ data }) => {
          console.log("SPECIFIC STORE DATA: ", data);
          this.setState({ orders: data, month, storeId, loading: false });
        })
        .catch((err) => {
          console.log("Error: ", err);
          this.setState({ loading: false });
        })
    }
    else {
      axios.post(`${API_URL}/dispatch/orders/completed/month`, { auth: this.props.auth, month, year })
      .then(({ data }) => {
        console.log(data);
        this.setState({ orders: data, month, storeId, loading: false });
      })
      .catch((err) => {
        console.log("Error: ", err);
        this.setState({ loading: false });
      })
    }
  }

  formatData(orders) {
    const daysNum = new Date(this.state.year, this.state.month+1, 0).getDate();
    const days = [];
    console.log("daysNum: ", daysNum, days);

    for (var i = 1; i <= daysNum; i++) { days.push(i) };

    const cleanData = days.map((day) => {
      const daysOrders = orders.filter((order) => {
        let date = new Date(parseInt(order.orderCreatedAt)- 420000);
        if ( date.getMonth() === 1) {
          if (this.state.month !== 1) {
            return false;
          }
        }
        if ( new Date(parseInt(order.orderCreatedAt) + 420000).getDate() === day) return true;
      });

      const total = daysOrders.reduce((curr, nextOrder) => {
         return curr + parseFloat(nextOrder.orderSubTotal) ;
      }, 0);

      return { date: day, total, orders: daysOrders.length };
    });

    return cleanData;
  }

  selectMonth(event) {
    this.setState({ month: event.target.value });
  }

  selectYear(event){
    this.setState({ year: parseInt(event.target.value) });
  }
  onStoreChange(event) {
    this.setState({ storeId: parseInt(event.target.value) });
  }

  onOrderTypeChange(event) {
    let orderType = event.target.value;
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

          <select onChange={this.selectMonth} value={this.state.month}>
            <option value={0}>January</option>
            <option value={1}>February</option>
            <option value={2}>March</option>
            <option value={3}>April</option>
            <option value={4}>May</option>
            <option value={5}>June</option>
            <option value={6}>July</option>
            <option value={7}>August</option>
            <option value={8}>September</option>
            <option value={9}>October</option>
            <option value={10}>November</option>
            <option value={11}>December</option>
          </select>

          <select style={style.select} onChange={this.selectYear} value={this.state.year}>
          {
            [2014,2015,2016,2017]
            .map((year) => {
              return <option value={year}>{year}</option>
            })
          }
          </select>

          <select onChange={this.onStoreChange} value={this.state.storeId}>
            <option key={0} value={0}>All Stores</option>

            {this.state.stores.map(store => {
              return <option key={store.storeId} value={store.storeId}>{store.storeName}</option>
            })}
          </select>

          <button onClick={() => this.getOrderData(this.state.month, this.state.year, this.state.storeId)}>Submit</button>

          {this.state.loading ? <span>Loading...</span> : null}

          {!this.state.loading && this.state.orders.length > 0 ?
            <div>
              <BarChartComponent orders={this.formatData(this.state.orders)} dataKey="orders" color="#7830ee" />
              <BarChartComponent orders={this.formatData(this.state.orders)} dataKey="total" color="#29cb56" />
              <CompletedOrdersList orders={this.state.orders} />
            </div>
          : null }
          {!this.state.loading && this.state.orders.length === 0 ?
            <span style={subContainer}>
              <h1 style={title}>No Completed Orders For This Period</h1>
            </span> : null }
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
