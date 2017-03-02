import React, { Component } from 'react';

export default class MaterialInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      focus: false,
      touched: false,
    };
    this.inputFocus = this.inputFocus.bind(this);
    this.inputBlur = this.inputBlur.bind(this);
  }

  componentDidMount(){
    console.log(this.props.value);
    if (typeof this.props.value === 'number') this.setState({ touched: true });
  }

  inputFocus(e){
    this.setState({
      focus: true,
      touched: true,
    });
  }

  inputBlur(e){
    this.setState({
      focus: false,
    });
    if (e.target.value.length === 0) {
      this.setState({ touched: false });
    }
  }

  render() {
    let labelStyle = null;
    if (this.state.focus) labelStyle = style.labelFocus;
    else if (this.state.touched) labelStyle = style.label;
    else labelStyle = style.placeholder;
    return (
      <section>
        <label style={labelStyle}>
        {this.props.label}
        <br />
          <input
          onChange={this.props.onChange}
          onFocus={this.inputFocus}
          onBlur={this.inputBlur}
          onAbort={(e) => console.log(e)}
          placeholder={this.state.focus ? '' : this.props.label}
          style={this.state.focus ? style.inputFocus : style.input}
          value={this.props.value}
          type={this.props.type ? this.props.type : 'text'}
          />
        </label>
      </section>
    );
  }
}

const style = {
  placeholder: {
    fontSize: '10px',
    color: 'white',
  },
  label: {
    fontSize: '10px',
  },
  labelFocus: {
    fontSize: '10px',
    color: '#673AB7',
  },
  input: {
    margin: 'auto',
    padding: '4px 0',
    fontSize: '16px',
    width: '100%',
    background: 'white',
    color: 'rgba(0,0,0,0.7)',
    outline: 'none',
    border: '0',
    borderBottom: '1px solid rgba(0,0,0,0.3)',
  },
  inputFocus: {
    margin: 'auto',
    padding: '4px 0',
    fontSize: '16px',
    width: '100%',
    background: 'white',
    color: 'rgba(0,0,0,0.7)',
    outline: 'none',
    border: '0',
    borderBottom: '1px solid #673AB7',
  },
};
