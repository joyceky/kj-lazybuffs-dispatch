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
    console.log("offset", adjustedToday);

    this.state = {
      orders: [],
      month: today.getMonth(),
      year: today.getFullYear(),
      storeId: 0,
      stores: [],
      // orderType: "all",
      loading: false
    };

    this.getStores = this.getStores.bind(this);
    this.getOrderData = this.getOrderData.bind(this);
    this.selectMonth = this.selectMonth.bind(this);
    this.selectYear = this.selectYear.bind(this);
    this.onStoreChange = this.onStoreChange.bind(this);
    // this.onOrderTypeChange = this.onOrderTypeChange.bind(this);
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
    })
  }

  getOrderData(month, year, storeId) {
    this.setState({ loading: true });

    if (parseInt(storeId) > 0) {
      console.log(`${API_URL}/dispatch/stores/orders`, { auth: this.props.auth, storeId, month, year});
      axios.post(`${API_URL}/dispatch/stores/orders`, { auth: this.props.auth, storeId, month, year })
        .then(({ data }) => {
          // console.log("SPECIFIC STORE DATA: ", data);
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
        // console.log("ALL STORE DATA: ", data);
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
    console.log("DAYSNUM", daysNum);
    const days = [];

    for (var i = 1; i <= daysNum; i++) { days.push(i) };

    const cleanData = days.map((day) => {
      const daysOrders = orders.filter((order) => {
        let date = new Date(parseInt(order.orderCreatedAt) - 420000);
        if (parseInt(date.getMonth()) != this.state.month) {
          // let num = date.getMonth();
          // console.log("MONTH DIFFERENCE");
          // console.log("Month", date.getMonth(), typeof num);
          // console.log("State month", this.state.month, typeof this.state.month);
          return false;

        }
        if ( new Date(parseInt(order.orderCreatedAt) - 420000).getDate() === day) return true;
      })
      const total = daysOrders.reduce((curr, nextOrder) => {
         return (parseFloat(curr) + parseFloat(nextOrder.orderSubTotal)).toFixed(2);
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

  // onOrderTypeChange(event) {
  //   let orderType = event.target.value;
  // }

  calcRevenue(orders){
      return orders
      .reduce((curr, nextOrder) => {
        return curr + parseFloat(nextOrder.orderSubTotal);
      }, 0).toFixed(2);
  }

  render() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
      <div>
        <section style={style.container}>

        <section style={style.previewBanner}>
          ANALYTICS BETA
        </section>

        <section style={style.header}>
          <section>
              {/*<select style={style.select} onChange={this.onOrderTypeChange} >
             <option value="all">All</option>
              <option value="multi">Multi</option>
              <option value="single">Single</option>
            </select>*/}

            <select style={style.select} onChange={this.selectMonth} value={this.state.month}>
              {
                months.map((monthVal, i) => {
                  return <option value={i}>{monthVal}</option>
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
                  return <option key={store.storeId} value={store.storeId}>{store.storeName}</option>
                })
              }
            </select>

            <button style={style.btn} onClick={() => this.getOrderData(this.state.month, this.state.year, this.state.storeId)}>View Analytics</button>
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

                  <p>Revenue Analytics</p>
                  <BarChartComponent orders={this.formatData(this.state.orders)} dataKey="total" color="#29cb56" />

                  <p>{`Revenue for ${months[this.state.month]} ${this.state.year}: $${ this.calcRevenue(this.state.orders)}`}</p>
                </div>
              </section>
              <section>
                  {/* <CompletedOrdersList orders={this.state.orders} /> */}
                  <InvoiceComponent orders={this.state.orders} />
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
    padding: '8px 10px',
    fontSize: '22px',
    textDecoration: 'none',
    margin: '20px',
    color: '#fff',
    position: 'relative',
    display: 'inline-block',
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
  },
  previewBanner: {
    top: '50px',
    left: '0',
    width: '100%',
    fontSize: '24px',
    padding: '8px',
    backgroundColor: '#414141',
    textAlign: 'center',
    color: '#FFB300',
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, null)(CompletedOrders);
