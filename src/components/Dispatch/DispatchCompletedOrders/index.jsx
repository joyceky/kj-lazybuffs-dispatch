import React, { Component } from 'react';
import { connect } from 'react-redux';
import CompletedOrdersList from './CompletedOrdersList';
import BarChartComponent from './Analytics/BarChart';
import InvoiceComponent from './Analytics/Invoice';
import axios from 'axios';
import { API_URL } from '../../../actions';

class CompletedOrders extends Component {
  constructor() {
    super();

    const today = new Date(Date.now());
    const adjustedToday = today.getTimezoneOffset();

    this.state = {
      orders: [],
      month: today.getMonth(),
      year: today.getFullYear(),
      storeId: 0,
      stores: [],
      storeName: 'All Stores',
      // orderType: "all",
      loading: false,
      showInvoice: false
    };

    this.getStores = this.getStores.bind(this);
    this.getOrderData = this.getOrderData.bind(this);
    this.selectMonth = this.selectMonth.bind(this);
    this.selectYear = this.selectYear.bind(this);
    this.onStoreChange = this.onStoreChange.bind(this);
    // this.onOrderTypeChange = this.onOrderTypeChange.bind(this);
    this.formatData = this.formatData.bind(this);
    this.toggleInvoice = this.toggleInvoice.bind(this);
  }

  componentDidMount() {
    this.getStores();
    this.getOrderData(this.state.month, this.state.year, this.state.storeId);
  }

  getStores() {
    axios.get(`${API_URL}/stores`)
    .then(({ data }) => {
      let storesData = data.map((store) => {
        return {"storeName": store.storeName, "storeId": store.storeId};
      });
      this.setState({ stores: storesData });
    })
  }

  getOrderData(month, year, storeId) {
    this.setState({ loading: true });

    if (parseInt(storeId) > 0) {
      console.log(`${API_URL}/dispatch/stores/orders`, { auth: this.props.auth, storeId, month, year});
      axios.post(`${API_URL}/dispatch/stores/orders`, { auth: this.props.auth, storeId, month, year })
        .then(({ data }) => {
          this.setState({ orders: data, month, storeId, loading: false, shouldChartsBeVisible: true });
        })
        .catch((err) => {
          console.log("Error: ", err);
          this.setState({ loading: false });
        })
    }
    else {
      axios.post(`${API_URL}/dispatch/orders/completed/month`, { auth: this.props.auth, month, year })
      .then(({ data }) => {
        this.setState({ orders: data, month, year, storeId, loading: false, shouldChartsBeVisible: true });
      })
      .catch((err) => {
        console.log("Error: ", err);
        this.setState({ orders: data, month, year, storeId, loading: false, shouldChartsBeVisible: true });
      })
    }
  }

  formatData(orders) {
    const daysNum = new Date(this.state.year, this.state.month+1, 0).getDate();
    const days = [];

    for (var i = 1; i <= daysNum; i++) { days.push(i) };

    const cleanData = days.map((day) => {
      const daysOrders = orders.filter((order) => {
        let date = new Date(parseInt(order.orderCreatedAt));

        if ( date.getDate() == day && date.getMonth() == this.state.month) {
          return true;
        }
        else {
          return false
        }
      })
      const total = daysOrders.reduce((curr, nextOrder) => {
        let totalNum = (parseFloat(curr) + parseFloat(nextOrder.orderSubTotal)).toFixed(2);
         return parseFloat(totalNum) || 0;
      }, 0);
      return { date: day, total, orders: daysOrders.length };
    });
    return cleanData;
  }

  selectMonth(event) {
    let month = event.target.value;
    this.setState({ month });
    this.getOrderData(month, this.state.year, this.state.storeId);
  }

  selectYear(event){
    let year = event.target.value;
    this.setState({ year });
    this.getOrderData(this.state.month, year, this.state.storeId);
  }

  onStoreChange(event) {
    let storeId = event.target.value;
    let storeName = this.state.stores.filter((store) => {
      if ( store.storeId == event.target.value) {
        return true;
      }
    });
    storeName = storeName[0].storeName;
    this.setState({ storeId, storeName });
    this.getOrderData(this.state.month, this.state.year, storeId);
  }

