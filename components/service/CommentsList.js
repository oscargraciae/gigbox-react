import React from 'react';
import moment from 'moment';

import TextFieldGroup from '../general/TextFieldGroup';
import ButtonApp from '../general/ButtonApp';

import api from '../../api';

class CommentsList extends React.Component {

  constructor() {
    super();

    this.state = {
      loading: true,
      comments: null,
      comment: '',
      errors: {},
      currentUser: {},
      page: 1,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const comments = await api.services.getComments(this.props.service.id, this.state.page);
    const currentUser = JSON.parse(localStorage.getItem('user'));

    this.setState({ comments, loading: false, currentUser });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const comment = { body: this.state.comment, user_id: this.state.currentUser.id, service: this.props.service.id };
    const response = await api.services.setComment(this.props.service.id, comment)
    const comments = this.state.comments;
    comments.unshift(response);
    this.setState({ comments, comment: '' });
  }

  moreComments = async () => {
    const page = this.state.page + 1;
    let comments = this.state.comments;
    const newComments = await api.services.getComments(this.props.service.id, page);
    comments = comments.concat(newComments);
    this.setState({ comments, loading: false, page });
  }

  deleteComment = async (index, id) => {
    const response = await api.services.deleteComment(this.props.service.id, id);
    let comments =  this.state.comments;
    comments.splice(index, 1);
    this.setState({ comments });
  }

  render() {
    const { comments, loading, currentUser } = this.state;
    return (
      <div>
        <div className="panelContainer">
          <h3>Comentarios</h3>
          <form className="formComment" onSubmit={this.onSubmit}>
            <img
              src={currentUser.avatar}
              alt={currentUser.first_name}
              width="45" height="45"
              className="img-circle"
            />
            <div className="commentInput">
              <div className="controls controls-small">
                <input
                  value={this.state.comment}
                  onChange={this.onChange}
                  type="text"
                  name="comment"
                  placeholder="Añade un comentario público"
                  className="input control-input"
                />
              </div>
            </div>
            <div className="commentButton">
              <ButtonApp
                text="Publicar"
                buttonStyle="btn btn-primary btn-small"
                click={this.handlerLogin}
                loading={this.state.isLoading}
              />
            </div>
          </form>
          { comments &&
            comments.map((item, key) => (
              <div key={item.id} className="review-row row">
                <div className="col-md-1 col-xs-2">
                  <img
                    src={item.user.avatar}
                    alt={item.user.first_name}
                    width="45" height="45"
                    className="img-circle"
                  />
                </div>
                <div className="col-md-8 col-xs-10">
                  <div className="review-header">
                    <span>
                      <a
                        href={`/u/${item.user.username}`}
                        className="lbl"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.user.full_name}
                      </a>  - {moment(item.created_at).locale("es").format('LL')}</span>
                      { item.user.id === currentUser.id && <a className="btnDelete" onClick={() => this.deleteComment(key, item.id)}> <i className="fa fa-trash-o" aria-hidden="true"></i></a> }
                  </div>
                  <div className="review-body">
                    <p>{item.body}</p>
                  </div>
                </div>
              </div>
            ))
          }
          { comments &&
            <div className="text-center">
              <a onClick={this.moreComments}>Ver más comentarios</a>
            </div>
          }
        </div>

        <style jsx>{`
          h3{
            font-size: 18px;
            margin-bottom: 24px;
          }
          .review-row {
            margin-bottom: 16px;
          }

          .review-header {
            margin-bottom: 2px;
          }

          .review-body {
            font-size: 10px !important;
          }

          .review-body > p {
            font-size: 14px !important;
            font-weight: normal;
          }

          .formComment {
            display: flex;
            margin-bottom: 20px;
          }

          .commentInput {
            flex: 1;
          }

          .commentButton {
            height: 10px;
          }

          .input {
            -moz-border-radius: 2px;
            -webkit-border-radius: 2px;
            background-color: #fff;
            border-radius: 2px;
            border: 1px solid #c4c4c4;
            color: #565a5c;
            padding: 8px 10px;
            width: 100%;
            font-size: 14px;
          }

          .control-input{
            border: 1px solid #aaa;
          }

          .controls {
            padding: 10px 0px;
            position: relative;
            width: 100%;
          }

          .controls-small {
            padding: 5px;
          }

          .review-row:hover .btnDelete {
            visibility: visible;
          }
          .btnDelete {
            visibility: hidden;
            padding-left: 10px;
            color: #757575;
          }

          .btnDelete:hover {
            color: red;
          }
        `}</style>
      </div>
    );
  }
}

export default CommentsList;
