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
    let month = parseInt(this.state.month)+1;
    const daysNum = new Date(this.state.year, month, 0).getDate();
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
      const tips = daysOrders.reduce((curr, nextOrder) => {
        let totalNum = (parseFloat(curr) + parseFloat(nextOrder.orderTip)).toFixed(2);
         return parseFloat(totalNum) || 0;
      }, 0);
      const totalWaitTime = daysOrders.reduce((curr, nextOrder) => {
        let time = (nextOrder.orderCompletedAt - nextOrder.orderCreatedAt) / 60000;

        let totalNum = (parseFloat(curr) + parseFloat(time)).toFixed(2);
         return parseFloat(totalNum) || 0;
      }, 0);
      // var averageWaitTime = parseFloat(totalWaitTime) / parseFloat(daysOrders.length);
      const total = daysOrders.reduce((curr, nextOrder) => {
        let totalNum = (parseFloat(curr) + parseFloat(nextOrder.orderSubTotal) + parseFloat(nextOrder.orderTax)).toFixed(2);
         return parseFloat(totalNum) || 0;
      }, 0);
      const subtotal = daysOrders.reduce((curr, nextOrder) => {
        let totalNum = (parseFloat(curr) + parseFloat(nextOrder.orderSubTotal)).toFixed(2);
         return parseFloat(totalNum) || 0;
      }, 0);
      return { date: day, total, tips, subtotal, totalWaitTime, orders: daysOrders.length };
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

  sendInvoice() {
     let table = document.getElementsByClassName('invoice');
     
     axios.post(`${API_URL}/new-invoice`, { table: table[0].innerHTML, storeName: this.state.storeName })
     .then((data) => {
       console.log(data);
     })
   }

  render() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
      <div>
        <section style={style.container}>

          <section style={style.header}>

            <section style={style.buttonContainer}>
            <section  style={style.buttonContainerDropdowns}>
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
                  .map((year, i) => {
                    return <option key={year} value={year}>{year}</option>
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
            { this.state.showInvoice ?
              <div style={style.buttonDiv}>
                <button className='generate-invoice-button' style={style.btn} onClick={() => this.toggleInvoice()}>Generate Invoice</button>
                <button  style={style.btn} onClick={() => this.sendInvoice()}>Email Invoice</button>
              </div>
              :
            <button className='generate-invoice-button' style={style.btn} onClick={() => this.toggleInvoice()}>Generate Invoice</button>
            }
          </section>

          <section>
            <p>{`Orders: ${ this.state.orders.length }`}</p>
            <p>{`Revenue: $${ (this.calcRevenue(this.state.orders)).toFixed(2) }`}</p>
          </section>
        </section>

          { this.state.loading ?
            <span style={style.subContainer}>
              <h1 style={style.title}>Loading analytics...</h1>
            </span>
            : null }

            { this.state.showInvoice ?
            <InvoiceComponent orders={this.formatData(this.state.orders)} month={this.state.month} year={this.state.year} storeName={this.state.storeName}/>
            : null }

            {
              !this.state.loading && this.state.orders.length === 0 ?
              <span style={style.subContainer}>
                <h1 style={style.title}>No Completed Orders For This Period</h1>
              </span> : null
            }

          {
            !this.state.loading && this.state.orders.length > 0 ?
            <div>
              <section style={style.chartContainer}>
                <div>
                  <p>Order Analytics</p>
                  <BarChartComponent orders={this.formatData(this.state.orders)} dataKey="orders" color="#CFB87C" />

                  <p>Revenue Analytics</p>
                  <BarChartComponent orders={this.formatData(this.state.orders)} dataKey="total" color="#A2A4A3" />

                  <p>Subtotal Analytics</p>
                  <BarChartComponent orders={this.formatData(this.state.orders)} dataKey="subtotal" color="#CFB87C" />

                  <p>Tip Analytics</p>
                  <BarChartComponent orders={this.formatData(this.state.orders)} dataKey="tips" color="#A2A4A3" />

                  <p>Total Wait Time Analytics</p>
                  <BarChartComponent orders={this.formatData(this.state.orders)} dataKey="totalWaitTime" color="#CFB87C" />
                </div>
              </section>
            </div>
            : null
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
    margin: '10px',
    fontSize: '22px',
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: 'black',
    boxShadow: '0px 5px 0px 0px #565A5C',
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
    color: "#565A5C"
  },
  header: {
    padding: '64px',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '18px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
