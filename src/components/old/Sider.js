import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import store from '../store';

// const SubMenu = Menu.SubMenu;

@connect(
    stores => ({ ...stores }),
)

class Header extends Component {
    constructor(props) {
        super(props);
        // console.log(store.getState().auth.user);
        var userId = '';
        var service = '';
        if (store.getState().auth && store.getState().auth.user) {
            userId = store.getState().auth && store.getState().auth.user;
            service = store.getState().auth && store.getState().auth.user;
        }
        // console.log(service.service);

        this.state = {
            menu: [
                {
                    title: 'Хянах самбар',
                    url: '/',
                    icon: 'bar-chart',
                    roles: ['admin', 'service'],
                },
                {
                    title: 'Сурагчид',
                    url: '/students',
                    icon: 'user',
                    roles: ['admin'],
                },
                {
                    title: 'Гүйлгээ',
                    url: '/transactions',
                    icon: 'swap',
                    roles: ['service'],
                },
                {
                    title: 'Сургууль',
                    url: '/schools',
                    icon: 'bank',
                    roles: ['admin'],
                },
                {
                    title: 'Тохиргоо',
                    url: '/settings',
                    icon: 'setting',
                    roles: ['admin'],
                },
                {
                    title: 'Нэхэмжлэл',
                    url: '/invoices',
                    icon: 'red-envelope',
                    roles: ['admin', 'service'],
                },
                {
                    title: 'Ангилал',
                    url: '/categories',
                    icon: 'bars',
                    roles: ['service'],
                },
                {
                    title: 'Бүтээгдэхүүн',
                    url: '/products',
                    icon: 'database',
                    roles: ['service'],
                },
                {
                    title: 'Хэрэглэгчид',
                    url: '/users',
                    icon: 'user',
                    roles: ['service'],
                },
                {
                    title: 'Үйлчилгээнүүд',
                    url: '/services',
                    icon: 'home',
                    roles: ['admin'],
                },
                {
                    title: 'Үйлчилгээ',
                    url: `/services/${service.service}`,
                    icon: 'home',
                    roles: ['service'],
                },
                {
                    title: 'Систем хэрэглэгч',
                    url: '/system-users',
                    icon: 'user',
                    roles: ['admin'],
                },
                {
                    title: 'Сурагч',
                    url: `/student/${userId.userId}`,
                    icon: 'user',
                    roles: ['parent']
                }
            ],
        };
    }

    render() {
        const { auth } = this.props;
        const { menu } = this.state;
        // console.log(menu);
        return (
            <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline" className="sideer">
                {
                    menu.map((m, index) => {
                        if (m.roles && m.roles.indexOf(auth &&
                            auth.user && auth.user.role) > -1) {
                            return (
                                <Menu.Item key={`${index}`}>
                                    <Icon type={m.icon} />
                                    <span>{m.title}</span>
                                    <NavLink
                                        to={m.url}
                                        exact
                                        activeClassName="active"
                                    >
                                        {m.title}
                                    </NavLink>
                                </Menu.Item>
                            )
                        }
                        return null;
                    })
                }
            </Menu>
        );
    }
}

export default Header;
