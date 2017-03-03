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
      storeSelected: -1,
      stores: []
    };

    this.getStores = this.getStores.bind(this);
    this.getOrdersForMonth = this.getOrdersForMonth.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.onStoreChange = this.onStoreChange.bind(this);
    this.formatData = this.formatData.bind(this);
  }

  componentDidMount() {
    this.getStores();
    this.getOrdersForMonth(this.state.month, this.state.storeSelected);
  }

  getStores() {
    axios.get(`${API_URL}/stores`)
    .then(({ data }) => {
      let storesData = data.map((store) => {
        return {"name": store.storeName, "id": store.storeId};
      });
      this.setState({ stores: storesData });
      console.log("storeData ", storesData);
    })
  }

  getOrdersForMonth(month, store) {
    if (store !== -1) {
      axios.get(`${API_URL}/stores/orders`, { auth: this.props.auth, store })
        .then(({ data }) => {
          // console.log("SPECIFIC STORE DATA: ", data);
          this.setState({ orders: data, month: parseInt(month), store: store });
        })
      }
    else {
      axios.post(`${API_URL}/dispatch/orders/completed/month`, { auth: this.props.auth, month })
      .then(({ data }) => {
        // console.log(data);
        this.setState({ orders: data, month: parseInt(month), storeSelected: store });
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
    this.getOrdersForMonth(event.target.value, this.state.storeSelected);
  }

  onStoreChange(event) {
    this.getOrdersForMonth(event.target.value, this.state.month);
  }

  render() {
    return (
      <div>
        <section style={style.container}>
          {/* {this.state.orders.length === 0
          ? <span style={subContainer}>
              <h1 style={title}>No Completed Orders Today</h1>
            </span>
          : <CompletedOrdersList orders={this.state.orders} /> } */}
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


        <select onChange={this.onStoreChange} value={this.state.store}>
          {this.state.stores.map(store => {
            return <option key={store.id} value={store.id}>{store.name}</option>
          })}
        </select>


        {/* <select onChange={this.onStoreChange} value={this.state.store}>
          <option value={-1}>All Stores</option>
          <option value={1}>Store 1</option>
          <option value={2}>Store 2</option>
          <option value={3}>Store 3</option>
          <option value={4}>Store 4</option>
          <option value={5}>Store 5</option>
          <option value={6}>Store 6</option>
          <option value={7}>Store 7</option>
          <option value={8}>Store 8</option>
          <option value={9}>Store 9</option>
          <option value={10}>Store 10</option>
          <option value={11}>Store 11</option>
        </select> */}

        <BarChartComponent orders={this.formatData(this.state.orders)} dataKey="orders" color="#7830ee" />
        <BarChartComponent orders={this.formatData(this.state.orders)} dataKey="total" color="#29cb56" />
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
