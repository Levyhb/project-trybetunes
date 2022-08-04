import React, { Component } from 'react';
import Header from '../components/Header';
// import { getUser } from '../services/userAPI';
// import Loading from './Loading';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // isLoading: false,
    };
  }

  // getUserInformations = async () => {
  //   this.setState({ isLoading: true });
  //   await getUser();
  //   this.setState({ isLoading: false });
  // }

  render() {
    // const { isLoading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {/* { isLoading ? <Loading /> : (
          <h2>Profile</h2>
        )} */}
      </div>
    );
  }
}
