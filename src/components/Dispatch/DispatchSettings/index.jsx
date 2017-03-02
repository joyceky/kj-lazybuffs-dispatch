import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { logout, loadStores } from '../../../actions';

class DispatchSettings extends Component {

  constructor(){
    super();
    this.state = {
      storeId: 1,
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      tipTotal: 0,
      totalSubTotal: 0,
      orders: [],
    }
    this.handleStoreSelect = this.handleStoreSelect.bind(this);
    this.handleMonthSelect = this.handleMonthSelect.bind(this);
    this.handleYearSelect = this.handleYearSelect.bind(this);
    this.genReport = this.genReport.bind(this);
  }

  componentDidMount(){
    this.props.loadStores();
  }

  handleStoreSelect(e){
    this.setState({ storeId: e.target.value });
  }

  genReport(){
    axios.post('https://lazybuffs.herokuapp.com/dispatch/store/report', { storeId: this.state.storeId, month: this.state.month, year: this.state.year })
    .then(({ data }) => {
      console.log(data);
      this.setState(data);
    })
    .catch(err => console.log(err));
  }

  handleMonthSelect(e){
    this.setState({ month: e.target.value })
  }

  handleYearSelect(e){
    this.setState({ year: e.target.value })
  }

  getDeliveriesTotal(day){
    return this.state.orders.filter(order => {
      if (new Date(parseInt(order.orderCreatedAt)).getDate() === day) {
        return true;
      }
    }).length;
  }

  getTipTotal(day){
    const daysOrders = this.state.orders.filter(order => {
      if (new Date(parseInt(order.orderCreatedAt)).getDate() === day) {
        return true;
      }
    })
    .reduce((curr, next) => {
      return curr + parseFloat(next.orderTip);
    }, 0)
    return daysOrders;
  }

  getDaySubTotal(day){
    const daysOrders = this.state.orders.filter(order => {
      if (new Date(parseInt(order.orderCreatedAt)).getDate() === day) {
        return true;
      }
    })
    .reduce((curr, next) => {
      return curr + parseFloat(next.orderSubTotal);
    }, 0)
    return daysOrders;
  }

  render(){
    return <section style={style.container}>
    <button
    onClick={this.props.logout}
    style={style.logoutButton}
    >
    LOGOUT
    </button>
      <ul style={style.list}>
        <li>
          <select onChange={this.handleStoreSelect} value={this.state.storeId}>
          {this.props.dispatchStores.map(store => {
            return <option value={store.storeId} key={store.storeId}>{store.storeName}</option>
          })}
          </select>


          <select onChange={this.handleMonthSelect} value={this.state.month}>
          {
            ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            .map((month, i) => {
              return <option value={i} key={month}>{month}</option>
            })
          }
          </select>

          <select onChange={this.handleYearSelect} value={this.state.year}>
          {
            [2014, 2015, 2016, 2017]
            .map((year) => {
              return <option value={year} key={year}>{year}</option>
            })
          }
          </select>

          <button onClick={this.genReport}>Generate Report</button>

        </li>

        <li>Monthly Total Deliveries: {this.state.totalDeliveries}</li>
        <li>Monthly Total SubTotals: {this.state.totalSubTotal.toFixed(2)}</li>
        <li>Monthly Total Tips: {this.state.tipTotal.toFixed(2)}</li>

      </ul>

      <table style={style.table}>
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

    </section>
  }
}

const style = {
  container: {
    position: 'absolute',
    top: '50px',
    left: '0',
    width: '100%',
    padding: '16px',
  },
  list: {
    listStyle: 'none',
    margin: '0',
    padding: '0',
  },
  listItem: {
    margin: '0',
    padding: '8px 0',
  },
  logoutButton: {
    color: '#FFB300',
    fontSize: '16px',
  },
  table: {
    width: '100%',
  },
};

function mapStateToProps({ dispatchStores }){
  return { dispatchStores };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ logout, loadStores }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(DispatchSettings);
