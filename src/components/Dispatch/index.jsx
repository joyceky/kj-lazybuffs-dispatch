import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import ConfirmationModal from '../ConfirmationModal';
import DispatchNav from './DispatchNav';

const msAge = (ms) => Date.now() - parseInt(ms);
const msToMins = (ms) => Math.floor(ms / 60000);
const msAgeInMins = (ms) => msToMins(msAge(ms));

class Dispatch extends Component {
  componentDidMount() {
    if (!this.props.auth) browserHistory.push('/login');
  }

  componentWillReceiveProps(nextProps){
    if (!nextProps.auth) browserHistory.push('/login');
  }

  render() {
    return (
      <main>
        <DispatchNav />
        {this.props.loading ? LoadingMsg : this.props.children}
        {this.props.confirmation ? <ConfirmationModal /> : null}
      </main>
    );
  }
}

const style = {
  map: {
    flex: '8',
    backgroundColor: '',
  },
  popup: {
    padding: '0',
    margin: '0',
  },
  loadingMsg: {
    marginTop: '50px',
  },
}
const LoadingMsg = <h1 style={style.loadingMsg}>loading...</h1>;

Dispatch.defaultProps = {
  activeDispatchView: 'map',
};

function mapStateToProps({ auth, confirmation, loading }) {
  return {
    auth,
    confirmation,
    loading,
  };
}

export default connect(mapStateToProps, null)(Dispatch);
