import React, {PureComponent} from "react";
import {REVIEW_OPTIONS} from "../../const.js";

const withReview = (Component) => {
  class WithReview extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        comment: ``,
        rating: REVIEW_OPTIONS.DEFAULT_RATING,
        blocked: false,
      };

      this.handleRatingChange = this.handleRatingChange.bind(this);
      this.handleCommentChange = this.handleCommentChange.bind(this);
      this.checkStateBeforeReq = this.checkStateBeforeReq.bind(this);
      this.unBlockForm = this.unBlockForm.bind(this);
    }

    handleRatingChange(value) {
      this.setState({
        rating: value,
      });
    }

    handleCommentChange(value) {
      this.setState({
        comment: value,
      });
    }

    checkStateBeforeReq() {
      if (this.state.comment.length < REVIEW_OPTIONS.MIN_LENGTH || this.state.comment.length > REVIEW_OPTIONS.MAX_LENGTH) {
        this.setState({
          blocked: true,
        });
      }
    }

    unBlockForm() {
      this.setState({
        blocked: false,
      });
    }

    render() {
      const {comment, rating, blocked} = this.state;

      return (
        <Component
          {...this.props}
          changeRating={this.handleRatingChange}
          changeComment={this.handleCommentChange}
          rating={rating}
          comment={comment}
          blocked={blocked}
          onBtnClick={this.checkStateBeforeReq}
          onOkBtnClick={this.unBlockForm}
        />
      );
    }
  }

  return WithReview;
};

export default withReview;
