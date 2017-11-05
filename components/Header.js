import React from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';

import NotificationList from './notification/NotificationList';
import InboxList from './inbox/InboxList';

import api from '../api';

Router.onRouteChangeStart = () => {
  return NProgress.start();
};
Router.onRouteChangeComplete = () => {
  return NProgress.done();
};
Router.onRouteChangeError = () => {
  return NProgress.done();
};

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      domain: '/app',
      notificationsCount: 0,
      messagesCount: 0,
      intervalId: 0,
      isSupplier: false,
      query: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.initial();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async initial() {
    const token = localStorage.token;
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({ user });

    if (token !== undefined) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const meData = await api.user.me(user.id);
      this.setState({ isSupplier: meData.is_supplier });
      this.initialData();
      const intervalId = setInterval(this.timer.bind(this), 20000);
      this.setState({ intervalId });
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }

  async timer() {
    this.initialData();
  }

  async initialData() {
    const [
      newNotifications,
      newMessages,
    ] = await Promise.all([
      api.notifications.previewNotifications(),
      api.inbox.previewMessages(),
    ]);

    this.setState({ notificationsCount: newNotifications, messagesCount: newMessages });
  }

  onSubmit(e) {
    e.preventDefault();
    Router.push({
      pathname: '/search',
      query: { text: this.state.query },
    });
  }

  render() {
    const guestLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link href="/login">
            <a className="btn_nav">
              <span>Iniciar sesión</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/signup">
            <a className="btn_navf">
              <span>Regístrate</span>
            </a>
          </Link>
        </li>
        <li>
          <a
            data-toggle="collapse"
            data-target=".navbar-collapse.in"
            href="/proveedores"
          >
            <span className="lbl-principal">Vender servicios</span>
          </a>
        </li>
      </ul>
    );

    let userLinks = <div />;
    if (this.props.isAuthenticated) {
      userLinks = (
        <ul className="nav navbar-nav navbar-right">
          { this.state.isSupplier &&
          <li className="dropdown">
            <a
              className="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Proveedor <span className="caret" />
            </a>
            <ul className="dropdown-menu">
              <li>
                <a
                  data-toggle="collapse"
                  data-target=".navbar-collapse.in"
                  href={`${this.state.domain}/services/new`}
                  className="btn_nav nav-lbl-principal"
                >
                  Publicar servicio
                </a>
              </li>
              <li role="separator" className="divider" />
              <li>
                <a
                  data-toggle="collapse"
                  data-target=".navbar-collapse.in"
                  href={`${this.state.domain}/services`}
                  className="btn_nav"
                >
                  Administrar servicios
                </a>
              </li>
              <li role="separator" className="divider" />
              <li>
                <a
                  data-toggle="collapse"
                  data-target=".navbar-collapse.in"
                  href={`${this.state.domain}/jobs`}
                  className="btn_nav"
                >
                  Tus ventas
                </a>
              </li>
            </ul>
          </li>
          }

          { !this.state.isSupplier &&
            <li>
              <a
                href={`${this.state.domain}/services/new`}
                className="btn_nav lbl nav-lbl-principal"
              >
                Publicar servicio
              </a>
            </li>
          }
          <InboxList count={this.state.messagesCount} />
          <NotificationList count={this.state.notificationsCount} />

          <li className="dropdown">
            <a
              className="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                width="25"
                height="25"
                className="img-circle nav-img-avatar"
                alt={this.state.user.first_name}
                src={this.state.user.avatar}
              />
              {' '}
              {this.state.user.first_name}
              <span className="caret" />
            </a>
            <ul className="dropdown-menu">
              <li>
                <Link prefetch as={`/u/${this.state.user.username}`} href={`/user?username=${this.state.user.username}`}>
                  <a className="btn_nav">Mi perfil</a>
                </Link>
              </li>
              <li role="separator" className="divider" />
              <li>
                <a href={`${this.state.domain}/account`} className="btn_nav">
                  Editar perfil
                </a>
              </li>
              <li role="separator" className="divider" />
              <li>
                <a
                  href="/conversations"
                  className="btn_nav"
                >
                  Bandeja de entrada
                </a>
              </li>
              <li role="separator" className="divider" />
              <li>
                <Link prefetch href="/favorites">
                <a className="btn_nav" >
                  Favoritos
                </a>
                </Link>
              </li>
              <li role="separator" className="divider" />
              <li>
                <a href={`${this.state.domain}/requests`} className="btn_nav">
                  Tus compras
                </a>
              </li>
              <li role="separator" className="divider" />
              <li>
                <a href="/logout" className="btn_nav">Salir</a>
              </li>
            </ul>
          </li>
        </ul>
      );
    }

    return (
      <header>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target=".navbar-collapse"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>

              <Link href="/">
                <a className="navbar-brand">
                  <img
                    src="/static/logo-gigbox2.png"
                    alt="Gigbox"
                    width="120"
                  />
                </a>
              </Link>

            </div>
            <form
              className="navbar-form navbar-left nav-search-form ng-pristine ng-valid"
              onSubmit={this.onSubmit}
            >
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Buscar servicio"
                  className="navbar-input icon-search ng-pristine ng-untouched ng-valid ng-empty"
                  value={this.state.query}
                  onChange={this.onChange}
                  name="query"
                />
              </div>
            </form>

            <div className="collapse navbar-collapse">
              {this.props.isAuthenticated ? userLinks : guestLinks}
            </div>

          </div>
        </nav>
        <style jsx global>{`
          header {
            box-shadow: initial;
          }

          .bangeAlerts {
            position: absolute;
            top: 5px;
            right: 10px;
            background: linear-gradient(132deg,#ffd08c,#ffbb58);
            font-size: 10px;
            height: 20px;
            width: 20px;
            text-align: center;
            border-radius: 50%
            color: #FFF;
            font-weight: 500;
          }

          .navbar-default {
            background: #FFF;
            border-color: #FFF;
          }

          #nprogress {
            pointer-events: none;
          }

          #nprogress .bar {
            background: #ff9300;
            position: fixed;
            z-index: 1031;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
          }

          #nprogress .peg {
            display: block;
            position: absolute;
            right: 0px;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px #ff9300, 0 0 5px #ff9300;
            opacity: 1.0;
            transform: rotate(3deg) translate(0px, -4px);
          }

          .icon-search {
            background: url(/static/ico-search.png) 0 10px no-repeat !important;
            padding-left: 25px;
          }

          .menu-categories {
            background: #161e2c;
            margin: 0 auto;
            padding: 5px 0px;
            position: fixed;
            z-index: 10;
            width: 100%;
            font-weight: 500;
          }

          .menu-categories-items {
            line-height: 30px;
            margin: 0;
            padding: 0;
            list-style: none;
            white-space: nowrap;
            text-align: left;
            overflow-x: hidden;
            overflow-y: hidden;
          }

          .menu-categories-items > li {
            visibility: visible !important;
            display: inline-block !important;
            padding: 1px 0;
          }

          .menu-categories-items a{
            color: #333;
            padding: 5px 25px;
            border-bottom: 3px solid #FFF;
          }
          .menu-categories-items > li > a:hover{
            border-bottom: 3px solid #ff1940;
          }

          .menu-categories-items > li:hover .menu-categories-options {
            display: block;
            color: red;
          }


          .menu-categories-options {
            background-color: #fff;
            position: absolute;
            top: 100%;
            z-index: 10;
            display: none;
            border: 1px #dddddd solid;
            padding: 5px 0;
            z-index: 300;
          }

          .menu-categories-options > ul {
            display: inline-block;
            vertical-align: top;
            padding: 0 11px;
          }

          .menu-categories-options > ul > li {
            line-height: 16px;
            display: block;
            white-space: nowrap;
            text-align: left;
            max-width: 240px;
            overflow: hidden;
          }

          .menu-categories-options > ul > li > a {
            color: #24a1b2;
            display: block;
            line-height: 16px;
            padding: 8px 0px;
            ;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .menu-categories-options > ul > li > a:hover {
            text-decoration: underline;
          }

          @media (max-width: 600px) {
            .navbar-default {
              box-shadow: 0 1px 10px 0 rgba(0,0,0,.1);
            }

            .menu-categories {
              position: absolute;
            }

            .menu-categories-options {
              width: 100%;
              text-align: center;
              left: 0;
            }

            .menu-categories-options > ul > li {
              text-align: center;
            }

            .menu-categories-items {
              line-height: 30px;
              margin: 0;
              padding: 0;
              list-style: none;
              white-space: nowrap;
              text-align: left;
              overflow-y: hidden;
              overflow-x: scroll;
            }

            .navbar-default .navbar-toggle {
              border: none;
            }

            .navbar-form {
              display: none;
            }

          }
        `}</style>
      </header>
    );
  }
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
};

Header.defaultProps = {
  isAuthenticated: false,
};

export default Header;
