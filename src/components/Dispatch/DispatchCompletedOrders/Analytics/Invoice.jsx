import React, { Component } from 'react';
import { connect } from 'react-redux';
import InvoiceOrder from './InvoiceOrder';
import OrderCommissionRow from './OrderCommissionRow'

class InvoiceComponent extends Component {
  constructor(props) {
    super(props);
    this.calcMonthTotal = this.calcMonthTotal;
  }

  calcMonthTotal() {
    let orderSubTotal = this.props.orders.reduce((curr, next) => {
          return parseFloat(curr) + (parseFloat(next.total) * 0.05);
        }, 0);

    let commissionSubTotal = this.props.orders.reduce((curr, next) => {
          return parseFloat(curr) + (parseFloat(next.orders) * 2.50);
        }, 0);

    console.log("order sub", orderSubTotal);
    console.log("commish sub", commissionSubTotal);
    return (commissionSubTotal + orderSubTotal).toFixed(2);
  }

  render() {

    console.log("order", this.props.orders);
    const today = new Date();
    const dateString = `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`;
    const totalBalance  = this.calcMonthTotal();

    return (
      <div>
        <section style={style.invoiceHeader}>
          <div style={{float: 'left'}}>
            INVOICE
            <br></br>
            <br></br>
            Bill to {this.props.storeName}
          </div>
          <div style={{float: 'right'}}>
            INVOICE NUMER
             <br></br>
            {dateString}
            <br></br>
            DUE DATE
          </div>

        </section>
        <table style={style.table}>
          <thead style={style.tableHead}>
            <tr>
              <th>DATE</th>
              <th>ACTIVITY</th>
              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
          {this.props.orders.length > 0 ?
            this.props.orders.map(order => {
            return  ([
                <InvoiceOrder style={style.tableRow} order={order} year={this.props.year} month={this.props.month} />,
                <OrderCommissionRow style={style.tableRow} order={order} year={this.props.year} month={this.props.month} />
            ])
          }) : null}
          </tbody>
          <tfoot>
            {totalBalance}
          </tfoot>
        </table>
      </div>
    );
  }
}

const listSortBy = {
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  margin: '8px',
};

const style = {
  invoiceHeader: {
    width: '67%',
    margin: '0 auto',
    height: '100px',
    fontSize: '20px',
    fontWeight: 'bold',
    border: '1px solid #868686',
  },
  table: {
    width: '80%',
    border: '1px solid #868686',
    margin: '0 auto',
    borderCollapse: 'collapse',
  },
  tableHead: {
    backgroundColor: '#b8bab8',
    width: '100%',
    height: '20px',
    textAlign: 'left',
    fontSize: '18px'
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, null)(InvoiceComponent);
