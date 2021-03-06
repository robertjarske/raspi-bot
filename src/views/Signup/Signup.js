import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form } from '../../components';
import { requestSignup } from '../../redux/auth/actions';
import './Signup.css';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  requestSignup: credentials => dispatch(requestSignup(credentials)),
});

const Signup = ({ ...props }) => {
  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="content">
      <Form signupRequest={props.requestSignup} kindof={'signup'}/>
      <div className="background"></div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);
