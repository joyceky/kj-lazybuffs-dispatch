import React, { Component } from 'react';
import { login, logout, signupDriver, signupStore, signupDispatch, signupAdmin } from '../../actions';
import { bindActionCreators } from 'redux';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import MaterialInput from './MaterialInput';
import RaisedButton from '../Material/Buttons/RaisedButton';
import Loader from './Loader';

class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      signup: false,
      signupAvailable: false,
      err: null,
      email: '',
      password: '',
      confirmPassword: '',
      actType: 'driver',
      driverName: '',
      driverPhone: '',
      storeName: '',
      storePhone: '',
      storeAddress: '',
      storeZip: '',
    };
    this.submitLogin = this.submitLogin.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.confirmPasswordChange = this.confirmPasswordChange.bind(this);
    this.toggleSignup = this.toggleSignup.bind(this);
    this.handleActType = this.handleActType.bind(this);
    this.handleDriverPhone = this.handleDriverPhone.bind(this);
    this.handleDriverName = this.handleDriverName.bind(this);
    this.handleStorePhone = this.handleStorePhone.bind(this);
    this.handleStoreName = this.handleStoreName.bind(this);
    this.handleStoreAddress = this.handleStoreAddress.bind(this);
    this.handleStoreZip = this.handleStoreZip.bind(this);
  }

  componentDidMount(){
      if (this.props.auth) {
        if (this.props.auth.userType === 'admin') {
          this.setState({ signupAvailable: true });
        }
      }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.msg && this.prop.msg != nextProps.msg) browserHistory.push('/login');
    if (nextProps.auth) {
      if (nextProps.auth.userType === 'admin' || nextProps.auth.userType === 'dispatch') {
        browserHistory.push('/map');
      }
    }
  }


  emailChange(e) {
    this.setState({ email: e.target.value });
  }

  passwordChange(e) {
    this.setState({ password: e.target.value });
  }

  confirmPasswordChange(e) {
    this.setState({ confirmPassword: e.target.value });
  }
  toggleSignup() {
    this.setState({ signup: !this.state.signup });
    if (!this.props.auth) {
      this.setState({ err: "Only admins can create acccounts at this time."});
      return;
    }
    if (this.props.auth.userType !== 'admin') {
      this.setState({ err: "Only admins can create acccounts at this time."});
      return;
    }
  }

  submitLogin(e) {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
  }

  submitSignup(e) {
    e.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ err: "The passwords do not match."});
      return;
    }
    if (this.props.auth.userType !== 'admin') {
      this.setState({ err: "Only admins can create acccounts at this time."});
      return;
    }
    if (this.state.actType === 'driver') {
      this.props.signupDriver(this.state.email, this.state.password, this.state.driverName, this.state.driverPhone );
    }

    if (this.state.actType === 'store') {
      this.props.signupStore(this.state.email, this.state.password, this.state.storeName, this.state.storePhone, this.state.storeAddress, this.state.storeZip );
    }

    if (this.state.actType === 'dispatch') {
      this.props.signupDispatch(this.state.email, this.state.password );
    }

    if (this.state.actType === 'admin') {
      this.props.signupAdmin(this.state.email, this.state.password );
    }

  }

  handleActType(e) {
    this.setState({ actType: e.target.value });
  }

  handleDriverPhone(e) {
    this.setState({ driverPhone: e.target.value });
  }

  handleDriverName(e) {
    this.setState({ driverName: e.target.value });
  }

  handleStorePhone(e) {
    this.setState({ storePhone: e.target.value });
  }

  handleStoreName(e) {
    this.setState({ storeName: e.target.value });
  }

  handleStoreAddress(e) {
    this.setState({ storeAddress: e.target.value });
  }

  handleStoreZip(e) {
    this.setState({ storeZip: e.target.value });
  }

  SignupDriverExtension() {
    return  (
      <section>
        <MaterialInput
        label='Driver Name'
        onChange={this.handleDriverName}
        value={this.state.driverName}
        />
        <MaterialInput
        label='Driver Phone'
        onChange={this.handleDriverPhone}
        value={this.state.driverPhone}
        type='tel'
        />
      </section>
    );
  }
  SignupStoreExtension() {
    return (
      <section>
        <MaterialInput
        label='Store Name'
        onChange={this.handleStoreName}
        value={this.state.storeName}
        />
        <MaterialInput
        label='Store Phone'
        onChange={this.handleStorePhone}
        value={this.state.storePhone}
        type='tel'
        />
        <MaterialInput
        label='Store Address'
        onChange={this.handleStoreAddress}
        value={this.state.storeAddress}
        />
        <MaterialInput
        label='Store Zip'
        onChange={this.handleStoreZip}
        value={this.state.storeZip}
        type='num'
        />
      </section>
    );
  }

  SignupExtension() {
    return (
      <section>
        <MaterialInput label='Confirm Password' type='password' onChange={this.confirmPasswordChange} value={this.state.confirmPassword} />
        <label style={style.actSelectLabel}>{`Account Type `}
          <select onChange={this.handleActType} style={style.actSelect}>
            <option value='driver'>driver</option>
            <option value='store'>store</option>
            <option value='dispatch'>dispatch</option>
            <option value='admin'>admin</option>
          </select>
        </label>
        {this.state.actType === 'driver' ? this.SignupDriverExtension() : null}
        {this.state.actType === 'store' ? this.SignupStoreExtension() : null}
      </section>
    );
  }

  render() {
    const Nav = (
      <nav style={style.nav}>
        <img
          style={style.logo}
          src='https://s3-us-west-2.amazonaws.com/lazybuffs.com/images/lazybuffs_logo_long.png'
        />
      </nav>
    );

    const title = this.props.auth
    ? <span style={style.title}>
        {`Signed in with ${this.props.auth.userEmail} `}
      </span>
    : null;

    const SignupExtension = this.state.signup ? this.SignupExtension(): null;

    const ErrMsg = this.props.errors
      ? <p style={style.err}>{this.props.errors}</p>
      : null;

    const PassMatchingErr = this.state.err
      ? <p style={style.err}>{this.state.err}</p>
      : null;

    let Signup = null;
    if (this.props.auth) {
      if (this.props.auth.userType === 'admin') {
        Signup = (
          <p
          style={style.signupText}
          >
          <span onClick={this.toggleSignup} style={style.signupLink}>
          Signup An Account
          </span>
          </p>
        );
      }
    }
    return (
      <form style={style.form} onSubmit={this.state.signup ? this.submitSignup : this.submitLogin}>
        {Nav}
        {this.props.msg}
        {title}
        <section style={style.inputSection}>
          <MaterialInput label='Username' onChange={this.emailChange} value={this.state.email} />
          <MaterialInput label='Password' type='password' onChange={this.passwordChange} value={this.state.password} />
          {SignupExtension}
          {ErrMsg}
          {PassMatchingErr}
        </section>

        <section style={style.inputSection}>
          <RaisedButton type='submit' style={style.button}>
            {this.props.loading ? 'loading...' : 'Submit'}
          </RaisedButton>
          {Signup}
        </section>
      </form>
    );
  }
}

