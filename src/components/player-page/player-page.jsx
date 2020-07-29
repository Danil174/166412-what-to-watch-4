import React from "react";
import PropTypes from "prop-types";
import history from "../../history.js";

const PlayerPage = (props) => {
  const {film} = props;
  return (
    <div className="player">
      <video src="#" className="player__video" poster="img/player-poster.jpg"></video>

      <button
        type="button"
        className="player__exit"
        onClick={() => {
          history.go(-1);
        }}
      >
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler">Toggler</div>
          </div>
          <div className="player__time-value">1:30:29</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{film.title}</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

PlayerPage.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired
};


export default PlayerPage;
