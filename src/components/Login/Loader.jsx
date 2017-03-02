import React, { Component } from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';

class Spinner extends Component {

  componentWillAppear (callback) {
    console.log('appearing');
  }

  componentWillEnter () {
    console.log('enter');
  }
  componentWillLeave () {
    console.log('leave');
  }

  render () {
    console.log('render circle');
    return <span style={circle} />
  }
}

const circle = {
  width: '40px',
  height: '40px',
  borderRadius: '20px',
};


export default class Loader extends Component {

  constructor(props){
    super(props);
    this.state = {
      spinnerActive: false,
    };
  }

  render() {
    return (
      <ReactTransitionGroup>
        {this.state.spinnerActive ? <Spinner /> : null}
      </ReactTransitionGroup>
    );
  }
}
