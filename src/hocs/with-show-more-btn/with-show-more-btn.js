import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {INITTIAL_LIST_LENGTH} from "../../const.js";

const withShowMoreBtn = (Component) => {
  class WithShowMoreBtn extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        showBtn: true,
        films: [],
      };

      this.handleMouseClick = this.handleMouseClick.bind(this);
    }

    componentDidMount(prevProps) {
      if (prevProps !== this.props) {
        this.setState({
          films: this.props.filmsList.slice(0, INITTIAL_LIST_LENGTH),
          showBtn: this.props.filmsList.length > INITTIAL_LIST_LENGTH
        });
      }
    }

    componentDidUpdate(prevProps) {
      if (prevProps !== this.props) {
        this.setState({
          films: this.props.filmsList.slice(0, INITTIAL_LIST_LENGTH),
          showBtn: this.props.filmsList.length > INITTIAL_LIST_LENGTH
        });
      }
    }

    handleMouseClick() {
      this.setState((prevState) => ({
        films: [
          ...prevState.films,
          ...this.props.filmsList.slice(
              prevState.films.length,
              prevState.films.length + INITTIAL_LIST_LENGTH
          )
        ],
        showBtn: prevState.films.length + INITTIAL_LIST_LENGTH <= this.props.filmsList.length,
      }));
    }

    render() {
      const {showBtn, films} = this.state;

      return (
        <Component
          {...this.props}
          filmsList={films}
          showBtn={showBtn}
          handleMouseClick={this.handleMouseClick}
        />
      );
    }
  }

  WithShowMoreBtn.propTypes = {
    filmsList: PropTypes.array.isRequired,
  };

  return WithShowMoreBtn;
};

export default withShowMoreBtn;
