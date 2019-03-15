import React, { Component } from 'react';
import Fontawesome from '@fortawesome/react-fontawesome';
import faUser from '@fortawesome/fontawesome-free-solid/faUser';
import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt';
import { connect } from 'react-redux';
import nav from '../navigation';
import { logout } from '../actions/users';

@connect(
  stores => ({ ...stores }),
)

class Header extends Component {
  _logout = () => {
    this.props.dispatch(logout());
  };

  getTitle = url => {
    const keys = Object.keys(nav);
    console.log(keys);
    for (let i = 0; i < keys.length; i++) {
      if (url.indexOf(keys[i]) !== -1) {
        return nav[keys[i]];
      }
    }

    return '';
  };

  render() {
    const { history, auth } = this.props;
    return (
      <div className="comp-header">
        <div className="row">
          <div className="col-xs-12 col-md-6">
              { nav[history.location.pathname] }
              {/*this.getTitle(history.location.pathname)*/}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="user">
              <li>
                <Fontawesome icon={faUser} />{' '}
                {
                  auth &&
                    auth.user &&
                    // `${auth.user.firstName} .${
                    //     auth.user.lastName
                    // }`
                    `${ auth.user.fullName }`
                }
              </li>
              <li onClick={ this._logout }>
                <Fontawesome icon={ faSignOutAlt } /> Гарах
              </li>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