const style = {
  form: {
    top: '0',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#292929',
    boxSizing: 'border-box',
    width: '100vw',
    height: '100vh',
    padding: '0 16px',
  },
  nav: {
    width: '100%',
    height: 'auto',
    margin: '0',
    padding: '0',
    padding: '16px',
    backgroundColor: '#FFB300',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: '20px',
    color: 'white',
  },
  inputSection: {
    width: '100%',
    maxWidth: '540px',
    display: 'flex',
    color: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  button: {
    backgroundColor: '#FFB300',
    padding: '8px',
    fontSize: '1.25em',
    width: '100%',
    maxWidth: '540px',
    border: '0',
    borderRadius: '.25em',
    outline: 'none',
  },
  logout: {
    borderBottom: '1px solid #FFB300',
  },
  signupLink: {
    borderBottom: '1px solid #FFB300',
  },
  signupText: {
    color: 'white',
    fontSize: '16px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  err: {
    margin: '0',
    color: '#F44336',
  },
  actSelectLabel: {
    color: 'white',
  },
  actSelect: {
    marginTop: '16px',
  },
  logo: {
    maxWidth: '100%',
  },
}

function mapStateToProps({ errors, auth, loading }) {
  return { errors, auth, loading };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login, logout, signupDriver, signupStore, signupDispatch, signupAdmin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
