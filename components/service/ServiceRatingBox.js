import React from 'react';
import Rating from 'react-rating';
import PropTypes from 'prop-types';

class ServiceRatingBox extends React.Component {
  constructor() {
    super();
    this.state = {
      rating_price: 0,
      rating_quality: 0,
      rating_time: 0,
    };
  }

  componentDidMount() {
    this.initial();
  }

  initial() {
    if (this.props.rating.length > 0) {
      this.setState({
        rating_price: this.props.rating[0].rating,
        rating_quality: this.props.rating[1].rating,
        rating_time: this.props.rating[2].rating,
      });
    }
  }

  render() {
    return (
      <div>
        <div className="panelContainer container-margin-top">
          <h4>Calificaciones</h4>
          <div className="row">
            <div className="review-starts">
              <div className="ProfileService-rating-general col-md-4">
                <span className="lbl">Precio</span>
                <div className="ProfileService-stars">
                  <Rating
                    initialRate={this.state.rating_price}
                    readonly empty="fa fa-star-o fa-lg lbl-warning"
                    full="fa fa-star fa-lg lbl-warning"
                  />
                  <span className="lbl">{this.state.rating_price}</span>
                </div>
              </div>

              <div className="ProfileService-rating-general col-md-4">
                <span className="lbl">Calidad</span>
                <div className="ProfileService-stars">
                  <Rating
                    initialRate={this.state.rating_quality}
                    readonly empty="fa fa-star-o fa-lg lbl-warning"
                    full="fa fa-star fa-lg lbl-warning"
                  />
                  <span className="lbl">{this.state.rating_quality}</span>
                </div>
              </div>

              <div className="ProfileService-rating-general col-md-4">
                <span className="lbl">Tiempo</span>
                <div className="ProfileService-stars">
                  <Rating
                    initialRate={this.state.rating_time}
                    readonly empty="fa fa-star-o fa-lg lbl-warning"
                    full="fa fa-star fa-lg lbl-warning"
                  />
                  <span className="lbl">{this.state.rating_time}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .icon-star {
            height: 3px;
          }
        `}</style>
      </div>
    );
  }
}

ServiceRatingBox.propTypes = {
  rating: PropTypes.arrayOf(
    PropTypes.object,
  ),
};

ServiceRatingBox.defaultProps = {
  rating: [],
};

export default ServiceRatingBox;
