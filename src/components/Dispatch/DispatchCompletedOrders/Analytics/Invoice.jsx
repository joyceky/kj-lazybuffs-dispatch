import React, { Component } from 'react';
import { connect } from 'react-redux';
import InvoiceOrder from './InvoiceOrder';
import OrderCommissionRow from './OrderCommissionRow'

class InvoiceComponent extends Component {

  render() {

    console.log("order", this.props.orders);

    return (
      <div>
        <section style={style.invoiceHeader}>
            <div>INVOICE</div>
            <span>Bill to STORE NAME</span>
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
  table: {
    width: '80%',
    border: '1px solid #868686',
    margin: '0 auto',
    borderCollapse: 'collapse'
  },
  tableHead: {
    backgroundColor: '#b8bab8',
    width: '100%',
    height: '20px',
    textAlign: 'left'
  },
  indexHeader: {
    width: '80%'
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, null)(InvoiceComponent);
