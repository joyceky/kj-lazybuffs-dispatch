import React, { Component } from 'react';

const msAge = (ms) => Date.now() - parseInt(ms);
const msToMins = (ms) => Math.floor(ms / 60000);
const msAgeInMins = (ms) => msToMins(msAge(ms));

class Minutes extends Component {
  constructor(props){
    super(props);
    this.state = {
      min: 0,
      sec: 0,
    };
    this.countdown = this.countdown.bind(this);
    this.interval = setInterval(this.countdown, 1000);
    this.clearTheInterval = () => clearInterval(this.interval);
  }
  componentDidMount() {
    this.countdown();
  }
  componentWillUnmount() {
    this.clearTheInterval();
  }

  countdown(){
    const msCreatedAt = parseInt(this.props.createdAt);
    const msReadyIn = this.props.readyIn * 60000;
    const min = Math.floor((Date.now() - (msCreatedAt + msReadyIn)) / 60000);
    let sec = Math.floor((Date.now() - (msCreatedAt + msReadyIn)) / 1000 % 60);
    if (sec < 0) sec = sec * -1;
    else if (sec < 10) sec = `0${sec}`;
    else if (sec === 60) sec = `00`;
    this.setState({ min, sec });
  }



  render(){
    return(
      <p style={minutesStyle}>
      {`${this.state.min}:${this.state.sec}` }
      </p>
    );
  }
}

const minutesStyle = {
  fontSize: '1em',
};

Minutes.propTypes = {
  createdAt: React.PropTypes.string.isRequired,
}

export default Minutes;
