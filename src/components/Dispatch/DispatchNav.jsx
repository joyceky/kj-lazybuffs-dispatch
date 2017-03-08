import React, { Component } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setActiveDispatchView } from '../../actions';

const NavButton = ({ iconName, style, linkLocation}) => {
  return (
    <button
      style={style.button}
    >
      <Link
        to={linkLocation}
        style={style.button}
        activeStyle={buttonStyle.buttonActive}
      >
        <i className="material-icons nav-button">{iconName}</i>
      </Link>
    </button>
  )
};

class DispatchNav extends Component {
  render() {
    return (
      <nav style={navStyle}>
        <NavButton
          iconName='directions_car'
          style={buttonStyle}
          linkLocation='/drivers'
        />
        <NavButton
          iconName='map'
          style={buttonStyle}
          linkLocation='/map'
        />
        <NavButton
          iconName='add'
          style={buttonStyle}
          linkLocation='/new'
        />
        <NavButton
          iconName='playlist_add_check'
          style={buttonStyle}
          linkLocation='/completed'
        />
        <NavButton
          iconName='settings'
          style={buttonStyle}
          linkLocation='/settings'
        />
      </nav>
    );
  }
}

const navStyle = {
  zIndex: '10',
  position: 'fixed',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  background: 'black',
  width: '100vw',
  height: '50px',
  top: '0',
  left: '0',
};

const buttonStyle = {
  button: {
    height: '50px',
    width: '25%',
    outline: 'none',
    color: 'rgba(255,255,255,0.8)',
  },
  buttonActive: {
    height: '50px',
    width: '25%',
    outline: 'none',
    color: '#FFB300',
  },
  buttonIcon: {
    fontSize: '36px',
  },
};

DispatchNav.defaultProps = {
  activeDispatchView: 'map',
};

function mapStateToProps({ auth, activeDispatchView }) {
  return { auth, activeDispatchView };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setActiveDispatchView }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DispatchNav);
