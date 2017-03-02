import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import OrderDetailsList from './OrderDetailsList';
import CustomerDetailsList from './CustomerDetailsList';

const stylePhone = (num) => `${num.slice(0,3)}-${num.slice(3,6)}-${num.slice(6,10)}`;
const msToMins = (ms) => Math.floor((ms / 60000) + 1);

const ListItemExpanded = ({ order }) => {
    return (
      <section style={listItemExpandedStyle}>
        <Header type='Order' order={order} />
        <h1 style={title}>{order.storeName}</h1>
        <OrderDetailsList order={order} />
        {order.orderNote
          ? <span style={orderNotesTitle}>Order Note</span>
          : null}
        <span style={orderNotes}>{order.orderNote}</span>
        <Header type='Customer' order={order} />
        <CustomerDetailsList order={order} />
        <span style={orderNotesTitle}>Driver</span>
        <section style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '280px'}}>
            <span>Driver: </span>
            <span>{order.driverName}</span>
        </section>
          <section style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '280px'}}>
              <span>Order Received: </span>
              <span>{new Date(parseInt(order.orderCreatedAt)).toLocaleTimeString()}</span>
          </section>
          <section style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '280px'}}>
              <span>Driver Assigned: </span>
              <span>{new Date(parseInt(order.orderAssignedAt)).toLocaleTimeString()}</span>
          </section>
          <section style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '280px'}}>
              <span>Driver Completed: </span>
              <span>{new Date(parseInt(order.orderCompletedAt)).toLocaleTimeString()}</span>
          </section>
          <section style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '280px'}}>
            <span>Driver Delivery Time: </span>
            <span>
            {msToMins(parseInt(order.orderCompletedAt) - parseInt(order.orderAssignedAt)) + ' mins'}
            </span>
          </section>
          <section style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '280px'}}>
              <span>Overall Delivery Time: </span>
              <span>
              {msToMins(parseInt(order.orderCompletedAt) - parseInt(order.orderCreatedAt)) + ' mins'}
              </span>
          </section>
      </section>
    );
}

const title = {
  fontSize: '20px',
  margin: '0',
};

const listItemExpandedStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  backgroundColor: '#ECEFF1',
};

const orderNotesTitle = {
  textDecoration: 'underline',
  marginTop: '16px',
  marginBottom: '16px',
};

const orderNotes = {
};

export default ListItemExpanded;
