import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCompletedOrders } from '../../../actions';
import CompletedOrdersList from './CompletedOrdersList';

class CompletedOrders extends Component {
  componentDidMount() {
    this.props.getCompletedOrders(this.props.auth, 'today');
  }

  render() {
    return (
      <section style={style.container}>
        {this.props.dispatchCompletedOrders.length === 0
        ? <span style={subContainer}>
            <h1 style={title}>No Completed Orders Today</h1>
          </span>
        : <CompletedOrdersList /> }
      </section>
    );
  }
}

const subContainer = {
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'center',
};
const title = {
  fontSize: '20px',
  margin: '16px',
  padding: '0',
};


const style = {
  container: {
    position: 'fixed',
    top: '50px',
    left: '0',
    height: 'calc(100% - 50px)',
    width: '100%',
    overflow: 'scroll',
  },
  title: {
    margin: '0',
    marginTop: '8px',
    padding: '0',
  }
}

function mapStateToProps({ auth, dispatchCompletedOrders }) {
  return { auth, dispatchCompletedOrders };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCompletedOrders }, dispatch);
}

CompletedOrders.propTypes = {
  dispatchCompletedOrders: React.PropTypes.array.isRequired,
}

CompletedOrders.defaultProps = {
  dispatchCompletedOrders: [],
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletedOrders);
