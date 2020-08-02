import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Operation as DataOperation, ActionCreator} from '../../reducer/data/data.js';
import {getComments} from "../../reducer/data/selectors.js";
import {Months} from "../../const.js";

class MovieReviews extends PureComponent {
  componentDidMount() {
    const {filmID, componentMounted} = this.props;
    componentMounted(filmID);
  }

  componentWillUnmount() {
    const {componentUnmounted} = this.props;
    componentUnmounted();
  }

  _renderComment(comment) {
    const {userName, text, rating, date} = comment;
    const prittydate = `${Months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    return (
      <div className="review">
        <blockquote className="review__quote">
          <p className="review__text">{text}</p>

          <footer className="review__details">
            <cite className="review__author">{userName}</cite>
            <time className="review__date" dateTime="2016-12-24">{prittydate}</time>
          </footer>
        </blockquote>

        <div className="review__rating">{rating}</div>
      </div>
    );
  }

  // _createReviewsColumn(comments) {
  //   return (
  //     <>
  //     </>
  //   );
  // }

  render() {
    const {comments} = this.props;
    console.log(comments);
    return (
      <div className="movie-card__reviews movie-card__row">
        <div className="movie-card__reviews-col">
          <div className="review">
            <blockquote className="review__quote">
              <p className="review__text">Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the directors funniest and most exquisitely designed movies in years.</p>

              <footer className="review__details">
                <cite className="review__author">Kate Muir</cite>
                <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
              </footer>
            </blockquote>

            <div className="review__rating">8,9</div>
          </div>

          <div className="review">
            <blockquote className="review__quote">
              <p className="review__text">Andersons films are too precious for some, but for those of us willing to lose ourselves in them, theyre a delight. The Grand Budapest Hotel is no different, except that he has added a hint of gravitas to the mix, improving the recipe.</p>

              <footer className="review__details">
                <cite className="review__author">Bill Goodykoontz</cite>
                <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
              </footer>
            </blockquote>

            <div className="review__rating">8,0</div>
          </div>

          <div className="review">
            <blockquote className="review__quote">
              <p className="review__text">I didnt find it amusing, and while I can appreciate the creativity, its an hour and 40 minutes I wish I could take back.</p>

              <footer className="review__details">
                <cite className="review__author">Amanda Greever</cite>
                <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
              </footer>
            </blockquote>

            <div className="review__rating">8,0</div>
          </div>
        </div>
        <div className="movie-card__reviews-col">
          <div className="review">
            <blockquote className="review__quote">
              <p className="review__text">The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.</p>

              <footer className="review__details">
                <cite className="review__author">Matthew Lickona</cite>
                <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
              </footer>
            </blockquote>

            <div className="review__rating">7,2</div>
          </div>

          <div className="review">
            <blockquote className="review__quote">
              <p className="review__text">It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.</p>

              <footer className="review__details">
                <cite className="review__author">Paula Fleri-Soler</cite>
                <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
              </footer>
            </blockquote>

            <div className="review__rating">7,6</div>
          </div>

          <div className="review">
            <blockquote className="review__quote">
              <p className="review__text">It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.</p>

              <footer className="review__details">
                <cite className="review__author">Paula Fleri-Soler</cite>
                <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
              </footer>
            </blockquote>

            <div className="review__rating">7,0</div>
          </div>
        </div>
      </div>
    );
  }
}

MovieReviews.propTypes = {
  componentMounted: PropTypes.func.isRequired,
  componentUnmounted: PropTypes.func.isRequired,
  filmID: PropTypes.number.isRequired,
};


const mapStateToProps = (state) => ({
  comments: getComments(state),
});

const mapDispatchToProps = (dispatch) => ({
  componentMounted(id) {
    dispatch(DataOperation.loadComments(id));
  },
  componentUnmounted() {
    dispatch(ActionCreator.deleteComments());
  }
});

export {MovieReviews};
export default connect(mapStateToProps, mapDispatchToProps)(MovieReviews);
