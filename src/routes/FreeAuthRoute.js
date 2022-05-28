import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router';

const FreeAuthRoute = ({ auth, children }) => {
  if(localStorage.getItem('accesstoken') || auth) {
    return <Navigate to="/profile" />
  }

  return children;
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, null)(FreeAuthRoute);