import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import ModalChat from '../common/ModalChat';
import ButtonApp from '../general/BlockButton';

class UserContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      currentUser: {},
      showModal: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    this.setState({ currentUser });
  }

  render() {
    const { user, service } = this.props;

    return (
      <div>
        <div className="userDataContainer panelContainer UserServicePanel">
          <div className="row">
            <div className="col-md-2">
              <img
                src={user.avatar}
                alt={user.first_name} width="45" height="45" className="img-circle"
              />
            </div>
            <div className="col-md-10">
              <span className="serviceUserName">
                <Link prefetch as={`/u/${user.username}`} href={`/user?username=${user.username}`}>
                  <a>{user.first_name}</a>
                </Link>
              </span>
              <p className="UserServiceDescription">{user.description ? user.description.substring(0, 100) : null}... <a href={`/u/${user.username}`} className="lbl lbl-blue">Ver perfil</a></p>
            </div>
          </div>
          <div className="text-center">
          { this.props.isAuthenticated ?
            this.state.currentUser.id !== user.id &&
              <ButtonApp
                text="Iniciar Conversación"
                buttonStyle="btn btn-primary btn-large btn-block"
                click={this.openModal}
              /> :
            <div>
              <span className="spanMessage">¿Te interesa este servicio?</span>
              <a href={`/signup?ref=${service.id}`} className="btn btn-primary btn-large btn-block">¡Unete ahora!</a>
            </div>
          }

          </div>
        </div>

        <ModalChat showModal={this.state.showModal} user={user} closeModal={this.closeModal} />

        <style>{`
          .UserServiceDescription {
            font-size: 13px;
            line-height: 22px;
            color: #757575;
          }

          .serviceUserName {
            font-weight: bold;
            font-size: 16px;
          }

          .inputMessage {
            width: 90%;
            padding: 10px;
          }

          .inputMessage:focus {
            outline: 0px;
          }

          .btnMessage {
            padding: 10px;
            background: transparent;
            border: none;
            width: 10%;
          }

          .modalFooter {
            background: #f5f5f5;
            padding: 10px;
            text-align: center;
            border-top: 1px solid #e5e5e5;
          }

          .userDataContainer {
            background: #fff;
            border: 1px solid #DDDDDD;
            color: #333;
            text-align: left;
            padding-left: 12.5px;
            padding-right: 12.5px;
            padding-bottom: 10px;
            padding-top: 10px;
            float: left;
            width: 100%;
            box-shadow: 0 4px 12px 0 rgba(182, 184, 200, 0.4);
          }

          .userDataContainer h4 {
            display: inline-block;
          }

          .spanMessage{
            font-weight: normal !important;
            color: #767676 !important;
            font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important;
            margin: 0px !important;
            word-wrap: break-word !important;
            font-size: 12px !important;
            line-height: 16px !important;
            letter-spacing: 0.4px !important;
            padding-top: 10px !important;
            padding-bottom: 0px !important;
            display: flex;
            flex: 1;
            justify-content: center;
          }
        `}</style>
      </div>
    );
  }
}

UserContainer.propTypes = {
  user: PropTypes.shape({}),
  service: PropTypes.shape({}),
};

UserContainer.defaultProps = {
  user: {},
  service: {},
};

export default UserContainer;
