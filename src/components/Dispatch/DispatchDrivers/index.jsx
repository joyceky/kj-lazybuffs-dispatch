import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { BarChartComponent } from './Analytics/BarChart'; 
import { loadDrivers, API_URL } from '../../../actions';
import axios from 'axios';

const DateId = ({ orderId, createdAt }) => {
  return (
    <span>
      {`ID: ${new Date(parseInt(createdAt)).getMonth() + 1}/${new Date(parseInt(createdAt)).getDate()}-${orderId}`}
    </span>
  );
};

const stylePhone = (num) => {
  return `${num.slice(0,3)}-${num.slice(3,6)}-${num.slice(6,10)}`;
};

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
    this.genReport = this.genReport.bind(this);
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

  monthChange(e){
    this.setState({ month: e.target.value });
  }

  yearChange(e){
    this.setState({ year: e.target.value });
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

  genReport(){
    axios.post(`${API_URL}/dispatch/driver/gen-report`, {
      driverId: this.props.driverId,
      month: this.state.month,
      year: this.state.year,
    })
    .then(({ data }) => this.setState({ orderHistory: data, reportActive: true }))
  }

  render() {
    if (this.state.loading) return <p>loading...</p>;
    return (
      <section>

        <section>
          <label>From
            <select onChange={this.monthChange} value={this.state.month}>
              {
                ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                .map((month, i) => <option key={month} value={i}>{month}</option>)
              }
            </select>
            <select onChange={this.yearChange} value={this.state.year}>
              {
                [2014, 2015, 2016, 2017]
                .map((year) => <option key={year} value={year}>{year}</option>)
              }
            </select>
          </label>

          <button onClick={this.genReport}>Generate Report</button>
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
      <section style={style.container}>
        <h1>Drivers</h1>
        <select onChange={this.handleDriverSelect}>
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
        <Driver driverId={this.state.activeDriverId} />
      </section>
    )
  }
}

const style = {
  container: {
    top: '50px',
    left: '0',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflow: 'scroll',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    fontSize: '20px',
    padding: '8px',
    color: 'rgb(0,0,0,0.7)',
  }
};

function mapStateToProps({ auth, dispatchDrivers }) {
  return { auth, dispatchDrivers };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadDrivers }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DispatchDrivers)
