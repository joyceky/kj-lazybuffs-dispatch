import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadAllActiveOrders, API_URL, loadAllUnassignedOrders } from '../../../actions';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { divIcon } from 'leaflet';
import DispatchController from './DispatchController/index';
import axios from 'axios'

const stylePhone = (num) => `${num.slice(0,3)}-${num.slice(3,6)}-${num.slice(6,10)}`;

class DispatchMap extends Component {
  constructor(){
    super();
    this.state = {
      ordersWithLocation: [],
    };
  }

  componentDidMount() {
    this.props.loadAllActiveOrders(this.props.auth);
    this.props.loadAllUnassignedOrders(this.props.auth);
    this.props.dispatchOrders.forEach(order => {
      this.getCoords(order);
    });
    this.props.dispatchUnassignedOrders.forEach(order => {
      this.getCoords(order);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dispatchOrders.length !== this.props.dispatchOrders.length) {
      nextProps.dispatchOrders.forEach(order => {
        this.getCoords(order);
      });
    }
    if (nextProps.dispatchUnassignedOrders.length !== this.props.dispatchUnassignedOrders.length) {
      nextProps.dispatchUnassignedOrders.forEach(order => {
        this.getCoords(order);
      });
    }
  }

  getCoords(order) {
    let customerAddress = order.customerAddress.replace(/ +/g,'+');
    let address = `${customerAddress},+Boulder,+CO&`;
    axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}key=AIzaSyD7r-xG9QqIPcGJyKWuGPJ0_LV-M_ZM9ao`)
    .then(({ data }) => {
      let orderWithLocation = JSON.parse(JSON.stringify(order));
      orderWithLocation.location = data.results[0].geometry.location;
      this.setState({ ordersWithLocation: this.state.ordersWithLocation.concat(orderWithLocation) });
    })
    .catch(err => console.log(err))
  }

  styleAndPlotOrdersWithLocation() {
    return this.state.ordersWithLocation
      .map((order) =>  {
        let className;
        switch (order.orderStatus) {
          case 'unassigned':
            className = 'map-icon-unassigned';
            break;
          case 'assigned':
            className = 'map-icon-assigned';
            break;
          case 'confirmed':
            className = 'map-icon-confirmed';
            break;
          case 'waiting':
            className = 'map-icon-waiting';
            break;
          case 'pickedUp':
            className = 'map-icon-picked-up';
            break;
          default:
        }
        const icon = divIcon({ className });

      return (
        <Marker
        icon={icon}
        key={`marker${order.orderId}`}
        position={order.location}
        >
          <Popup>
            <span>
              <p>
              {order.customerName}
              </p>
              <p>
              {stylePhone(order.customerPhone)}
              </p>
              <p>
              {`${order.customerAddress} ${order.customerUnit ? order.customerUnit : ''}`}
              </p>

            </span>
          </Popup>
        </Marker>
      );
    })
  }

  render(){
    return (
      <section style={style.container}>
      <DispatchController />
        <Map center={[40.0150, -105.2705]} zoom={13} style={style.map}>
          <TileLayer
            url='https://api.mapbox.com/styles/v1/divideyourself/ciw8ag6is001k2pw1xcimgs7n/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGl2aWRleW91cnNlbGYiLCJhIjoiY2l2anJ1YnZxMDJsYTJ0cGQxNXM2MXVkaiJ9.GrnyU3h4NMpTax7icuwnZw'
          />
          {this.styleAndPlotOrdersWithLocation()}
      </Map>
    </section>
    );
  }
}
const style = {
  map: {
    flex: '8',
    backgroundColor: '',
  },
  container: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    top: '50px',
    left: '0',
    display: 'flex',
    width: '100%',
    height: 'calc(100% - 50px)',
    overflow: 'scroll',
  },
};

function mapStateToProps({ auth, dispatchOrders, dispatchUnassignedOrders }) {
  return { auth, dispatchOrders, dispatchUnassignedOrders };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadAllActiveOrders, loadAllUnassignedOrders }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DispatchMap);
