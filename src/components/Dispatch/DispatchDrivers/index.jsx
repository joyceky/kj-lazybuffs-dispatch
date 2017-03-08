import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadDrivers, API_URL } from '../../../actions';
import BarChartComponent from '../DispatchCompletedOrders/Analytics/BarChart';
import axios from 'axios';

const DateId = ({ orderId, createdAt }) => {
  return (
    <span>
      {`ID: ${new Date(parseInt(createdAt)).getMonth() + 1}/${new Date(parseInt(createdAt)).getDate()}-${orderId}`}
    </span>
  );
};

// const stylePhone = (num) => {
//   return `${num.slice(0,3)}-${num.slice(3,6)}-${num.slice(6,10)}`;
// };

class Driver extends Component {
  constructor(){
    super();
    const today = new Date()
    this.state = {
      orderHistory: [],
      loading: true,
      reportActive: false,
      month: today.getMonth(),
      year: today.getFullYear(),
    };
    this.getDriverOrderHistory = this.getDriverOrderHistory.bind(this);
    this.monthChange = this.monthChange.bind(this);
    this.yearChange = this.yearChange.bind(this);
    this.getDriverOrders = this.getDriverOrders.bind(this);
    this.formatData = this.formatData.bind(this);
  }
  componentDidMount() {
    this.getDriverOrderHistory(this.props.driverId);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.driverId !== this.props.driverId) {
      this.setState({ loading: true });
      this.getDriverOrderHistory(nextProps.driverId);
    }
  }

  getDriverOrderHistory(driverId){
    axios.post(`${API_URL}/dispatch/driver/history`, { driverId })
    .then(({ data }) => this.setState({ orderHistory: data, loading: false }))
    .catch(err => console.log(err));
  }

  monthChange(event){
    let month = event.target.value;
    // this.setState({ month: e.target.value });
    this.getDriverOrders(this.state.driverId, month, this.state.year);
  }

  yearChange(event){
    let year = event.target.value;
    this.getDriverOrders(this.state.driverId, this.state.month, year);
  }

  getDeliveriesTotal(day){
    return this.state.orderHistory.filter(order => {
      if (new Date(parseInt(order.orderCreatedAt)).getDate() === day) {
        return true;
      }
    }).length;
  }

  getTipTotal(day){
    const daysOrders = this.state.orderHistory.filter(order => {
      if (new Date(parseInt(order.orderCreatedAt)).getDate() === day) {
        return true;
      }
    })
    .reduce((curr, next) => {
      if (isNaN(parseFloat(next.orderTip))) return curr;
      return curr + parseFloat(next.orderTip);
    }, 0)
    return daysOrders;
  }

  getDaySubTotal(day){
    const daysOrders = this.state.orderHistory.filter(order => {
      if (new Date(parseInt(order.orderCreatedAt)).getDate() === day) {
        return true;
      }
    })
    .reduce((curr, next) => {
      return curr + parseFloat(next.orderSubTotal);
    }, 0)
    return daysOrders;
  }

  getDriverOrders(driverId, month, year){
    axios.post(`${API_URL}/dispatch/driver/gen-report`, {
      driverId: driverId,
      month: month,
      year: this.state.year,
    })
    .then(({ data }) => {
      this.setState({ orderHistory: data, month, year, reportActive: true });
      console.log("Driver Data: ", data);
    })
    .catch((err) => {
      this.setState({ orderHistory: data, month, year, reportActive: true });
      console.log(err);
    })
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
      const tip = daysOrders.reduce((curr, nextOrder) => {
        let totalNum = (parseFloat(curr) + parseFloat(nextOrder.orderTip)).toFixed(2);
         return parseFloat(totalNum) || 0;
      }, 0);
      return { date: day, tip, orders: daysOrders.length };
    });
    return cleanData;
  }

  render() {
    if (this.state.loading) return <p>loading...</p>;
    return (
      <section>

        <section>
          <label>From
            <select style={style.select}  onChange={this.monthChange} value={this.state.month}>
              {
                ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                .map((month, i) => <option key={month} value={i}>{month}</option>)
              }
            </select>
            <select style={style.select} onChange={this.yearChange} value={this.state.year}>
              {
                [2014, 2015, 2016, 2017]
                .map((year) => <option key={year} value={year}>{year}</option>)
              }
            </select>
          </label>

          <button onClick={this.getDriverOrders(this.state.driverId, this.state.month, this.state.year)}>Generate Report</button>
        </section>
        <section style={style.chartContainer}>
          <div>
            <section>
              <p>Order Analytics</p>
              <BarChartComponent orders={this.formatData(this.state.orderHistory)} dataKey="orders" color="#7830ee" />
              <p>Revenue Analytics</p>
              <BarChartComponent orders={this.formatData(this.state.orderHistory)} dataKey="tip" color="#29cb56" />
            </section>
          </div>
        </section>
      <article>
        <h1>Active Orders Right Now:</h1>
        <p>
        {this.state.orderHistory.filter(order => {
          if (order.orderStatus !== 'completed') return true;
          return false;
        }).length}
      </p>
      </article>
      {this.state.reportActive
      ? <table style={style.table}>
          <thead>
            <tr>
              <td>Day</td>
              <td>Deliveries</td>
              <td>SubTotals</td>
              <td>Tips</td>
            </tr>
          </thead>
          <tbody>
            {
              [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
              .map((day) => {
                return (
                  <tr>
                    <td>{day}</td>
                    <td>{this.getDeliveriesTotal(day)}</td>
                    <td>{this.getDaySubTotal(day).toFixed(2)}</td>
                    <td>{this.getTipTotal(day).toFixed(2)}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      : null}
    </section>
    );
  }
}


class DispatchDrivers extends Component {
  constructor(){
    super();
    this.state = {
      activeDriverId: "1"
    };
    this.handleDriverSelect = this.handleDriverSelect.bind(this);
  }

  componentDidMount() {
    this.props.loadDrivers(this.props.auth);
  }

  handleDriverSelect(e){
    this.setState({ activeDriverId: e.target.value });
  }

  render() {
    return (
      <section>
        <section style={style.container}>
          <span>Driver:
            <select style={style.select, style.driverSelect} onChange={this.handleDriverSelect}>
              {this.props.dispatchDrivers
                .filter((driver) => {
                  if (driver.driverStatus === 'available') return true;
                  return false;
                })
                .map((driver) => {
                  return (
                    <option value={driver.driverId} key={driver.driverId}>
                      {driver.driverName}
                    </option>
                  );
                })
              }
            </select>
          </span>
          <Driver driverId={this.state.activeDriverId} />
        </section>
      </section>
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
  driverSelect: {
    height: '35px',
    fontSize: '18px',
    margin: '8px',
    backgroundColor: '#fff',
    color: "#494b5c",
    width: '200px'
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


function mapStateToProps({ auth, dispatchDrivers }) {
  return { auth, dispatchDrivers };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadDrivers }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DispatchDrivers)
