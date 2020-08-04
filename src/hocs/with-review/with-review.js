import React, {PureComponent} from "react";

const withReview = (Component) => {
  class WithReview extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        comment: ``,
        rating: 3,
      };

      this.handleRatingChange = this.handleRatingChange.bind(this);
      this.handleCommentChange = this.handleCommentChange.bind(this);
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

    render() {
      const {comment, rating} = this.state;

      return (
        <Component
          {...this.props}
          changeRating={this.handleRatingChange}
          changeComment={this.handleCommentChange}
          rating={rating}
          comment={comment}
        />
      );
    }
  }

  return WithReview;
};

export default withReview;
