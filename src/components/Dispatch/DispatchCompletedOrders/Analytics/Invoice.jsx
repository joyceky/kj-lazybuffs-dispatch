// import React from 'react';
// const InvoiceComponent = ({orders}) => {
//
// // render() {
//   return (
//       <div style={invoiceStyle}>
//         <section>
//           {orders.map(order => {
//             <div>
//                 <p>{order.orderSubTotal}</p>
//               <span>{order.customerAddress}</span>
//               <span>ID {order.orderId}</span>
//             </div>
//           })}
//         </section>
//       </div>
//     );
//   // }
// };
//
// const invoiceStyle = {
//   width: '80%',
//   textAlign: 'center'
// };
//
// export default InvoiceComponent;
//


import React, { Component } from 'react';
import { connect } from 'react-redux';
import InvoiceOrder from './InvoiceOrder';

class InvoiceComponent extends Component {

  render() {

    console.log("order", this.props.orders);

    return (
      <div>
        <section style={style.invoiceHeader}>
            <div>INVOICE</div>
            <span>Bill to STORE NAME</span>
        </section>
        <table style={style.list}>
          <tbody>
          {this.props.orders.length > 0 ?
            this.props.orders.map(order => {
            return <InvoiceOrder order={order} year={this.props.year} month={this.props.month} />
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
  list: {
    width: '100%',
    margin: '0',
    padding: '0',
  },
  indexHeader: {
    width: '80%'
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, null)(InvoiceComponent);
