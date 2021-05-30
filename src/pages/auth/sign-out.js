import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {userActions} from '../../redux/reducers';

class SignOut extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.userActions.signOut();
  }

  render() {
    const { user } = this.props;
    return <React.Fragment>{!user ? <Redirect to="/" /> : null}</React.Fragment>;
  }
}

const mapStateToProps = (state) => {
  const { user } = state.Auth;
  return { user };
};

const mapDispatchToProps = {
  userActions
};

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);
