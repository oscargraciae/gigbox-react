import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import Cropper from 'react-cropper';

import api from '../../api';

import ButtonApp from '../general/ButtonApp';

class BoardingAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showModal: false,
      avatar: props.currentUser.avatar || 'static/user-default.png',
      newImage: null,
      imagePreviewUrl: 'static/user-default.png',
    };

    this.next = this.next.bind(this);
  }

  next() {
    this.props.nextSlide();
  }

  async handleImageChange(e) {
    e.preventDefault();

    this.setState({ loading: true });
    const reader = new FileReader();
    const file = e.target.files[0];

    let image = null;
    reader.onloadend = async () => {
      // this.setState({
      //   newImage: file,
      //   imagePreviewUrl: reader.result,
      // });
      image = reader.result;

      const userId = this.props.currentUser.id;
      const resp = await api.user.setAvatar(userId, image);

      this.setState({ avatar: resp.avatar_thumb, showModal: false, newImage: resp.avatar_thumb });
    };

    reader.readAsDataURL(file);
  }

  render() {
    return (
      <div>
        <h1>Añade una foto a tu perfil.</h1>
        <p className="BoardingDescription">Una foto te hace mas visible en Gigbox</p>

        <div className="containerImage">
          <img src={this.state.avatar} alt="Welcome" height="230" width="230" className="imageAvatarTmp" />
        </div>

        <div className="containerButton">
          { !this.state.newImage &&
            <span>
              <input
                id="upload_photo_input"
                className="fileInput"
                type="file"
                onChange={(e) => { return this.handleImageChange(e); }}
              />
              {!this.state.loading ?
                <label htmlFor="upload_photo_input" className="btn btn-default btn-lg"><i className="fa fa-cloud-upload" aria-hidden="true" /> Cargar foto</label> :
                <span>Cargando...</span>
              }


            </span>
          }

          { this.state.newImage &&
            <ButtonApp
              text="Continuar"
              buttonStyle="btn btn-primary btn-large"
              click={this.next}
              loading={this.state.isLoading}
            />
          }
        </div>


        <div className="containerButton">
          <span className="btnLink" onClick={this.next}>Omitir por ahora</span>
        </div>
        <style jsx>{`
          .containerImage {
            padding: 20px 0px;
          }

          .containerButton {
            padding: 10px 0px;
          }

          .fileInput {
            width: 0.1px;
            height: 0.1px;
            opacity: 0;
            overflow: hidden;
            position: absolute;
            z-index: -1;
          }

          .BoardingDescription {
            color: #95989A;
            font-size: 21px;
          }

          .btnLink {
            cursor: pointer;
            color: #24A1B2;
          }

          .btnLink:hover {
            color: #24A1B2;
            text-decoration: underline;
          }

          @media (max-width: 600px) {
            .BoardingDescription {
              color: #95989A;
              font-size: 16px;
            }

            .imageAvatarTmp {
              width: 150px;
              height: 150px;
            }
          }
        `}</style>
      </div>
    );
  }
}

BoardingAvatar.propTypes = {
  currentUser: PropTypes.shape(),
  nextSlide: PropTypes.func,
};

BoardingAvatar.defaultProps = {
  currentUser: {},
  nextSlide: null,
};

export default BoardingAvatar;
