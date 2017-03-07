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
    return (
      <div>
        <section style={style.invoiceHeader}>
            <div>INVOICE</div>
            <span>Bill to STORE NAME</span>
        </section>
        <section style={style.list}>
          {this.props.orders.map(order => {
            return <InvoiceOrder order={order} key={`compl${order.orderId}`}/>
          })}
        </section>
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
