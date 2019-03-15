import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import FontAwesome from '@fortawesome/react-fontawesome';
import faBoxOpen from '@fortawesome/fontawesome-free-solid/faBoxOpen';
import faTags from '@fortawesome/fontawesome-free-solid/faTags';
import faBox from '@fortawesome/fontawesome-free-solid/faBox';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';
import logo from '../scss/assets/logo.jpg'


@connect(
  stores => ({ ...stores }),
)

class Sidebar extends Component {
  state = {
    menu: [
      {
        title: 'Dashboard',
        url: '/',
        icon: faBoxOpen,
        roles: ['admin', 'parent', 'service'],
      },
      {
        title: 'Сурагчид',
        url: '/students',
        icon: faBoxOpen,
        roles: ['admin', 'parent', 'service'],
      },
      {
        title: 'Гүйлгээ',
        url: '/transactions',
        icon: faBoxOpen,
        roles: ['service'],
      },
      {
        title: 'Сургууль',
        url: '/schools',
        icon: faTags,
        roles: ['admin', 'service'],
      },
      {
        title: 'Нэхэмжлэл',
        url: '/invoices',
        icon: faTags,
        roles: ['admin', 'service'],
      },
      {
        title: 'Ангилал',
        url: '/categories',
        icon: faBox,
        roles: ['service', 'admin'],
      },
      {
        title: 'Бүтээгдэхүүн',
        url: '/products',
        icon: faTags,
        roles: ['service', 'admin'],
      },
      {
        title: 'users',
        url: '/Хэрэглэгчид',
        icon: faTags,
        roles: ['service', 'admin'],
      },
    ],
  };

  _collapse = index => {
    const { menu } = this.state;
    menu[index].collapse = !menu[index].collapse;
    this.setState({ menu });
  };

  render() {
    const { menu } = this.state;
    const { auth } = this.props;
    return (
      <div className="comp-sidebar">
        <div className="sidebar-header">
          <div className="logo">
            {/* <img src="/images/logo.svg" alt="" /> */}
              <img src={logo} width="100" />
          </div>
        </div>
        <div className="sidebar-menu">
          {
            menu.map((m, index) => {
              if (m.roles && m.roles.indexOf(auth &&
                auth.user && auth.user.role) > -1) {
                return (
                  <li key={`sidebar-menu-${index}`}>
                    {
                      m.collapse !== undefined ? (
                        <div className="has-sub">
                          <div
                            className={`sub-title ${
                              m.collapse === false ? 'active' : ''
                              }`}
                            onClick={() => this._collapse(index)}
                          >
                            <FontAwesome
                              icon={m.icon}
                              className="menu-icon"
                            /> {' '}
                            {m.title}
                            <div className="arrow-icon">
                              <FontAwesome
                                icon={
                                  m.collapse
                                    ? faAngleDown
                                    : faAngleUp
                                }
                                className="menu-icon"
                              />
                            </div>
                          </div>
                          <div
                            className={`sub-menu ${
                              m.collapse ? '' : 'active'
                              }`}
                          >
                            {
                              m.menu.map((mm, j) => (
                                <NavLink
                                  key={`mm-${j}`}
                                  to={mm.url}
                                  exact
                                  activeClassName="active"
                                  isActive={() => {
                                    const {
                                      location: {
                                        pathname,
                                        search
                                      }
                                    } = this.props.history;
                                    return (
                                      mm.url ===
                                      `${pathname}${search}`
                                    );
                                  }}
                                >
                                  {mm.title}
                                </NavLink>
                              ))
                            }
                          </div>
                        </div>
                      ) : (
                          <NavLink
                            to={m.url}
                            exact
                            activeClassName="active"
                          >
                            <FontAwesome
                              icon={m.icon}
                              className="menu-icon"
                            />{' '}
                            {m.title}
                          </NavLink>
                        )
                    }
                  </li>
                )
              }
              return null;
            })
          }
        </div>
      </div>
    );
  }
}

export default Sidebar;
