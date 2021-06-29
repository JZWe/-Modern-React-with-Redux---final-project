import { render } from '@testing-library/react';
import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load('client:auth2', async () => {
      await window.gapi.client.init({
        clientId:
          '851559393968-vd8lc6f3ri9dunqasj4nojoen42cdn57.apps.googleusercontent.com',
        scope: 'email',
      });
      this.auth = window.gapi.auth2.getAuthInstance(); // 建立一個auth變數，紀錄AuthInstance
      console.log(this.auth);
      this.onAuthChange(this.auth.isSignedIn.get()); // initialize
      this.auth.isSignedIn.listen(this.onAuthChange); // 監聽auth.isSignedIn的狀態
    });
  }

  // 如果auth的狀態有變換，更新state
  onAuthChange = (isSignedIn) => {
    console.log(this.auth.currentUser.get().getId());
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onSignOutClick}>
          <i className="google icon" />
          Signed Out
        </button>
      );
    } else {
      return (
        <div>
          <button
            className="ui blue google button"
            onClick={this.onSignInClick}
          >
            <i className="google icon" />
            Signed In With Google
          </button>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps, {
  signIn,
  signOut,
})(GoogleAuth);
