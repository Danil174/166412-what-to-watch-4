import React, {PureComponent} from 'react';
import PropTypes from "prop-types";

const withActiveVideo = (Component) => {
  class WithActiveVideo extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
      };

      this.handleMouseOver = this.handleMouseOver.bind(this);
      this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    handleMouseOver() {
      const {id, onCardMouseEnter} = this.props;
      onCardMouseEnter(id);
      this.setState({isPlaying: true});
    }

    handleMouseOut() {
      const {onCardMouseLeave} = this.props;
      onCardMouseLeave();
      this.setState({isPlaying: false});
    }

    render() {
      const {isPlaying} = this.state;

      return <Component
        {...this.props}
        isPlaying={isPlaying}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      />;
    }
  }

  WithActiveVideo.propTypes = {
    id: PropTypes.number.isRequired,
    onCardMouseEnter: PropTypes.func.isRequired,
    onCardMouseLeave: PropTypes.func.isRequired,
  };

  return WithActiveVideo;
};

export default withActiveVideo;