  // onOrderTypeChange(event) {
  //   let orderType = event.target.value;
  // }

  calcRevenue(orders){
      return orders
      .reduce((curr, nextOrder) => {
        let sub = (parseFloat(curr) + parseFloat(nextOrder.orderSubTotal)).toFixed(2);
        return parseFloat(sub) || 0.00;
      }, 0);
  }

  toggleInvoice(){
    if (this.state.showInvoice == true) {
      this.setState({ showInvoice: false })
    }
    else {
      this.setState({ showInvoice: true })
    }
  }

  render() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
      <div>
        <section style={style.container}>

        <section style={style.header}>
          <section>
            <span>Select a month, year, or store to view analytics:</span>
              {/*<select style={style.select} onChange={this.onOrderTypeChange} >
             <option value="all">All</option>
              <option value="multi">Multi</option>
              <option value="single">Single</option>
            </select>*/}

            <select style={style.select} onChange={this.selectMonth} value={this.state.month}>
              {
                months.map((monthVal, i) => {
                  return <option value={i} key={i}>{monthVal}</option>
                })
              }
            </select>

            <select style={style.select} onChange={this.selectYear} value={this.state.year}>
              {
                [2014,2015,2016,2017]
                .map((year) => {
                  return <option value={year}>{year}</option>
                })
              }
            </select>

            <select style={style.select} onChange={this.onStoreChange} value={this.state.storeId}>
              <option key={0} value={0}>All Stores</option>
              {
                this.state.stores.map(store => {
                  return <option key={store.storeName} value={store.storeId}>{store.storeName}</option>
                })
              }
            </select>
          </section>
        </section>

          { this.state.loading ?
            <span style={style.subContainer}>
              <h1 style={style.title}>Loading analytics...</h1>
            </span>
            : null }
          {
            !this.state.loading && this.state.orders.length > 0 ?
            <div>
              <section style={style.chartContainer}>
                <div>
                  <p>Order Analytics</p>
                  <BarChartComponent orders={this.formatData(this.state.orders)} dataKey="orders" color="#7830ee" />
                  <p>{`Orders for ${months[this.state.month]} ${this.state.year}: ${ this.state.orders.length }`}</p>

                  <p>Revenue Analytics</p>
                  <BarChartComponent orders={this.formatData(this.state.orders)} dataKey="total" color="#29cb56" />
                  <p>{`Revenue for ${months[this.state.month]} ${this.state.year}: $${ this.calcRevenue(this.state.orders)}`}</p>
                </div>
              </section>
              <section>
                <button style={style.btn} onClick={() => this.toggleInvoice()}>Generate Invoice</button>
                { this.state.showInvoice ?
                <InvoiceComponent orders={this.formatData(this.state.orders)} month={this.state.month} year={this.state.year} storeName={this.state.storeName}/>
                : null }
              </section>
            </div>
            : null
          }
          {
            !this.state.loading && this.state.orders.length === 0 ?
            <span style={style.subContainer}>
              <h1 style={style.title}>No Completed Orders For This Period</h1>
            </span> : null
          }
          </section>
      </div>
    );
  }
}

const style = {
  container: {
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  subContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  btn: {
    borderRadius: '5px',
    display: 'block',
    padding: '8px 10px',
    fontSize: '22px',
    textDecoration: 'none',
    color: '#fff',
    margin: '25px auto',
    backgroundColor: '#55acee',
    boxShadow: '0px 5px 0px 0px #3C93D5',
    fontSize: '18px'
  },
  title: {
    fontSize: '20px',
    margin: '16px',
    padding: '0',
  },
  select: {
    height: '35px',
    fontSize: '18px',
    margin: '8px',
    backgroundColor: '#fff',
    color: "#494b5c"
  },
  header: {
    padding: '16px',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: '20px'
  },
  chartContainer: {
    maxWidth: '100%',
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 'auto',
    width: 'auto',
    fontSize: '20px',
    textAlign: 'center'
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, null)(CompletedOrders);
