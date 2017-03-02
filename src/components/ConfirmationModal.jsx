import React, { Component } from 'react';
import { deleteOrder, cancelOrderDelete } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const ConfirmationComplete = (props) => {
  return (
    <section style={style.card}>

    </section>
  );
}

const ConfirmationDelete = (props) => {
  console.log(props);
  return (
    <section style={style.card}>
      <h1 style={style.title}>
        {`Delete Order?`}
      </h1>

      <section style={style.buttonContainer}>
        <button
        style={style.cancelButton}
        onClick={() => props.cancelOrderDelete()}
        >
        Cancel
        </button>
        <button
        style={style.deleteButton}
        onClick={() => props.deleteOrder(props.orderId)}
        >
        Delete
        </button>
      </section>
    </section>
  );
};


class ConfirmationModal extends Component {
  render() {
    return (
      <section style={style.container}>
        {this.props.confirmation
        ? <ConfirmationDelete cancelOrderDelete={this.props.cancelOrderDelete} deleteOrder={this.props.deleteOrder} orderId={this.props.confirmation} />
        : null}
      </section>
    );
  }
}

const style = {
  title: {
    fontSize: '16px',
    color: 'black',
    padding: '0',
    margin: '0',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    top: '0',
    left: '0',
    zIndex: '10',
    width: '100%',
    height: '100%',
  },
  detail: {
    padding: '0',
    color: 'black',
  },
  card: {
    position: 'relative',
    backgroundColor: 'white',
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  cancelButton: {
    width: '50%',
    fontSize: '20px',
    padding: '16px',
    color: 'rgba(0,0,0,0.7)',
  },
  deleteButton: {
    width: '50%',
    fontSize: '20px',
    padding: '16px',
    color: '#FF7043',
  },
};

function mapStateToProps({ confirmation }){
  return { confirmation };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteOrder, cancelOrderDelete }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal);
