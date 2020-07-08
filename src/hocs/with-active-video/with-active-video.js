import React, {PureComponent} from 'react';

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
      this.setState({isPlaying: true});
    }

    handleMouseOut() {
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

  return WithActiveVideo;
};

export default withActiveVideo;
