import React, {PureComponent} from "react";
import {REVIEW_OPTIONS} from "../../const.js";

const withReview = (Component) => {
  class WithReview extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        comment: ``,
        rating: REVIEW_OPTIONS.DEFAULT_RATING,
        blocked: true,
        isErrorShown: false,
      };

      this.handleRatingChange = this.handleRatingChange.bind(this);
      this.handleCommentChange = this.handleCommentChange.bind(this);
      this.handleFormRedyToReq = this.handleFormRedyToReq.bind(this);
      this.handleFormHideError = this.handleFormHideError.bind(this);
      this.handleFormShowError = this.handleFormShowError.bind(this);
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

    handleFormRedyToReq() {
      if (this.state.comment.length < REVIEW_OPTIONS.MIN_LENGTH || this.state.comment.length > REVIEW_OPTIONS.MAX_LENGTH) {
        this.setState({
          blocked: true,
        });
      } else {
        this.setState({
          blocked: false,
        });
      }
    }

    handleFormShowError() {
      this.setState({
        isErrorShown: true,
      });
    }

    handleFormHideError() {
      this.setState({
        isErrorShown: false,
      });
    }

    render() {
      const {comment, rating, blocked, isErrorShown} = this.state;

      return (
        <Component
          {...this.props}
          changeRating={this.handleRatingChange}
          changeComment={this.handleCommentChange}
          rating={rating}
          comment={comment}
          blocked={blocked}
          isErrorShown={isErrorShown}
          onFormChange={this.handleFormRedyToReq}
          onBlockedBtnClick={this.handleFormShowError}
          onOkBtnClick={this.handleFormHideError}
        />
      );
    }
  }

  return WithReview;
};

export default withReview;
